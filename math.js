// @ts-check
// ---------------------------------------------------------------------------
// FLY OR DIE — LES CALCULS PURS.
//
// Ce qui est ici ne connaît ni l'écran, ni le son, ni l'état de la partie, ni
// three.js : mêmes entrées, mêmes sorties, toujours. C'est la seule partie du
// jeu qui se vérifie sur un papier, et donc la seule qui se teste sans ouvrir
// un navigateur — voir essais/math.mjs.
//
// Tout le reste du jeu dépend de l'état courant d'une manière ou d'une autre.
// `seuilLock`, par exemple, a l'air d'un calcul : elle lit en réalité l'état du
// tonneau, l'éblouissement et trois découvertes. Elle n'a rien à faire ici, et
// c'est précisément la distinction que ce fichier rend visible.
// ---------------------------------------------------------------------------

/** Ramène une valeur entre deux bornes. three.js en a une ; on ne va pas
 *  charger un moteur 3D pour ça, et ce fichier doit tourner sous node nu.
 *  @param {number} v @param {number} a @param {number} b @returns {number} */
export const borne = (v, a, b) => v < a ? a : v > b ? b : v;

// ---------------------------------------------------------------------------
// LE RELIEF
// ---------------------------------------------------------------------------
export const TERRAIN_R0 = 2400;      // jusque-là, parfaitement plat : c'est la ville
export const TERRAIN_R1 = 5600;      // là, le relief est à pleine amplitude
export const TERRAIN_R2 = 7200;      // fin du plateau montagneux
export const TERRAIN_R3 = 8800;      // au-delà, plat de nouveau : la plaine du dehors
export const TERRAIN_H  = 980;       // mètres de dénivelé au plus fort

// ---------------------------------------------------------------------------
// LE PLATEAU DU SOMMET.
//
// Sur le cap du refuge, à six kilomètres sept cent cinquante, le relief monte
// à huit cent quatre-vingt-quinze mètres : c'est le plus haut point de la
// chaîne dans cette direction, et il est à un demi-degré de l'axe exact. On y
// arase un disque de cent vingt mètres, raccordé au relief par une jupe de
// soixante-dix : de loin c'est une table posée sur la montagne, et de près
// c'est un endroit où l'on peut vraiment passer à ras.
//
// Ce n'est pas de la décoration. Le sol du jeu est une fonction, une seule :
// la grille des traits, le remplissage noir, le plancher des adversaires et
// la collision la lisent tous. Aplatir ICI aplatit partout à la fois, et rien
// ne peut se désaccorder.
// ---------------------------------------------------------------------------
export const SOMMET = { x: -6755, z: 60, y: 895, r: 120, jupe: 70 };

/** L'altitude du sol en un point du monde. Déterministe : deux appels au même
 *  endroit rendent le même nombre, et c'est ce qui permet à la grille des
 *  traits et au remplissage noir d'être exactement la même surface.
 *  @param {number} x @param {number} z @returns {number} mètres */
export function hauteurSol(x, z) {
  const d = Math.hypot(x, z);
  if (d <= TERRAIN_R0 || d >= TERRAIN_R3) return 0;
  // une enveloppe en cloche : elle monte de R0 à R1, tient jusqu'à R2, puis
  // retombe jusqu'à R3. Les deux flancs sont lissés de la même façon, donc
  // aucune cassure ni d'un côté ni de l'autre.
  let k;
  if (d < TERRAIN_R1) k = (d - TERRAIN_R0) / (TERRAIN_R1 - TERRAIN_R0);
  else if (d <= TERRAIN_R2) k = 1;
  else k = 1 - (d - TERRAIN_R2) / (TERRAIN_R3 - TERRAIN_R2);
  if (k > 1) k = 1; else if (k < 0) k = 0;
  k = k * k * (3 - 2 * k);                        // montée douce, sans cassure
  const n = Math.sin(x / 640) * Math.cos(z / 517)
          + 0.55 * Math.sin(x / 263 + 1.7) * Math.cos(z / 311 - 0.4)
          + 0.28 * Math.sin((x + z) / 149 + 2.6);
  // ramené dans 0..1 puis creusé : des vallées larges et des crêtes franches
  const u = (n / 1.83 + 1) / 2;
  let h = k * TERRAIN_H * u * u;
  // et le plateau, arasé net puis raccordé
  const dd = Math.hypot(x - SOMMET.x, z - SOMMET.z);
  if (dd < SOMMET.r + SOMMET.jupe) {
    const t = borne((SOMMET.r + SOMMET.jupe - dd) / SOMMET.jupe, 0, 1);
    h += (SOMMET.y - h) * (t * t * (3 - 2 * t));
  }
  return h;
}

// ---------------------------------------------------------------------------
// LA PISTE ET LE TUBE D'APPROCHE
// ---------------------------------------------------------------------------
export const PISTE = {
  demiL: 23,        // demi-largeur
  z0: 260,          // seuil arrière, derrière l'avion
  z1: -900,         // seuil avant
  y: 0.7            // juste au-dessus de la grille, pour ne pas cligner avec elle
};

export const PENTE_CIBLE = 3 * Math.PI / 180;
export const TOUCHER_APRES = 60;     // mètres après le seuil : le point que vise le tube
export const TUBE_DIST = 1800;       // longueur du couloir, depuis le point visé
export const TUBE_R0 = 190;          // rayon à l'entrée
// LE BOUT DE L'ENTONNOIR ÉTAIT TROP ÉTROIT POUR RATTRAPER QUOI QUE CE SOIT.
//
// Neuf mètres au seuil : arrivé haut et vite, l'appareil n'a pas le temps de
// descendre assez pour rester dedans, il sort par le bas, le tube le lâche en
// courte finale et il survole le terrain. Mesuré : la prise tombait à 0,22 sur
// toute la finale et l'approche ne se terminait pas.
//
// Vingt-six mètres : le tube tient jusqu'au bout, et c'est lui qui mange
// l'excès — il descend plus raide. La précision ne se perd pas pour autant,
// puisque la pente est maintenant tenue par un trim qui vise le plan, pas par
// la paroi du couloir.
export const TUBE_R1 = 26;           // rayon à la sortie, au-dessus du toucher

/** Le point que vise le tube, en mètres EN AMONT du repère de la piste : le
 *  seuil, plus la longueur du peigne. C'est ce nombre qui décide de tout
 *  l'atterrissage — avant, on visait le milieu du bitume.
 *  @param {{long: number}} P une piste @returns {number} mètres */
export const viseDe = P => Math.max(40, P.long / 2 - TOUCHER_APRES);
/** Le cap d'atterrissage d'une piste, dans le sens demandé. Le « sens » garde
 *  le signe qu'il avait sur la piste principale — moins un veut dire cap nord.
 *  @param {{cap: number}} P @param {number} sens @returns {number} radians */
export const capPiste = (P, sens) => sens < 0 ? P.cap : P.cap + Math.PI;

/** Le rayon du couloir d'approche à cette distance du point visé : large à
 *  l'entrée, serré au toucher.
 *  @param {number} d @returns {number} mètres */
/** @param {number} d mètres depuis le point visé @returns {number} mètres */
export function tubeRayon(d) {
  const u = borne(d / TUBE_DIST, 0, 1);
  return TUBE_R1 + (TUBE_R0 - TUBE_R1) * u;
}

/** La hauteur de l'axe du tube à cette distance du point visé.
 *  @param {number} d mètres @returns {number} mètres */
export function tubeHaut(d) { return PISTE.y + d * Math.tan(PENTE_CIBLE); }

