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

## Les adversaires ont les mêmes figures que le joueur → fait en v0.79

Tonneau, Immelmann, Split-S. Aujourd'hui ces trois figures sont réservées
au joueur, ce qui rend les esquives adverses lisibles et un peu pauvres.

## Un seul bouton MENU → fait en v0.71

La barre du haut porte VIS, SON, ?, la version. Ajouter le choix d'avion en
ferait cinq, trop pour un téléphone étroit. Tout regroupe sous un MENU
unique, en onglets : avions, viseurs, son, aide, historique.

## Skins d'avion, dont le tout premier modèle → fait en v0.77

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

## Un ailier débloqué en passant par tous les trous → fait en v0.78

Réussir toutes les ouvertures du monde — arches et tours percées — fait
décoller un avion ami de la piste, qui vient se battre à nos côtés jusqu'à
sa mort. Lui aussi peut se recharger en passant par les trous ou en se
posant, avec les risques que ça suppose.

## Du relief au sol

Un dénivelé très léger, des collines à peine marquées, juste pour que le
sol ne soit plus un plan parfait.

## Les tanks → fait en v0.79 et v0.80

Les roquettes doivent pouvoir les prendre pour cible. Et les tanks doivent
pouvoir se déplacer, parfois vite.

## Vecteur vitesse au collimateur → fait en v0.78, en vitesse et non en vecteur

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

## Easter egg du soleil → fait en v0.63, quatre secrets

Il n'avait jamais existé. Quatre proposés, quatre retenus, tous mesurés :
tirer dix secondes en plein éblouissement éteint le soleil vingt secondes
(éclipse, les adversaires visent au jugé) ; tenir le disque au centre 2,5 s
donne un bouclier doré de huit secondes, une fois par vague ; un tonneau le
nez dans le soleil décroche une étoile filante à 500 points, toutes les
trente secondes ; et le soleil se lève à la vague 1 (5°), culmine à la
vague 8 (60°) et se couche vers la quinzième. Rien n'est écrit dans l'aide.

## Le premier avion en option → fait en v0.77

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
Sa réponse : « exemple pas jouable, faut un test un écran à la suite ».
Nouvelle page : un manche par écran, plein écran, des anneaux à traverser,
SUIVANT puis le choix à la fin.
https://claude.ai/code/artifact/0576ada3-2064-4b18-b1aa-87e50057e5eb

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

## Bâtiments destructibles → fait en v0.63

Il a choisi « bâtiment destructible ». Pylône 90, arche 160, tour 260 de
structure ; nos balles, nos roquettes (×2) et les balles d'en face (3) s'y
arrêtent avec de la poussière. À zéro, le volume s'écrase sur sa base en
1,3 s, +80 points, et l'adversaire derrière est à découvert. Mesuré : un
pylône entre nous et un biplan, le biplan reste à 70 pv jusqu'à
l'effondrement (73 images), puis tombe. Les ruines sont rebâties au loin à
la vague suivante.

## Courbe de difficulté → fait en v0.64

Plus de palier : au-delà de la table, un appareil de plus toutes les deux
vagues (jusqu'à seize), cellules +5 % et cadence +3 % par vague. La courbe
s'adapte à la forme (−1 à +1) : une vague nette la monte de 0,3, une vague
arrachée la descend de 0,3, une reprise de 0,4 ; l'effectif varie de ±18 %
à partir de la vague 3, la cellule de ±10 %, la cadence de ∓12 %. Mesuré :
vague 13 → 13 appareils, vague 14 en forme → 15, en méforme → 11.
Reste à faire : un mode défi explicite, lisible depuis le menu.

## Objectif du jour et partage → fait en v0.64

Un objectif par jour, tiré de la date (même pour tout le monde), à tenir
dans une partie : +1000 et un jour de série. Sept familles : abattre N,
franchir des arches, une vague sans faute, se poser, abattre un bâtiment,
atteindre une vague, faire des tonneaux. Affiché à l'accueil et à la fin.
Le bouton PARTAGER LE SCORE passe par la feuille de partage du téléphone,
sinon copie le texte. Au passage : le bouton INSTALLER n'avait aucun style.

## Monnaie persistante → à faire

Des options seulement (viseurs, couleurs), jamais de puissance. Il faut
d'abord décider ce qu'elle achète.

## La grande liste du 14 septembre → v0.66 et v0.67

Faits, mesurés :
- Le soleil ne bouge plus (retour à la direction fixe), les trois secrets restent.
- Chapitre 1 = dix vagues, table réglée à la main (gardien seul à la 5,
  gardien + trois intercepteurs à la 10), phrase d'accueil « dernier
  rempart », écran LÉGENDE à la fin, compté au carnet.
- Tanks une vague sur deux. Arches : 12 au lieu de 6, plus près (450–1950 m).
- Primes de passage doublées (arche 20, tour 50), vie de bonus jusqu'à 150 %
  (jauge dorée), un passage compte à chaque traversée (repos 4 s) et se teste
  AVANT les murs : plus de trou pris de biais sans rien gagner.
- Un portail donne deux secondes de poussée. Le boost continue de monter tant
  qu'on reste loin (×2 → ×2,6 en 8 s), vitesse max 205.
- Piquer rend deux fois plus ; monter baisse le régime de 20 %.
- La vie résiste en baissant : ×1 à 100 %, ×0,5 sous 10 %.
- Atterrissage : porte à 750 m, roulage 44 m, approche assistée à 1,45× et
  arrondi deux fois plus franc. Mesuré : de l'engagement à l'arrêt 6,1 s
  réels (10,8 s de la porte, dont 2 s de barre). Le bouton disparaît une fois
  engagé ; on annule en tirant franchement (> 60 % de course). Pile dans
  l'axe et sur le plan sans rien faire pendant 2 s : la barre se remplit et
  l'approche s'engage seule. Décollage et roulage pile dans l'axe.
- Zone sûre : personne ne nous tire dessus de l'engagement au décollage.
- Mécaniciens : au plus deux fusils, jamais le dernier valide (il répare).
- Plus aucune téléportation ni effacement : un ennemi décroché revient à
  1,6× sa vitesse, les tanks restent d'une vague à l'autre.
- Le verrouillage s'élargit ×2 pendant un tonneau.
- La caméra fait le tour complet avec le tonneau (CAM_ROULIS_TONNEAU = 1),
  sans saut à la sortie (mesuré). À confirmer que c'est ce qu'il voulait.
- Carte fixe : les 34 pylônes, 12 arches et 3 tours sont posés une fois pour
  toutes (CARTE dans le code). Éditeur vu de dessus, COPIER → JSON à me
  coller : https://claude.ai/code/artifact/2392fef6-10e2-4f2e-b1bc-f00fb2f04905
- v0.67 : intercepteurs et gardien tirent des roquettes (alerte + trois bips,
  26 de dégâts, 9 s de recharge, 320–950 m). Un tonneau à moins de 300 m la
  fait décrocher (mesuré : 20 de dégâts sans esquive, 0 avec). Intercepteur,
  drone et gardien font un tonneau devant nos roquettes, qui décrochent.

À faire ou à préciser :
- L'éditeur de carte dans le jeu, débloqué contre une vidéo (« C'est génial
  l'éditeur ! On l'ajoutera en jeu après contre une pub »). Première marche
  faite en v0.68 : carte.html est dans le dépôt
  (https://pierremillon.github.io/fly-or-die/carte.html), le bouton ESSAYER
  DANS LE JEU garde la carte sur l'appareil et le jeu la lit à la place de la
  sienne ; REVENIR À LA CARTE DU JEU l'oublie. Reste : l'entrée dans le menu
  et la vidéo devant.
- Caméra au tonneau, sa réponse : « elle reste sur le plan horizontal mais
  serpente vers le côté du tonneau et revient » → fait en v0.68 (à plat,
  sinusoïde de 26 m, mesuré : 21 m d'excursion, retour à 0, roulis 0).
- « Des portes qui n'activent pas le bonus de vie » : la correction de v0.66
  (passage testé avant les murs, comptage à chaque traversée) devrait
  suffire ; à lui de confirmer.
- Chapitre 2 : cinq à dix vagues, un deuxième avion plus rapide, chrono et
  cibles à détruire, des cibles en haut des tours à différents étages.
- « Il y en a qui te les portes, c'est pas bon » : à préciser.
- Le double tap du tonneau relâche le manche : la visée revient au centre le
  temps du tonneau. Le viseur élargi compense, pas plus.

## Coop synchronisée → fait en v0.70

Trouvé en relisant : l'hôte recevait le verrouillage et la charge des
invités et n'en faisait rien, leur tir n'enlevait rien de durable. L'hôte
applique maintenant leurs dégâts (murs compris), envoie l'état des
bâtiments (structure ou ruine), les roquettes ennemies (dessinées chez
l'invité, encaissées par l'hôte seul), le roulis des figures ennemies, et
une empreinte de sa carte : l'invité est prévenu si la sienne diffère. Les
invités remontent leurs dégâts aux bâtiments. Mesuré par messages simulés :
ennemi 42 → 0 pv sous le tir d'un invité, bâtiment 90 → 60 → effondré.
Il a choisi de garder le double tap pour le tonneau, pas de bouton.

## La liste du 14 septembre (soir) → v0.71 à v0.75

Tout est fait sauf ce qui est noté « à faire ». Mesuré à chaque fois.

- v0.71 : mort sous un point (l'affichage arrondit vers le haut) ; la vague
  ne passe que quand TOUT est mort, tanks compris (c'est aussi le mode
  « je garde un tank pour me promener ») ; redécollage automatique à 100 %
  seulement ; roquettes après 1 s de verrouillage et sous 750 m ; WAVE puis
  SCORE, sans zéros ; vie et chiffres cachés hors vol ; TAKE OFF pleine
  largeur ; texte sur deux lignes ; menus défilants (#menu manquait aux
  exceptions) ; AGAIN ; vidéo en premier, 3 max, comptée, message bêta ;
  coop dans le menu ; DÉFI DU JOUR à sept variantes tirées de la date
  (vague 5, roquettes seules, mitrailleuse seule, sans piste, sans bonus,
  méga dur, facile) ; série = 1 s de bouclier chronométré par jour, écrite
  avec le calcul ; l'objectif du jour a disparu ; écran de fin en chiffres.
- v0.72 : LOCKED · ROLL!, WARNING ROCKET · ROLL! ROLL!, roquettes 50 (38,5
  après résistance), esquive au tonneau ou à la manœuvre (ROCKET DODGED),
  la roquette perdue file devant, toujours plus vite que nous ; boost de
  portail ×3,4 immédiat et invincible face aux ennemis ; PAPI dans l'axe
  seulement ; bouclier compté ; vie sans plafond ; soleil à 12,4° ; dégâts
  radiaux ; vibration (cadran, caméra, téléphone) à l'accroche tenue ; les
  ennemis s'écartent dès 42 m et voient venir ; chasseurs par le soleil,
  intercepteurs qui montent puis piquent, drones et intercepteurs en paire ;
  le Faucheur après 60 s à plus de 3,5 km (alerte à 40 s) ; premier ennemi
  devant une arche ; tanks à 28 m/s qui poursuivent ; fusils levés vers
  l'avion ; VAGUE SUIVANTE +500 ; le suivant hérite de la charge ;
  magnétisme sur les coéquipiers sans tir.
- v0.73 : caméra amortie au décollage (écran : 0,47–0,66 de la hauteur) et
  ressort de vol au posé ; 1,4 s de roulage ; BRAKING / BRAKES OFF ; coins =
  figures (bas : Split-S, haut : Immelmann, côtés : tonneau), mesuré ;
  avion plus bas (0,57) ; 80°, 2 400 m ; décrochage (0,5 s d'alarme, 1,6 s
  → vrille, sortie 0,55 s au manche opposé ou poussé : « trop dur » corrigé
  le soir même) ; six roquettes, livrées par caisse au sol ; son plus aigu en
  piqué, rugueux avec les dégâts, roquette plus grave ; rayon avant tir.
- v0.74 : aérodrome (hangar, porte coulissante ouverte au sol, six avions
  dedans, table et tabourets, manche à air, aire à signaux) ; mécaniciens à
  la table qui courent à l'avion au posé, pas rebondissant, penchés ; trois
  trous à figure : le U (entrée basse, sortie par le toit, +100), le double
  (combo ×2 sous 4 s), la fente à 45° (7 m de large : ne passe qu'en tonneau
  au bon moment, bouts d'aile compris ; mesuré : passe de −24° à −64° de
  roulis, tape ailleurs). Trouvé au passage : depuis v0.66, traverser une
  tour percée jetait une erreur (le `t` de la boucle masquait la fonction de
  traduction) — corrigé.
- v0.75 : mode avancé (vie 50 ×1,3 GUYNEMER, sans se poser ×1,25
  SAINT-EXUPÉRY, sans magnétisme ×1,4 BARON ROUGE, sans réticule ×1,2 FONCK,
  ennemis +40 % ×1,3 NUNGESSER ; trophée en tenant les dix vagues) ; codes
  secrets à empreinte (HACKER TIME, partie non comptée) ; liste bêta
  (adresse CONTACT_MAIL à remplir) ; mot sur la publicité ; coop testée à
  TROIS joueurs en vrai WebRTC (deux liaisons par l'interface, monde reçu,
  tir d'un invité qui abat chez l'hôte) — et corrigé : les invités ne
  voyaient qu'un seul ami (clé de liaison au lieu du numéro de joueur).
- Corrigés sur ses messages du soir : sortie de vrille, bouclier doré une
  seule fois par partie, temps de vol avec les secondes, faucheurs comptés,
  bouclier en « ×10 » pour ne plus déborder sur iPhone 16.

À faire :
- Leurres contre les roquettes et deuxième avion (chapitre 2).
- L'adresse de la liste bêta, et la régie / le paiement.
- Les questions du tonneau (quiz envoyé).

## Le tonneau, ses réponses → v0.76

« Il ne déplace pas assez, l'image ne suit pas » → déport 62 → 110 m
(mesuré : 43 m sur la figure), serpent 26 → 46 m, et l'image s'incline
jusqu'à 33° au plus fort puis revient à plat (cloche, rien à dérouler).
« Garder le double tap et glisser vite » → le coup de manche : un doigt qui
file vers un bord (0,6 px/ms sur 120 px au moins, sortie à moins de 36 px
du bord) déclenche le tonneau de ce côté ; mesuré dans les deux sens, une
dérive lente ne fait rien. « Doigt tout en haut = looping » → au-delà de
88 % de la course vers le haut tenus un quart de seconde, tour complet en
1,8 s, même cap à la sortie (mesuré).

## Ses retours du 15 septembre → v0.79 et v0.80

- Toutes nos figures chez les adversaires : tonneau, Immelmann, Split-S,
  looping complet, choisies selon l'altitude et la distance (mesuré : cap
  inversé de 172 degrés pour l'Immelmann, 173 pour le Split-S, même cap pour
  le looping). Ils les lancent quand on les tient à plus de 45 % de charge.
- Les adversaires blessés vont se soigner aux portails (sous 40 % de vie, ils
  y foncent et ressortent à 75 %). Jamais en se posant : la piste est à nous.
- Répit de deux secondes de plus entre les vagues, annoncé.
- L'inertie : au-dessus de la croisière le rappel moteur est cinq fois plus
  doux (mesuré : 205 → 144 en trois secondes au lieu de retomber à 78).
- La catapulte du portail : +60 m/s d'un coup, poussée ×4 pendant deux
  secondes, secousse à l'écran (mesuré : 78 → 138 instantané, 205 en 1 s).
- La jauge de poussée monte et descend au même rythme (9,2 s dans les deux
  sens) et couvre aussi la montée en puissance.
- Le tonneau : l'avion sortait du cadre. Mesuré EN PIXELS cette fois et pas
  en mètres — il partait à 49 écrans à gauche. Décalage latéral plafonné à
  4,5 m ; il reste entre 32 % et 50 % de la largeur, jamais hors cadre.
- Le demi-tonneau des figures partait à l'envers du doigt : inversé.
- Le trait du tir ennemi : vert et fin, visible d'où qu'il tire (ramené au
  bord de l'écran hors cadre), coupé s'il y a un mur.
- LOCKED dit « BOUGE » : bouger suffit, les figures sont pour les roquettes.
- Caméra du décollage : trois fois plus de retard (assiette amortie à 2,2 au
  lieu de 6,5, ressort à 15 au lieu de 44).
- Les fusils des mécaniciens tirent par salves irrégulières de deux à quatre
  coups, avec une pause.
- Le hangar est au milieu de la piste et l'approche vise un point 300 m avant
  lui : on s'arrête devant la porte (mesuré : 2 m d'écart). Les mécaniciens
  partent dès l'engagement et sont à 5 m de l'avion quand il s'immobilise.
- L'avion démarre devant le hangar, mécaniciens autour.
- DÉCOLLER descend sous le pouce, le défi monte dans la bande du haut.
- Piqué et poussée s'additionnent : le plafond de vitesse monte avec la
  poussée (mesuré : 320 en piqué seul, 432 en piqué + poursuite).
- Effet de sol : sous 40 m, +20 % de vitesse, jamais écrit (mesuré : 78 en
  altitude, 85 à 20 m, 91 à 5 m).
- La fente à 45° est deux fois plus large et rend 100 points. ATTENTION : à
  cette largeur elle passe aussi à plat, elle ne force plus le tonneau.
- Le plafond de vie monte avec les portails et reste acquis pour la partie ;
  les mécaniciens réparent jusque-là (mesuré : trois arches → 160 %, tombé à
  25, réparé à 160).
- Les deux bandes ont échangé leur place : la vie en haut, le reste en bas.
- Le compte de roquettes à zéro pâlit au lieu de rougir.

## À trancher avec lui

- Le bouclier : le garder ou le supprimer, maintenant que les portails
  donnent de la vie et repoussent le plafond. Question posée.

## Fin du backlog en autonomie → v0.77 et v0.78

- Leurres : trois en soute (quatre sur l'intercepteur, zéro sur le pionnier),
  ils partent seuls à 220 m d'une roquette qui arrive, rechargés au sol après
  quatre secondes posé. Mesuré : 0 dégât avec, 38,5 sans. Le gardien en a
  trois contre les nôtres, et on le voit les lâcher.
- Trois avions (MENU › AVION, et dans le hangar) : le bimoteur ; l'intercepteur
  (vitesse ×1,3, lacet ×0,8, tangage ×1,15, 4 roquettes, 4 leurres), gagné en
  entrant dans la légende une fois ; le pionnier, la flèche du premier vol
  (v0.1), vitesse ×0,85, lacet ×1,3, 2 roquettes, sans leurre.
- La vitesse en km/h sous la croix, avec un trait qui suit la pente. Le vrai
  vecteur vitesse serait confondu avec la croix : l'avion va où pointe le nez.
- L'éditeur de carte dans MENU › CARTE, offert contre une vidéo comptée.
- L'ailier : prendre le U, le double et la fente dans une même partie le
  débloque ; il vole à 38 m à droite, tire sur notre cible (9/s), n'est jamais
  abattu. Mesuré : 60 → 31,7 pv en vingt images.

## Ce qui n'a pas été fait, et pourquoi

- Le relief au sol : tout le jeu suppose un sol plat (plancher, piste,
  tanks, effondrements, atterrissage). Un relief demande de réécrire les
  collisions et l'approche : chantier du chapitre 2, pas d'une soirée.
- Le verrouillage de très près : non démontré, faute de reproduction fiable.
- Les mécaniciens qui ignorent les bâtiments : la piste est dégagée, ça ne
  se voit pas.

## Bloqué par lui

- L'adresse de la liste bêta (CONTACT_MAIL dans le code).
- Sa carte dessinée dans l'éditeur.
- Le nom de domaine, le SIREN, une ligne par jeu pour la salle de jeux
  (PR #30 du portfolio, en brouillon).
- La régie publicitaire et le paiement : rien n'est branché, tout est compté.

## Questions restées ouvertes, tranchées seul

- Le chrono : il ne s'affiche plus que tant que la prime est accessible.
- Le bouclier encaisse tout, décor et sol compris : gardé, c'est lisible.
- Les adversaires ne se traversent plus (v0.65).
- Un blessé qui fuit revient à 1,6× sa vitesse (v0.66) : il ne décroche pas
  pour de bon, sinon la vague ne finirait jamais.
- Douze arches, trois tours, trois trous à figure : la carte est fixe, il
  peut en changer avec l'éditeur.

- Le verrouillage de très près : non démontré corrigé (23/80 → 24/80
  images sur un adversaire qui traverse à 70 m, harnais imparfait).

## Questions restées ouvertes

- Le chrono en haut à gauche ne sert à rien. Score au temps, ou décor.
- Le bouclier encaisse dix coups. Absorbe-t-il aussi les frôlements et le sol ?
- Les adversaires se traversent entre eux.
- Un adversaire blessé fuit puis revient. Faut-il qu'il décroche pour de bon ?
- Combien d'arches, combien de tours percées dans le monde ?


## v0.81 — ce qui a été fait

- Le doigt qui quitte l'écran par le haut ou par le bas déclenche
  l'Immelmann ou le Split-S. Le doigt tenu en haut ne déclenche plus rien.
- Séparation dure : un adversaire ne peut plus entrer à moins de 34 m de
  nous, ni à moins de 0,85 envergure d'un autre. Mesuré : on le colle sur
  nous toutes les trois images, il ressort à 49,5 m, zéro dégât.
- Un bâtiment qui porte un passage ne disparaît plus. Il s'affaisse à 22 %
  de sa hauteur : le trou reste franchissable, très bas, très dangereux.
- L'écran de fin compte les portails passés, la vie reprise en tout, et le
  plafond de vie atteint.
- Le hangar fait 60 m de façade le long de la piste, baie de 40 m, deux
  vantaux qui se rangent dehors sur un rail débordant. Toute la flotte est
  visible depuis le bitume.
- L'équipe au sol vit aussi quand on vole. Elle part dès que l'approche est
  engagée et se tient à 3–6 m de l'avion à la seconde où il s'arrête.
- Le T d'atterrissage était dessiné à l'envers : on se pose parallèlement à
  la jambe et VERS la barre (OACI annexe 14).
- L'aide explique le carré à signaux, le T, la manche à air et le PAPI.

## À discuter avec lui

- **Le bouclier.** Les portails rendent de la vie et font monter le plafond,
  l'atterrissage répare jusqu'à ce plafond. Le bouclier fait-il encore un
  travail que la vie ne fait pas ? Question posée, réponse attendue.
- La fente à 45°, doublée en largeur, se passe maintenant à plat : elle
  n'oblige plus au tonneau. À garder large et facile, ou à re-serrer ?

## v0.82 — ce qui a été fait

- DÉCOLLER passe en bas de l'écran de titre (y = 769 sur 932) : c'est là
  qu'un pouce arrive. Le défi du jour devient une pastille en haut à gauche.
- Les mécaniciens préparent l'avion dès l'écran de titre. Ils étaient à 30 m,
  assis à leur table : `mecanosTable()` était appelé APRÈS
  `preparentLAvion()` et défaisait tout. Mesuré : 5 à 7 m, autour de la
  cellule.

## v0.83 — le bouclier supprimé (décidé avec lui au quiz)

Trois questions posées, trois réponses : on supprime le bouclier, la série
donne du plafond de vie, et la fente à 45° se resserre.

- **Plus de bouclier.** `state.bouclier` et `state.bouclierT` n'existent plus.
  Une seule ressource, une seule jauge. Mesuré : 20 points de dégâts passent
  directement dans la vie, l'étiquette SHIELD a disparu de la bande.
- Ce qui donnait du bouclier donne maintenant du plafond de vie : une vague
  sans égratignure monte le plafond de 25 points, la reprise après vidéo rend
  la vie jusqu'au plafond débloqué.
- **La série du défi** donne 10 % de plafond par jour tenu, plafonné à +100.
  Mesuré : série de 1 jour → on décolle à 110 %, et la piste répare jusque-là.
- **Le doré du soleil** survit : huit secondes où rien ne passe, une fois par
  partie. C'est le seul reste de l'ancien bouclier, et il se mérite.
- **La fente à 45°** passe de 6,6 à 3,6 m de demi-largeur. Mesuré : à plat les
  saumons d'aile sont à 4,24 m en travers, donc bloqués ; entre 30° et 60° de
  roulis dans le bon sens, elle s'ouvre. Elle exige de nouveau le tonneau.

## v0.84 — les fusils des mécaniciens voient le décor

Dernier trou connu de la ligne de vue : ils tiraient à travers les
bâtiments. Même règle que partout ailleurs, `obstacleEntre` sur la ligne
mécanicien → adversaire. Mesuré : 3,1 points de dégâts en vue directe,
0 derrière une tour.

## Ce qui reste vraiment ouvert

- **Du relief au sol.** Tout le jeu suppose un plan parfait : piste, tanks,
  effondrements, atterrissage. Chantier du chapitre 2.
- **La page des quatre manches.** Il doit choisir une lettre, rien à coder
  avant.
- **La monnaie.** Les éclats achètent déjà viseurs, couleurs et traînées.
  Reste à décider s'ils achètent autre chose, sans jamais toucher à la
  puissance.

## v0.85 et v0.86 — le retour Reddit et une longue liste

Deux premiers commentaires sur r/Devvit. MrTommyPickles demande l'axe Y
inversé pour les pilotes de simulateur, korok7mgte dit que c'est beau. Les
deux sont remerciés en tête de l'historique de version.

- **Axe Y inversé**, option retenue d'une partie à l'autre. Elle agit à la
  SOURCE, là où la commande devient une position de viseur : doigt, souris,
  manette et clavier suivent tous.
- **Clavier** : flèches, et la main gauche en ZQSD comme en WASD. Le jeu lit
  `e.code`, la position physique de la touche, donc les deux dispositions
  marchent sans réglage. Espace pour le tonneau, Maj plus haut ou bas pour
  l'Immelmann et le Split-S.
- L'indicateur de vitesse, la barre de boost, le mot LOCKED, les chiffres de
  roquettes sous les ailes et le signe pour cent quittent l'écran. La poussée
  se lit dans le nombre de traits de vitesse, les roquettes dans la bande.
- Le trait des adversaires qui nous visent devient **pointillé** : il ne se
  confond plus avec l'air.
- Le premier adversaire de chaque partie arrive **pile dans l'axe du nez**, à
  six cents mètres, et le viseur l'accroche seul. Mesuré : 0° d'écart,
  verrouillé en une seconde. C'est le tutoriel, sans une ligne de texte.
- **Chaque type d'appareil a son étage** : le biplan de 60 à 240 m, le gardien
  jusqu'à 940. Et c'est un plafond dur : monter, c'est se mettre hors de
  portée.
- Le **faucheur** traverse notre route à 260 m, puis part en grande boucle et
  revient par-derrière. Mesuré : il passe à 0,95 de dot devant nous, finit à
  -1 derrière.
- **Sortie de vrille corrigée** : le manche à l'opposé de la rotation. Le
  signe était inversé et demandait le manche DANS le sens, ce qui l'aurait
  aggravée. Mesuré : sortie en 30 images à l'opposé, jamais dans le sens.
- Le **PAPI** ne s'affiche que sur une vraie approche : nez dans l'axe à 20°,
  moins de 2,6 km, moins de 500 m de décalage, et distance qui diminue.
  Mesuré : éteint dès qu'on s'éloigne.
- L'**effleurement du sol** sous 6° de pente ne coûte plus rien et ne fait
  aucun bruit. Mesuré : 0 dégât à 2° et 5°, 19 à 15°.
- Les **mécaniciens** attendent au bord du bitume, jamais dessus. Mesuré :
  0 image passée sur la piste pendant le roulage. La réparation ne commence
  que lorsqu'ils sont à moins de 9 m de la cellule.
- Le **son du portail** devient un AUM grave à attaque lente, au lieu de trois
  notes aiguës.
- Le **fusil des mécaniciens** décroît avec la distance et se tait à 100 m.
- La **voûte étoilée** suit la caméra et se referme sous l'horizon : plus de
  bande noire entre le sol et les étoiles quand on monte.
- Le **soleil fixé** rend invincible dix secondes, et c'est renouvelable.
- L'écran de fin dit **qui vous a abattu**.
- **Écran de titre** : DÉCOLLER en bas, défi du jour et MENU pleine largeur.
- **MISE À JOUR MAINTENANT** en bas du menu : elle va chercher la nouvelle
  version sans fermer l'application.
- Les **portes du hangar** restent ouvertes, la boussole descend sous le
  bandeau, et l'historique de version passe à une phrase par version, en
  français et en anglais.

## À discuter avec lui

- **Le tonneau.** Il dit que l'avion tourne sur son axe en restant dans le
  même plan, et qu'il voudrait quelque chose de plus dramatique : manche
  tiré, montée, spirale. Il demande des références et une page où il pourrait
  régler la courbe lui-même. À faire.
- **L'easter egg des étoiles.** Viser la Grande Ourse ou l'étoile du Berger
  donnerait un bonus. Questions à poser.
