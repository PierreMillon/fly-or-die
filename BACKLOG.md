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

## v0.87 — le tonneau barriqué, et une longue liste

- **Le tonneau devient barriqué.** L'ancien était un tonneau d'AILERON : l'avion
  tournait sur son axe et restait dans le même plan. Celui-ci monte, s'enroule
  autour d'un axe qui garde la direction de départ, et redescend. Réglé par lui
  au curseur sur une planche dédiée : LAT 62, VERT 37, DURÉE 1,70 s, 1 tour,
  CABRÉ 45°. Mesuré : 74 m au sommet, 0 m d'écart d'altitude à la sortie,
  30 m de décalage net, soit 2,5 envergures.
- Le cabré de la figure ne touche QUE la maquette : ajouté au tangage de vol,
  il faisait sortir du tonneau cinquante mètres plus haut.
- **La fente à 45° double en hauteur** sans rien céder sur sa largeur.
- **Le défi du jour ouvre d'abord un pacte** : ce qu'il enlève, ce qu'il
  demande, ce qu'il rapporte, et deux boutons. Quatre missions nouvelles avec
  chrono : abattre six bâtiments, franchir cinq portails, toucher le plafond,
  douze appareils en trois minutes.
- **Sous les radars.** Sous quatre-vingts mètres, il faut deux fois plus de
  distance avant que le faucheur soit lâché.
- **Les nouvelles.** Un adversaire qui se soigne à un portail ne déclenche plus
  de bandeau : trois lignes pâles en haut à gauche, avec son type et les points
  de vie repris.
- **Deux secrets dans le ciel.** La Grande Ourse se trace en passant le nez sur
  ses sept étoiles dans l'ordre ; l'étoile du Berger se tient une seconde et
  demie dans le viseur en sortant d'une figure, et lève le jour : vingt
  secondes où les adversaires n'y voient plus rien. Chacune donne 2000 points
  et un viseur qui ne s'achète pas.
- Décollage plus nerveux, caméra encore plus en retard.
- Le remerciement à MrTommyPickles passe dans la ligne de la v0.85, entre
  parenthèses, à côté de la chose qu'il a demandée.

## Reste à faire

- **Les traits en trop** sur les bâtiments percés : deux boîtes qui partagent
  une face laissent leur arête commune, qui n'apporte aucune information.
- **La Grande Ourse** : il veut d'autres idées de récompense que les points et
  le viseur.

## v0.88 — le refuge, les montagnes, et le fait de remuer

- **Le refuge.** Une bande d'herbe et une cabane à 3900 m plein ouest, dans la
  direction de l'étoile du Berger, au ras du sol. Il n'existe qu'après trois
  minutes de vol et ne se voit qu'à 1700 m. Il n'est ni sur la boussole ni
  dans l'éditeur. On s'y pose, le moteur se coupe, la caméra s'écarte et
  tourne, la vie remonte au plafond de la partie, et personne ne vient. On
  peut y revenir autant de fois qu'on veut. Il débloque la LUNETTE 1917.
  La musique attend son fichier : le crochet `musiqueRefuge` est en place.
- Le sol du refuge est un vrai sol : sans cela le plancher des 26 m
  s'appliquait au-dessus et le terrain restait physiquement inaccessible.
- **Les montagnes.** Un anneau de crêtes à trois kilomètres, hautes de 100 à
  230 m, franchissables, rien dans l'axe de la piste.
- **Remuer suffit.** On mesure la VARIATION du manche, pas sa position : gigoter
  fait retomber la visée adverse. Il n'y a plus besoin d'une figure pour
  obtenir un répit.
- Les murs percés (le U et le double) deviennent un seul volume extrudé : les
  arêtes de contact entre boîtes empilées, qui ne disaient rien, disparaissent.
- Le gardien vire moins et va plus vite : intercepteur lourd, plus poursuivant
  universel.


## Correction : le sol ne s'arrête pas

Je lui ai dit qu'à 18 km il volait au-dessus du noir. C'est FAUX, et il l'a
relevé. `grid.position` est recalée sur l'avion à chaque image, arrondie au pas
de 160 m : la grille suit le joueur et le sol est donc infini.

Ce qui s'arrête vraiment, mesuré sur la carte fixe :

| Ce qui est posé | Le plus loin du centre |
|---|---|
| Bâtiments à figure | 1 908 m |
| Arches | 2 110 m |
| Pylônes | 2 765 m |
| Tours percées | 2 939 m |
| Montagnes | environ 3 100 m |
| Refuge | 3 913 m |

Donc tout le monde habité tient dans 3 km, le refuge est le seul objet au-delà,
et à 18 km il y a de l'herbe et rien d'autre. Les montagnes sont bien le bord
visible du monde : ce qu'on franchit pour aller voir s'il y a quelque chose.

## v0.89 — la Grande Ourse montre le refuge

C'était la question ouverte : que donne le chariot, en plus des points et du
viseur ? La réponse est dans ce qu'il fait depuis toujours dans le vrai ciel.
Il sert à se repérer.

- **Le chariot tracé pose le refuge sur la boussole**, en petit chevron, et lève
  les trois minutes d'attente. C'est le seul repère du monde qui ne s'affiche
  pas d'office. Les deux secrets sont donc liés : le ciel donne le sol.
- **Le pilote descend de l'avion** au refuge. Même silhouette que les hommes du
  terrain, un mètre quatre-vingts : on découvre qu'on a leur taille. Il fait le
  tour de la cellule en s'arrêtant sur le moteur, l'aile, le train.
- **Une nappe très basse** au refuge, quatre voix tenues avec un battement
  lent, montée en trois secondes et demie. Elle tiendra la place jusqu'à ce
  qu'il envoie la sienne.
- L'aide dit qu'il y a des choses cachées, et ne dit pas lesquelles. Trois
  indications, pas une de plus.
- Les blocs de la bande du haut ne se chevauchent plus quand un nombre
  s'allonge.

## v0.90 — les montagnes sont dures

Vingt crêtes de 102 à 233 m, soit environ la moitié du plus haut pylône, comme
demandé. Chacune est un cône : la hauteur du sol sous l'avion vaut
h × (1 − d/r), et l'on ne descend pas dessous. Raser une crête coûte 4 points,
moitié moins qu'un mur : c'est de la terre, pas du béton.

Mesuré : au-dessus du sommet d'une crête de 229 m, l'avion est ramené à 230 m
et perd 6 points ; à deux rayons et demi de là, rien.

## v0.91 — le sol redevient opaque

Il l'a vu tout de suite : le sol était transparent. C'est la contrepartie de la
voûte fermée sous l'horizon de la v0.86. La grille n'est faite que de traits,
donc les étoiles du dessous se voyaient au travers et la terre paraissait
percée. Une nappe pleine de la couleur du fond, glissée à 60 cm sous la
grille, arrête tout ce qui est dessous sans ajouter un seul trait à l'image.
Elle suit la grille, qui suit l'avion.

Trois corrections d'écran, mesurées sur 430, 390 et 360 px de large :

- La pastille du défi passait par-dessus FLY OR DIE. Le panneau se décale de
  62 px plus la marge de l'encoche : la pastille finit à 47, le titre commence
  à 62.
- DÉCOLLER remonte au-dessus de l'avion, à 331 px sur 932, au lieu du bas de
  l'écran.
- La ligne de série tenait sur deux lignes et cassait la mise en page. Elle
  dit maintenant les deux seules choses utiles : le nombre de jours, et le
  plafond.

## v0.92 — le relief, le cadrage, et une longue liste

- **Le terrain lui-même se soulève.** Plus de pyramides posées sur un plancher :
  chaque sommet de la grille reçoit une altitude, nulle jusqu'à 2 400 m du
  centre et à pleine amplitude au-delà de 5 600 m, jusqu'à 240 m de dénivelé.
  La hauteur est une somme de trois ondulations de périodes incommensurables :
  le motif ne se répète jamais et rien n'est stocké. La grille se rebâtit au
  franchissement d'une case de 160 m. Le sol dur, lui, lit la même fonction.
- **La caméra ne perd plus l'avion.** Pendant une figure, on ajoute en dernier
  le strict nécessaire pour le ramener dans les 55 % centraux de l'écran. Le
  ressort garde tout son retard, c'est lui qui donne le mouvement.
- **Le décollage se filme à vitesse constante.** L'écart se referme de 24 m par
  seconde quoi qu'il arrive, au lieu d'un ressort qui se jette sur l'avion.
  L'appareil prend l'avant, la caméra revient régulièrement.
- **Nez sous l'horizon, on accélère toujours.** Au-dessus de la croisière le
  rappel moteur dépassait le gain de la pesanteur à faible piqué : on
  descendait en ralentissant.
- **Le décrochage passe de 31° à 80°.** On ne décroche plus qu'à la verticale.
- **Le sol ne plafonne plus d'autorité.** Un coussin de 14 m où la reprise
  croît comme le carré de l'enfoncement, sans bruit ni dégât.
- **Plus de départ automatique** quand on est posé : c'est le bouton, et lui
  seul. Tant qu'on reste, ils réparent.
- **La vie du terrain.** Cartes, promenade, bricolage dans le hangar, bord de
  piste, sieste : chacun choisit et change au bout de sept à vingt secondes.
- **Le bâtiment double est un seul volume**, percé de deux fenêtres. Plus une
  arête interne sur la façade.
- **Vénus a quatre longues pointes et quatre courtes**, au lieu d'un carré. Le
  chariot se trace en permanence, très faiblement, pour être trouvable.
- **Le ciel n'est plus un miroir.** Il avait raison : le dessous était le reflet
  du dessus. Depuis que le sol est opaque, il ne sert plus à rien.
- **La fenêtre de Vénus passe de 2 à 6 secondes** après une figure : il fallait
  tenir une seconde et demie dans une fenêtre de deux, donc c'était injouable.
- **Les statistiques passent derrière un bouton**, RAPPORT DE VOL, qui ouvre un
  panneau défilant. L'écran de fin ne débordait plus.
- **Les phrases ironiques disparaissent** de l'écran de fin. À la place, une
  chose vraie et utile sur la partie qui vient de finir.

## v0.93 — le ciel redevient un ciel

Il a dessiné sur une capture la ligne de symétrie et les deux zones d'étoiles
qui se répondaient : le reflet sous l'horizon était visible, et le plan du
miroir passait à la hauteur de l'oeil, donc AU-DESSUS de l'horizon apparent.
C'était moche et c'était faux.

- Le reflet est supprimé. Sous l'horizon il n'y a rien à voir, et c'est
  correct : ce qu'il y a sous l'horizon, c'est la Terre. La nappe opaque du
  sol (v0.91) s'en charge, et elle déborde largement du dôme d'étoiles, donc
  aucune bande noire ne revient.
- La Grande Ourse ne brille plus plus que les autres et n'est plus tracée en
  permanence. Une constellation se reconnaît à sa forme, pas à l'éclat de ses
  étoiles : la chercher fait partie du plaisir. Ses sept étoiles ont la taille
  des autres étoiles de première grandeur.

## v0.94 — le posé, l'écran de titre

- **Un posé ne coûte plus rien.** Il pouvait reprendre jusqu'à trente-quatre
  points : on revenait se faire soigner et on repartait plus bas qu'en
  arrivant. La note du posé reste affichée, elle ne prélève plus rien.
- **L'écran de titre ne pose qu'une question** : « Tiendras-tu dix vagues ? ».
  Le texte d'histoire tenait trois lignes et poussait DÉCOLLER en plein milieu
  de l'avion.
- **Le défi du jour descend dans la bande du bas**, moitié-moitié avec MENU.
  Il ne dit plus que son nom : le pacte explique le reste. Mesuré sur 430 px :
  203 et 201 pixels.

## v0.95 — le faucheur, et les sons retenus

- **Le faucheur a enfin sa maquette.** Il reprenait celle du gardien agrandie :
  on croyait voir un gardien, alors que c'est la seule chose du jeu qui ne vient
  pas du même monde que nous. C'est maintenant un disque épais de seize mètres,
  dix-huit côtés, avec un plateau, une tranche, une bombe au-dessus et un cône
  dessous. Cinquante-six sommets, cent huit faces, généré plutôt qu'écrit.
  Il ne rejoint aucune vague et ne figure pas dans le hangar.
- **LE SEUIL** remplace l'AUM au passage d'un portail, retenu sur banc d'essai
  contre cinq autres. Le petit courant d'air qui l'accompagnait est retiré.
- **LA CLOCHE SOURDE** ouvre chaque vague, et marque aussi les deux secrets du
  ciel, la mission remplie et l'arrivée au refuge.

## v0.96 — la montée, et Vénus au portail

- **Quatre-vingt-cinq degrés en liberté.** La butée était à 85 et la gêne
  commençait à 80 : les cinq derniers degrés se payaient, donc la chandelle
  franche était toujours contrariée. Butée à 88, gêne à 84.
- **Un portail franchi ouvre la fenêtre de Vénus**, comme une figure. Sortir
  d'un portail à pleine poussée et trouver l'ouest dans la foulée se tente
  naturellement : on est catapulté, on a de la vitesse, on lève les yeux.
- L'aide précise où sont les deux astres : le chariot au nord, Vénus à l'ouest,
  basse sur l'horizon, comme dans n'importe quel ciel du soir.

## v0.97 — le soleil, la montée, les montagnes

- **Le soleil est plein.** Ses méridiens et parallèles étaient déjà posés dans
  le repère du monde, donc horizontaux. Ce qui donnait l'impression qu'il
  pivotait, c'est qu'on voyait sa FACE ARRIÈRE par transparence : les deux
  moitiés se superposaient et le réseau semblait bouger. Une sphère pleine de
  la couleur du fond, glissée sous le filaire, cache l'arrière.
- **Plus de vacillement en montée.** Le lacet et le roulis erratiques au-delà
  de quatre-vingts degrés traînaient longtemps après la remise à plat. C'était
  une punition déguisée en réalisme. Supprimés. Ce qui reste pour décourager la
  verticale suffit : on perd de la vitesse en montant, et trop lent, le nez
  retombe seul. Son alternative — garder le vacillement mais qu'une figure
  l'annule — reste faisable s'il la préfère.
- **Les montagnes passent de 240 à 420 m.** Elles ne peuvent pas être abattues,
  et c'est volontaire : ce n'est pas un bâtiment, c'est le sol.
- **Le viseur disparaît au sol** : roues sur le bitume, en réparation, au
  refuge ou pendant les douze premiers mètres du décollage.
- Le libellé de la v0.96 disait « rien ne s'y oppose », ce qui pouvait se lire
  comme « personne ne tire ». Corrigé : « le manche accepte 85° de cabré ».

## v0.98 — le niveau sonore

Les deux sons du monde, la porte franchie et la vague qui s'ouvre, sonnaient
quatre à cinq fois plus fort que l'appareil qu'on pilote et couvraient donc la
seule chose qu'on entend en permanence. Leur partiel le plus fort vaut
maintenant exactement le gain du moteur, 0,056, sous le nom `SON_NIVEAU`.
Tout ce qui doit sonner comme l'avion et non par-dessus s'y alignera.

## v0.99 — le manche, les étoiles, le relief, le faucheur

### Le plafond invisible de quarante-neuf degrés

Il disait ne pas pouvoir dépasser 45 à 50° en montée stabilisée, et ne plus
pouvoir déclencher le décrochage. Les deux venaient de la même ligne :

    if (state.speed < STALL && state.pitch > 0)
      state.pitch = damp(state.pitch, 0, 2.2 * (STALL - state.speed) / 14, dt);

Une montée stabilisée fait toujours tomber la vitesse au plancher (46 m/s), et
`STALL` vaut 58 : le rappel tirait donc en permanence vers l'horizontale à
1,89 rad/s, contre 1,62 rad/s de plein manche. Les deux s'équilibraient à
0,86 rad — **49,3 degrés**, exactement le mur décrit. Et comme le décrochage
demande `pitch > 80°`, il était inatteignable.

Le rappel vise maintenant `DECRO_ANGLE` au lieu de zéro, et ne s'exerce
qu'au-dessus. **Mesuré** : plein manche tenu douze secondes depuis le palier,
l'assiette atteint **87,3°**, le compteur de décrochage monte, l'alarme sonne
et la vrille part à 9,2 s. En dessous de 80°, plus rien ne s'oppose au manche.

### Le vacillement revient, sans le lacet

Ce qui le rendait insupportable n'était pas la secousse mais le **lacet** :
libre, jamais rappelé, chaque embardée restait acquise et il fallait rattraper
le cap à la main. Le roulis, lui, est rappelé vers le virage à 9/s : il tremble
et se recentre seul. Le vacillement ne porte donc plus que sur le roulis,
l'assiette et la vitesse. `PEINE_ANGLE` descend de 84 à **72°** pour qu'il se
sente, et `figSortie` — six secondes après chaque figure — l'annule.

### La Grande Ourse se prend dans le viseur

`OURSE_CONE` passe de 4,2° à **10°**, la demi-ouverture du viseur dessiné
(24 px à l'échelle 2,6 sur 844 px de haut à 62° de champ), et `OURSE_TENUE`
de 0,35 à **2 secondes**. L'étoile du Berger passe de 3,4 à 7°.
**Mesuré** : étoile tenue à 10° du centre, prise en 2,00 s ; au-delà de 25°,
rien. C'est bien « dès qu'elle entre dans le viseur », pas « au centre ».

### Le relief était transparent

La nappe pleine est posée à −0,6 m : elle arrête ce qui est *sous* le sol, et
rien d'autre. Le relief monte à plusieurs centaines de mètres et une grille
n'est que des traits — les crêtes lointaines se voyaient intégralement au
travers des crêtes proches. D'où l'enchevêtrement sans profondeur.

`batisRelief()` construit une surface pleine triangulée qui **suit la carte de
hauteur** (53×53 sommets, 5 408 triangles, rebâtie avec la grille tous les
160 m), de la couleur du fond, écrite dans le tampon de profondeur, glissée
2 m sous les traits avec `polygonOffset`. Elle n'ajoute pas un trait : elle
efface ce qui est derrière une montagne.

`TERRAIN_H` passe de 420 à **980 m**. Le creusement en u² fait la répartition :
**mesuré sur 14 641 points**, moyenne 175 m, sommet **925 m** — soit 2,8 fois
la plus haute tour (330 m), et il reste 1 475 m sous le plafond.

### Le faucheur se découvre à mi-vie

**Mesuré** : première moitié, 100 points de dégâts enlèvent 100 pv. Au
franchissement de 2 000 pv, `phase2` bascule, blindage ×8, vitesse 230 → 690,
braquage 0,42 → 0,84 rad/s. Seconde moitié, les mêmes 100 points n'enlèvent
plus que **12,5 pv**. Le changement est annoncé et sonné : on entend le moment
où la barre change de règle.

Tous les dégâts passent désormais par `blesse(e, degats)` — canons, ailier,
roquettes, fusil du refuge, coopération — seul endroit où le blindage peut
s'appliquer sans en oublier une source.

### Le trait pointillé des adversaires disparaît

Trois adversaires alignés, c'étaient trois traits en travers de toute l'image,
par-dessus le viseur et la cible qu'on visait. Ce qu'il faut savoir tient
maintenant **sur l'adversaire lui-même** : son cadre de désignation s'épaissit,
s'éclaire et bat à mesure qu'il se cale, et reste muet si un mur coupe la ligne
de vue. Le son prévient toujours quand il est derrière.

### Le son, corrigé dans l'autre sens

Aligner la cloche et le seuil sur le gain du moteur (v0.98) les a rendus
inaudibles, et c'était une erreur de physique : à amplitude égale, un son de
73 Hz s'entend environ 25 dB moins fort qu'un son de 1 kHz (courbes
isosoniques, ISO 226:2023), et le haut-parleur d'un téléphone ne reproduit
quasiment rien sous 200 Hz. Le fondamental grave ne sortait pas de l'appareil.

Deux corrections : `SON_MONDE = SON_NIVEAU × 4`, **et** des partiels dans la
bande que le téléphone sait produire — la cloche reçoit 220, 293,6 et 440 Hz
(4ᵉ et 6ᵉ harmoniques du même 73,4), le seuil reçoit 330 et 440. Le caractère
grave est conservé, c'est l'octave audible qui le porte.

Le vieux `SFX.vagueNette()` — 620 / 830 / 1244 Hz — qui traînait encore sur les
passages de tour et d'arche est supprimé.

### Les annonces disent ce qu'elles font

`announce(titre, sous)` accepte une seconde ligne, plus petite. La Grande Ourse,
l'étoile du Berger et la fente en diagonale l'utilisent.

## Reste à faire

- La musique du refuge : fichier attendu.
- La planche cockpit : mise en page à revoir, option « viseur et instruments »,
  instruments fonctionnels.
- Le tonneau : la caméra ne lui convient toujours pas — questions posées.
- Adresse de la liste bêta (`CONTACT_MAIL`), sa carte dessinée, nom de domaine
  et SIREN pour le portfolio.

## v1.00 — Orion, la chaîne, le relief opaque, le refuge au loin

### Le relief était vraiment transparent, et ce n'était pas la nappe

La v0.99 avait ajouté une surface pleine suivant la carte de hauteur. Elle
n'occultait presque rien : **mesuré, 1,3 % des traits cachés** sous l'horizon.
Le coupable n'était ni la surface ni son décalage, mais le **plan proche de la
caméra**.

La précision d'un tampon de profondeur ne dépend pas de la portée mais du
rapport `far/near`. À 0,5 / 7000 ce rapport vaut quatorze mille, et la
résolution en profondeur vaut

    Δz ≈ z² · (far − near) / (near · far · (2²⁴ − 1))

soit **1,07 m à trois kilomètres et 2,99 m à cinq**. La nappe glissée deux
mètres sous les traits passait donc sous le grain du tampon : les crêtes
lointaines traversaient les crêtes proches.

Rien n'est jamais à moins de trois mètres de la caméra — elle vit vingt-six
mètres derrière l'avion. `near` passe de 0,5 à **3** : le rapport tombe à
2 333 et la résolution est six fois meilleure partout. Le décalage
géométrique passe à 4 m et `polygonOffset` à 3 / 6 — lui suit la pente, donc
il donne le plus de marge exactement là où il en faut : sur une crête vue de
biais.

**Mesuré à position épinglée, deux mesures par état** : dans la bande des
crêtes lointaines, 2 455 pixels allumés sans la nappe contre 1 828 avec —
**25,5 % des traits cachés**, et la comparaison des deux captures montre le
fouillis du fond entièrement effacé.

### La chaîne devient une ceinture

Le relief montait et ne redescendait plus : tout ce qui était au-delà de la
ville était montagne, pour toujours. On ne pouvait donc rien poser dehors, et
le refuge se retrouvait dans la roche. L'enveloppe est maintenant une cloche —
plate jusqu'à 2 400, pleine amplitude de 5 600 à 7 200, retombée jusqu'à
8 800, plate au-delà.

**Mesuré, maximum sur huit azimuts** : 3 km → 71 m, 5 km → 612 m,
6,5 km → 650 m, 7,5 km → 455 m, 8,5 km → 51 m, 9 km → 0 m.

Le refuge part à **dix kilomètres** plein ouest. **Mesuré** : distance
10 005 m, hauteur du sol sous lui **0 m**. Deux minutes de vol à la croisière,
on franchit la crête, et il n'y a plus que la plaine.

### Le tonneau : la caméra ne suivait qu'un axe sur deux

Le pas **latéral** de l'hélice était donné à la caméra avant le ressort ; le
pas **vertical** ne l'était pas. Or la barrique monte de 2 × TONNEAU_VERT, soit
soixante-quatorze mètres, et redescend, en 1,7 s. Un ressort de raideur 44 a
une période propre de 0,95 s : il ne peut pas suivre.

**Mesuré à l'écran, 103 images** : l'avion sortait du cadre sur **62 d'entre
elles**, jusqu'à y = −331 000 px. C'est exactement ce que « l'avion disparaît
de l'écran » voulait dire, et je ne l'avais jamais mesuré.

La caméra reçoit le pas vertical comme le pas latéral, moins un dixième qu'on
laisse filer. **Après** : 3 images hors cadre sur 92, toutes au tout début, et
l'avion reste entre y 342 et 632 sur 932.

### Orion, troisième figure du ciel

Sept étoiles, plein sud, à 34° de hauteur : Bételgeuse, Bellatrix, le Baudrier
(Mintaka, Alnilam, Alnitak), Saïph, Rigel. Les proportions sont les vraies. On
la trace comme le chariot, étoile après étoile, chacune tenue deux secondes
dans le viseur — mais il faut faire demi-tour, puisque le chariot est au nord.

Elle donne ce qu'un chasseur donne : **la chasse**, vingt-cinq secondes de
canons doublés et de cône de verrouillage doublé. Et elle **se reprend** :
une fois tracée, tenir Bételgeuse trois secondes la rallume, autant de fois
qu'on veut. C'est la seule des trois qui soit une fenêtre et non un acquis —
il faut donc avoir des cibles sous la main au moment de la prendre.

**Mesuré** : 7 étoiles sur 7, 2,0 s chacune. Dégâts par seconde 71,9 sans,
**143,8 avec** — rapport 2,00. Cône à 400 m : 1,988° sans, **3,976° avec** —
rapport 2,00. Viseur BAUDRIER débloqué.

Au passage, `debloqueViseur()` annonce lui aussi et passait **après** : on
lisait « VISEUR DÉBLOQUÉ » à la place du nom de la constellation. Corrigé pour
les trois.

### La chaîne de portails

Chaque portail pris dans les neuf secondes du précédent monte d'un cran, et le
cran multiplie le coup de pied comme la durée de la poussée.

**Mesuré** : cran 1 → +60 m/s et 2,0 s de poussée ; cran 2 → +84 et 2,8 ;
cran 3 → +108 et 3,6 ; cran 4 → +132 et 4,4 ; cran 5 → +156 et 5,2.

Et passer un portail **fait perdre la main**. Traverser au ras du béton est le
geste le plus exposé du jeu : on vole droit, dans un couloir. Il fallait que ça
rapporte de la sécurité, pas seulement de la vitesse. **Mesuré** : visée
adverse 5 → 0, roquettes déjà en vol encore verrouillées 1 → 0, recharge
roquette bloquée 7 s.

### Les leurres quittent le bimoteur

Sur l'appareil de départ ils rendaient les roquettes adverses sans conséquence
dès la première vague. Ils passent sur l'intercepteur, qui se gagne, et là ils
sont une raison de le choisir. **Mesuré** : bimoteur 0, intercepteur 6.

### Le moteur ne bat plus

L'écart entre les deux cylindres était multiplié par jusqu'à 4,5 quand la
cellule était abîmée : les deux voix se désaccordaient et le moteur battait.
L'information est déjà partout — la jauge, les impacts, l'alarme — et le prix
était le seul son qu'on entend en permanence, gâché pendant la moitié de la
partie. L'écart redevient constant.

### Le menu

NOUVELLE PARTIE en première ligne : il fallait mourir ou fermer l'application
pour recommencer. Et la mise à jour passe **juste sous le numéro de version** —
c'est le même sujet, et elle était dix lignes plus bas, loin de la seule
information qui dit si elle a servi. Au retour du rechargement, le menu se
rouvre tout seul, le numéro sous les yeux.

**Mesuré** : version en ligne 12, mise à jour en ligne 13, collées. NOUVELLE
PARTIE remet le score de 12 345 à 0, la vague de 7 à 0, relance le décollage
et ferme le menu.

## Reste à faire

- La musique du refuge : fichier attendu.
- La planche cockpit remaniée (écran en haut, curseurs, explications, cadrans
  fonctionnels) : à relire.
- D'autres constellations encore : Cassiopée au nord-est, la Croix du Sud.
- Adresse de la liste bêta (`CONTACT_MAIL`), sa carte dessinée, nom de domaine
  et SIREN pour le portfolio.

### Le trajet du refuge devait être calme

À dix kilomètres, s'y rendre déclenchait le faucheur à tous les coups :
`FUITE_DIST` vaut 3 500 m et le compteur monte dès qu'on dépasse. Au-delà de
`TERRAIN_R3`, on n'est plus en train de se dérober au combat — on est sorti de
la carte. Le compteur ne monte plus là-bas et redescend deux fois plus vite.

**Mesuré** : posé au refuge à 10 010 m, `refuge` actif, compteur de fuite 0 s,
faucheur non lâché, refuge visible à l'approche. Compteur placé à 30 s puis
trois secondes passées dehors : il retombe à 23,9 s.

**Test de bout en bout** : dix-huit secondes de vol réel au doigt, deux vagues,
faucheur lâché, quatre adversaires en l'air, aucune erreur JavaScript, 34
images par seconde en rendu logiciel.
