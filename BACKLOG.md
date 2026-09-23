## LA FILE

Les cases vides se lisent avec `grep -c "^- \[ \]" BACKLOG.md`. Tant que le
compte est supérieur à zéro, le tour ne se termine pas — voir `CLAUDE.md`
règle 1. Une nouvelle demande s'ajoute ICI et ne remplace rien.

- [x] L'approche stabilisée, d'après les vrais atterrissages → v1.70 (2 posés sur 3)
- [x] Le passage sous la piste → v1.70
- [ ] Débloquer un avion verrouillé depuis le menu, contre une vidéo adaptée
- [x] L'approche : le cas « arrivé haut et vite » → v1.72, à revérifier au banc
- [x] Le passage sous la piste → RETIRÉ en v1.73, sur demande
- [x] La lune : booléen de deux cercles, un croissant propre → v1.73
- [x] Les essais tournent tout seuls à chaque poussée → v1.73
- [x] Des bonshommes dans les casemates du tunnel → v1.71 (9 salles, 22 silhouettes)
- [x] Voir le tunnel de bout en bout → déjà vrai, mesuré : zéro segment au centre
- [x] Un léger ralenti au-delà de 400 m/s → v1.71

---

# Fly or Die — idées en attente

Ce fichier existe pour qu'aucune idée dite en passant ne se perde. Dès qu'une
nouvelle idée est mentionnée en conversation (même en une phrase, même pas
prête à être codée), elle est ajoutée ici avant d'être oubliée. Rien n'est
retiré quand une idée est implémentée — noter "→ fait en vX.Y" à la place.

---

# EN RETARD — à faire avant toute nouvelle idée

La lune (v1.65), le jeu de piste (v1.66) et l'arche du sommet (v1.69) sont
sortis.

### Demandes traitées en v1.67 et v1.68

— Les neuf appareils du hangar répondent au nez. Quatre carcasses adverses
  n'avaient aucun identifiant : le nez passait dessus et il ne se passait
  rien.
— Le T de l'aire à signaux est tourné vers la bouche du tunnel, et la flèche
  du quatrième carré est retirée. Écart mesuré : 0°.
— Dépasser le hangar au roulage : 1,01 s de retour au lieu de quatre à cinq,
  avec ATTERRISSAGE DE COLONEL.
— La barre de vie vaut le plafond : pleine au départ, elle s'allonge de 92 à
  168 pixels. Plus de zone vide à droite.
— Ce qu'on voit est ce qu'on passe : MARGE_TROU 1 au lieu de 7 pour ce qui
  borde une ouverture. Arche 82 → 94 m utiles pour 96 dessinés ; fenêtre de
  tour 31,5 → 43,5 pour 45,5.
— La roquette esquivée croise devant le nez.
— L'épave s'ouvre 1,1 s avant l'écran de fin.
— Horizon fantôme, d'après le HUD du F-16 : pas un seuil d'angle, une
  condition — dès que l'horizon quitte l'écran. Mesuré sur 430×932 : il sort
  par le bas vers 47° de caméra, par le haut vers 22°.
— Zénith et nadir marqués, altimètre en centaines sur deux chiffres à droite
  du trait, et le plancher du faucheur repéré sur la bande.

Ces demandes ont été écrites, puis repoussées onze versions de suite
parce que chaque nouvelle demande arrivait plus courte et passait devant.
Elles sont ici, en tête du fichier, pour qu'aucun arbitrage ne puisse plus
les faire perdre.

## 1. L'approche stabilisée, d'après les vrais atterrissages

Demandé depuis la v1.42 (tâche #44), redemandé explicitement.

Ce qui est attendu : un travail de recherche sur la manière dont un avion se
pose VRAIMENT — vitesses d'approche et leur rapport à la vitesse de
décrochage, plan à trois degrés, assiette tenue, réduction de puissance comme
seul moyen de descendre, longueur de la finale, arrondi, toucher, roulement.
Puis la traduction en jeu : assiette constante, nez près de l'horizon,
descente par réduction lente de la puissance seulement, finale longue et
douce depuis l'entrée du tube, PAPI toujours visible et respecté, reprise en
main possible d'un coup de manche franc.

État : rien n'est fait. Le tube tient l'axe, la pente et la vitesse, mais
c'est un rail, pas une approche.

## 2. La lune remplace le soleil → fait en v1.65

Ce qui était décidé, et qui est maintenant en production :

— Croissant à la place du soleil. **Fait** : figure plate tournée vers la
  caméra, limbe éclairé + terminateur, quatre cratères qui disparaissent un à
  un dans l'ombre, et le reste du disque en lumière cendrée. La couronne du
  soleil a sauté.
— On garde la traversée (bouclier) et l'étoile filante. **Fait**, avec une
  exception mesurée plus bas.
— L'éblouissement quitte le jeu ordinaire et devient la règle de la
  chenillée lourde. **Fait**, avec décompte à l'écran.
— L'éclipse disparaît. **Fait** — le code de triche ECLIPSE lève désormais la
  pleine lune une minute au lieu d'éteindre l'astre.
— La phase est l'horloge et éclaire de MOINS EN MOINS. **Fait**.
— Le Berger lève la pleine lune vingt secondes. **Fait** — et c'est elle qui
  aveugle les adversaires, exactement comme le faisait le lever du jour.

### Mesuré en navigateur

Phase : vague 1 → 1,000 · vague 5 → 0,556 · vague 9 → 0,150 (plancher).
Elle est calée sur `CHAPITRE` (10), pas sur quinze : une partie s'arrête à la
dixième vague, et calée sur quinze la lune en était encore aux deux tiers
quand le faucheur sortait.

Opacité du trait : 0,700 à la vague 1, 0,504 à la 5, 0,326 à la 9. Le Berger
la ramène à 0,700 depuis 0,326.

Règle de la chenillée, quatre cas :

| situation | décompte max | vie | issue |
|---|---|---|---|
| chenillée, nez dans la lune 7 s | 5,00 s | 100 → 0 | détruit |
| chenillée, 4 s puis on détourne | 4,07 s | 100 | rien |
| chenillée, lune dans le dos 7 s | 0 | 100 | rien |
| pas de chenillée, nez dedans 7 s | 0 | 100 | bouclier doré |

### UNE DÉCISION PRISE SEUL, À CONFIRMER

Les deux règles se contredisaient en production. Tenir la lune en plein
centre arme le bouclier doré à 2,5 s, et le bouclier éteignait le décompte :
foncer dessus À FOND était donc le seul moyen de ne pas mourir de foncer
dessus. Mesuré : le décompte plafonnait à 2,52 s et ne tuait jamais.

Tranché ainsi : **tant que la chenillée lourde est là, la lune ne donne plus
de bouclier.** « La seule défense est l'astre dans le dos » ne souffre pas
d'exception, et un bouclier est une armure contre le plomb, pas contre
l'aveuglement. Hors vague 9, la traversée est inchangée.

L'autre choix possible était : le bouclier protège aussi de l'aveuglement, et
la règle ne s'applique qu'entre 0,55 et 0,98 d'alignement — c'est-à-dire
qu'on meurt en visant À PEU PRÈS la lune et qu'on survit en la visant
parfaitement. À dire si c'est ce qui est voulu.

## Les casemates habitées → fait en v1.71

Neuf salles, vingt-deux silhouettes debout — deux ou trois par casemate,
alternées. Vérifié numériquement : 328 segments dans le maillage des salles,
soit 9 × 12 pour les pièces et 22 × 10 pour les hommes, aux hauteurs y0+1 à
y0+17 et dans la profondeur des salles (65 m = 31 de boyau + 34 de casemate).

Ils ne bougent pas, ne tirent pas, ne comptent pas. À deux cents mètres par
seconde ils durent un dixième de seconde dans le champ.

## Voir le tunnel de bout en bout → déjà vrai, mesuré

Le boyau est creux et le sol est percé aux deux bouches. Mesuré depuis
l'entrée, dans l'axe : **zéro segment de décor ne traverse la boîte centrale
de 60 × 60 pixels**, sur 3 398 segments visibles. Ce qui paraissait plein au
fond, ce sont les soixante cintres qui convergent AUTOUR de l'ouverture.

## Le ralenti de haute vitesse → fait en v1.71

Rien jusqu'à 400 m/s, un sixième de moins à 600. Mesuré, mètres parcourus par
seconde réelle :

| vitesse | m/s réels | rapport |
|---|---|---|
| 200 | 201 | 1,004 |
| 400 | 400 | 0,999 |
| 500 | 456 | 0,912 |
| 600 | 497 | 0,828 |
| 700 | 579 | 0,828 |

## 0. L'approche stabilisée → fait en v1.70

### La recherche, sourcée

— Vitesse de présentation : **1,3 × la vitesse de décrochage** (FAA InFO23001,
  définition des catégories d'approche). Décrochage 46 → finale 60.
— Plan : 3°. Taux de chute = vitesse × sin 3° = 3,1 m/s à 60 m/s.
— Approche stabilisée (Flight Safety Foundation, ALAR note 7.1) : à 500 pieds
  à vue, sur le plan, vitesse entre Vref et Vref + 20 kt, taux de chute
  ≤ 1 000 ft/min (5,08 m/s), configuration d'atterrissage.
— Arrondi : une dizaine de mètres sol, taux résiduel de l'ordre du demi-mètre
  par seconde au toucher.

### Ce qui n'allait pas, mesuré

**Trois approches sur trois ne se posaient pas.** Le tube descendait bien à 3°
puis l'appareil mettait à plat vers cent mètres sol et flottait :

| départ | pente en finale | vz en finale | posé |
|---|---|---|---|
| 2200 m, 110 m/s | −0,25° | +0,3 m/s | non |
| 1600 m, 130 m/s | +0,06° | +0,1 m/s | non |
| 2600 m, 95 m/s | −0,98° | +1,15 m/s | non |

Cause : **la loi commandait une assiette et attendait une trajectoire.** Nez à
−3°, pente réelle −0,25° : les trois degrés d'incidence que le modèle
d'énergie fixe n'étaient retranchés par personne. J'avais essayé la vitesse
verticale, ça ne se posait pas non plus, et j'étais revenu à l'angle en
croyant revenir à quelque chose qui marchait — les deux échouaient, je
n'avais jamais mesuré l'atterrissage lui-même.

**Et mon banc était faux aussi** : il tenait le manche à `aim.y = h × 0,45` en
permanence. Le tube lâche dès qu'on pousse, donc `state.assist` ne
s'enclenchait jamais et je mesurais du vol libre. J'ai failli publier un
correctif sur une mesure fausse.

### Ce qui est en place

Un **trim intégral** sur l'écart entre la pente réelle — relevée d'une image à
l'autre — et la pente voulue, multiplié par dt, donc indépendant de la
cadence. L'arrondi se déclenche à **11 m sol** et non plus à 80 m de distance.
La porte des 500 pieds dit ce qui cloche.

| départ | porte 500 ft | pente en finale | toucher | posé |
|---|---|---|---|---|
| 2200 m, 110 m/s | vz −11,9 | 3,93° | **−0,48 m/s**, axe | oui |
| 1600 m, 130 m/s | vz −6,2 | 1,80° | — | non |
| 2600 m, 95 m/s | vz −3,0 | 2,78° | **−0,51 m/s**, axe | oui |

Deux sur trois, avec des taux de toucher de manuel. Le troisième arrive
soixante mètres au-dessus du plan à 130 m/s : le tube ne le capture jamais
(`prise` 0,22), il arrive long et rapide. C'est le cas « non stabilisé » que
la porte annonce désormais — **reste à décider** si le tube doit le rattraper
ou si la remise de gaz doit être la réponse.

## Le passage sous la piste → fait en v1.70

Deux hangars à 560 m au nord, de part et d'autre du bitume, percés dans leur
pignon **extérieur** — celui qu'on ne voit jamais depuis la piste. Derrière le
trou, le plancher descend de +10 à −20 m, file sous la piste et remonte.
Vie en continu (16/s), coup de pied à la sortie, parois dures.

Vol d'essai : entrée à x = −576, fond à −8 m, sortie à x = +602, vie 100 →
232, vitesse 92 → **267** à la sortie.

**Trois murs invisibles ont dû tomber pour qu'un boyau puisse passer sous le
niveau zéro** : le filet `(plancher − 6) × (1 − pb)`, qui vaut zéro dans un
passage — juste pour un tunnel à 300 m d'altitude, faux ici ; le plancher
effectif, qui tombait à zéro ; et `else if (pos.y < SOL_Y) pos.y = SOL_Y`.

Et **un pylône de la carte était planté en plein milieu** à (174, −720). Axe
déplacé de −700 à −560, le seul couloir libre en travers du bitume — la carte
n'est pas touchée.

## 4. L'arche du sommet → fait en v1.69

Le plus haut point de la chaîne sur le cap du refuge : **(−6755, 60), 895 m**,
à 6 755 m du terrain, cap 269,5° — un demi-degré de l'axe exact.

Le relief y est arasé dans `math.js` même, pas décoré par-dessus : le sol du
jeu est UNE fonction, et la grille, le remplissage noir, le plancher des
adversaires et la collision la lisent tous. Disque plat de 120 m de rayon,
jupe de 70 m. Mesuré : 895,0 m au centre et jusqu'à 119 m, 890 à 130, 816 à
160, 722 à 189, 656 à 230.

Dessus, une porte de pierre en travers du cap : deux monolithes de 17 m, un
linteau de 14, ouverture 74 × 46. Et neuf pierres levées en cercle à 96 m.

Elle ne donne pas de vie, elle donne de la route : `vitesse × 1,7 + 130`.
Mesuré, nez dans l'ouverture à 150 m/s → 335 ; à 260 m/s → 500. En plein
monolithe (45 m d'écart) → buté. À côté de la porte (70 m) → ni mur ni boost.

Monter à neuf cents mètres pour la prendre est une décision, puisque c'est
aussi l'altitude où le faucheur voit.

## 3. Le jeu de piste → fait en v1.66

Les deux chiffres de piste sont repeints avec les caps du tunnel et du
refuge. C'est faux au sens de l'aviation — deux bouts d'une même piste sont
opposés à 180° — et c'est l'énigme : deux nombres qui ne collent pas à la
piste sont deux nombres qui parlent d'ailleurs.

### Ce qui est peint, et mesuré

| | cap réel | chiffre |
|---|---|---|
| bouche du tunnel, depuis le terrain | 48,7° | **05** au seuil de départ |
| refuge de la Grande Ourse | 270,0° | **27** au seuil avant |

Ce n'est plus 29 et 27 : le tunnel a déménagé en v1.64 et son cap a suivi.
Les deux chiffres se CALCULENT maintenant à partir de la carte, et le jeu
complet des dix chiffres a été dessiné — il n'y avait que 1, 3, 6 et 8, de
quoi peindre 36 et 18 et rien d'autre.

### Les deux portails

À 1 500 et 2 300 mètres plein ouest, sur z = 0, donc exactement sur le cap
du refuge. Pas à 3 km : à trois kilomètres la roche est déjà à soixante-dix
mètres et enterrerait la seconde arche jusqu'à la poutre. 2 300 m est le
dernier endroit plat.

Ils ne sont PAS dans `CARTE` : la carte se remplace par l'éditeur, et une
énigme qui disparaît quand on dessine son propre terrain n'est pas une
énigme. Ils sont ajoutés à la liste (`ARCHES_CARTE`), comme la grande tour.

Vol d'essai, cap 270 tenu à la main, sans corriger :

| | x | vie | vitesse |
|---|---|---|---|
| entrée | −600 | 100 | 150 |
| premier portail | −1 487 | +20 | 169 |
| second portail | −2 286 | +20 | 340 |

### Le pylône qui barrait

Un pylône de 327 mètres de haut se trouvait à **4 mètres** de l'axe du
couloir, pile entre les deux portails, avec une emprise de 26 mètres dans un
passage qui en fait 96. Décalé à 130 mètres de l'axe — c'était le seul objet
du couloir, et il n'est pas supprimé, il est écarté.

### La flèche

Un QUATRIÈME carré, vingt-six mètres au nord du T, avec une flèche. Le T
n'est pas détourné : il est réglementaire, il est juste, et il sert.

Mesuré : cap de la flèche 51,36°, cap réel vers la bouche du tunnel depuis ce
carré 51,36°, écart 0°. Elle se calcule elle aussi. Premier jet : elle était
calculée dans le repère LOCAL du groupe de l'aérodrome, décalé de (78, −320),
et pointait 1,5° à côté.

## Le tunnel, deuxième version → fait en v1.64

Trois défauts corrigés, et une limite qu'il faut assumer.

**Il était dans l'enfilade.** Le boyau courait bien perpendiculairement à la
piste, mais posé au cap 288 — c'est-à-dire presque dans le prolongement de
son propre axe. On arrivait du terrain en le regardant droit dedans. Le
calcul de placement ne cherchait que la roche et ignorait la direction
d'arrivée ; il la prend maintenant comme contrainte.

**Il était court.** 380 m, quatre secondes. Il en fait 1800, dix-neuf
secondes.

**PAS DIX FOIS PLUS, ET VOICI POURQUOI.** Le massif culmine à 980 m et ses
pentes sont douces. Balayage de tout le relief au pas de 50 m, pour chaque
longueur, en exigeant un boyau DROIT et HORIZONTAL dont les deux bouts
débouchent en l'air :

| longueur | roche au plus mince |
|---|---|
| 1500 m | 60 m |
| 1800 m | 62 m |
| 2200 m | 53 m |
| 2600 m | 36 m |
| 3000 m | 25 m |
| 3800 m | 35 m |

Le boyau fait 30 m de haut. En dessous de 45 m de couverture il crève la
surface. 1800 est donc le maximum praticable. Pour dix fois plus il faut un
relief plus haut et plus raide — c'est une autre décision, et elle touche
`hauteurSol`, donc tout le jeu.

**Il n'était pas creux.** Le maillage du sol passait au travers. Il se perce
maintenant là — et seulement là — où la surface traverse la tranche
d'altitude du boyau, c'est-à-dire aux deux bouches : une maille dont
l'emprise tombe dans le boyau et dont l'altitude croise sa tranche voit ses
trois sommets ramenés au même point. Le triangle n'a plus d'aire, rien n'est
dessiné, et le tampon ne change pas de taille. Ailleurs la montagne reste
pleine : pas de tranchée vue du ciel.

**Les salles.** Tous les 180 m, alternativement à gauche et à droite, une
casemate vide ouverte sur le boyau — 34 m de profondeur, 16 de haut. On ne
peut pas y entrer. On les voit défiler.

Mesuré : cap 57 depuis la piste, 6075 m, boyau au cap 147 donc perpendiculaire
à l'arrivée ; 31 m de roche au plus mince, 357 m au sommet ; bouches au sol à
287 et 299 pour un plancher à 300, donc les deux débouchent en l'air.
Traversée en 19,5 s, +273 de vie, 82 m/s dans le boyau et 142 à la sortie.

**Reste à faire :** les bonshommes dans les salles (elles sont vides), et la
vue à travers de bout en bout — à 1800 m la bouche opposée est trop petite
pour qu'on y voie les étoiles.

## 4. L'arche du sommet (idée neuve, non commencée)

Sur le cap du refuge, le premier sommet assez haut reçoit un petit plateau
plat, taillé en haut de la montagne — comme si quelqu'un l'avait aplani il y
a longtemps. Dessus, une arche, d'une facture plus ancienne que la ville :
la traverser catapulte vers le refuge.

L'idée est qu'on monte pour partir loin, au lieu de partir à plat. Et que
l'objet raconte que la route du refuge était connue avant nous.

À concevoir : la forme de l'arche ancienne (elle ne doit pas être la même que
les portails de la ville), la taille du plateau, ce que vaut la poussée, et
si elle se prend une seule fois ou comme les autres.

---

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

### Les montagnes transparentes — la vraie cause, enfin

Trois corrections successives n'avaient rien donné, parce que je cherchais au
mauvais endroit. Le plan proche, la précision du tampon, `polygonOffset` :
aucun n'était le coupable.

**La mesure qui a tranché** : peindre la nappe de relief en rouge sombre le
temps d'une capture. Elle couvrait exactement les montagnes, masquait
exactement ce qu'il fallait, et la silhouette des crêtes était nette.
**L'occultation marchait déjà.**

Ce qui ne marchait pas, c'est qu'elle était de la couleur **exacte** du ciel,
`COL_FOND`. Une montagne n'avait donc pas de corps : c'était un filet de traits
suspendu dans le noir, et on la voyait « au travers » parce qu'il n'y avait
rien dedans. Le mot était juste — elle était transparente — mais la cause
n'était pas géométrique, elle était picturale.

`COL_RELIEF = 0x07130e`, un vert très sombre à peine au-dessus du fond, plus le
brouillard, qui manquait aussi : sans lui une crête à cinq kilomètres a le même
corps qu'une crête à trois cents mètres et la profondeur disparaît.

Le vrai apport des trois corrections précédentes reste : le plan proche à 3 m
est juste, et `polygonOffset` était bel et bien nuisible — l'offset vaut
`factor × DZ + units × r`, et `DZ`, la pente en profondeur par pixel, est
énorme pour un sol vu à angle rasant. Il repoussait la nappe de plusieurs
centaines de mètres derrière elle-même. Mesuré avant retrait : −1,1 % de traits
cachés en plongée à 1 800 m. Après : 3,5 %.

### Le journal des versions

Chaque ligne portait son numéro : une mise à jour qui touche dix choses
écrivait dix fois « v1.00 ». Le numéro devient un **titre**, une seule fois, et
tout ce qui a changé sous lui se lit dessous. **Mesuré** : 100 blocs, aucun
numéro en double, dix lignes sous v1.00 et dix sous v0.99.

### Sa réponse sur le cockpit

    COCKPIT = nu        (viseur et instruments, aucune structure)
    OEIL    = 1.30
    CHAMP   = 57
    MONTANTS= 5

### La planche du cadrage du tonneau

Trois curseurs, l'écran en haut, les explications en bas :
https://claude.ai/artifact/AfBGfExBbk9zMDDWGAvptb

La figure y est figée à ses valeurs — 62 / 37 / 1 tour / 45° / 30 m / 1,70 s —
et la simulation reprend les formules du jeu : caméra à 26 m derrière, champ de
70°, écran de 430 × 932, soit 665 pixels par radian. Un écart de sept mètres
donne 175 pixels, un cinquième de la hauteur.

Ce qui reste à trancher :

1. `CAM_TONNEAU_VERT` — la part des 74 m de la cloche que la caméra laisse
   filer. Actuellement 0,10. C'est le seul réglage qui décide si la figure se
   voit ou se subit.
2. `CAM_ROULIS_TONNEAU` — de combien l'image bascule. Actuellement 24°.
3. `CAM_SERPENT` — la caméra part sur le côté et revient. Actuellement 3,5 m.

La planche affiche en direct l'écart maximal en pixels et le nombre d'images
hors cadre sur 92, donc chaque réglage se juge sur un chiffre, pas sur une
impression.

## v1.00 — le tonneau réglé, l'icône refaite, le refuge sous Vénus

### Ses trois valeurs

    CAM_TONNEAU_VERT   = 0.02
    CAM_ROULIS_TONNEAU = 5°
    CAM_SERPENT        = 4.0

La caméra suit donc la cloche à 98 % : il ne reste qu'un mètre et demi d'écart
au sommet, trente-sept pixels, un vingt-cinquième de la hauteur. Et l'image ne
bascule presque plus — c'est l'appareil qui tourne, l'horizon reste l'horizon.

### « Tu fais tourner l'avion autour de l'axe vertical »

Vrai pour la planche, faux pour le jeu, et la mesure tranche.

**Dans le jeu** : cap du nez mesuré image par image pendant toute la barrique —
**0,0° du début à la fin**. Aucun lacet. L'aile monte et descend (|Y| jusqu'à
0,76), le dessus du fuselage passe à −0,71 : l'appareil se met bel et bien sur
le dos. C'est un roulis autour de l'axe longitudinal, et rien d'autre.

**Dans la planche** : le bout d'aile décrivait une ellipse écrasée à 0,42 en
vertical — c'est-à-dire exactement ce que fait un disque tournant autour de la
verticale, vu de biais. D'où sa lecture, qui était juste. Vu de derrière, le
bout d'aile décrit un **cercle**. Corrigé, et la dérive aussi, qui était
dessinée à l'envers. La planche trace maintenant le chemin du bout d'aile :
l'hélice se voit, l'axe ne fait plus de doute.

### La caméra rentrait dans l'avion

Mesure du recul caméra–avion image par image pendant la figure : au **dixième**
de la barrique, la caméra tombait à **1,2 mètre** de l'appareil. Elle recevait
le pas de l'hélice posé à la main *et* le rappel du ressort qui court après le
même mouvement ; sur la rampe la plus raide de la cloche, le cumul refermait
tout l'écart d'un coup.

Butée à 16 m — 83 % du recul en vol établi, **mesuré à 19,2 m**. La caméra est
repoussée le long de son axe vers l'appareil : ni la direction ni le cadrage ne
changent, seulement la distance. **Après** : minimum 16,0 m au lieu de 1,2.

### L'icône

Plus de cadre arrondi dessiné à la main. L'icône est maintenant **une image du
jeu**, prise par la caméra du jeu : l'avion et les étoiles, fond noir, ni sol
ni bâtiments. Le rendu se fait par calques — le jeu remet `visible = true` sur
la grille et les traits de vitesse à chaque image, donc éteindre ne suffit pas,
alors que les calques, il n'y touche jamais. La caméra ne regarde plus que le
calque 1, où l'on n'a mis que la maquette et la voûte.

Le script est gardé dans `outils/rend-icones.mjs` : les icônes se refont à
l'identique quand la maquette changera.

### Le refuge est-il à la verticale d'Orion ?

Non — **mesuré** : Orion est entre 166° et 197°, plein sud. Le refuge est au
cap 270°, plein ouest. Il est à la verticale de **Vénus**, l'étoile du Berger,
qui se lève exactement à 270°.

Il héritait du z de la piste, soit 320 m de décalage — 1,8° d'écart à dix
kilomètres, imperceptible mais faux. `REFUGE.z = 0` : le cap vaut maintenant
**270,0°** exactement. Viser l'étoile, c'est viser le terrain.

C'est aussi ce qui sépare les trois secrets du ciel : le chariot montre le
refuge **sur la boussole**, Vénus le montre **dans le ciel**, et Orion ne
montre rien — elle donne.

### Le refuge a un nom, et il est écrit dessus

Le terrain n'a de nom nulle part : pas sur la carte, pas sur la boussole, et il
n'y a personne pour le dire. Il a maintenant son nom **écrit dessus**, en
lettres, sur un panneau planté devant la cabane — comme tous les petits
terrains du monde.

    REFUGE
    DE LA
    GRANDE OURSE

C'est la seule fois où le jeu nomme quelque chose sans qu'on le lui demande, et
il faut être venu jusqu'ici, à dix kilomètres, pour le lire.

Il a fallu un **alphabet au trait**. Les chiffres de piste sont des contours —
c'est juste, une marque peinte au sol est une forme pleine — mais à trente
mètres un contour double chaque jambage et devient illisible. Les lettres du
panneau sont donc des polylignes d'un seul trait, sur une grille de 6 × 10 :
`ALPHABET`, onze lettres, celles dont ce panneau a besoin. On en ajoutera
quand il y aura d'autres panneaux.

Le panneau est tourné vers la bande, sur deux poteaux, à hauteur d'homme : on
le lit en roulant. Les lettres font 1,3 m — deux degrés et demi à trente
mètres, quarante pixels de haut.

## v1.01 — cinq figures de plus, et la guitare

### Le ciel devient une table

La Grande Ourse et Orion ont chacune leur bloc écrit à la main. C'était tenable
à deux ; à sept, non. Les nouvelles figures sont des **données** — `CIEL_SUITE`
— où chaque entrée dit où elle est, comment on la prend, ce qu'elle exige
d'avoir déjà fait, et ce qu'elle donne. Ajouter une constellation, c'est
ajouter une ligne.

**Mesuré, dans le navigateur :**

| Figure | Étoiles | Prise en | Prime | Ce qu'elle donne |
|---|---|---|---|---|
| Polaire | 1 | 3,0 s | 1 500 | `pivot` — plus jamais de vrille |
| Sirius | 1 | 2,5 s | 1 800 | 20 s d'éblouissement adverse |
| Cassiopée | 5 | 10,1 s | 2 200 | vieMax 100 → **150**, réparation ×2 |
| Pléiades | 1 | 4,0 s | 2 600 | cône 1,99° → **1,39°**, dégâts ×1,3 |
| Croix du Sud | 4 | 8,1 s | 4 000 | éditeur de carte débloqué (`fod_carte_ok = 1`) |

Les deux verrous sont vérifiés : avant le chariot et avant Orion,
`polaire.ouvre()` et `sirius.ouvre()` valent `false` ; après, `true`. Trois
viseurs de plus — POLAIRE, CASSIOPÉE, CROIX DU SUD. Aucune erreur JavaScript.

### La guitare du passage

Une seule fois par partie, au franchissement de `TERRAIN_R3` vers le dehors.
Revenir puis repartir ne la relance pas : ce n'est pas une zone, c'est un
passage. Pendant qu'elle joue, tout le reste se tamise — pas coupé, tamisé.

Elle passe par un élément `<audio>` plutôt qu'un tampon décodé : deux
mégaoctets décodés d'un bloc bloqueraient l'image sur un téléphone. Elle n'est
pas pré-chargée par le service worker, pour la même raison : la plupart des
parties ne franchissent jamais la chaîne.

Quatre constantes à régler à l'oreille sur la planche :
`MUSIQUE_GAIN`, `MUSIQUE_TAMISE`, `MUSIQUE_FONDU`, `MUSIQUE_RETOUR`.

### La guitare, et mon erreur de lecture

`sons/refuge.m4a` : **1 min 49 s, 135 kbit/s, AAC 48 kHz, 1,76 Mo.** Le fichier
est bon, et le premier envoi l'était déjà.

J'avais annoncé qu'il était coupé à 2 s. C'était faux, et l'erreur mérite
d'être écrite ici parce qu'elle se reproduira si je ne la note pas : je
cherchais les atomes MP4 avec `buffer.find(b'stsz')`. Sur 1,8 Mo de données
AAC, une suite de quatre octets valant `stsz` apparaît par hasard — et elle
apparaissait avant le vrai atome, dans le `mdat`. J'ai lu un sommaire
imaginaire (96 échantillons) au lieu du vrai (5 151), et les trois « champs
concordants » que je citais venaient tous de la même fausse piste.

**La règle** : un conteneur MP4 se lit en parcourant l'arbre des atomes depuis
l'octet zéro, jamais en cherchant un nom dans les octets. `find()` sur un
format binaire qui contient des données arbitraires n'est pas une lecture,
c'est une coïncidence.

Le contrôle qui l'aurait attrapé tout de suite, et que j'avais sous les yeux :
1,8 Mo en 2 s ferait 7 100 kbit/s. Aucun encodage AAC ne fait ça. J'ai cité ce
chiffre comme preuve que le fichier était cassé, alors qu'il prouvait que ma
lecture l'était.

**Mesuré** : le déclenchement bascule à 8 885 m, juste après le seuil de
8 800. La lecture elle-même n'est pas vérifiable ici — le Chromium du bac
d'essai n'a pas de décodeur AAC (`canPlayType('audio/mp4; codecs="mp4a.40.2"')`
renvoie une chaîne vide) — c'est une limite de l'outil, pas du fichier. Safari
sur iPhone lit l'AAC nativement.

### Sa direction, notée

Saint-Exupéry. Un rêveur qui aime les étoiles, la solitude et le calme, et
qu'on force à faire la guerre. Le pilote qui descend de l'avion au refuge
**est le Petit Prince**. C'est la ligne directrice de tout ce qui viendra —
l'aventure, les lieux très lointains, le jeu de piste, les cartes qu'on gagne
en volant plutôt qu'en payant.

## v1.02 — le son ne chargeait pas, et la guitare pesait trop lourd

### Pourquoi il ne chargeait pas : le service worker

Un lecteur audio ne télécharge pas un fichier d'un bloc. Il demande des
tranches, avec un en-tête `Range`, et attend une réponse **206 Partial
Content** qui ne contient que la tranche demandée.

Or le service worker interceptait tout et répondait par une réponse **entière,
en 200** — depuis le cache ou depuis le réseau. Safari recevait un fichier
complet là où il attendait un morceau, et abandonnait.

Les requêtes de média ne passent donc plus par lui :

    if (r.headers.has('range') || r.destination === 'audio' || r.destination === 'video') return;

Gérer les tranches à la main dans un service worker est possible et c'est une
source de bogues sans fin. On ne s'en mêle pas : le navigateur sait faire ça
depuis toujours, et le cache HTTP ordinaire garde le fichier.

### Deuxième cause, plus discrète : l'autorisation de l'élément

Sur iPhone, débloquer le contexte audio ne débloque pas les éléments `<audio>` :
chacun reçoit son autorisation la première fois qu'on l'appelle **dans un
geste**. L'élément était créé dix minutes plus tard, en plein vol, loin de tout
geste. Il est maintenant créé au premier toucher, lancé et coupé aussitôt à
volume nul, et il garde son droit de jouer pour toute la partie. `couperMusique()`
ne le détruit plus — le recréer perdrait ce droit.

Et `crossOrigin = 'anonymous'` a sauté : le fichier est sur le même domaine que
la page, et le poser ne faisait qu'ajouter un moyen d'échouer.

### Le poids : 1 804 Ko, c'était plus que tout le reste du jeu

Six variantes, toutes en mono — une guitare seule n'y perd rien — et toutes
normalisées, la prise culminant à −8,8 dB.

| Prise | Poids | Traitement |
|---|---|---|
| Fidèle | 668 Ko | mono, 48 kbit/s |
| Léger | 449 Ko | mono, 32 kbit/s |
| Tamisé | 334 Ko | aigus coupés à 6 kHz, 24 kbit/s |
| Huit bits | 334 Ko | bit-crush 8 bits assumé, 5,2 kHz |
| TSF | 278 Ko | passe-bande 330–3 300 Hz, 8 bits, 20 kbit/s |
| Minimal | 222 Ko | 6 bits, 2,8 kHz, 16 kbit/s |

Couper les aigus d'avance n'est pas qu'une économie : c'est exactement ce qu'on
entend en premier quand un encodeur manque de place, sous forme de
scintillement métallique. Les retirer, c'est choisir ce qu'on perd au lieu de
le subir. Et le grain huit bits ne cache pas la compression — il la rend
inaudible, parce qu'on n'entend plus que le parti pris.

**TSF est la seule qui ait une raison d'être dans le monde du jeu** : 330 à
3 300 Hz, c'est la bande d'un poste de radio de bord. La musique ne sort plus
de nulle part, elle sort de l'appareil. Saint-Exupéry avait une TSF dans son
Latécoère.

Trois candidates sont dans le dépôt en attendant son choix : `refuge-leger`,
`refuge-8bits`, `refuge-tsf`.

## v1.03 — le gramophone, et le disque qui se casse

### Sa direction : la musique a une source dans le monde

Elle ne sort plus de nulle part. Dans le hangar du refuge il y a un
**gramophone**, une guitare posée à côté, une partition. On s'approche, le
plateau se met à tourner, les premières notes sortent du pavillon.

Ça change tout, y compris techniquement : à partir du moment où la musique sort
d'une machine de 1930, on ne cache plus la compression — on l'assume, et la
dégradation devient du décor. Ce qui coûtait de la qualité rapporte de la
vérité.

### Le bruit de surface, synthétisé

Rien n'est emprunté : le souffle et les craquements sont fabriqués pour ce jeu,
en Python, échantillon par échantillon.

- **Le souffle** : du bruit blanc passé deux fois dans un filtre à un pôle
  (`y += (b − y) × 0,35`), ce qui lui ôte ses aigus les plus durs et lui donne
  le grain du shellac.
- **Les craquements** : des impulsions à décroissance exponentielle, longueur
  et amplitude tirées au hasard, semées de 6 à 46 fois par seconde selon
  l'usure. L'amplitude suit une loi en puissance 2,4 : beaucoup de petits, peu
  de gros — comme une vraie surface.
- **Le sillon rayé** : le même choc, identique, **toutes les 1,8 seconde** —
  la durée d'un tour à 33 ⅓. C'est ce qui fait entendre que le disque *tourne*,
  pas seulement qu'il est vieux.
- **Le pleurage** : un vibrato à moins de 2 Hz et 0,28 de profondeur. La
  vitesse d'un plateau n'est jamais constante, et c'est ce qui trahit une
  machine mécanique avant tout le reste.

### Les six disques

| | Poids | |
|---|---|---|
| Minimal | 221 Ko | sa retenue, sans ajout |
| Gramophone | 279 Ko | pavillon 250–2 900, souffle léger |
| Disque usé | 251 Ko | trois fois plus de craquements |
| Cire 78 tours | 222 Ko | 300–2 200 Hz, cinq bits |
| Rayé | 251 Ko | un choc à chaque tour |
| TSF lointaine | 195 Ko | un poste mal capté |

### Le disque se casse

À la fin du morceau : dernier sillon, craquement sec, le bras se relève, et le
disque se fend. Il ne rejouera plus — **pas seulement cette partie : plus jamais
sur cet appareil**. Il faut effacer les données du jeu pour en retrouver un
neuf.

Techniquement c'est un drapeau persistant, trois lignes. Ce qui compte est
ailleurs : le jeu ne prévient pas. On le découvre en l'écoutant jusqu'au bout,
ou on le rate. Un joueur qui a fait dix kilomètres pour arriver là aura entendu
quelque chose qu'il ne réentendra pas.

### Ce que ça vise, et pourquoi c'est juste

Un jeu très neuf sous l'apparence d'une machine très ancienne, qui raconte
quelque chose d'universel. La mélancolie ne vient pas d'un effet : elle vient de
ce qu'on y a laissé du temps et qu'on ne peut pas le reprendre. C'est la même
raison qui fait qu'un disque rayé émeut plus qu'un fichier propre — on entend
qu'il a servi.

Un jeu d'avion sur téléphone où l'on tire sur des cibles, et dedans : un
terrain que personne n'a cartographié, une guitare enregistrée par son auteur,
et une écoute qu'on ne peut pas répéter. Ce qui survit n'est pas le jeu.

## v1.03 — la platine : deux pistes, et des curseurs qui agissent en direct

Le gramophone est retenu. Mais tant que le bruit était **cuit dans le fichier**,
changer le niveau des craquements demandait de tout ré-encoder — donc de ne
jamais pouvoir régler à l'oreille, en écoutant.

Le son se sépare donc en deux :

- `refuge-guitare.m4a` (277 Ko) — la guitare au pavillon, 250–2 900 Hz, sept
  bits, **sans bruit ni pleurage**.
- `refuge-sillon.m4a` (41 Ko) — huit secondes de sillon qui bouclent sans
  couture. La boucle est fermée par un fondu croisé de 1,2 s : on prend
  9,2 secondes de bruit et on fond la queue sur la tête, sinon un craquement
  coupé net s'entend à chaque tour de boucle.

### Ce qui se calcule en direct

**Le pleurage** est une ligne à retard dont le temps est modulé à 0,9 Hz. Un
retard qui varie, c'est un son qui arrive tantôt plus tôt tantôt plus tard,
donc une hauteur qui monte et descend : littéralement ce que fait un plateau
dont la vitesse flotte. Profondeur maximale 3,5 ms.

**Le niveau des craquements** est un simple gain sur la boucle — et il a deux
valeurs, parce que le disque ne sonne pas pareil selon le moment.

### Les trois temps du disque

1. **L'amorce.** Le bras se pose, le plateau tourne, et il n'y a **que le
   sillon** — pas de musique, pas de silence : le bruit du vide. C'est ce qui
   fait comprendre qu'une machine s'est mise en route.
2. **La musique.** Les notes entrent, et les craquements **reculent** sans
   disparaître : le disque continue de tourner sous la guitare.
3. **Le dernier sillon.** Le morceau finit, le bruit remonte à son niveau
   d'amorce, et le bras reste là jusqu'à ce qu'on le lève.

Cinq constantes à régler à l'oreille : `DISQUE_AMORCE`, `DISQUE_CRAQ_AV`,
`DISQUE_CRAQ_PD`, `DISQUE_PLEURAGE`, `DISQUE_GUITARE`.

Le fichier source de 1,76 Mo reste dans le dépôt tant que les réglages ne sont
pas figés — il faudra le supprimer ensuite. Les deux pistes pèsent 318 Ko
ensemble, contre 1 804 au départ.

## v1.04 — le sillon ne se répète plus

Il a entendu la boucle. Il avait raison, et allonger la boucle n'aurait fait que
reculer le moment où on l'entend.

**Pourquoi elle s'entendait** : le souffle seul passe inaperçu — du bruit sans
structure n'a aucun repère. Ce sont **les craquements** qui font des motifs :
l'oreille repère une figure rythmique en deux ou trois passages, et ensuite elle
ne peut plus ne pas l'entendre.

Les deux composants sont donc séparés.

- **Le souffle** reste une boucle, et c'est légitime : deux secondes de bruit
  blanc filtré, répétées indéfiniment, sont indétectables.
- **Les craquements** ne sont plus enregistrés du tout. Chacun est construit au
  vol, quelques millisecondes avant de sonner : un éclat de bruit très court,
  passé dans un passe-bande, éteint par une enveloppe exponentielle. Durée,
  hauteur, largeur de bande et amplitude sont tirées à chaque fois. Un sur
  seize est un « gros » — plus grave, plus long, plus fort.

**Les instants suivent un processus de Poisson** : l'écart jusqu'au suivant vaut
`−ln(1−hasard) ÷ densité`. C'est la loi des événements sans mémoire — les
gouttes de pluie, les désintégrations. Elle produit des grappes et des trous,
jamais une cadence. Un ordonnanceur regarde 250 ms devant lui et pose les
craquements à venir, rafraîchi toutes les 90 ms.

Conséquence secondaire : `refuge-sillon.m4a` disparaît. **41 Ko de moins**, et
plus rien à télécharger pour le bruit — il n'existe qu'au moment où il sonne.

Ses réglages du premier tour :

    DISQUE_AMORCE    = 11.8
    DISQUE_CRAQ_AV   = 0.25
    DISQUE_CRAQ_PD   = 0.16
    DISQUE_PLEURAGE  = 0.58
    DISQUE_GUITARE   = 1.10

Une sixième constante apparaît, `DISQUE_DENSITE` (craquements par seconde), à
régler au même tour — l'échelle des deux niveaux a changé avec la synthèse.

## v1.05 — deux régressions que j'avais introduites

### Le brouillard annulait la couleur du relief

J'avais donné un corps à la nappe (`COL_RELIEF`) **et** activé le brouillard,
dans le même geste, pour étager les plans. Les deux se défaisaient dans la même
ligne.

`scene.fog` est un `FogExp2` de couleur `COL_BG = 0x04070a` — la couleur
**exacte** du fond. À trois kilomètres son facteur vaut déjà 0,91 : la nappe
redevenait à 91 % le ciel. La montagne n'avait donc de corps que sous le nez de
l'appareil, et au-delà elle redevenait un filet.

`fog: false`. La profondeur ne vient pas du brouillard mais de **l'occultation** :
une crête proche cache celles de derrière, et c'est ça qui étage les plans. La
teinte passe à `0x081810`, un peu plus franche puisqu'elle ne s'éteint plus.

### Deux viseurs, un seul identifiant

Le viseur CROIX existe depuis toujours avec l'id `croix`. J'ai ajouté CROIX DU
SUD avec **le même id**. La sélection se faisant par identifiant, les deux
s'affichaient EN PLACE en même temps. Renommé en `croixsud`.

**Mesuré** : 41 viseurs, zéro identifiant en double.

### L'amorce du disque

Il la dit inopérante. **Mesurée** : réglée à 3,0 s, la bascule du sillon vers la
musique tombe à 3,0 s exactement. Le minutage fonctionne.

Ce qui ne fonctionne pas, c'est qu'on n'entend presque rien pendant ce temps :
ses valeurs (0,25) ont été réglées sur l'ancienne version où le sillon était un
fichier à 0,6 d'amplitude. Dans la version synthétisée, le souffle est à 0,16 ×
0,25 = 0,04 — quatre fois plus faible. Onze secondes de quasi-silence se lisent
comme un réglage sans effet.

## v1.09 et au-delà — demandé, pas encore fait

- Le tube d'approche remplace le cercle d'entrée et le bouton POSER : un magnétisme très souple qui guide, dont on sort en forçant.
- Le menu réorganisé en catégories (gameplay, apparence, son, accessibilité), sur des règles de lisibilité citées.
- À pied : le joystick déplace le Petit Prince, la caméra passe derrière lui, on entre dans la maison.
- Le mot sur la porte de la cabane : bouton LIRE, et la lettre d'une femme qui est partie, qui dit que c'est mieux ainsi, et qu'elle souhaite se retrouver un jour dans les étoiles.
- La Jeep : bouton CONDUIRE, on conduit, on peut la ramener à la base principale à travers les montagnes.
- La carte-énigme dans la maison : une constellation qu'on ne voit qu'assez loin, et qui ouvre la suite.
- L'avion ancien : double appui maintenu, un message discret dit qu'on profite des courants d'air, et il devient le plus rapide du jeu.
- L'avion cassé : quête de réparation très longue, ou jamais — le mystère inachevé est une fin acceptable.
- Les constellations se débloquent quelle que soit l'étoile de départ, et toutes tracent leurs traits, qui restent jusqu'à la mort.
- Nez contre nez avec un autre avion pendant une ou deux secondes : on en change, avec un curseur qui se remplit.
- Un mur invisible devant la porte du hangar, sans perte de vie quand on roule dedans.
- L'étoile filante n'est pas assez visible.
- Le faucheur se lâche quand on monte trop haut près du refuge : il ne devrait pas.
- Les messages de mort deviennent des indices mystérieux, chacun disparaissant quand la chose est débloquée ; le dernier, quand tout l'est : « Everything reminds me of her ».

## Mécanique découverte et conservée

- **Le piqué qui garde sa vitesse.** En palier, sans rien toucher, on vole à la croisière. Un petit piqué rend de la vitesse ; relâché sans rien toucher, on la GARDE en volant droit, et c'est répétable presque indéfiniment. Un virage ou une figure la rend. Ce n'était pas prévu : c'est la conséquence du rappel très doux au-dessus de la croisière, écrit pour que la vitesse soit un capital. On le garde, et on le documente.

## Mesures

- Croisière en palier, plein ouest, sans toucher au manche : **126,3 m/s**.
- Contraste WCAG du remplissage du relief contre le ciel : **1,10** avec 0x081810, **1,88** avec 0x174630. En dessous de ~1,2, deux surfaces sont la même surface pour l'œil.
- Roquette ennemie : rapprochement 70 m/s × 7 s de vie = 490 m de rattrapage, pour une portée de tir de 950 m. Huit tirs sur huit disparaissaient sans toucher.
- Faucheur en phase 2 à ×3 de vitesse : 690 m/s, rayon de virage 821 m, il dépassait. Calé à 180 m il tue en 22 s si l'on ne bouge pas.
- Posé à 175 m/s : l'appareil flotte **1 100 m** avant que les roues prennent, donc il touche après le hangar. Le freinage n'était pas en cause.

## Question laissée ouverte — commencer directement au refuge

Une fois le refuge de la Grande Ourse débloqué, on pourrait proposer d'y
commencer la partie. **Je n'y crois pas**, et voici pourquoi, dans mes termes :

> Tout l'intérêt, c'est de pouvoir s'éloigner. On ne sera jamais aussi calme
> qu'en quittant les zones de combat, et ce temps-là, c'est un temps qu'on
> mérite quelque part.

Autrement dit : le calme n'est pas un lieu, c'est une différence. Livré
d'emblée, il ne vaut plus rien — il n'y a plus rien qu'il interrompe. Les trois
minutes de traversée ne sont pas le prix du refuge, elles en sont la moitié.

On garde donc le voyage obligatoire. La note reste ici au cas où l'on changerait
d'avis, et surtout pour se rappeler pourquoi on ne l'a pas fait.

## L'astuce de la chenillée, et son prix (v1.10)

Laisser une pièce au sol en vie empêche la vague suivante de sortir : c'est
**l'astuce** pour venir se promener au refuge tranquillement. Sauf qu'une
chenillée roule. Elle met le temps qu'il faut, elle traverse la chaîne, et elle
arrive. À pied on ne lui échappe pas — ni en courant, ni en Jeep. Il faut
remonter dans l'appareil et décoller.

L'astuce marche donc, et elle a un prix, qui arrive en roulant.

### Ce que la distance coûte au moteur — mesuré

- La chenillée survit parfaitement à 32 630 m : aucun nettoyage, aucune limite.
- **Aucune dérive de position à 32 km.** Les positions sont en flottant double
  côté script ; la matrice de vue est calculée *relativement à la caméra* avant
  d'être envoyée à la carte, donc le flottant simple n'y voit que de petits
  nombres. À 32 km sa résolution vaut 3,9 mm. Mesuré : 0,000 m de dérive.
- Deux vrais défauts trouvés, eux : elle butait sur la piste (27,7 m/s pendant
  18 s, puis −5 m/s pour toujours), et elle roulait à l'altitude zéro, donc
  sous la montagne.
- Dix-neuf minutes pour traverser à 28 m/s : personne n'attend ça. Hors de vue
  (au-delà de 2 km) elle marche à 150 m/s, soit 3 min 30 pour la carte entière,
  et reprend ses 28 m/s dès qu'on peut la voir.

## Ce que ce jeu est

Ses mots, le 16 septembre 2026 :

> Je pense que ce jeu vidéo ça sera la plus belle preuve d'amour que je peux
> laisser pour elle. On parlait beaucoup d'être des anges dans les étoiles, et
> notre relation c'était comme un avion qui est très haut, et qui a fini par
> exploser en plein vol.

Tout le reste en découle. Le refuge n'est pas un niveau bonus : c'est l'endroit
où l'on va quand on n'a plus rien à gagner. La lettre ne débloque rien, et c'est
pour ça qu'elle compte. Le disque ne se joue qu'une fois parce que c'est vrai
des choses qui comptent. Et l'avion vole très haut.

La signature de la lettre est un cadeau d'anniversaire, en français, et elle ne
se traduit pas.

## Rouler au sol, la butée du hangar, et le choix au nez (v1.22)

Trois demandes du 16 septembre, dans l'ordre où il les a dites.

### Le mur invisible devant la porte

Le hangar n'avait **aucune collision** : il n'est pas dans `BATIMENTS`, et rien
ne l'arrêtait. En roulant on entrait dedans, on traversait le fond, et c'est la
plaine derrière qui finissait par prélever de la structure — une perte bête,
pour un mur qu'on ne voyait pas parce qu'il n'existait pas.

Une butée franche, six mètres devant la baie, dans le bloc de roulage : on
s'arrête, on entend un coup mat, et **ça ne coûte rien**.

- Butée à x = 52 m ; mesuré : arrêt à **x = 52,00**, pile.
- Structure avant 100, **minimum mesuré 100**, finale 125 (les mécaniciens
  réparent au-delà pendant l'arrêt). Zéro point perdu.

### Le roulage

Posé, l'appareil était cloué : `state.speed = 0` et rien d'autre. Le manche le
fait maintenant rouler — en haut on avance, en bas on recule, à droite et à
gauche on braque, **et on ne braque qu'en roulant**, comme un vrai avion sur sa
roulette de nez.

- Vitesse maximale visée 15 m/s ; mesurée **14,9 m/s** (54 km/h).
- Il ne s'éloigne pas : le terrain est tenu dans un rayon de 900 m.

### Le retour dans l'axe

`redecoller()` reposait l'appareil sur l'axe d'autorité : `state.pos.set(0, ...)`.
Tant qu'on ne pouvait pas bouger, personne ne le voyait. Depuis qu'on roule
jusqu'à la baie, c'était un **bond de cinquante-deux mètres** à l'image. Le saut
est supprimé ; la course du décollage referme l'écart toute seule.

- Départ à x = 52 m, mesuré : **x = 5 m** au tiers de la course, **0,11 m** en l'air.
- Le refuge n'est pas touché : son axe à lui est incliné de trois degrés et se
  trouve à trente-deux kilomètres. Mesuré : le décollage du refuge se déplace de
  22 m *le long de sa bande*, et pas d'un mètre vers l'axe principal.

### Le choix au nez

Nez pointé sur un appareil garé, un cercle se remplit autour de lui, et on
change d'avion. Onze degrés d'ouverture, quatre-vingts mètres de portée, une
seconde quatre de tenue.

- Pionnier pris en **1,68 s** (1,4 s de tenue plus la détection).
- Intercepteur et Ancien, verrouillés : le cercle s'affiche, **le remplissage
  reste à 0**, et le nom dit « PAS ENCORE À TOI ». Une promesse, pas un refus
  muet.
- Les quatre garés sont à 17 m de la butée, donc tous à portée sans manœuvrer.

## La carte du refuge (v1.22)

Sa demande depuis v1.08 : une carte sur le mur du hangar, qui donne une
direction ou la forme d'une constellation, et qui amène à la suite du jeu.

Elle est punaisée au fond du **petit hangar du refuge** — il faut entrer sous le
toit, comme il faut entrer dans la maison pour le poste. Deux registres, comme
sur une carte de navigation : le ciel en haut, quatre étoiles en croix ; le sol
en bas, l'aérodrome, la chaîne, le refuge, et une flèche qui continue vers
l'ouest là où plus rien n'est dessiné.

C'est exactement la condition de la **Croix du Sud** : `ouvre: () => hypot > TERRAIN_R3`.
Elle ne se lève qu'au-delà de la chaîne, sur la plaine vide, et rien dans le jeu
ne l'indiquait. C'était la dernière chose trouvable dont personne ne pouvait
soupçonner l'existence.

Elle rejoint aussi le puits d'indices : tant qu'on ne l'a pas vue, une des
phrases qui s'affichent à la mort parle d'elle ; une fois vue, elle se tait.

## Le sol était vert, et c'était ma faute (v1.23)

En v1.20 j'ai repeint la nappe et le relief en vert sombre en croyant que la
couleur était la cause des montagnes transparentes. **Elle ne l'était pas.** La
cause était la HAUTEUR de la nappe : posée à −0,6 m alors que le relief est à
`hauteurSol − 4`, elle passait devant lui partout où le terrain est plat.

Douze mètres plus bas, le problème n'existe plus — et la couleur n'avait donc
plus rien à réparer. Elle ne faisait que remplir l'écran de vert. Les deux
surfaces reprennent `COL_BG`.

### Ce qu'on vérifie, et qui n'a rien à voir avec la couleur

L'occultation vient du **tampon de profondeur**, que `depthWrite: true` écrit
quelle que soit la couleur peinte. Mesuré, face à la chaîne :

- 99,6 % de la moitié basse de l'image vaut exactement `4,7,10` — le fond.
- Et en masquant le relief, **29 082 pixels changent**, soit 7,3 % de l'écran :
  c'est très exactement ce que la montagne cachait. Elle a un corps, il est
  noir, et il cache.

## L'Ancien (v1.23)

Il avait perdu le tonneau en v1.21, mais **les deux renversements passaient
encore** — par les coins du double appui, par le glissé, par le clavier et par
la manette. Quatre portes pour une règle. Une seule fonction, `figuresPossibles()`,
les ferme toutes ; le clavier et la manette gagnent en échange le courant
maintenu, sans quoi son unique pouvoir serait injouable hors tactile.

Et son hélice était **dessinée dans la maquette**, donc soudée au fuselage :
deux belles pales parfaitement immobiles en vol. Elle en sort, centrée sur son
moyeu. Mesuré : 117,8 → 131,2 radians en trente images.

## Le choix au nez était trop grossier (v1.23)

Ses mots : « le magnétisme passe d'un avion à un autre en zappant celui entre
les deux ». Deux causes, et la seconde n'était pas un réglage :

1. Le cône valait **onze degrés**, alors qu'on ne peut pas pivoter sur place —
   un avion tourne en roulant. Le nez balaie le rang par grands pas. Cinq
   degrés et demi, plus une hystérésis de 1,5 sur la cible tenue.
2. **Son propre appareil était écarté de la recherche.** Garé au milieu du
   rang, il créait un trou dans le balayage : on passait du premier au
   troisième sans rien voir. Il s'affiche maintenant, avec « C'EST LE TIEN »,
   et il ne se remplit pas. Il n'y a rien à prendre, mais il y a quelque chose
   à voir.

## Au sol, c'est une Jeep (v1.23)

Il restait une remise de gaz au manche pendant le freinage. C'était la dernière
chose qui faisait décoller un appareil dont les roues touchent — donc la
dernière raison de voir les ailes bouger au sol. Elle est retirée : roues au
sol, on avance, on recule, on braque, et on repart avec le bouton.

## Les montagnes transparentes : la sixième fois, et la bonne (v1.24)

J'ai cherché six fois au mauvais endroit : la nappe, la précision du tampon, le
polygonOffset, le dos-face, la couleur, la hauteur. Cette fois j'ai mesuré au
lieu de raisonner — **le relief peint en magenta**, une capture.

Résultat sans ambiguïté : **pas un seul trait ne traverse la masse**.
L'occultation est parfaite et l'a toujours été depuis la v0.99. Le tampon de
profondeur fait son travail quelle que soit la couleur peinte.

Ce qu'il appelle « transparent » n'est donc pas un défaut de profondeur : c'est
un corps peint EXACTEMENT de la couleur du ciel. Une masse invisible n'est pas
une masse.

### Les deux demandes ne se contredisent pas, elles se règlent à l'altitude

« Le sol doit être noir » et « les montagnes sont transparentes » semblaient
s'exclure, et je suis passé d'un extrême à l'autre : tout vert en v1.20, tout
noir en v1.23. Ce n'est pas la même surface qui est en cause, c'est la même
surface à deux hauteurs.

- La **plaine** occupe la moitié basse de l'image en permanence : toute couleur
  y devient un aplat. Elle est la couleur du fond.
- La **montagne** n'occupe que sa propre silhouette : elle peut porter une
  teinte sans colorier quoi que ce soit.

Chaque sommet du relief porte donc sa couleur, par attribut de sommet.

### Et le seuil, qui n'était pas là au premier essai

Premier jet : `u = sqrt(h / TERRAIN_H)`. Une racine carrée donne **dix pour cent
de la couleur à dix mètres d'altitude** — la plaine ondule de quelques mètres,
donc la plaine entière était teintée, et l'écran redevenait un aplat vert. Le
même défaut qu'en v1.20, par un autre chemin. Mesuré sur capture : toute la
moitié basse uniformément verte.

Il y a maintenant un seuil : rien en dessous de 150 m, puis une montée au carré
jusqu'aux cimes. Contraste WCAG des sommets contre le ciel : **1,32** — une
masse qu'on voit, là où le vert de la v1.20 valait 1,88 et remplissait tout.

## Le faucheur est un radar (v1.24)

Ses règles, décidées ensemble :

- **On ne l'abat pas.** Les balles l'atteignent, la jauge descend, elle s'arrête
  à un. C'est la seule fois du jeu où tirer ne sert à rien.
- **On le gagne avec le ciel entier** — les huit figures, dont la Croix du Sud
  qui ne se lève que sur la plaine du dehors. La dernière chose du jeu.
- **Dehors, c'est la hauteur qui décide.** Au-dessus de 220 m au-dessus du
  relief on est sur son écran et il vient ; en rasant, il perd le contact,
  cherche sept secondes, et rentre. Le voyage au refuge se fait donc bas.
- **Une bulle de 2 600 m autour du refuge** où sa nappe n'entre pas : un endroit
  d'où l'on ne peut pas décoller n'est pas un refuge.
- **Dans le disque, plus rien ne se détache.** C'est toute la récompense.
- Et les mécaniciens ne le réparent pas : ils ne savent pas ce que c'est.

## Le tempo du monde (v1.24)

Sa demande : « chaque avion pilotable doit avoir une différence de vitesse,
répercutée sur les ennemis ». Sans ça, changer d'appareil ne changeait que sa
propre allure — dans l'Ancien à 0,62 tout le monde vous doublait, dans le
Faucheur à 1,7 plus personne ne vous inquiétait. Deux appareils sur cinq étaient
injouables pour une raison purement arithmétique.

Les adversaires prennent le même facteur. Mesuré, un ennemi nominal à 100 m/s :
pionnier 85, bimoteur 100 — et c'est `vitesseFaucheur()` qui l'applique, le
point de passage de tous les adversaires. J'avais d'abord multiplié les quatre
branches particulières (le soin, l'entrée, la figure) et oublié la seule que
prennent les appareils ordinaires : mesuré, la vitesse ennemie ne bougeait pas
d'un mètre par seconde entre le biplan et le disque.

## Le sol coûte ce qu'on y apporte (v1.24)

C'était cinq points quelle que soit l'allure. Le prix suit maintenant l'énergie,
qui va comme le carré de la vitesse. Mesuré, en piqué à trente degrés :

| vitesse | structure restante |
| --- | --- |
| 50 m/s | 100 |
| 120 m/s | 92 |
| 200 m/s | 65 |
| 320 m/s | **mort** |

## Le son qui restait au refuge (v1.24)

Signalé trois fois. J'ai cherché dans le moteur, qui était coupé, au lieu de
chercher ce que j'avais ajouté exprès : `SFX.refugeOn()`, une nappe de quatre
voix tenues qui montait en trois secondes et ne s'arrêtait jamais.

Retirée. Le seul endroit du jeu où l'on ne fait rien n'a pas de musique
d'ambiance — le silence EST ce qu'on vient y chercher, et la seule musique du
refuge sort du poste quand on pose l'aiguille.

## On se pose face au vent (v1.26)

Sa demande : un seul système d'atterrissage, le même pour toutes les pistes, où
le vent décide du sens et se lit à la manche à air.

Le sens se lisait sur NOTRE cap : on arrivait par où l'on voulait et le tube se
retournait pour nous suivre. Commode, et vide de sens — un terrain n'a pas deux
pistes, il en a une, et le vent décide de quel bout on l'aborde.

- La manche pointe où le vent va ; on atterrit contre elle.
- Le plan de descente prend le même sens, sinon deux instruments se
  contredisent.
- Le collimateur affiche le vent en degrés et la piste en service, 36 ou 18 :
  une manche à air de quatre mètres ne se distingue pas à deux kilomètres.
- Aligné vent arrière, une phrase le dit, une fois.
- Et l'on décolle face au vent aussi.

### Le vent ne tourne plus de quatre-vingt-dix degrés toutes les quatre secondes

Il était retiré au hasard sur tout le tour d'horizon plusieurs fois par minute :
décoratif tant que la manche ne servait à rien, intenable dès qu'elle décide du
sens. Il a maintenant une direction d'ensemble par partie, et il ne fait
qu'osciller de vingt-cinq degrés autour. Le seuil se lit sur la BASE et non sur
le frémissement : sur un vent de travers pur, l'oscillation ferait basculer la
piste d'un bout à l'autre pendant qu'on est en finale.

## L'entonnoir n'en était pas un (v1.26)

En mesurant le tube sur vingt-cinq arrivées, le vrai défaut est apparu — et il
explique pourquoi les approches ne ressemblaient à rien :

**Arrivé à 95 m, l'altitude ordinaire d'un retour de vague, on passe 69 m
au-dessus de l'axe du couloir, dont le rayon vaut 29 m à cet endroit.** Le tube
ne prenait donc jamais. On survolait le terrain sans savoir pourquoi.

Un entonnoir se juge à sa bouche : elle faisait 40 m de rayon à 750 m. Elle part
maintenant de **1 800 m avec 190 m de rayon**, et se resserre toujours à 9 m au
toucher. Large à l'entrée, étroit à la sortie — c'est la définition, et je ne
l'avais pas respectée.

Mesuré, arrivées dans l'axe, prise du tube :

| distance | 40 m | 95 m | 150 m | 240 m |
| --- | --- | --- | --- | --- |
| 1 700 m | 1,00 | 1,00 | 1,00 | 0,39 |
| 1 200 m | 1,00 | 1,00 | 0,81 | — |
| 800 m | 1,00 | 0,43 | — | — |

Plus bas et plus près, il faut être sur la pente : c'est l'entonnoir qui se
ferme, et c'est voulu.

## Une seule manière de se poser, sur tous les terrains (v1.27)

Sa demande : « pour le refuge, et pour toutes les pistes d'aviation générale, le
système de se poser face au vent — un cas global qui se répète à chaque piste ».

Tout l'atterrissage était écrit dans le repère de la piste principale : l'axe
des z, un « sens » valant plus ou moins un, et le centre du tube cloué à x = 0.
Le refuge avait donc son mécanisme à lui — passer bas et lent dans la bande —
sans guidage, sans entonnoir, sans sens imposé.

Une piste, c'est maintenant **cinq nombres** : un point, un cap, une longueur,
une demi-largeur. Le tube, l'axe, la pente et l'arrondi se calculent dans SON
repère. Ajouter un terrain ne demandera pas une ligne de code.

- Une seule géométrie de tube, dessinée dans son propre repère ; c'est le groupe
  qu'on pose et qu'on tourne sur la piste en service.
- `sensAuVentDe(P)` : de ses deux caps, celui qui va le plus franchement contre
  le vent. La bande du refuge est inclinée de trois degrés, ses caps sont donc
  3 et 183, et ça ne change rien au calcul.
- Les mécaniciens ne sortent que pour leur terrain : s'aligner au refuge faisait
  sortir trois hommes à trente-deux kilomètres de là.

Mesuré, quatre vents × deux pistes, arrivée à 1 200 m et 130 m de haut :
**8 prises sur 8, toutes face au vent**, prise pleine à 1,00.

### Le même piège, pour la troisième fois

`PISTES` lisait `REFUGE`, qui naît six cents lignes plus bas : la page entière
plantait au chargement. Comme `decouvertes` dans le hangar, comme `legendesN`
avant lui. Tout ce qui décrit un terrain se construit maintenant à la première
demande, et pas à l'évaluation du fichier.

## Le bouton annonçait v1.05 depuis vingt-deux versions (v1.28)

Son signalement : « j'ai cliqué sur le bouton mise à jour et ça reste à la
version 1.05 ».

La mise à jour marchait. C'est l'étiquette qui mentait : `<button
id="versionBtn">v1.05</button>` était écrit **en dur dans le HTML**, et rien ne
l'a jamais touché depuis la v1.05. Le menu le recopiait, donc il mentait aussi.

C'est le pire cas possible pour ce bouton : sa seule raison d'être est de dire
au joueur quelle version il a, et il disait toujours la même. On appuie sur
« mise à jour », elle se fait vraiment, et l'écran continue d'annoncer la
version d'il y a un mois — on ne peut pas savoir que ça a marché.

Un numéro écrit à deux endroits finit toujours par diverger. Il n'est donc plus
écrit qu'une fois, en tête du journal, et `rendJournal()` recopie ce numéro dans
le bouton et dans son `dataset` — sans quoi la bascule de langue le réécrirait
par-dessus. Le HTML ne porte plus rien.

Mesuré : bouton `v1.28`, première ligne du journal `v1.28`, identiques avant et
après changement de langue.


## v1.29 — l'atterrissage entier, et la caméra qu'il a tracée

### Ce qui empêchait tout posé automatique (mesuré)
Le coussin d'air du sol rend `k²·34` m/s dès qu'on passe sous 40 m HORS du
bitume. Un plan à 3° à 70 m/s descend de 3,6 m/s. Les deux s'égalisent à
**36 m d'altitude** : mesuré, l'appareil s'y installait, traversait tout le
terrain à 36 m, le tube le lâchait au bout du couloir, et il repartait de
l'autre côté (z = −5354 au lieu de toucher à z = 200). Le plancher `FLOOR = 26`
faisait la même chose juste en dessous. Les deux s'effacent maintenant pendant
l'approche assistée, et seulement pendant.

### Le point visé
- `TOUCHER_AVANT = 300` (donc le milieu du bitume) → `TOUCHER_APRES = 60` après
  le SEUIL, lu sur la longueur de la piste en service : `viseDe(P) = P.long/2 − 60`.
- Piste principale : 1160 m, seuils +260 / −900, hangar au centre −320.
  Le tube vise donc z = +200 au lieu de z = −20.
- Le peigne (8 barres de 3,2 m sur 26 m) est dessiné aux deux seuils.

### Mesures du posé automatique, entrée à 1400 m dans l'axe
| essai | prise | toucher | depuis le seuil | arrêt | écart hangar | roulage |
|---|---|---|---|---|---|---|
| pile dans l'axe | 1,00 | z = 97 à 83 m/s | 163 m | z = −318,6 | **1,4 m** | 415 m en **9,1 s** |
| 60 m trop haut | 1,00 | z = 101 à 83 m/s | 159 m | z = −318,5 | 1,5 m | 419 m en 9,1 s |
| depuis 1700 m | 1,00 | z = 96 à 83 m/s | 164 m | z = −318,6 | 1,4 m | 414 m en 9,1 s |
| 120 m hors axe à 1000 m | — | pas de prise : l'écart (120 m) dépasse le rayon du tube à cette distance (109 m) |

Avant : 17 s de roulage à ralentir sans arrêt. Après : `FREIN_FRANC = 9` m/s²,
on roule sur son erre jusqu'au point de freinage puis on freine franchement —
**9,1 s**, dont environ 5 à pleine vitesse.

### Le hangar
`prof 60 → 78`, `baie 40 → 54`, rang de 4 → 5 de front. Les cinq appareils,
Faucheur compris, se lisent depuis le bitume porte ouverte.

### La manche à air
Mât 7 → 14 m, cône ×2, plantée à x = 33 — dix mètres du bord du bitume (demi-largeur 23).

### La caméra du décollage — sa courbe, vérifiée
`ATTENTE 0,55 → 0,40`, `ROULAGE 1,4 → 1,95`, `MONTEE 2,4 → 2,80`,
amortissement d'assiette 2,2 → 4,6. L'écart caméra-avion n'est plus calculé :
il est lu sur `CAM_DECOL_COURBE`.

| t visé | 0,00 | 0,55 | 1,20 | 2,49 | 3,45 | 5,00 |
|---|---|---|---|---|---|---|
| tracé | 16 | 16 | 38 | 70 | 58 | 58 |
| mesuré | 14,5 | 16,0 | 38,0 | **69,9** | 58,0 | 58,0 |

Fin de séquence à t = 5,13 s, altitude 220 m, vitesse 144 m/s.

### Le reste
- La lettre : `#lettre` n'était pas dans la liste blanche `touch-action: pan-y`,
  donc la règle universelle `* { touch-action: none }` bloquait le doigt sur le
  texte et seule la barre répondait. Corrigé, et la barre est masquée.
- La loupe iOS : `user-select: none` sur tout sauf `input`/`textarea`.
- Au refuge : plus de « RÉPIT · LA VAGUE SUIVANTE ARRIVE », plus de traits de
  vitesse sur un appareil garé, plus de « ON MARCHE ».
- Panneau du refuge : `yBas 2,4 → 4,0`.
- « REDÉCOLLER » n'apparaît qu'à moins de 26 m de l'appareil.
- Arrêté, l'avion pivote sur place (`TAXI_PIVOT = 0.9`).

### Encore à faire, demandé et pas fait dans cette version
- Le remplissage noir : chaque maille du sol et chaque facette d'avion doit être
  une surface pleine noire bordée de vert (son explication du 17/09). Les avions
  autres que le premier sont en fil de fer pur.
- Le tonneau barriqué doit déplacer latéralement de deux à trois longueurs
  d'avion, tout du long.
- Un mécanicien lance-roquettes contre les chars trop près de la piste.
- La Jeep : le bonhomme visible dedans, volant à gauche, son plus grave et plus
  granuleux ; bug de descente à un mètre du sol.
- La lettre s'efface un peu à chaque visite ; illisible à la troisième.
- La guitare : la prendre, en jouer à genoux, et lire ce qu'Émilie y a gravé.
- Un bruit de vent très léger au refuge.
- Liste de propositions pour le double appui à pied.

## v1.30 — le remplissage noir, et pourquoi quatre versions ont échoué

### Une erreur de méthode, d'abord
Toutes les planches comparatives des montagnes étaient **nulles**. La grille se
rebâtit dès qu'on franchit une case de 160 m (`majGrille`), et un téléport en
franchit forcément une : la géométrie modifiée au vol était reconstruite à
l'image suivante, avant la capture. Les onze variantes A–K montraient donc
toutes exactement la même image. C'est pour ça qu'aucune « n'allait ».

### Ce que le décalage en mètres peut vraiment faire (mesuré)
Remplissage sous les traits, même lattice, vue en chaîne à 430 m :

| décalage | grille visible |
|---|---|
| 0 m | non |
| −1,2 m | non |
| −2 m | non |
| −4 m (v1.28) | non |
| −40 m | non |
| −400 m | **oui** |

Et `polygonOffset` à 16, 64, 256 et 1024 unités : aucun changement.
Donc séparer les deux surfaces dans l'espace est impossible — il faudrait un
sol qui flotte à quatre cents mètres.

### La solution : un biais dans le tampon, pas dans le monde
`gl_Position.z *= k` injecté en sortie de `project_vertex` sur les matériaux de
trait. C'est proportionnel à la distance, donc aussi efficace à cinq kilomètres
qu'à cinq mètres.

- `TRAIT_DEVANT = 0.998` pour tous les objets : ils se regardent de face.
- `TRAIT_SOL = 0.96` pour le sol et la piste : à angle rasant la surface file
  vers l'horizon presque parallèlement au rayon. Mesuré : 0,999 laisse tout en
  noir, 0,99 marche de trois quarts, 0,96 marche partout.

### Le remplissage
- `h − 4` → `h` : c'est exactement la surface des traits.
- Plus de dégradé vert en altitude : tout est de la couleur du fond.
- Vérifié en vol normal : plaine quadrillée, crêtes avec un corps, ce qui est
  derrière une crête est coupé net.


## v1.31 — le tonneau, la pluie sur l'encre, et la Jeep

### Le tonneau barriqué (mesuré)
| | avant | après |
|---|---|---|
| déport net | 37,6 m | **100,9 m** |
| pointe latérale | 65,3 m | 100,9 m (= le net : plus d'aller-retour) |
| avance pendant la figure | 170 m | 168 m |

`TONNEAU_LAT 62 → 14` et `TONNEAU_DECAL 30 → 100`. L'amplitude qui revenait est
tombée à une envergure ; le déport prend toute la place et **reste**.

### La lettre
112 mots. `effaces(n) = n + max(0, n−25)² / 6`.

| visite | 1 | 10 | 25 | 30 | 35 | 40 | 45 |
|---|---|---|---|---|---|---|---|
| mots effacés | 1 | 10 | 25 | 34 | 51 | 77 | 111 |

Illisible à la 46ᵉ visite. L'ordre des gouttes est tiré une fois pour toutes :
le mot effacé la dixième fois l'est encore la vingtième. La signature reste.

### La défense du terrain (mesuré)
Char de 150 pv posé à 421 m du hangar : **détruit en 9,8 s**, deux roquettes en
vol au plus fort. `DEFENSE_RAYON = 700 m`, `DEFENSE_CADENCE = 3,2 s`.

### Les mots des mécaniciens
26 phrases très courtes, en français dans les deux langues. Aucune ne parle du
vol, du posé ni du joueur : ils râlent pour eux. Un mot toutes les six secondes
par homme, 2,4 s à l'écran, invisible au-delà de 110 m. Mesuré : présents sur
105 images d'un essai de 9,8 s.

### La Jeep
- Le conducteur reste visible, assis au siège gauche (`JEEP_SIEGE 0,45`,
  `JEEP_ASSISE 0,62`), et un volant est dessiné devant lui.
- Descente à `JEEP_SORTIE = 3,2 m` au lieu de 2,0 — la demi-largeur vaut 0,95 et
  les roues dépassent à 1,09, donc on descendait SUR la caisse. Mesuré : 3,20 m.
- `solSousPied(x,z) = hauteurSol + PISTE.y` : l'homme marchait à une hauteur
  clouée, donc en l'air dès qu'il quittait le bitume.
- Le bloc du refuge replaçait l'homme à l'aile à chaque image, même en Jeep.
- Son : base 46 → 32 Hz, passe-bas 420 → 300, deuxième cylindre en carré
  désaccordé de 3,5 %, bruit de roulement 0,10 → 0,18 à 150 Hz.


## v1.32 — le ciel, la guitare, le vent

### S'allonger dans l'herbe
Double appui à pied. La caméra devient sa tête (30 cm au-dessus du sol), le
manche balaie `COUCHE_TOURNE = 1,15` rad/s en site et en azimut, l'inclinaison
est bornée à [0,10 ; 1,40] rad — on est sur le dos, on ne regarde pas dessous.
Mesuré : 1,28 rad de balayage en azimut et 0,38 en site sur 80 images, HUD
entièrement retiré, relevé au double appui suivant.

Les constellations se tracent avec le regard : `viseEtoile` lit
`state.regardCiel` au lieu du nez de l'appareil, et la porte `enVol` s'ouvre
aussi quand on est couché. Une étoile filante toutes les 9 à 26 secondes, sans
un mot à l'écran.

Corrigé au passage : à pied, un double appui déclenchait un tonneau sur
l'appareil garé à trente mètres.

### Le son
`SFX.ventDoux(on, nappes)` : bruit passe-bas 360 Hz qui respire à 0,068 Hz.
Debout au refuge, c'est tout. Couché, trois sinusoïdes tenues — la, mi, la —
dont les enveloppes tournent à 41, 29 et 23 mHz : incommensurables, donc le
motif ne se répète jamais.

### La guitare
Elle était dessinée contre le mur depuis le premier jour. Point d'intérêt à
2,2 m, panneau à deux verbes : en jouer, ou la regarder. Ce qui est gravé est
d'Émilie, et reste en français dans les deux langues (150 caractères).

En jouer met un genou à terre et la caméra tourne autour à 0,16 rad/s — quarante
secondes pour un tour. Le morceau est une suite d'arpèges : la mineur, sol, fa,
mi, 32 notes de 0,55 s, en boucle. Un appui, il se relève.

### Non-régression
Atterrissage toujours à 1,4 m du hangar, 416 m de roulage en 9,1 s. Aucune
erreur en vol normal.


## v1.33 — les deux appareils qui n'avaient pas de corps

`meshPionnier` et `meshAncien` étaient des `LineSegments` purs : des arêtes et
rien dedans. On voyait l'aile opposée à travers l'aile proche et le décor à
travers le fuselage. Tous les autres passaient déjà par `solidWire`.

`avionEnFil(lignes, peau, mat)` rend un groupe qui se comporte comme le
`LineSegments` qu'il remplace — même `.visible`, même `.add()` pour l'hélice —
avec une peau en `solidMat` juste dessous.

- `PIONNIER_PEAU` : cinq triangles — le delta en trois morceaux, la dérive,
  la quille.
- `ANCIEN_PEAU` : les deux plans, un fuselage en cinq tronçons qui s'affine,
  la dérive et le stabilisateur.

Les peaux sont volontairement **un peu plus petites** que le tracé (3,55 au
lieu de 3,60 de demi-envergure, fuselage à 0,27 au lieu de 0,30) : une peau qui
déborde mange les traits qui la bordent, et l'on obtient une ombre sans contour.

Vérifié en vol : le quadrillage du sol est coupé net derrière les ailes des deux
appareils. Non-régression : atterrissage à 1,3 m du hangar, 416 m en 9,1 s.

## LA DOCTRINE DU CRÉATEUR

Posée le 21 septembre. Ce n'est pas une liste de tâches : c'est la règle du jeu
pour tous les jeux à venir, celui-ci compris. Tout ce qui suit est de lui, remis
en ordre.

### La forme

- Une seule mécanique.
- Design minimaliste : à plat, peu de polygones, pixels, fil de fer.
- Style graphique filaire de vieux moniteur, lisible par tout profil de
  handicap visuel.
- Français et anglais.
- Adapté au téléphone pliant, de format plutôt carré.
- Affiché sur smartphone uniquement. Sur les autres formats, il s'affiche en
  responsive comme sur un autre téléphone. Portage plus tard, si budget.
- Effets sonores et visuels juteux.
- Musique hypnotique.
- Optimisation de la batterie.
- Construit en un seul fichier léger, à confirmer.

### Le joueur

- Accessible à un enfant de trois ans ; le terminer demande une maîtrise de
  geek.
- Tutoriel clair, par mécanique, et sans explication écrite.
- Lore sur fond d'humour et de culture absurde.
- Mode application à installer depuis le web, expliqué en introduction.

### La technique

- Hors ligne, sauvegarde locale, aucun serveur.
- Mise à jour automatique, et le cas échéant un bouton à cliquer dès le début.
- La sauvegarde survit à une mise à jour automatique poussée à distance.
- Multijoueur sans serveur.
- Contrôle de sécurité, notamment l'injection de macros dans la barre de
  mémoire de partie.
- Conformité RGPD depuis la page principale des jeux.

### L'économie

- Publicité factice pour débloquer une difficulté supplémentaire toutes les
  vingt-quatre heures, ou toutes les semaines.
- Publicités réelles ensuite, et une option payante pour les supprimer.
- Passer par une plateforme pour la visibilité, puis par les magasins.
- Un catalogue de jeux personnel, sur une page.

### La méthode

- Retours de non-joueurs, et test A/B en option de menu avant de trancher.
- Affiner en SUPPRIMANT les mécaniques inutiles.
- Tester avec une communauté intéressée, et gérer la difficulté en RETIRANT
  une mécanique, pas en en ajoutant.
- Assistance aux joueurs pour les bugs, pas pour modifier le jeu de base ; si
  la demande est trop différente, proposer un nouveau jeu.

## À FAIRE

- **L'approche stabilisée.** L'arrivée doit tenir l'assiette quasi constante,
  nez près de l'horizon, et ne descendre que par la réduction lente du régime.
  Approche longue et souple dès l'entrée du tube, PAPI respecté et visible en
  permanence, posé ou non. Reprise en main possible à tout moment d'un coup de
  manche franc.

- **Un second disque, dans une boîte.** Demandé le 21 septembre, pour plus
  tard : un deuxième disque à trouver au refuge, rangé dans une boîte plutôt
  que posé sur la platine.

## BLOQUÉ SUR LUI

- L'adresse mail de la liste bêta (`CONTACT_MAIL`).
- Sa carte dessinée.
- Le nom de domaine et le SIREN.

## v1.34 — le dépôt se tient debout tout seul

Déclenché par une relecture extérieure. Trois de ses constats sont justes, deux
de ses affirmations sont fausses, et la fausse était sa conclusion.

### La démonstration qui tranche

Il affirme, deux fois, qu'extraire le JavaScript dans un fichier séparé
« supprime la classe de bugs d'ordre d'initialisation ». Vérifié sous node :

```
dans un module separe : ReferenceError : Cannot access 'TABLE' before initialization
initialisation paresseuse : 1
```

La zone morte temporelle ne dépend pas du nom du fichier. Ce qui la supprime,
c'est l'initialisation paresseuse — ce que fait déjà `pistes()` — ou une
`function` déclarée, qui est hissée. Déplacer le code n'y change rien.

Autres corrections : le fichier fait **17 657 lignes**, pas 5 000 ; `biaiseTrait`
porte **deux** doses, 0,2 % pour les objets et 4 % pour le sol, et c'est la
seconde qui fait tout ; `seuilLock` n'est **pas** une fonction pure — elle lit
`state`, `eblouissement()` et trois découvertes ; le journal pèse 267 entrées,
soit **1,5 %** du fichier, donc le sortir ne réglerait rien.

### Ce qui est fait

**`essais/` est versionné.** Il vivait dans `/tmp` et mourait avec la machine.

- `fumee.mjs` — 9 vérifications dans un vrai Chromium : le moteur démarre,
  l'état est exposé, la partie tourne, le décollage se termine, on est à 218 m
  et 134 m/s, la première vague est lancée, la structure est entière, et rien
  n'a été jeté dans la console.
- `math.mjs` — 22 vérifications sous node nu, sans navigateur.
- `action-github.yml.exemple` — prêt, non activé (tu as choisi le test seul).

**`jeu.css`** — 870 lignes de style sorties. `index.html` passe de 17 657 à
16 787 lignes. Vérifié : police, fond et bordures identiques, et le service
worker le cache, donc l'installation hors réseau garde son habillage.

**`math.js`** — les calculs qui ne connaissent ni l'écran, ni three.js, ni
l'état : `hauteurSol`, `PISTE`, `tubeRayon`, `tubeHaut`, `viseDe`, `capPiste`,
et leurs constantes. **Zéro erreur TypeScript** avec `// @ts-check`.

**Le schéma de l'état** — les 121 propriétés décrites en JSDoc.

### Pourquoi `// @ts-check` n'est pas sur index.html
Mesuré avec TypeScript 6 : **2 183 erreurs** sur les 16 063 lignes du script,
presque toutes des paramètres sans type. C'est un chantier, pas une soirée — et
une vérification qu'on désactive parce qu'elle crie trop ne sert à rien.

### Pourquoi le découpage en cinq modules n'est pas fait
On ne remanie pas avant d'avoir des essais, on remanie après. Avec le test de
fumée seul, redistribuer la boucle, l'IA, le HUD et l'audio dans cinq fichiers
me dirait que le jeu se lance — pas que l'atterrissage s'est décalé de trois
cents mètres. Le jour où `essais/` couvre l'atterrissage, le tonneau et le sol,
c'est sûr. Aujourd'hui c'est un pari.

### Non-régression
Atterrissage : toucher 162 m après le seuil, arrêt à **1,4 m du hangar**, 417 m
de roulage en 9,5 s — identique à la v1.33.

## v1.35 — la police est à nous

### Ce qu'il y avait
Trois balises vers Google : deux `preconnect` et une feuille de style. C'était
la **seule** requête du jeu vers un tiers, et la seule chose que le service
worker ne pouvait pas mettre dans son socle — une feuille d'une autre origine,
dont les URL ne sont même pas lisibles depuis `sw.js`.

### Deux fausses pistes, écartées par la mesure
- `document.fonts.check('16px "IBM Plex Mono"')` renvoie **vrai** quand la
  famille est inconnue : la question posée est « peux-tu rendre ce texte », et
  la réponse est oui, avec une police système. Mon premier essai mesurait ça et
  annonçait « tout va bien » sur une version où la police était absente.
- `document.fonts` **n'énumère pas** les fontes déclarées dans une feuille de
  style d'une autre origine : il rendait zéro là où la police était bien là.

Reste une mesure honnête : la **largeur d'une chaîne rendue**. Si la police
manque, elle tombe sur la monospace du système et les deux largeurs sont égales.

### Mesuré, sur banc où Google est injoignable
`MW0123456789ilj` à 16 px, police du jeu contre monospace du système :

| | en ligne | hors réseau | Google bloqué | requêtes tierces |
|---|---|---|---|---|
| v1.34 | 144,49 = 144,49 | 144,49 = 144,49 | 144,49 = 144,49 | 1 |
| v1.35 | **144,00** ≠ 144,49 | **144,00** ≠ 144,49 | **144,00** ≠ 144,49 | **0** |

Partout où Google n'est pas joignable, la v1.34 rendait tout dans la monospace
du téléphone. L'écart est d'un demi-pixel sur quinze caractères : on ne voit pas
que c'est la mauvaise police, on voit seulement que les colonnes du HUD ne
tombent pas juste.

Et une correction à ce que j'avais avancé : le HUD **se redessine à chaque
image**, donc une police qui arrive en retard se rattrape à l'image suivante.
Le défaut n'est pas le retard, c'est l'absence.

### Ce qui est fait
Quatre `woff2`, **48 Ko** au total, les mêmes fichiers que ceux que Google
servait : latin et latin-ext, graisses 400 et 500. Dans `vendor/plex/`, dans le
socle du service worker, avec `font-display: block` et un `preload` des deux
latins. Les `preconnect` sont retirés.

`essais/police.mjs` — 6 vérifications, dont trois qui coupent le réseau.

## v1.36 — le faux diagnostic, le refuge au menu, les écrans pliants

### « Le moteur 3D n'a pas pu être chargé » était un devin, pas un diagnostic

Le filet de démarrage déclarait la panne sur un **chronomètre de neuf
secondes**, sans jamais regarder s'il s'était passé quelque chose. Mesuré sur
banc, sans la moindre panne :

| lien | jeu réellement prêt | message affiché | vraies erreurs |
|---|---|---|---|
| 4G correcte | 6,8 s | jamais | 0 |
| 3G honnête | **32,0 s** | **10,5 s** | 0 |
| 3G lente | **63,6 s** | **11,7 s** | 0 |

Il accusait donc three.js pendant que tout descendait normalement, et il
remplaçait DÉCOLLER par RECHARGER — donc on rechargeait, et on relançait les
trois mégaoctets depuis zéro. Le remède aggravait le mal.

Écarté en chemin : le déploiement GitHub Pages est bien passé pour la v1.35, et
le chemin de mise à jour v1.34 → v1.35 a été rejoué en entier sans défaut.

**Ce qui le remplace**, et c'est la pratique courante pour une application web :

- on écoute `error` (en capture) et `unhandledrejection` : les vraies pannes ;
- un module en ligne qui échoue ne dit rien — ni `src`, ni message — alors une
  **sonde** va interroger les quatre fichiers critiques et nomme celui qui ne
  répond pas ;
- tant que rien n'a échoué, on affiche l'avancement (`3 / 4`) et on attend ;
- le bouton de rechargement n'apparaît qu'après 75 s **sans** progrès.

Vérifié dans les deux sens : aucune fausse panne à 32 s et 63,7 s de
chargement sain, et sur une vraie coupure le message dit
« three.core.js : aucune réponse ».

### Le service worker
- Navigation réseau-d'abord **avec une limite de 3,5 s** : un lien muet ne doit
  pas empêcher un jeu installé de démarrer. Sans limite, `fetch` ne rend pas une
  erreur — il pend.
- `caches.match(r, { cacheName: BOITE })` : la recherche fouillait TOUTES les
  boîtes, y compris celles des versions précédentes. Une page neuve pouvait
  recevoir le fichier d'une génération d'avant.

### Partir du refuge
Ligne de menu qui n'existe pas avant de l'avoir trouvé, et qui place l'appareil
exactement où le roulage d'arrivée le laisse (`REFUGE_PLAN.arret`), moteur
coupé, vie pleine, sans vague. Deux défauts corrigés au passage : le refuge
restait invisible faute des trois minutes de vol, et le mot DÉCOLLAGE s'affichait
au-dessus d'un appareil immobile.

### Les écrans qui ne sont pas des téléphones debout

Champ de vision : il est VERTICAL dans three.js, donc fixe en hauteur et
variable en largeur. Règle « Hor+ » — plus étroit que le repère, on garde le
champ horizontal ; plus large, on garde le vertical mais on borne l'horizontal
à 100°.

| écran | proportion | champ horizontal avant | après |
|---|---|---|---|
| iPhone debout | 0,46 | 33° | 33° |
| Fold couverture | 0,39 | 28° | **33°** |
| Fold ouvert | 0,80 | 55° | 55° |
| ordinateur | 1,60 | 92° | 92° |

Disposition : l'interface s'étalait d'un bord à l'autre. Sur un Fold déplié le
bouton le plus éloigné était à **2033 px** du bord opposé. Elle tient maintenant
dans une colonne de **560 px centrée**, sur les six formats mesurés, sans que
rien ne dépasse et sans toucher à la 3D, qui garde tout l'écran.

Deux pièges rencontrés, tous deux mesurés :
- `var(--colonne)` à l'intérieur d'un `max()` : Chromium laisse tomber la
  déclaration et retombe sur le raccourci. 10 px depuis la feuille, 824 px avec
  la même expression posée à la main. Valeur écrite en toutes lettres.
- `body.accueil #topbar` vaut (1,1,0) et l'emportait sur (1,0,0) : la colonne
  s'appliquait partout **sauf** sur l'écran de titre.

La charnière (`viewport-segment`) est écrite d'après la spécification et
**n'est pas vérifiée** : aucun navigateur du banc n'expose de segments. Elle
n'a aucun effet sur un écran ordinaire.

### Les essais
`essais/demarrage.mjs` (5 vérifications) et `essais/pliants.mjs` (24
vérifications sur six formats) rejoignent le dépôt.

## v1.37 — le défaut qui attendait qu'on progresse

### Ce que le nouveau rapporteur a dit, mot pour mot
`ReferenceError: Cannot access 'decouvertes' before initialization — ligne 3641`

La v1.36 n'a rien cassé : elle a rendu visible ce qui était là. L'écran
précédent, à 11 h 11, accusait three.js pour **exactement le même défaut**.

### Le mécanisme
`avionOuvert` lit `decouvertes`, déclaré onze mille lignes plus bas. Mais sa
condition commence par `a.acces === 'libre' ||` : avec un appareil libre, la
ligne n'est jamais atteinte. Or `appliqueAvion()` tourne à l'initialisation, sur
**l'appareil sauvegardé**.

Donc : bimoteur, tout va bien ; l'Ancien ou le Faucheur, la page reste noire.
Un défaut qui attend que le joueur progresse pour se déclencher — et invisible
sur un banc qui démarre toujours d'une partie neuve.

Vérifié : présent en **v1.30** comme en v1.36. Il date du jour où un appareil
non libre a pu être gardé d'une partie à l'autre.

### Ce que j'avais fait de travers deux fois
Le piège était noté **en commentaire, deux fois**, et contourné deux fois au
lieu d'être supprimé : `legendesN` relisait le carnet dans le stockage,
`cielCompletN` relisait les découvertes. Deux rustines pour une seule cause.

Les deux sont supprimées. La règle est maintenant écrite dans le fichier et
sans exception : **tout ce qui vient du stockage se déclare en tête**, avant la
première ligne qui pourrait le lire. Ce n'est pas du style — c'est la seule
disposition où l'ordre du fichier ne peut plus produire ce défaut.

### L'essai qui aurait attrapé ça
`essais/sauvegardes.mjs` démarre le jeu dans neuf états qu'une vraie partie peut
laisser derrière elle : chaque appareil, refuge trouvé ou non, ciel complet ou
non, Jeep ramenée, disque cassé, lettre à moitié effacée.

| version | résultat |
|---|---|
| v1.30 | 5 sauvegardes sur 9 empêchent le démarrage |
| v1.36 | 5 sur 9 |
| v1.37 | **9 sur 9 démarrent** |

Aucun essai de chargement ne pouvait l'attraper tant que tous partaient d'un
stockage vide. C'est la leçon la plus utile de la journée.

## v1.38 — la loupe, pour de bon, et la partie neuve

### La loupe de l'iPhone
La feuille de style disait déjà `user-select: none` et
`-webkit-touch-callout: none` **partout** depuis la v1.29, et l'ovale
grossissant surgissait toujours au double appui.

La raison est dans le code, pas dans le style : ce qui arrête la machinerie de
geste d'iOS, c'est `preventDefault()` sur `touchstart`. Or **tous** les
écouteurs du jeu sont déclarés `{ passive: true }` — c'est la promesse de ne
jamais appeler `preventDefault`, et le navigateur la tient pour nous. Aucune
règle de style ne remplace ça.

Une couche non passive s'ajoute donc, et seulement sur la surface de jeu :
`touchstart`, `touchmove`, `selectstart`, `contextmenu`, `dblclick`, plus
`gesturestart` qui est propre à Safari. Elle s'efface devant les panneaux, les
boutons et les champs.

La loupe elle-même n'est pas vérifiable sur ce banc — c'est un élément du
système iOS. Ce qui l'est, et c'est ce qui casse en pratique, c'est la
non-régression : `essais/gestes.mjs`, 6 vérifications — le geste est coupé sur
le canvas, il passe sur un bouton, DÉCOLLER répond, la lettre défile.

### NOUVELLE PARTIE repartait du refuge
`resetGame()` remettait tout à zéro **sauf** `state.refuge`. Une fois qu'on y
était allé — en s'y posant, ou par la ligne de menu de la v1.36 — chaque
nouvelle partie repartait de là-bas, à trente-deux kilomètres du terrain, sans
décollage et sans vague. Le défaut existait avant la v1.36 ; la ligne de menu
l'a rendu facile à atteindre.

Vérifié : partir du refuge, puis NOUVELLE PARTIE → `x = 0`, sur le terrain.

---

# Session v1.51 → v1.62 — ce qui a été fait, et ce qui a été mesuré

Ce bloc rattrape onze versions écrites sans que ce fichier bouge. Il n'y a
pas d'idée neuve ici : seulement les décisions prises et les nombres relevés,
qui n'existaient jusqu'ici que dans le journal des versions et dans la
conversation — c'est-à-dire nulle part de durable.

## v1.51 — la fusion des trois chasseurs

Le chasseur et l'intercepteur ne sortent plus en vague : le gardien reprend
leur rôle. Une chenillée lourde ferme la neuvième vague avec deux chars, la
dixième lance vingt biplans et le faucheur vient dessus, et les drones tirent
des roquettes à partir de la septième.

Table mesurée : 1 : 1 biplan · 2 : 2 biplans + 1 char · 3 : 3 biplans ·
4 : 3 biplans + 1 drone + 1 char · 5 : 1 gardien · 6 : 5 drones + 1 char ·
7 : 6 drones · 8 : 7 drones + 1 char · 9 : 1 lourde + 2 chars ·
10 : 20 biplans · 11 et au-delà : drones + faucheur.

## v1.52 — le trait unique, le boost relatif, la jauge à moitié

**Un seul vert.** Les pylônes valaient 0,72, le hangar 0,80, les arches 0,85,
les tours et les spéciaux 0,90. Une ville censée être d'un seul trait se
lisait en quatre intensités. Une seule valeur, 0,85, et une seule exception :
le portail définitivement clos, à 0,10.

**Le portail ajoute au lieu de fixer.** `Math.min(SPEED_MAX, …)` faisait du
portail une consigne absolue : arriver d'un piqué à plus de 320 et le
franchir COÛTAIT la différence. Mesuré : piqué stabilisé à 306 m/s, portail
306 → 366.

**Plus de mur de vitesse.** Le plafond valait SPEED_MAX × 1,35 = 432 ; il
devient un garde-fou de simulation à 1500, et c'est le rappel du moteur qui
limite. Le plancher du piqué passe d'un tiers à sept dixièmes de ce que la
pesanteur donne : nez à la verticale, on accélère tant qu'on descend.

**La jauge part à moitié.** Elle est graduée sur le double de la vie de
départ. La moitié droite est de la vie de bonus, à aller chercher.

**Les mécaniciens affichent ce que la réparation coûte** — des chiffres qui
montent au-dessus de leur tête, par paliers de 25 points.

**L'Ancien et le faucheur répondent enfin au nez.** Leur nom voyageait dans
un tableau séparé, lu par le même indice que le rang : les trois premiers
tombaient juste, puis les silhouettes ennemies s'intercalaient, et les deux
derniers noms se retrouvaient collés sur deux carcasses adverses. Mesuré
après correction : les cinq appareils accrochent à 41–74 m.

**La manche à air au large.** Elle était à 14,6 m du hangar, donc dans son
remous et devant lui depuis la piste. Elle passe à 83,4 m, à 17 m du bitume.

## v1.53 — le temps de réaction adverse, le rayon plafonné, la loupe

**Le temps de réaction.** L'adversaire corrigeait son cap à chaque image : on
virait, il virait. Chaque type a maintenant son délai, déclenché quand la
ligne de visée passe derrière son aile. Mesuré sur les six types, le délai
tenu vaut exactement la valeur annoncée : biplan 2,00 s · chasseur 1,40 ·
drone 1,20 · intercepteur 0,90 · gardien 0,50 · faucheur 0,40.

**Le rayon de virage plafonné à 110 m.** Rien ne change sous 200 m/s (136 m
de balayage à 130). À 300 m/s, le demi-tour passe de 356 m à 277 m.

**La guillotine** (voir v1.60 pour sa correction) et **le relief solide** :
16 adversaires nés en plein massif, 0 sous le sol, 0 image passée dans la
roche sur 60 s de vol. Avant, le pire était à 482 m sous la crête.

**Le décor à grande vitesse.** Le test de collision se fait sur le chemin
parcouru et non sur le point d'arrivée. Arrêté par le pylône à 130, 400, 800
et 1200 m/s, avec des pas allant jusqu'à 40 m par image.

**La roquette adverse vise le point d'interception** (annulé en v1.60, voir
plus bas) et **un décompte en secondes** dit quand elle arrive.

## v1.54 — la grande tour, le PAPI dehors, le bout de piste

**La grande tour** : 693 m contre 432 au plus grand pylône, fenêtre à
415–509 m et 95 m de large, le double de prime. Étoile à six branches au
radar.

**Le puits en U et le mur à fente quittent la carte.** Il fallait connaître
la figure ET la réussir en aveugle, dans un couloir, sous le feu.

**Le PAPI n'a plus qu'une rampe, à l'ouest.** Son quatrième feu était à 58 m
de l'axe, et le hangar occupe la bande 55–101 : il était dedans.

**Le bout de piste ne catapulte plus.** Trois filets se rallumaient d'un coup
au franchissement du seuil ; ils se tendent sur 140 m. Mesuré : le plus gros
pas en une image passe de 11,5 m à 1,2 m.

Piège trouvé en route : `hs` est NÉGATIF quand on vole sous le plancher, ce
qui est le cas normal au-dessus de la piste. Écrire « hs < coussin × (1 −
part) » suffisait à rallumer le coussin en plein milieu du bitume.

## v1.55 et v1.59 — leurs viseurs, sur nous

Chacun de ceux qui nous alignent pose son viseur sur notre propre cellule, à
un endroit tiré au sort sur la carlingue et gardé tant qu'il ne lâche pas.
Le viseur tourne, se resserre avec son alignement, et se croise quand il est
prêt à tirer. Verts, comme tout le reste (v1.59).

## v1.56 — le plafond protège, le roulage s'emballe, le portail arrache du sol

**Le plafond donne l'immunité au crash**, sol et murs, jusqu'au prochain
posé. Mesuré : 80 points de dégâts au sol coûtaient 62, ils coûtent 0 ; les
mêmes en balles coûtent toujours 62.

**Le roulage** monte de 15 à 45 m/s en dix secondes de plein gaz — 16 à 2 s,
25 à 4, 33 à 6, 40 à 8 — et retombe deux fois plus vite.

**Un portail franchi en roulant arrache du sol.** Mesuré : guillotine 0 → 1,
+20 de vie, 104 m/s au décollage depuis 20 au sol. Deux arches sont à portée
de roulage du terrain (570 et 724 m).

## v1.57 — l'embuscade par le haut

Certains montent, loin et haut et en silence, quand on est tenu par au moins
deux autres, puis tombent. Mesuré : 445 m pris au-dessus du joueur avant le
piqué, sur les 490 que le plafond du drone autorise.

Piège trouvé : le rappel de distance (« décroché trop loin, il revient »)
remettait le cap sur nous APRÈS la tactique, à chaque image. L'embuscade ne
gagnait que 30 m avant de renoncer.

## v1.58 — le tunnel sous la montagne

380 m de roche percée au cap 288, à 5306 m du terrain, boyau de 62 × 30 entre
733 et 763 m d'altitude. L'emplacement est calculé, pas choisi : balayage de
tout le massif au pas de 20 m, à la recherche de la crête qui laisse le plus
de roche au-dessus d'un boyau horizontal dont les deux bouts débouchent en
l'air. 147 m de roche au-dessus du plafond ; bouche ouest à 728, bouche est à
733.

Dedans : +50 de vie par seconde, aucune poussée, et les trois filets du monde
s'effacent. Le coup de fouet est à la sortie, quel que soit le bout.

Mesuré : traversée en 3,7 s à 130 m/s, +184 de vie, vitesse 104 dans le boyau
et 164 après la sortie.

**Réserve connue :** de l'extérieur, la bouche ne se détache pas. Le maillage
du sol n'a pas de trou, il passe au travers, et c'est la colline qu'on voit.
Ce qui dépasse, c'est le portail de béton, 57 m au-dessus du sol à la bouche
ouest. Percer le terrain lui-même reste à faire si l'on veut le rendre
repérable.

## v1.60 — la guillotine qui rétrécit vraiment

Elle tombait à l'instant du passage, donc sur nous, et le volume qui compte
la traversée gardait sa taille d'origine : on visait le haut du trou, on
était repoussé par la lame, et l'on croyait à un mur invisible en travers
d'une ouverture encore grande ouverte.

Elle attend maintenant deux secondes, et le trou rétrécit pour de bon :
74 m, 37, 18, puis rien.

**Décision prise seul, à confirmer.** Les deux mâchoires se referment vers le
milieu au lieu de tomber du linteau. Raison : le bas d'une arche est au
niveau du sol et le plancher invisible du monde est à 26 m — une lame venue
du haut rendait le deuxième cran injouable et le troisième souterrain. La
fente reste donc à la même hauteur, et il faut seulement y entrer plus juste.
Si Pierre préfère la vraie guillotine, il faut remonter le seuil des arches.

**La roquette suit au lieu d'anticiper.** Une roquette rattrape parce qu'elle
va plus vite, pas parce qu'elle calcule. Tir à 520 m au plus, rapprochement à
220 m/s : la fenêtre passe de neuf secondes à deux.

**Une figure décroche les simples.** Biplan, chasseur, drone et chenillée
perdent leur visée ; intercepteur, gardien et faucheur la gardent.

**Le repère du plafond sur la jauge.** Les mécaniciens réparaient bien
jusqu'au plafond ; c'est la barre qui mentait, puisqu'elle vaut 200 depuis
qu'elle part à moitié. Un trait marque le plafond : à gauche ce qu'ils savent
rendre, à droite ce qu'il faut aller chercher.

**Un appareil verrouillé dit par où passe sa clé**, au lieu de dire seulement
qu'il est fermé.

**La loupe d'iOS, troisième tour.** Le style ne pouvait pas suffire : dans un
conteneur QUI DÉFILE, le geste d'appui long est capté par la machinerie de
sélection du navigateur AVANT qu'il regarde si le texte est sélectionnable.
Le défilement des panneaux est donc repris à notre compte, avec inertie.
Mesuré avec de vrais événements tactiles : 287 px de défilement pour un
glissement de 216 px.

## v1.61 — le décompte au-dessus de l'appareil

Il vivait à 40 % de la hauteur, c'est-à-dire nulle part. Il se pose au-dessus
de la cellule, il la suit, il est vert et dans la police du HUD. Dans la
dernière seconde, ESQUIVE remplace le chiffre, et c'est là — et seulement là
— qu'un coup de manche franc suffit à la semer.

Une roquette semée est figée sur le point qu'on occupait à l'instant du geste
et le traverse : on la voit passer.

Mesuré sur six tirs par cas : sans rien faire, 6/6 au but ; coup de manche
dans la fenêtre, 0/6 et elle passe à 14 m ; tonneau sous 250 m, 0/6 et elle
passe à 25 m.

## v1.62 — TROP HAUT ne parle que dans le tube

Le plan est lisible bien avant qu'on décide de se poser. On lisait donc
« TROP HAUT » en plein combat, à deux kilomètres du terrain. Le mot est un
ordre d'approche : il ne s'affiche que quand le tube nous tient. Les quatre
feux restent allumés — ce sont des feux d'aérodrome.

## Dwelve Hollow v0.38

La même défense contre la loupe d'iOS, portée dans l'autre jeu : sélection
interdite partout sauf dans les champs, `selectionchange` qui replie la
sélection, menu contextuel et pincement coupés.
