import { chromium } from '/tmp/tt/node_modules/playwright-core/index.mjs';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--use-gl=swiftshader','--enable-unsafe-swiftshader'] });

// L'ICONE EST UNE IMAGE DU JEU, prise par la camera du jeu. On ne force ni la
// position ni l'orientation : on monte haut, on incline doucement le manche
// comme un pouce le ferait, et on laisse le ressort de la camera se placer.
// Tout ce qu'on change, c'est ce que la camera REGARDE : le calque 1, ou l'on
// n'a mis que la maquette et les etoiles.
async function rends(taille, fov, sortie) {
  const p = await b.newPage({ viewport:{width:taille,height:taille}, deviceScaleFactor:1 });
  await p.goto('http://127.0.0.1:8123/index.html',{waitUntil:'networkidle'});
  await p.waitForFunction(()=>window.__dbg,{timeout:15000});
  await p.evaluate(()=>window.__dbg().decolle());
  await p.waitForTimeout(6500);
  await p.evaluate(()=>{
    const D = window.__dbg(), S = D.state;
    S.pos.set(0, 1800, 0); S.speed = 120; S.vrille = null; S.takeoff = null;
    S.enemies.forEach(e => e.hp = 0);
    // le manche legerement a droite : l'avion s'incline tout seul, comme en vol
    D.aim.x = window.innerWidth / 2 + window.innerWidth * 0.10;
    D.aim.y = window.innerHeight / 2 - window.innerHeight * 0.03;
  });
  await p.waitForTimeout(2600);            // le ressort se place
  const info = await p.evaluate((fov) => {
    const D = window.__dbg(), S = D.state, sc = D.camera.parent;
    // le calque 1 : la maquette et les etoiles, rien d'autre
    let n = 0;
    for (const o of sc.children) {
      if (o.isPoints) { o.layers.enable(1); n++; continue; }
      if (o.isCamera || !o.position) continue;
      if (o.position.distanceTo(S.pos) < 60) { o.traverse(c => c.layers.enable(1)); n++; }
    }
    D.camera.layers.set(1);
    D.camera.fov = fov; D.camera.updateProjectionMatrix();
    // on gele tout : plus une image de simulation, la camera reste ou elle est
    S.speed = 0; S.paused = true;
    const scn = document.getElementById('scene');
    for (const e of Array.from(document.body.children)) if (!e.contains(scn)) e.style.display = 'none';
    for (const e of document.querySelectorAll('canvas')) if (e.id !== 'scene') e.style.display = 'none';
    // LA MAQUETTE AU MILIEU DU CARRE. En vol elle est volontairement BASSE
    // dans l'image — on regarde devant, pas l'avion. Dans une icone carree ce
    // decalage devient un vide en haut. La camera garde exactement sa place —
    // c'est bien le point de vue du jeu — et ne fait que viser la maquette.
    // ON VISE UN PEU AU-DESSUS. Vise pile, la maquette est au milieu et les
    // deux tiers bas du carre sont vides : les etoiles ne vivent que dans
    // l'hemisphere haut depuis qu'il n'y a plus de reflet sous l'horizon. En
    // visant six metres plus haut, l'avion descend d'un cran dans le cadre et
    // le ciel prend la place qu'il lui restait — c'est aussi, exactement, le
    // cadrage du jeu.
    D.camera.lookAt(S.pos.clone().add(new (S.pos.constructor)(0, 1.8, 0)));
    D.camera.updateMatrixWorld(true);
    const v = S.pos.clone().project(D.camera);
    return { calque1: n, ndc: [+v.x.toFixed(2), +v.y.toFixed(2), +v.z.toFixed(3)] };
  }, fov);
  await p.waitForTimeout(900);
  await p.locator('#scene').screenshot({ path: sortie });
  await p.close();
  return info;
}
console.log('512 :', JSON.stringify(await rends(512, 40, '/tmp/tt/ico-512.png')));
await rends(192, 40, '/tmp/tt/ico-192.png');
await rends(180, 40, '/tmp/tt/ico-180.png');
await rends(512, 60, '/tmp/tt/ico-512-masque.png');
console.log('rendus faits');
await b.close();
