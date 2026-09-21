// ---------------------------------------------------------------------------
// LA COUCHE QUI COUPE LES GESTES DU SYSTÈME NE DOIT RIEN COUPER D'AUTRE.
//
// Sur la surface de jeu on appelle `preventDefault()` : c'est la seule chose
// qui arrête la loupe de l'iPhone. Partout ailleurs, il ne faut surtout pas —
// sinon la lettre cesse de défiler et les boutons cessent de répondre.
//
// La loupe elle-même n'est pas vérifiable ici : c'est un élément du système
// iOS, aucun navigateur de ce banc ne la produit. Ce qui est vérifiable, et
// c'est ce qui casse en pratique, c'est la non-régression.
//
//   node essais/gestes.mjs http://127.0.0.1:8123
// ---------------------------------------------------------------------------
import { chromium } from 'playwright';

const URL = process.argv[2] || 'http://127.0.0.1:8123';
const rate = [];
const verifie = (nom, ok, vu) => {
  console.log((ok ? '  ok   ' : '  RATÉ ') + nom.padEnd(50) + vu);
  if (!ok) rate.push(nom);
};

const navigateur = await chromium.launch({
  executablePath: process.env.CHROMIUM || undefined,
  args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader']
});
const ctx = await navigateur.newContext({ viewport: { width: 430, height: 600 },
                                          hasTouch: true, isMobile: true });
const page = await ctx.newPage();
const err = [];
page.on('pageerror', e => err.push(String(e).split('\n')[0]));
await page.goto(URL, { waitUntil: 'load' });
await page.waitForFunction('window.__fodReady === true', null, { timeout: 40000 });

// ---- 1. sur le jeu, le geste est coupé --------------------------------------
{
  const r = await page.evaluate(() => {
    const e = new TouchEvent('touchstart', { bubbles: true, cancelable: true });
    document.querySelector('canvas').dispatchEvent(e);
    return e.defaultPrevented;
  });
  verifie('sur la surface de jeu, le geste est coupé', r, r);
}
// ---- 2. sur un bouton, il ne l'est pas --------------------------------------
{
  const r = await page.evaluate(() => {
    const e = new TouchEvent('touchstart', { bubbles: true, cancelable: true });
    document.getElementById('startBtn').dispatchEvent(e);
    return e.defaultPrevented;
  });
  verifie('sur un bouton, le geste passe', !r, r ? 'coupé' : 'passe');
}
// ---- 3. le bouton répond toujours -------------------------------------------
{
  await page.tap('#startBtn');
  await page.waitForTimeout(1200);
  const enJeu = await page.evaluate(() => !!window.__fod.running);
  verifie('DÉCOLLER répond au doigt', enJeu, enJeu);
}
// ---- 4. la lettre défile toujours sous le doigt -----------------------------
{
  const r = await page.evaluate(async () => {
    const pan = document.getElementById('lettre');
    const f = pan.querySelector('.feuille');
    pan.hidden = false;
    document.getElementById('lettreTxt').textContent =
      new Array(60).fill('Une ligne de la lettre qui prend de la place.').join('\n');
    await new Promise(r => requestAnimationFrame(r));
    const e = new TouchEvent('touchmove', { bubbles: true, cancelable: true });
    f.firstElementChild.dispatchEvent(e);
    const coupe = e.defaultPrevented;
    f.scrollTop = 120;
    const defile = f.scrollTop > 0;
    pan.hidden = true;
    return { coupe, defile, hauteur: f.scrollHeight };
  });
  verifie('sur la lettre, le geste passe', !r.coupe, r.coupe ? 'coupé' : 'passe');
  verifie('la lettre défile', r.defile, r.defile);
}
verifie('aucune erreur', err.length === 0, err[0] || 'aucune');

await navigateur.close();
console.log('');
if (rate.length) { console.log(rate.length + ' vérification(s) en échec.'); process.exit(1); }
console.log('Les gestes du système sont coupés sur le jeu, et nulle part ailleurs.');
