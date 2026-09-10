# Fly or Die

Jeu d'avion en 3D filaire, jouable au doigt sur téléphone.

→ https://pierremillon.github.io/fly-or-die/

## Le jeu

L'avion avance tout seul. Un doigt sur l'écran, et il suit : haut, bas,
gauche, droite. Il tire de lui-même dès qu'un intercepteur entre dans le
cône du viseur. Les vagues s'enchaînent tant que la structure tient.

## Les partis pris

**Pas de tonneau.** L'avion n'a d'autorité que sur deux axes, le tangage et
le lacet, avec un « haut » du monde qui reste absolu. Le roulis existe mais
il est purement décoratif : il raconte le virage sans rien changer à la
trajectoire. Sans cette contrainte, on se retrouve la tête en bas sans
comprendre comment — rédhibitoire sur un écran de téléphone.

**Le tangage revient à plat tout seul.** Le doigt commande une vitesse de
rotation, pas une position. Sans remise à plat automatique, doigt relâché,
l'avion grimperait indéfiniment jusqu'au plafond.

**Le verrouillage tient dans un produit scalaire.** À chaque image, on
compare le vecteur avant de l'avion à la direction de chaque cible : leur
produit scalaire vaut le cosinus de l'angle entre les deux. Au-delà d'un
seuil, la cible est dans le viseur. Pas d'arc cosinus, on compare
directement les cosinus.

**La zone de combat est ancrée devant le joueur.** Un avion qui avance sans
arrêt ne peut pas être suivi par une IA honnête : les intercepteurs
finissaient tous collés dans son dos. Ils visent maintenant des points en
avant de lui, et celui qui décroche revient en face pour un nouveau passage.

## La technique

Un seul fichier, `index.html`. Pas d'étape de build, pas de dépendances à
installer : three.js est chargé depuis un CDN par une carte d'import. On
ouvre le fichier, ça vole.

Le rendu n'utilise ni texture, ni lumière, ni matériau réaliste — uniquement
des traits. Comme WebGL ignore l'épaisseur des lignes classiques (toujours
1 pixel, quelle que soit la valeur demandée), les traits passent par
`LineMaterial`, qui les dessine comme de la géométrie. C'est ce qui les rend
lisibles sur un écran à haute densité.

Le HUD est un calque canvas 2D par-dessus la scène : viseur, marqueur de nez,
cadres de désignation, horizon artificiel.

## Mise au point

`window.__fod` expose l'état complet depuis la console du navigateur :
position, ennemis, verrouillage, structure.

## Palette

Phosphore vert, commune aux autres jeux : trait `#46ffa0`, texte `#8ffcc4`,
remplissage `#0a1f16`, fond `#04070a`, IBM Plex Mono.
