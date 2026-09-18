# Les essais

## Pourquoi ils sont ici et plus ailleurs

Ils vivaient dans `/tmp`. Chaque nouvelle machine les effaçait, et on les
réécrivait de mémoire — donc jamais tout à fait pareils, donc les chiffres
d'une session ne se comparaient pas à ceux de la précédente. Un banc de mesure
qui n'est pas versionné n'est pas un banc de mesure.

## Lancer

```sh
npm i -D playwright
npx playwright install chromium
node essais/fumee.mjs                       # la version en ligne
node essais/fumee.mjs http://127.0.0.1:8123 # une version locale
```

Si Chromium est déjà installé quelque part, on évite le téléchargement :

```sh
CHROMIUM=/chemin/vers/chrome node essais/fumee.mjs
```

## Ce que `fumee.mjs` vérifie

Il ne dit pas si le jeu est bon. Il dit s'il est mort.

| vérification | ce qu'elle attrape |
|---|---|
| `window.__fodReady` | le module ne s'est pas chargé, ou une erreur d'ordre d'initialisation a mis la page en blanc |
| `window.__fod` exposé | plus aucune mesure possible depuis l'extérieur |
| la partie tourne | le jeu s'est arrêté tout seul |
| le décollage est fini | la séquence de départ ne se termine plus |
| altitude et vitesse | le modèle de vol ne produit plus rien |
| la première vague | l'adversaire n'arrive jamais |
| la structure | on prend des dégâts sans raison au décollage |
| aucune erreur JavaScript | une exception dans la boucle : l'image se fige, et ça passe pour de la lenteur |

Le code de sortie vaut 1 si une vérification échoue.

## `math.mjs` — les calculs purs, sans navigateur

22 vérifications sur `math.js` : le relief est plat sous la ville et au-delà de
la chaîne, il ne perce jamais son plafond, il est déterministe ; le tube va bien
de 190 m à la bouche à 9 m au toucher ; le point visé tombe à 520 m en amont du
centre de la piste principale. Instantané, aucune dépendance.

## Les faire tourner à chaque poussée

`action-github.yml.exemple` est prêt et n'est pas activé :

```sh
cp essais/action-github.yml.exemple .github/workflows/essais.yml
```

## Une leçon qui a coûté quatre versions

La grille du sol **se rebâtit** dès qu'on franchit une case de 160 m
(`majGrille`). Un essai qui téléporte l'appareil en franchit forcément une : la
géométrie modifiée à la main est reconstruite à l'image suivante, **avant** la
capture d'écran.

Onze planches comparatives sur la transparence des montagnes ont ainsi montré
exactement la même image. Tout essai qui touche au terrain doit donc forcer la
reconstruction et l'attendre, sans quoi il ne mesure rien.

## Ce qui n'est pas encore ici

L'atterrissage (point de toucher, distance au hangar, durée de roulage), le
tonneau barriqué (déport net), le remplissage du sol. Ces mesures existent et
sont consignées dans `BACKLOG.md`, mais elles se refont à la main à chaque
session. Elles ont leur place ici.
