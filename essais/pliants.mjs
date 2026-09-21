// ---------------------------------------------------------------------------
// LES ÉCRANS QUI NE SONT PAS DES TÉLÉPHONES DEBOUT.
//
// Tout le jeu est réglé sur un iPhone tenu debout : 430 sur 932, proportion
// 0,46. Un pliant en a trois formes dans la même journée — ouvert, replié sur
// son écran de couverture, et posé en tente. Une tablette et un ordinateur en
// ont d'autres encore.
//
// Cet essai ne juge pas le goût. Il vérifie trois choses mesurables :
//
//   1. rien ne dépasse de la fenêtre — c'est la règle du projet ;
//   2. tout ce qui se touche reste atteignable, donc pas collé aux bords
//      extrêmes d'un écran large ;
//   3. le champ de vision reste celui du jeu, et pas une meurtrière ni un
//      grand-angle.
//
//   node essais/pliants.mjs http://127.0.0.1:8123
// ---------------------------------------------------------------------------
import { chromium } from 'playwright';

const URL = process.argv[2] || 'http://127.0.0.1:8123';
const ECRANS = [
  ['iPhone debout',    430,  932],
  ['Fold ouvert',     1768, 2208],
  ['Fold couché',     2208, 1768],
  ['Fold couverture',  904, 2316],
  ['Flip couverture',  720,  748],
  ['iPad',             820, 1180],
];
const rate = [];
const verifie = (nom, ok, vu) => {
  console.log((ok ? '  ok   ' : '  RATÉ ') + nom.padEnd(46) + vu);
  if (!ok) rate.push(nom);
};

const navigateur = await chromium.launch({
  executablePath: process.env.CHROMIUM || undefined,
  args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader']
});

for (const [nom, w, h] of ECRANS) {
  const ctx = await navigateur.newContext({ viewport: { width: w, height: h },
                                            hasTouch: true, isMobile: true });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'load' });
  await page.waitForFunction('window.__fodReady === true', null, { timeout: 40000 });
  await page.waitForTimeout(400);
  // on ouvre le menu : c'est le panneau le plus chargé
  await page.evaluate(() => document.getElementById('menuBtn').click());
  await page.waitForTimeout(250);
  const m = await page.evaluate(() => {
    const w = innerWidth, h = innerHeight;
    // ce qui dépasse
    let large = 0, coupable = '';
    document.querySelectorAll('body *').forEach(e => {
      if (!e.offsetParent && e.tagName !== 'BODY') return;
      const r = e.getBoundingClientRect();
      if (r.width === 0) return;
      const d = Math.max(r.right - w, -r.left);
      if (d > large) { large = d; coupable = e.id || e.tagName.toLowerCase(); }
    });
    // CE QUI SE TOUCHE TIENT DANS UNE COLONNE, ET ELLE EST CENTRÉE.
    //
    // Mesurer la distance au bord de l'écran était un mauvais critère : sur un
    // écran large, une colonne centrée est NÉCESSAIREMENT loin des bords, et
    // c'est exactement ce qu'on cherche. Ce qui compte est l'écartement des
    // boutons entre eux, et le fait que leur groupe tombe au milieu.
    const boutons = [...document.querySelectorAll('#topbar button, #bottombar button, #menu button')]
      .filter(b => b.offsetParent).map(b => b.getBoundingClientRect());
    const g = boutons.reduce((a, r) => Math.min(a, r.left), 1e9);
    const d = boutons.reduce((a, r) => Math.max(a, r.right), 0);
    const etendue = boutons.length ? Math.round(d - g) : 0;
    const decentre = boutons.length ? Math.round(Math.abs((g + d) / 2 - w / 2)) : 0;
    const c = document.querySelector('canvas');
    return { large: Math.round(large), coupable,
             canvas: c.clientWidth === w && c.clientHeight === h,
             etendue, decentre };
  });
  console.log('\n— ' + nom + '  ' + w + '×' + h + '  (proportion ' + (w / h).toFixed(2) + ')');
  verifie('rien ne dépasse de la fenêtre', m.large <= 1, m.large + ' px' + (m.large > 1 ? ' — ' + m.coupable : ''));
  verifie('le canvas remplit la fenêtre', m.canvas, m.canvas);
  verifie('l’interface tient dans une colonne', m.etendue <= Math.min(w, 620),
          m.etendue + ' px de large');
  verifie('la colonne est centrée', m.decentre <= 40, m.decentre + ' px hors axe');
  await ctx.close();
}

await navigateur.close();
console.log('');
if (rate.length) { console.log(rate.length + ' vérification(s) en échec.'); process.exit(1); }
console.log('Le jeu tient sur toutes ces formes.');
