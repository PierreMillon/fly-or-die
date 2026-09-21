// ---------------------------------------------------------------------------
// LE JEU DÉMARRE QUELLE QUE SOIT LA PARTIE SAUVEGARDÉE.
//
// Le défaut qui a donné cet essai : `avionOuvert` lit `decouvertes`, mais
// seulement pour un appareil qui n'est PAS libre — la condition commence par
// `a.acces === 'libre' ||`. Et `appliqueAvion()` tourne à l'initialisation, sur
// l'appareil sauvegardé.
//
// Donc : bimoteur, tout va bien ; Ancien ou Faucheur, la page reste noire. Un
// défaut qui attend que le joueur progresse pour se déclencher, invisible sur
// un banc qui démarre toujours d'une partie neuve. Aucun essai de chargement ne
// l'attrape si tous partent d'un stockage vide.
//
// On démarre donc le jeu dans chacun des états qu'une vraie partie peut laisser
// derrière elle.
//
//   node essais/sauvegardes.mjs http://127.0.0.1:8123
// ---------------------------------------------------------------------------
import { chromium } from 'playwright';

const URL = process.argv[2] || 'http://127.0.0.1:8123';
const CIEL = ['ourse', 'orion', 'berger', 'ciel_polaire', 'ciel_sirius',
              'ciel_cassio', 'ciel_pleiades', 'ciel_croix'];

const ETATS = [
  ['partie neuve',            {}],
  ['bimoteur',                { fod_avion: 'bimoteur' }],
  ['pionnier',                { fod_avion: 'pionnier' }],
  ['intercepteur après une légende',
                              { fod_avion: 'intercepteur', fod_carnet: JSON.stringify({ legendes: 1 }) }],
  ['l’Ancien, refuge trouvé', { fod_avion: 'ancien', fod_trouve: JSON.stringify({ refuge: true }) }],
  ['l’Ancien, refuge PAS trouvé',
                              { fod_avion: 'ancien' }],
  ['le Faucheur, ciel complet',
                              { fod_avion: 'faucheur',
                                fod_trouve: JSON.stringify(Object.fromEntries(CIEL.map(c => [c, true]))) }],
  ['le Faucheur, ciel incomplet',
                              { fod_avion: 'faucheur', fod_trouve: JSON.stringify({ ourse: true }) }],
  ['tout trouvé, Jeep ramenée, disque cassé',
                              { fod_avion: 'ancien', fod_jeep: '1', fod_disque: 'casse',
                                fod_lettre_n: '30',
                                fod_trouve: JSON.stringify(
                                  Object.fromEntries(CIEL.concat(['refuge', 'carte', 'guitare']).map(c => [c, true]))) }],
];

const rate = [];
const navigateur = await chromium.launch({
  executablePath: process.env.CHROMIUM || undefined,
  args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader']
});

for (const [nom, cles] of ETATS) {
  const ctx = await navigateur.newContext({ viewport: { width: 430, height: 600 },
                                            hasTouch: true, isMobile: true });
  const page = await ctx.newPage();
  const err = [];
  page.on('pageerror', e => err.push(String(e).split('\n')[0]));
  // on pose la sauvegarde AVANT que le module tourne
  await page.addInitScript(c => {
    try { for (const k in c) localStorage.setItem(k, c[k]); } catch (e) {}
  }, cles);
  let pret = false;
  await page.goto(URL, { waitUntil: 'commit' });
  try { await page.waitForFunction('window.__fodReady === true', null, { timeout: 25000 }); pret = true; }
  catch (e) {}
  const ok = pret && err.length === 0;
  console.log((ok ? '  ok   ' : '  RATÉ ') + nom.padEnd(44)
              + (ok ? 'démarre' : (err[0] || 'ne démarre pas').slice(0, 64)));
  if (!ok) rate.push(nom);
  await ctx.close();
}

await navigateur.close();
console.log('');
if (rate.length) { console.log(rate.length + ' sauvegarde(s) empêchent le jeu de démarrer.'); process.exit(1); }
console.log('Le jeu démarre depuis les ' + ETATS.length + ' sauvegardes.');
