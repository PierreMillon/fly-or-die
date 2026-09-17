# Fly or Die — règles de travail

Ce fichier est relu à chaque session et survit aux résumés de conversation.
Les consignes écrites ici priment sur tout réflexe par défaut.

## 1. On ne rend pas la main tant qu'il reste une tâche

`BACKLOG.md` porte une section **« À FAIRE »** en cases à cocher. Tant qu'une
case y est vide, le tour ne se termine pas.

Une publication — version poussée, journal écrit, mesures rapportées — est un
**point de sauvegarde**, jamais une fin. Après un `git push` : une ligne de
rapport, on coche la case, et on enchaîne sur la tâche suivante **dans le même
tour**.

Rendre la main se fait dans un seul cas : la section « À FAIRE » est vide, ou
une question bloquante empêche d'avancer sur *toutes* les tâches restantes.

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

## 4. Le journal

Une ligne par changement, un tiret, une phrase courte, traduite en anglais.
Le numéro de version affiché vient de `JOURNAL[0].v` ; `sw.js` porte le même.

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
