// LES QUINZE TROUS, TRAVERSÉS POUR DE VRAI.
//
// Il passe le banc d'essai instrumenté (/tmp/tt/site), pas le dépôt : il a
// besoin de window.__dbg pour lire les arches, les tours et la carte.
//
// Deux fautes de ce banc m'ont fait croire deux fois à un bug du jeu, et il
// faut les avoir en tête : le cap pour voler vers -x est +PI/2 et non -PI/2,
// et l'axe de traversée est celui du bâtiment (son drapeau q), pas son plus
// petit côté — une tour est plus profonde (60) que sa fenêtre n'est large (45).

import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined,
  args:['--no-sandbox','--use-gl=swiftshader','--enable-unsafe-swiftshader'] });
const ctx = await b.newContext({ viewport:{width:430,height:760}, hasTouch:true, isMobile:true, serviceWorkers:'block' });
const p = await ctx.newPage();
const err=[]; p.on('pageerror', e=>err.push(String(e).split('\n')[0]));
await p.goto('http://127.0.0.1:8124/index.html');
await p.waitForFunction(() => window.__dbg);
await p.tap('#startBtn'); await p.waitForTimeout(900);
await p.evaluate(() => window.__dbg().decolle());
await p.waitForFunction(() => !document.body.classList.contains('accueil'), null, {timeout:15000});
await p.waitForTimeout(3000);
for (const V of [130, 200, 260]) {
  const r = await p.evaluate(async (V) => {
    const d = window.__dbg(), S = d.state, T = d.THREE;
    S.enemies.forEach(e=>e.mesh.parent&&e.mesh.parent.remove(e.mesh)); S.enemies.length=0;
    S.waveTimer = 1e9; S.takeoff = null; S.pose = null; S.roulage = null; S.assist = false;
    const img = () => new Promise(r => requestAnimationFrame(r));
    const out = [];
    // L'AXE DE TRAVERSÉE EST CELUI DU BÂTIMENT, PAS LE PLUS PETIT CÔTÉ.
    // Pour une tour, la profondeur (30) est plus grande que la demi-fenêtre
    // (22,5) : la règle « le plus petit côté est l'axe » se trompait, et mes
    // trois tours étaient comptées ratées alors qu'on ne les traversait pas.
    const traverse = async (nom, q, prise, quart) => {
      prise();
      const v0 = S.stats ? S.stats.passages : 0;
      // on se place 260 m avant le trou, dans son axe le plus mince
      const axeZ = !quart;
      const dep = axeZ ? new T.Vector3(q.x, (q.y0+q.y1)/2, q.z + 260)
                       : new T.Vector3(q.x + 260, (q.y0+q.y1)/2, q.z);
      S.pos.copy(dep);
      S.yaw = axeZ ? 0 : Math.PI / 2;   // +PI/2 regarde vers -x
      S.pitch = 0; S.roll = 0; S.speed = V;
      S.quat.setFromEuler(new T.Euler(0, S.yaw, 0));
      S.forward.set(0,0,-1).applyQuaternion(S.quat);
      S.fig = null; S.spinT = 0;
      d.aim.active = false;
      let n = 0;
      while (n++ < 240) {
        await img();
        const reste = axeZ ? (S.pos.z - q.z) : (S.pos.x - q.x);
        if (reste < -80) break;
      }
      const v1 = S.stats ? S.stats.passages : 0;
      return { nom, compte: v1 - v0 };
    };
    for (let i = 0; i < d.arches.length; i++) {
      const a = d.arches[i];
      out.push(await traverse('arche ' + i, a.passage, () => { a.prise = false; a.mort = false; }, !!(d.CARTE_arches[i] && d.CARTE_arches[i].q)));
    }
    for (let i = 0; i < d.tours.length; i++) {
      const t = d.tours[i];
      out.push(await traverse('tour ' + i, t.passage, () => { t.prise = false; t.mort = false; }, !!(d.CARTE_tours[i] && d.CARTE_tours[i].q)));
    }
    return out;
  }, V);
  const rates = r.filter(o => o.compte !== 1);
  console.log(V + ' m/s : ' + (r.length - rates.length) + '/' + r.length + ' comptés' +
    (rates.length ? '   RATÉS : ' + rates.map(o => o.nom + '=' + o.compte).join(', ') : ''));
}
console.log('erreurs', err.length?err.slice(0,3):'aucune');
await b.close();
