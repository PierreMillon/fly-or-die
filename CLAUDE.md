# Fly or Die — règles de travail

Ce fichier est relu à chaque session et survit aux résumés de conversation.
Les consignes écrites ici priment sur tout réflexe par défaut.

## 1. On ne rend pas la main tant qu'il reste une tâche

### La file

**Les toutes premières lignes de `BACKLOG.md`** portent la file, en cases à
cocher `- [ ]`. Pas ailleurs dans le fichier : en tête, avant tout le reste.

### Le contrôle de fin de tour

Avant d'écrire la moindre phrase de conclusion, exécuter :

```sh
grep -c "^- \[ \]" BACKLOG.md
```

- **Résultat > 0** → il reste du travail. On n'écrit pas de conclusion, on
  prend la première case vide et on continue **dans le même tour**.
- **Résultat = 0** → vérifier que la file existe vraiment (`grep -n "^## LA FILE"`).
  Si elle a disparu ou n'a jamais été remplie, **c'est un défaut à réparer**,
  pas une autorisation de s'arrêter : on la reconstruit à partir de la
  conversation et on reprend.

### Pourquoi ce contrôle existe

Il a été ajouté en v1.70 après constat : la règle disait déjà « tant qu'une
case est vide, le tour ne se termine pas », et `BACKLOG.md` ne contenait
**aucune case à cocher**. Zéro case vide, donc condition jamais vraie, donc
règle auto-désactivée. Elle a été relue des dizaines de fois sans jamais rien
déclencher. Une règle dont on n'a pas mesuré le déclenchement ne vaut rien —
c'est la règle 3 appliquée aux règles elles-mêmes.

### Un push n'est pas une fin

Version poussée, journal écrit, mesures rapportées : c'est un **point de
sauvegarde**. Après un `git push` — deux lignes de rapport maximum, on coche,
on enchaîne. Le livrable est le jeu, pas le compte rendu.

### Les nouvelles demandes ne vident pas la file

Une demande qui arrive en cours de tour s'ajoute à la file et se fait. Elle ne
remplace jamais ce qui y était déjà, et l'avoir traitée n'autorise pas à
rendre la main : on retourne à la file. C'est la faute constatée aux v1.53 et
v1.69 — dix demandes courtes d'affilée, et les deux gros chantiers reculaient
d'un cran à chaque fois.

### Le seul cas où l'on rend la main

La file est vide ET le contrôle ci-dessus a été exécuté. Ou bien une question
bloque *toutes* les tâches restantes, ce qui n'est jamais arrivé.

## 2. Les questions se posent en quiz

Toute question se pose avec `AskUserQuestion`, en boutons cliquables, jamais en
prose. Pas de question de relance en fin de réponse.

Une question ne justifie pas un arrêt : on pose la question **et** on continue
sur ce qui n'en dépend pas.

## 3. Rien n'est affirmé sans mesure

Aucun correctif n'est annoncé sans l'avoir mesuré dans un vrai navigateur, et
le nombre mesuré est rapporté. Un essai qui téléporte l'appareil doit forcer la
reconstruction de la grille (`majGrille` la rebâtit au franchissement d'une case
de 160 m) — sans quoi la mesure ne vaut rien, leçon de la v1.30.

Chaque mesure est consignée dans `BACKLOG.md`.

## 4. Le journal, et le numéro du cache

Une ligne par changement, un tiret, une phrase courte, traduite en anglais.

### Le contrôle, avant chaque `git push`

`sw.js` nomme la boîte de cache. Si elle ne change pas, le joueur reçoit un
`math.js` d'une version d'avant avec l'`index.html` d'aujourd'hui, et le jeu
**ne démarre pas du tout**. Exécuter :

```sh
diff <(grep -o "v[0-9]\+\.[0-9]\+" <(head -3 <(grep -A1 "^const JOURNAL" index.html))) \
     <(grep -o "v[0-9]\+\.[0-9]\+" <(grep "^const VERSION" sw.js))
```

Plus simplement, les deux doivent être égaux :

```sh
grep -m1 -o "v: '[0-9.]*'" index.html   # JOURNAL[0].v
grep -o "'v[0-9.]*'" sw.js              # VERSION
```

Différents → on corrige `sw.js` avant de pousser. Ce n'est pas une politesse :
c'est la seule chose qui sépare une version publiée d'une page blanche.

### Pourquoi ce contrôle existe

Ajouté en v1.72. `VERSION` était resté à `v1.50` pendant vingt et une
versions. Le jeu en production est mort sur
`SyntaxError: Importing binding name 'SOMMET' is not found` — un `math.js` de
la v1.50 servi à l'`index.html` de la v1.69.

Depuis la v1.72, `math.js` et `jeu.css` suivent la même règle que la page —
réseau d'abord, cache en secours — donc le code ne peut plus se dépareiller
même si le numéro est oublié. Le contrôle reste, parce qu'une ceinture et une
bretelle valent mieux qu'un fichier qu'on a déjà oublié vingt et une fois.

## 5. La forme

- Français. Minimaliste, aéré. Pas de blocs denses, pas d'encadrés gris.
- Aucune phrase ironique ou moqueuse dans les textes du jeu.
- Aucun texte ne dépasse jamais la largeur de la fenêtre.
- Tout panneau a un bouton de fermeture **et** se ferme en touchant dehors.

## 6. La lettre

`lettreTxte`, `lettreSig` et `lettreNom` sont **en français uniquement**, jamais
traduits. C'est un mot pour quelqu'un, pas un texte de jeu.

## 7. Direction artistique

Le jeu est une lettre d'amour à Émilie. Le refuge est l'endroit où l'on va
quand il n'y a plus rien à gagner. L'avion volait très haut et a explosé en
plein ciel.

Tout est un dessin au trait vert sur des faces pleines noires : contour vert,
surface interne opaque. On ne voit jamais à travers quoi que ce soit.
