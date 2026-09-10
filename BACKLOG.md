# Fly or Die — idées en attente

Ce fichier existe pour qu'aucune idée dite en passant ne se perde. Dès qu'une
nouvelle idée est mentionnée en conversation (même en une phrase, même pas
prête à être codée), elle est ajoutée ici avant d'être oubliée. Rien n'est
retiré quand une idée est implémentée — noter "→ fait en vX.Y" à la place.

## Le soleil-lampe de bureau → fait en v0.32

L'image d'origine : un enfant qui joue avec des avions en plastique dans sa
chambre, et la lampe de bureau qui fait le soleil. On tourne l'avion, on
attrape la lumière, on éblouit.

Traduction en jeu : une source lumineuse unique, fixe dans le ciel. Deux
effets, symétriques.

**Regarder vers le soleil éblouit.** Quand l'axe de l'avion s'approche de la
direction du soleil, l'écran se voile — les cadres de désignation
s'affaiblissent, le verrouillage devient plus lent ou impossible. Piloter en
plein soleil coûte quelque chose.

**Attaquer soleil dans le dos protège.** Symétriquement, un ennemi qui a le
soleil derrière le joueur le voit mal : il tire moins juste, ou met plus
longtemps à engager. Arriver par le soleil devient une vraie manœuvre — la
même que dans le vrai combat aérien, où l'on monte côté soleil avant de
plonger.

Ce que ça apporte : une raison géométrique de choisir sa trajectoire
d'approche, au lieu de foncer droit sur la cible la plus proche. Et un
gradient continu, pas un interrupteur — la protection dépend de l'angle,
donc encore d'un produit scalaire.

À concevoir : le rendu du soleil dans le style filaire (un disque de traits ?
un halo qui délave la grille ?), l'intensité de l'éblouissement, et si le
soleil est fixe dans le monde ou tourne lentement au fil des vagues.

## Split-S, le renversement inverse → fait en v0.10

Le pendant de l'Immelmann : demi-tonneau d'abord, puis demi-looping vers le
bas. Cap inversé comme l'Immelmann, mais plus bas et plus vite au lieu de plus
haut et plus lent. Le couple des deux donne un vrai choix : retourner la
situation en payant de la vitesse, ou en payant de l'altitude.

La figure suit la direction du geste par rapport à l'avion — au-dessus,
en dessous, sur le côté — ce qui a réglé du même coup la question de savoir
où le déclencher sans marcher sur le manche.

Refusé sous 150 unités d'altitude, avec un message : sinon la figure finit
dans le sol.

## Modèle d'avion fourni → fait en v0.4, deuxième modèle en v0.5

Conversion en amont, sommets soudés et géométrie indexée embarquée dans
`index.html` ; les arêtes vives en sont dérivées au chargement. Le fichier
reste unique, rien à charger au vol.

## Collision avec les pylônes → fait en v0.16

Choix arcade plutôt que simulation : le décor n'arrête pas l'avion, il
l'érafle. Sol et pylônes coûtent un peu de vie et renvoient l'avion, avec un
délai pour qu'un frottement continu ne vide pas la jauge d'un coup. Le
rase-mottes devient un pari, et le Split-S bas est permis au lieu d'être
refusé.

## Son → fait en v0.18, retouché en v0.25 et v0.34

Rien pour l'instant. Pistes : un bourdonnement de moteur qui monte avec le
tangage, une note de verrouillage, un souffle à la destruction. Tout en
synthèse WebAudio, sans fichier à charger, pour garder le fichier unique.
Avec un bouton de coupure, et rien qui démarre avant le premier toucher.

## Ciel réel de Bayonne, 6 juin 1991 → fait en v0.34

Les étoiles ne devaient pas être tirées au hasard mais reproduire le ciel
réel au-dessus de Bayonne cette nuit-là. 945 étoiles de magnitude 5,2 et
mieux, prises dans le catalogue Yale des étoiles brillantes, converties en
hauteur et azimut pour la latitude 43,4933 N et la longitude 1,475 O.
Contrôle : la Polaire tombe à 42,8 degrés de hauteur, azimut 359,8 — la
hauteur du pôle vaut la latitude du lieu, à l'écart près entre la Polaire
et le pôle vrai en 1991.

## Tour percée → fait en v0.35

Un immeuble bien plus haut que les pylônes, troué d'une seule fenêtre de
45 mètres placée aux deux tiers de la hauteur, soit à peu près l'altitude de
croisière. 25 % de vie, une fois par tour et par vague. Trois exemplaires
dans le monde, recyclés au-delà de 5 000 mètres comme les arches.

## Piste d'aviation, atterrissage et réparation

Une piste au sol : un rectangle, un axe pointillé au milieu, et les deux
nombres de cap peints à chaque seuil comme sur un vrai aérodrome.

S'approcher bas et dans l'axe suffit — l'avion se pose tout seul, sans rien
demander. Posé, on est très vulnérable, mais la vie remonte très vite. Un à
trois petits pavés viennent se presser autour de l'appareil : les mécanos.
Au bout de dix secondes il redécolle seul, et un bouton REDÉCOLLER permet
de repartir avant.

## Les adversaires ont les mêmes figures que le joueur

Tonneau, Immelmann, Split-S. Aujourd'hui ces trois figures sont réservées
au joueur, ce qui rend les esquives adverses lisibles et un peu pauvres.

## Un seul bouton MENU

La barre du haut porte VIS, SON, ?, la version. Ajouter le choix d'avion en
ferait cinq, trop pour un téléphone étroit. Tout regroupe sous un MENU
unique, en onglets : avions, viseurs, son, aide, historique.

## Skins d'avion, dont le tout premier modèle

Détruire un type d'adversaire donne le droit de le piloter, comme pour les
viseurs. Le tout premier avion dessiné à la main — celui d'avant le modèle
STL — revient comme option. Suppose de sortir le modèle du joueur de son
bloc unique : géométrie, position des canons, envergure.

## Décoller toujours depuis la piste, avec des mécaniciens

Le point de départ est tiré au hasard : on se retrouve parfois nez à nez
avec un bâtiment, ce qui ne veut rien dire. La piste devient le point de
départ fixe, l'avion aligné dessus.

Au menu, un ou deux petits pavés — des mécaniciens — s'affairent près du
moteur, bougent un peu, font des réglages. Ils détalent dès qu'on appuie
sur DÉCOLLER.

## Un ailier débloqué en passant par tous les trous

Réussir toutes les ouvertures du monde — arches et tours percées — fait
décoller un avion ami de la piste, qui vient se battre à nos côtés jusqu'à
sa mort. Lui aussi peut se recharger en passant par les trous ou en se
posant, avec les risques que ça suppose.

## Du relief au sol

Un dénivelé très léger, des collines à peine marquées, juste pour que le
sol ne soit plus un plan parfait.

## Les tanks

Les roquettes doivent pouvoir les prendre pour cible. Et les tanks doivent
pouvoir se déplacer, parfois vite.

## Vecteur vitesse au collimateur

Le petit cercle ailé qui marque où l'avion va vraiment, et non où il pointe.
Impossible tel quel : le modèle de vol n'a pas d'incidence, l'appareil se
déplace exactement le long de son nez. Le vecteur vitesse tomberait donc pile
sur le viseur et ne dirait rien. Suppose d'abord de donner une incidence au
modèle — l'aile portant à un angle différent de celui du fuselage.

## Questions restées ouvertes

- Le chrono en haut à gauche ne sert à rien. Score au temps, ou décor.
- Le bouclier encaisse dix coups. Absorbe-t-il aussi les frôlements et le sol ?
- Les adversaires se traversent entre eux.
- Un adversaire blessé fuit puis revient. Faut-il qu'il décroche pour de bon ?
- Combien d'arches, combien de tours percées dans le monde ?
