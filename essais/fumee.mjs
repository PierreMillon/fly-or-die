// ---------------------------------------------------------------------------
// LE TEST DE FUMÉE.
//
// Il ne vérifie pas que le jeu est bon. Il vérifie qu'il n'est pas MORT : la
// page se charge, le moteur démarre, on décolle, une vague arrive, le score
// monte, et rien n'a été jeté dans la console. C'est le minimum qu'on veut
// savoir avant de pousser une version, et c'est exactement ce qu'on oublie de
// regarder quand on est pressé.
//
//   node essais/fumee.mjs                  → teste la version en ligne
//   node essais/fumee.mjs http://…:8123    → teste une version locale
//
// Il faut Playwright :  npm i -D playwright  (puis npx playwright install chromium)
// ---------------------------------------------------------------------------
import { chromium } from 'playwright';

const URL = process.argv[2] || 'https://pierremillon.github.io/fly-or-die/';
const EXEC = process.env.CHROMIUM || undefined;   // chemin d'un Chromium déjà présent

const attendus = [];
const rate = [];
const verifie = (nom, ok, vu) => {
  attendus.push({ nom, ok, vu });
  if (!ok) rate.push(nom + ' — vu : ' + vu);
};

const navigateur = await chromium.launch({
  executablePath: EXEC,
  args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader']
});
const page = await navigateur.newPage({
  viewport: { width: 430, height: 600 }, deviceScaleFactor: 1,
  hasTouch: true, isMobile: true
});

// LES ERREURS DE PAGE SONT LE VRAI SUJET. Une exception dans la boucle de rendu
// ne se voit pas : l'image se fige et le jeu a l'air lent. On les collecte.
const erreurs = [];
page.on('pageerror', e => erreurs.push(String(e).split('\n')[0]));
page.on('console', m => {
  if (m.type() !== 'error') return;
  const t = m.text();
  // les 404 de ressources facultatives et le certificat du mandataire d'essai
  // ne disent rien du jeu
  if (/ERR_CERT|404|Failed to load resource/.test(t)) return;
  erreurs.push('console : ' + t.slice(0, 160));
});

await page.goto(URL, { waitUntil: 'domcontentloaded' });
await page.waitForFunction('window.__fodReady === true', null, { timeout: 30000 });
verifie('le moteur est prêt', true, 'oui');

// l'état est exposé : c'est la condition de tout le reste
const expose = await page.evaluate(() => !!window.__fod);
verifie('window.__fod est exposé', expose, expose);

await page.click('#startBtn');
await page.waitForTimeout(9000);

const e = await page.evaluate(() => {
  const s = window.__fod;
  return {
    running: s.running, wave: s.wave, score: Math.round(s.score),
    structure: Math.round(s.structure),
    altitude: Math.round(s.pos.y), vitesse: Math.round(s.speed),
    ennemis: s.enemies.length, decollage: !!s.takeoff
  };
});

verifie('la partie tourne', e.running === true, e.running);
verifie('le décollage est fini', e.decollage === false, e.decollage);
verifie('on est en l’air', e.altitude > 60, e.altitude + ' m');
verifie('on vole', e.vitesse > 40, e.vitesse + ' m/s');
verifie('la première vague est lancée', e.wave >= 1, 'vague ' + e.wave);
verifie('la structure est entière ou presque', e.structure > 50, e.structure);
verifie('aucune erreur JavaScript', erreurs.length === 0, erreurs.slice(0, 3).join(' | ') || 'aucune');

await navigateur.close();

const large = Math.max(...attendus.map(a => a.nom.length));
for (const a of attendus)
  console.log((a.ok ? '  ok   ' : '  RATÉ ') + a.nom.padEnd(large + 2) + a.vu);
console.log('');
if (rate.length) {
  console.log(rate.length + ' vérification(s) en échec.');
  process.exit(1);
}
console.log('Le jeu démarre, vole, et ne jette rien. ' + attendus.length + ' vérifications.');
