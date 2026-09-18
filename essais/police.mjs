// ---------------------------------------------------------------------------
// LA POLICE, Y COMPRIS SANS RÉSEAU.
//
// C'est le seul essai du projet qui coupe le réseau. Il vérifie trois choses :
//
//   1. la police est bien celle du jeu, et pas celle du téléphone ;
//   2. rien n'est demandé à un tiers — plus une seule requête vers Google ;
//   3. et SURTOUT : après installation, réseau coupé, rechargement, le jeu a
//      exactement la même tête. C'est le cas d'usage d'un jeu installable, et
//      c'était le seul endroit où il cassait.
//
//   node essais/police.mjs http://127.0.0.1:8123
// ---------------------------------------------------------------------------
import { chromium } from 'playwright';

const URL = process.argv[2] || 'https://pierremillon.github.io/fly-or-die/';
const rate = [];
const verifie = (nom, ok, vu) => {
  console.log((ok ? '  ok   ' : '  RATÉ ') + nom.padEnd(52) + vu);
  if (!ok) rate.push(nom);
};


// ---------------------------------------------------------------------------
// COMMENT ON SAIT VRAIMENT SI LA POLICE EST LÀ.
//
// `document.fonts.check('16px "IBM Plex Mono"')` renvoie VRAI quand la famille
// est inconnue : le texte reste affichable avec une police système, donc la
// question « peux-tu rendre ce texte » a une réponse positive. Elle ne dit
// rien de la police qu'on voulait. Mon premier essai mesurait ça, et donnait
// « tout va bien » sur une version où Google était coupé.
//
// On regarde donc les fontes DÉCLARÉES et leur état, et on mesure la largeur
// d'une chaîne rendue : une police absente tombe sur la monospace du système,
// qui n'a pas les mêmes chasses.
// ---------------------------------------------------------------------------
const SONDE = () => {
  const faces = [...document.fonts].filter(f => /IBM Plex Mono/.test(f.family));
  const c = document.createElement('canvas').getContext('2d');
  const large = (p) => { c.font = p; return Math.round(c.measureText('MW0123456789ilj').width * 100) / 100; };
  const plex = large('16px "IBM Plex Mono", ui-monospace, monospace');
  const systeme = large('16px ui-monospace, monospace');
  const serif = large('16px serif');
  return { declarees: faces.length,
           chargees: faces.filter(f => f.status === 'loaded').length,
           largePlex: plex, largeSysteme: systeme, largeSerif: serif,
           // si la police du jeu est là, la chaîne ne mesure pas comme une serif
           distincte: Math.abs(plex - serif) > 0.5 };
};

const navigateur = await chromium.launch({
  executablePath: process.env.CHROMIUM || undefined,
  args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader']
});
const contexte = await navigateur.newContext({
  viewport: { width: 430, height: 600 }, hasTouch: true, isMobile: true
});
const page = await contexte.newPage();

const tiers = [];
page.on('request', r => {
  const u = r.url();
  if (!u.startsWith(URL) && !u.startsWith('data:') && !u.startsWith('blob:')) tiers.push(u);
});

await page.goto(URL, { waitUntil: 'load' });
await page.waitForFunction('window.__fodReady === true', null, { timeout: 30000 });
await page.evaluate(() => document.fonts.ready);

const avec = await page.evaluate(SONDE);
// LA MESURE QUI TRANCHE : la largeur d'une chaîne rendue dans la police du jeu
// contre la même chaîne dans la monospace du système. Si la police manque, la
// première tombe sur la seconde et les deux nombres sont égaux. Rien d'autre ne
// le dit de façon fiable — surtout pas document.fonts, qui n'énumère pas les
// fontes déclarées dans une feuille de style d'une autre origine.
verifie('la police du jeu est celle qui rend', avec.largePlex !== avec.largeSysteme,
        avec.largePlex + ' contre ' + avec.largeSysteme + ' pour le système');
verifie('les quatre fichiers sont chez nous', avec.declarees === 4, avec.declarees);
verifie('aucune requête vers un tiers', tiers.length === 0, tiers.slice(0, 2).join(' ') || 'aucune');

// ---- et maintenant, sans réseau --------------------------------------------
await page.evaluate(() => navigator.serviceWorker.ready);
await page.waitForTimeout(2500);          // le socle finit de se mettre en cache
await contexte.setOffline(true);

const page2 = await contexte.newPage();
let horsLigne = { ouvert: false, declarees: 0, chargees: 0 };
try {
  await page2.goto(URL, { waitUntil: 'load', timeout: 20000 });
  await page2.waitForFunction('window.__fodReady === true', null, { timeout: 30000 });
  await page2.evaluate(() => document.fonts.ready);
  horsLigne = Object.assign({ ouvert: true }, await page2.evaluate(SONDE));
} catch (e) {
  horsLigne.erreur = String(e).split('\n')[0];
}
verifie('le jeu s’ouvre sans réseau', horsLigne.ouvert, horsLigne.ouvert || horsLigne.erreur);
verifie('la police du jeu rend encore sans réseau',
        horsLigne.largePlex !== undefined && horsLigne.largePlex !== horsLigne.largeSysteme,
        horsLigne.largePlex + ' contre ' + horsLigne.largeSysteme);

await contexte.setOffline(false);

// ---- et enfin : Google injoignable, navigateur neuf -------------------------
//
// C'est le vrai cas de panne, et il est plus étroit qu'il n'y paraît. Au
// rechargement, même hors réseau, le navigateur ressort la police de son propre
// cache HTTP : elle a l'air d'être là. Elle ne l'est plus dès que ce cache est
// vidé, ou dès que le réseau laisse passer le jeu mais pas Google — un réseau
// d'entreprise, un pays qui filtre, un bloqueur. Là, le jeu s'ouvre, et le texte
// tombe sur la police du téléphone.
const neuf = await navigateur.newContext({
  viewport: { width: 430, height: 600 }, hasTouch: true, isMobile: true
});
await neuf.route('**://fonts.googleapis.com/**', r => r.abort());
await neuf.route('**://fonts.gstatic.com/**', r => r.abort());
const page3 = await neuf.newPage();
let bloque = { declarees: 0, chargees: 0 };
try {
  await page3.goto(URL, { waitUntil: 'load', timeout: 20000 });
  await page3.waitForFunction('window.__fodReady === true', null, { timeout: 30000 });
  await page3.evaluate(() => document.fonts.ready);
  bloque = await page3.evaluate(SONDE);
} catch (e) { bloque.erreur = String(e).split('\n')[0]; }
verifie('la police tient même si Google est bloqué',
        bloque.largePlex !== undefined && bloque.largePlex !== bloque.largeSysteme,
        bloque.largePlex + ' contre ' + bloque.largeSysteme
        + (bloque.erreur ? ' — ' + bloque.erreur : ''));

await navigateur.close();

console.log('');
if (rate.length) { console.log(rate.length + ' vérification(s) en échec.'); process.exit(1); }
console.log('La police est la même partout, réseau ou pas.');
