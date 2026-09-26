// ---------------------------------------------------------------------------
// LES CALCULS, VÉRIFIÉS SANS NAVIGATEUR.
//
// math.js ne connaît ni l'écran, ni three.js, ni l'état de la partie : il tourne
// sous node nu, en quelques millisecondes, et ce sont les seuls essais du projet
// qui n'ont besoin de rien.
//
//   node essais/math.mjs
// ---------------------------------------------------------------------------
import * as M from '../math.js';

const rate = [];
let n = 0;
const vaut = (nom, vu, attendu, tol = 1e-9) => {
  n++;
  const ok = typeof attendu === 'number' ? Math.abs(vu - attendu) <= tol : vu === attendu;
  console.log((ok ? '  ok   ' : '  RATÉ ') + nom.padEnd(52) + vu);
  if (!ok) rate.push(nom + ' — attendu ' + attendu + ', vu ' + vu);
};

// ---- le relief -------------------------------------------------------------
// La ville est plate jusqu'à TERRAIN_R0, et le dehors l'est de nouveau au-delà
// de TERRAIN_R3. C'est ce qui garantit qu'un terrain d'aviation est posé à plat.
vaut('sol au centre du monde', M.hauteurSol(0, 0), 0);
vaut('sol au bord de la ville', M.hauteurSol(0, -M.TERRAIN_R0), 0);
vaut('sol au-delà de la chaîne', M.hauteurSol(0, -M.TERRAIN_R3), 0);
vaut('sol au refuge, à 32 km', M.hauteurSol(-32000, 0), 0);
// Le relief existe entre les deux, et il ne dépasse jamais TERRAIN_H.
{
  let haut = 0, bas = 1e9;
  for (let a = 0; a < 6.28; a += 0.013)
    for (let r = M.TERRAIN_R0; r <= M.TERRAIN_R3; r += 37) {
      const h = M.hauteurSol(Math.cos(a) * r, Math.sin(a) * r);
      if (h > haut) haut = h;
      if (h < bas) bas = h;
    }
  vaut('le relief ne perce jamais le plafond', haut <= M.TERRAIN_H, true);
  vaut('le relief ne passe jamais sous zéro', bas >= 0, true);
  vaut('la chaîne monte vraiment (plus de 300 m)', haut > 300, true);
}
// Déterministe : c'est ce qui permet aux traits et au remplissage noir d'être
// exactement la même surface. Si ça cesse d'être vrai, le sol redevient troué.
vaut('deux appels au même endroit donnent le même sol',
     M.hauteurSol(1234, -5678) === M.hauteurSol(1234, -5678), true);

// ---- le tube d'approche ----------------------------------------------------
vaut('rayon du tube au toucher', M.tubeRayon(0), M.TUBE_R1);
vaut('rayon du tube à la bouche', M.tubeRayon(M.TUBE_DIST), M.TUBE_R0);
vaut('rayon du tube au-delà de la bouche', M.tubeRayon(1e6), M.TUBE_R0);
vaut('rayon du tube en arrière', M.tubeRayon(-500), M.TUBE_R1);
vaut('le tube se resserre en approchant', M.tubeRayon(900) < M.tubeRayon(1800), true);
vaut('hauteur de l’axe au toucher', M.tubeHaut(0), M.PISTE.y);
// trois degrés sur mille mètres font 52,4 mètres : c'est la pente d'un plan de
// descente réel, et c'est ce que le PAPI peint au sol
vaut('pente à mille mètres', M.tubeHaut(1000) - M.PISTE.y, 52.407779, 1e-5);

// ---- le point visé ---------------------------------------------------------
// La piste principale fait 1160 m ; on touche 60 m après le seuil, donc 520 m
// en amont de son centre. C'est ce nombre qui décide de tout l'atterrissage.
vaut('point visé sur la piste principale', M.viseDe({ long: 1160 }), 480);   // 580 - 100 : la zone de toucher
vaut('point visé sur une bande courte', M.viseDe({ long: 180 }), 40);
vaut('cap d’atterrissage, sens nord', M.capPiste({ cap: 0 }, -1), 0);
vaut('cap d’atterrissage, sens sud', M.capPiste({ cap: 0 }, 1), Math.PI);

// ---- la borne ---------------------------------------------------------------
vaut('borne en dessous', M.borne(-3, 0, 1), 0);
vaut('borne au-dessus', M.borne(9, 0, 1), 1);
vaut('borne dedans', M.borne(0.4, 0, 1), 0.4);

console.log('');
if (rate.length) { console.log(rate.length + ' vérification(s) en échec.'); process.exit(1); }
console.log('Les ' + n + ' calculs purs sont justes.');
