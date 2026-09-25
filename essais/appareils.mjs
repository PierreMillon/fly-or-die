// ---------------------------------------------------------------------------
// LES SEPT APPAREILS FONT LE TOUR COMPLET.
//
// Le test de fumée dit que le jeu n'est pas mort au décollage du bimoteur. Il
// ne dit rien des six autres, ni de ce qui se passe après : le pouvoir tenu au
// doigt, l'escouade qui vole à côté, les roues qui touchent, les mécaniciens
// qui réparent, le redécollage. Depuis la v1.79 tout cela existe pour chaque
// appareil, et chacun a un chemin différent dans le code — les drones n'ont
// pas de canons, l'essaim impose ses suiveurs, l'Ancien tient un courant.
//
// Pour chacun : on charge la page avec l'appareil choisi et une escouade,
// on décolle, on laisse une vague venir dix secondes, on tient le double
// appui deux secondes, on pose l'appareil sur le bitume, on attend la
// réparation, on redécolle. À chaque étape on relit l'état, et l'on collecte
// la moindre exception. Un seul verdict : rien n'a été jeté, et la partie
// tourne encore à la fin.
//
//   node essais/appareils.mjs http://127.0.0.1:8123
// ---------------------------------------------------------------------------
import { chromium } from 'playwright';

const URL = process.argv[2] || 'https://pierremillon.github.io/fly-or-die/';
const EXEC = process.env.CHROMIUM || undefined;
const APPAREILS = ['bimoteur', 'intercepteur', 'pionnier', 'ancien', 'faucheur', 'lourd', 'essaim'];
const rate = [];

const navigateur = await chromium.launch({
  executablePath: EXEC,
  args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader']
});

for (const id of APPAREILS) {
  const contexte = await navigateur.newContext({
    viewport: { width: 430, height: 800 }, deviceScaleFactor: 1, hasTouch: true, isMobile: true
  });
  const page = await contexte.newPage();
  const erreurs = [];
  page.on('pageerror', e => erreurs.push(String(e).split('\n')[0]));
  page.on('console', m => {
    if (m.type() !== 'error') return;
    const t = m.text();
    if (/ERR_CERT|404|Failed to load resource/.test(t)) return;
    erreurs.push('console : ' + t.slice(0, 160));
  });
  // l'appareil et l'escouade sont lus au démarrage, dans le stockage
  await page.addInitScript((id) => {
    localStorage.setItem('fod_avion', id);
    localStorage.setItem('fod_escouade', JSON.stringify(['faucheur', 'ancien']));
    localStorage.setItem('fod_trouve', JSON.stringify({ refuge: 1 }));
  }, id);
  await page.goto(URL, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction('window.__fodReady === true', null, { timeout: 30000 });
  await page.click('#startBtn');
  await page.waitForTimeout(10000);

  const vol = await page.evaluate(() => {
    const s = window.__fod;
    return { running: s.running, wave: s.wave, alt: Math.round(s.pos.y), v: Math.round(s.speed),
             decollage: !!s.takeoff, suiveurs: (s.escouade || []).filter(a => a && a.mesh.visible).length };
  });
  const dit = (nom, ok, vu) => { if (!ok) rate.push(id + ' — ' + nom + ' — vu : ' + vu); };
  dit('la partie tourne', vol.running === true, vol.running);
  dit('le décollage est fini', vol.decollage === false, vol.decollage);
  dit('on est en l’air', vol.alt > 40, vol.alt + ' m');
  dit('une vague est là', vol.wave >= 1, 'vague ' + vol.wave);
  dit('les deux suiveurs volent', vol.suiveurs === 2, vol.suiveurs);

  // LE POUVOIR TENU : double appui à hauteur de l'avion, et le doigt reste
  const cible = await page.evaluate(() => ({ x: window.__fod.screenX, y: window.__fod.screenY }));
  const cdp = await contexte.newCDPSession(page);
  const x = Math.min(cible.x + 110, 420), y = Math.max(60, Math.min(cible.y, 700));
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await page.waitForTimeout(80);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
  await page.waitForTimeout(2000);
  const tenu = await page.evaluate(() => ({ pouvoir: window.__fod.pouvoir && window.__fod.pouvoir.id,
                                            courant: !!window.__fod.courant, v: Math.round(window.__fod.speed) }));
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await page.waitForTimeout(500);
  const attendu = { pionnier: 'surplace', intercepteur: 'salve', faucheur: 'nappe' }[id];
  if (attendu) dit('le pouvoir ' + attendu + ' est tenu', tenu.pouvoir === attendu, tenu.pouvoir);
  if (id === 'ancien') dit('le courant est tenu', tenu.courant === true, tenu.courant);

  // LE POSÉ, DANS LE SENS DU VENT. Le vent du jour choisit le seuil, et il
  // n'est pas lisible d'ici : on se présente d'abord vers le sud, et si le
  // tube n'a pas pris — il refuse un posé vent arrière, c'est voulu — on
  // revient par l'autre bout. Puis on attend les roues, au lieu d'un chrono :
  // un Faucheur à cent quarante roule bien plus loin qu'un Pionnier à
  // soixante-dix.
  const presente = async (sens) => {
    await page.evaluate((sens) => {
      const s = window.__fod;
      s.enemies.forEach(e => e.mesh.parent && e.mesh.parent.remove(e.mesh)); s.enemies.length = 0;
      s.waveTimer = 1e9; s.fig = null; s.spinT = 0; s.vrille = null; s.roulage = null; s.pose = null;
      s.pos.set(0, 40, sens < 0 ? 700 : -1300); s.yaw = sens < 0 ? 0 : Math.PI;
      s.pitch = -0.05; s.roll = 0; s.speed = 80;
    }, sens);
    await page.waitForTimeout(1500);
    return page.evaluate(() => !!window.__fod.assist);
  };
  let pris = await presente(-1);
  if (!pris) pris = await presente(1);
  dit('le tube a pris dans un des deux sens', pris, pris);
  let pose = null;
  for (let k = 0; k < 28 && !(pose && pose.pose); k++) {
    await page.waitForTimeout(500);
    pose = await page.evaluate(() => {
      const s = window.__fod;
      return { pose: !!s.pose, roulage: !!s.roulage, running: s.running, v: Math.round(s.speed), vie: Math.round(s.structure), alt: Math.round(s.pos.y) };
    });
  }
  dit('l’appareil est posé', pose.pose, JSON.stringify(pose));
  await page.waitForTimeout(3000);

  // LE REDÉCOLLAGE
  await page.evaluate(() => document.getElementById('redecoBtn').click());
  await page.waitForTimeout(8000);
  const fin = await page.evaluate(() => {
    const s = window.__fod;
    return { running: s.running, alt: Math.round(s.pos.y), decollage: !!s.takeoff, v: Math.round(s.speed) };
  });
  dit('il a redécollé', fin.running && !fin.decollage && fin.alt > 30, JSON.stringify(fin));
  dit('aucune erreur JavaScript', erreurs.length === 0, erreurs.slice(0, 3).join(' | ') || 'aucune');
  console.log((rate.some(r => r.startsWith(id + ' ')) ? '✗ ' : '✓ ') + id.padEnd(13)
    + ' vague ' + vol.wave + ', ' + vol.alt + ' m, suiveurs ' + vol.suiveurs
    + ', tenu ' + (tenu.pouvoir || (tenu.courant ? 'courant' : '—'))
    + ', posé ' + (pose.pose ? 'oui' : 'non') + ', redécollé ' + (fin.alt > 30 ? 'oui' : 'non')
    + (erreurs.length ? ', ERREURS ' + erreurs.length : ''));
  await contexte.close();
}
await navigateur.close();

if (rate.length) { console.log('\nRATÉ :\n  ' + rate.join('\n  ')); process.exit(1); }
console.log('\nles sept appareils font le tour complet sans une exception');
