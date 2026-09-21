// ---------------------------------------------------------------------------
// LE DÉMARRAGE, SUR UN LIEN MÉDIOCRE ET SUR UNE VRAIE PANNE.
//
// Deux questions, et elles sont opposées :
//
//   1. sur un lien lent mais SAIN, le jeu doit se taire et attendre. Il ne doit
//      jamais annoncer une panne : l'écran d'erreur propose de recharger, et
//      recharger relance trois mégaoctets depuis zéro.
//   2. sur une VRAIE panne, il doit le dire tout de suite, et dire QUOI.
//
// Le filet d'avant se trompait dans les deux sens : mesuré, il accusait
// three.js à 10,5 s sur une 3G honnête où tout arrivait en 32 s, et il
// restait muet sur le nom du fichier vraiment fautif.
//
//   node essais/demarrage.mjs http://127.0.0.1:8123
// ---------------------------------------------------------------------------
import { chromium } from 'playwright';

const URL = process.argv[2] || 'http://127.0.0.1:8123';
const rate = [];
const verifie = (nom, ok, vu) => {
  console.log((ok ? '  ok   ' : '  RATÉ ') + nom.padEnd(54) + vu);
  if (!ok) rate.push(nom);
};

const navigateur = await chromium.launch({
  executablePath: process.env.CHROMIUM || undefined,
  args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader']
});

// --- 1. un lien lent, mais sain ---------------------------------------------
const lent = async (nom, debit, latence) => {
  const ctx = await navigateur.newContext({ viewport: { width: 430, height: 600 },
                                            hasTouch: true, isMobile: true });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions',
    { offline: false, latency: latence, downloadThroughput: debit / 8, uploadThroughput: debit / 8 });
  const t0 = Date.now();
  let faussePanne = null, pret = null;
  page.goto(URL, { waitUntil: 'commit' }).catch(() => {});
  while (Date.now() - t0 < 90000 && pret === null) {
    await new Promise(r => setTimeout(r, 400));
    const e = await page.evaluate(() => ({
      pret: !!window.__fodReady,
      bouton: (document.getElementById('startBtn') || {}).textContent || ''
    })).catch(() => ({ pret: false, bouton: '' }));
    if (/RECHARGER/i.test(e.bouton) && faussePanne === null)
      faussePanne = ((Date.now() - t0) / 1000).toFixed(1);
    if (e.pret) pret = ((Date.now() - t0) / 1000).toFixed(1);
  }
  await ctx.close();
  verifie('lien « ' + nom + ' » : aucune fausse panne', faussePanne === null,
          'prêt à ' + (pret || '>90') + ' s' + (faussePanne ? ', accusé à tort à ' + faussePanne + ' s' : ''));
};
await lent('3G honnête', 800000, 80);
await lent('3G lente', 400000, 200);

// --- 2. une vraie panne : three.js injoignable -------------------------------
{
  const ctx = await navigateur.newContext({ viewport: { width: 430, height: 600 },
                                            hasTouch: true, isMobile: true });
  const page = await ctx.newPage();
  await ctx.route('**/three.core.js', r => r.abort());
  await page.goto(URL, { waitUntil: 'commit' }).catch(() => {});
  await page.waitForTimeout(6000);
  const vu = await page.evaluate(() => ({
    texte: (document.getElementById('overlayText') || {}).textContent || '',
    bouton: (document.getElementById('startBtn') || {}).textContent || '',
    erreurs: (window.__boot || {}).erreurs || []
  }));
  verifie('vraie panne : elle est annoncée', /RECHARGER/i.test(vu.bouton), vu.bouton);
  verifie('vraie panne : le fichier fautif est nommé',
          /three\.core|three\.module/.test(vu.texte + vu.erreurs.join(' ')),
          (vu.erreurs[0] || vu.texte).slice(0, 60));
  verifie('vraie panne : on n’accuse plus la connexion à l’aveugle',
          !/V.rifie la connexion/i.test(vu.texte), vu.texte.slice(0, 48));
  await ctx.close();
}

await navigateur.close();
console.log('');
if (rate.length) { console.log(rate.length + ' vérification(s) en échec.'); process.exit(1); }
console.log('Le démarrage se tait quand il faut et parle quand il faut.');
