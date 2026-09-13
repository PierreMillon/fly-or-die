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

## Piste d'aviation, atterrissage et réparation → fait en v0.42

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

## Décoller toujours depuis la piste, avec des mécaniciens → fait en v0.42

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

## Coop en ligne, jusqu'à dix → fait en v0.49

Deux joueurs sur le même site, dans la même partie, contre les mêmes vagues.
Bouton COOP au menu, un code court à partager. WebRTC en pair à pair, sans
serveur de jeu — reste à trancher le rôle d'hôte, ce qui est synchronisé et
ce qui ne l'est pas.

## Troisième halo : le boost de tir → fait en v0.51 (surchauffe)

Un état où l'on tire deux fois plus vite et où l'écran vibre. Le déclencheur
reste à trouver. À ajouter à la planche d'essai des halos, avec le bouclier
et le soleil dans le dos.

## Traduction anglaise → fait en v0.52

Option de langue au menu, et détection automatique : français si le
téléphone est en français, anglais sinon.

## Easter egg du soleil

Fixer le soleil six secondes déclenche quelque chose. Dix propositions à
faire.

## Le premier avion en option

Le tout premier modèle dessiné à la main, avant le STL, revient comme skin.

## Un mécanicien qui n'a pas le temps → fait en v0.50

S'il est encore devant l'avion au moment du départ, il se jette à terre et
se couche pour laisser passer.

## Caps de piste tricheurs → fait en v0.50

Une direction pointe vers Hangzhou, l'autre vers Arcachon, calculées depuis
Bayonne — donc pas à 180 degrés l'une de l'autre.

## Bouton DÉCOLLER sous l'avion → fait en v0.50

Dans la zone du pouce, en bas de l'écran.

## Refonte de l'atterrissage → fait en v0.55

Le PAPI : huit feux au sol, quatre de chaque côté, au milieu du bitume.
Deux blancs deux rouges, on est sur les trois degrés. Un seul jeu sert les
deux sens de piste. Rampe d'approche devant chaque seuil. Témoin de quatre
carrés au collimateur. Bouton POSER qui bat quand on est sur le plan, et
que le manche coupe à tout instant. Arrondi automatique sous seize mètres.
Roulage de quatre cents mètres, remise de gaz possible. Un mauvais posé
coûte de la structure, la réparation coûte du score.

## Mécaniciens tuables au sol → fait en v0.55

Les balles ennemies les atteignent pendant la réparation, et chacun emporte
un tiers de la cadence avec lui.

## Page d'essai du PAPI → fait

https://claude.ai/code/artifact/a32b3558-2b35-4ff0-b0c6-fe3e3b3df221 —
approche pilotable au doigt, les huit feux en direct, l'atterrissage noté.

## Planche des halos → fait

https://claude.ai/code/artifact/aacab539-d250-4106-b091-a84f2d8c98af —
quatorze halos littéraux, réglables, en trois teintes.

## Page d'essai des zones du manche → fait

https://claude.ai/code/artifact/f9abbda1-bab3-4a15-827f-7e176066a256 —
le doigt en direct, les anneaux d'autorité, la courbe de commande, et les
deux modes côte à côte : doigt à fond à gauche, un quart de geste vertical
donne 22 °/s sur le rayon contre 5 °/s par axe.

## Changelog en une phrase → fait en v0.55

Toutes les entrées passées réécrites en une phrase courte. Le détail vit
dans ce fichier et dans les messages de commit.

## Installation sur l'écran d'accueil → fait en v0.56

Manifeste, icônes tirées du vrai avion, service worker. Bouton INSTALLER à
l'accueil, pastille discrète une seule fois après une deuxième partie, et
un panneau qui décrit le geste — Safari n'expose aucune interface pour le
proposer, c'est un choix d'Apple. Plein écran, portrait, hors-ligne complet.

Piège trouvé à la mesure : la page se rechargeait au premier passage, au
milieu de son propre démarrage, parce qu'elle réagissait au changement de
contrôleur. Le jeu ne partait plus du tout. La recharge n'a lieu que si le
joueur touche la pastille de nouvelle version.

## Les trois halos retenus → fait en v0.57

Choisis sur la planche :

- bouclier : 1 SOUFFLE — étendue 100, intensité 31, battement 17
- soleil : 14 ÉCLAT — étendue 169, intensité 176, battement 0
- canons : 14 ÉCLAT — étendue 49, intensité 200, battement 17

Posés tels quels. Réserve : à 31 % d'intensité, le bouclier ne se voit
quasiment pas en jeu — la planche a un fond noir pur, le jeu a une grille,
des étoiles et du brouillard. Opacité mesurée en vol : 0,30 sur le panneau,
donc environ 0,14 une fois le dégradé appliqué. À remonter s'il le confirme.

## Les canons chauds ne font rien aux dégâts → fait en v0.57

Ils font maintenant deux fois plus de dégâts, et le facteur se déduit de la
cadence (1 / CHAUFFE_CADENCE) pour que les deux ne puissent plus diverger.

## Manette → fait en v0.57

Stick gauche dans « aim », comme le ferait un pouce. Gâchettes pour les
tonneaux, boutons du pouce pour les renversements, croix pour POSER et
REDÉCOLLER. Quatre-vingts lignes, parce que toute la commande passait déjà
par un seul point.

## Carnet de vol → fait en v0.59

Compteur local : parties, temps de vol, partie moyenne et la plus longue,
vague la plus loin, reprises, atterrissages, vie perdue par cause, et
surtout LES MORTS PAR VAGUE. Lisible dans l'aide, copiable d'un bouton,
effaçable. Rien ne sort de l'appareil sans un geste volontaire.

## Reprise unique → fait en v0.59

Une par partie. L'appel est isolé dans demandeVideo(), qui rend une
promesse vrai/faux : le jour où la régie répond, on remplace son intérieur
par adBreak() et rien d'autre ne bouge.

## three.js embarqué → fait en v0.59

vendor/three/. Le jeu n'a plus aucune dépendance réseau — exigence des
portails, et le hors-ligne ne dépend plus d'un CDN.

## Le manche : origine flottante, et la page des quatre manches → à trancher

La v0.60 a mis la courbe par axe sur un malentendu, retirée le jour même.
Le joueur dit que le vrai problème est ailleurs et a choisi « le centre là
où mon doigt se pose » — ce que le jeu fait DÉJÀ (origine au contact,
glissante au-delà de 17 % du petit côté). Page d'essai avec quatre
manches côte à côte, dont le jeu tel quel :
https://claude.ai/code/artifact/41077097-77b6-4904-aa0b-1e943ee77dd2
Il retient une lettre, on applique. Nervosité : −15 % gardés.

## La caméra au tonneau → fait en v0.62

Mesuré à l'écran : l'avion se décalait de 513 px sur 430 — il sortait du
cadre, la caméra restait. Deux causes : le décalage était ajouté à la
cible du ressort, qui le mangeait ; et une fois posé après le ressort, il
s'accumulait d'image en image (70 m). La camera fait maintenant le même
pas latéral que l'avion avant le ressort, et le retard dessiné est posé
après, retiré à l'image suivante. Excursion : 180 px, retour exact à 0.

## Mécaniciens armés → fait en v0.62

Posé, dès qu'un avion ennemi passe à 650 m, ils sortent le fusil, tirent
(7 points par seconde chacun, traçantes visibles) et le HARCÈLENT : pris
sous le feu du sol, il décroche 2,6 s. Un mécanicien qui tire ne répare
pas.

## Portes d'atterrissage → fait en v0.61, resserrées en v0.62

Un cercle de 16 m de rayon (32 m de diamètre) devant chaque seuil, centré
sur le plan à 3°. Juste un cercle, sans traits ni mât. Le franchir vers la
piste ouvre POSER dix secondes. Roulage 133 m.

## Faits en v0.61–v0.62, en vrac

Roquettes à 0,5 s de verrouillage (mesuré : elles marchaient, le seuil
d'une seconde continue ne se tenait pas au doigt). Un tank par vague.
Viseur sur l'avion, canons en avance. Caméra sans retard d'assiette au
décollage. Montée à 80° avant que le moteur peine. +30 % de résistance.
Rampe d'approche retirée. Son malgré la sonnerie coupée. Plus de clic en
quittant. Le choc abat l'adversaire et coûte 10.

## À vérifier avec lui

- Un ennemi derrière un bâtiment : le bâtiment prend les dégâts avec de
  la poussière et l'ennemi n'en prend pas. Il l'a signalé sans dire si
  c'est voulu ou non.
- Le verrouillage de très près : non démontré corrigé (23/80 → 24/80
  images sur un adversaire qui traverse à 70 m, harnais imparfait).
- L'easter egg du soleil n'a jamais existé : dix propositions à faire.

## Questions restées ouvertes

- Le chrono en haut à gauche ne sert à rien. Score au temps, ou décor.
- Le bouclier encaisse dix coups. Absorbe-t-il aussi les frôlements et le sol ?
- Les adversaires se traversent entre eux.
- Un adversaire blessé fuit puis revient. Faut-il qu'il décroche pour de bon ?
- Combien d'arches, combien de tours percées dans le monde ?
