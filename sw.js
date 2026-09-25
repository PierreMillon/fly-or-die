// ---------------------------------------------------------------------------
// LE SERVICE WORKER. Il tient le jeu hors ligne — dans le train, en forêt, en
// avion. Trois règles, et rien de plus :
//
//   la page      → le réseau d'abord, le cache en secours
//   le reste     → le cache d'abord, le réseau en secours
//   l'ancien     → effacé au premier démarrage de la nouvelle version
//
// L'ordre compte. Le contraire — le cache d'abord pour la page — est le piège
// classique : on publie une version, le joueur ne la voit jamais, et il n'a
// aucun moyen de savoir pourquoi. Ici la page est toujours cherchée en ligne
// quand le réseau répond, et le cache ne sert qu'à ce pour quoi il est fait.
// ---------------------------------------------------------------------------
// ELLE DOIT SUIVRE JOURNAL[0].v, ET ELLE NE L'A PAS FAIT PENDANT VINGT ET UNE
// VERSIONS. Restée à v1.50, la boîte de cache n'a jamais changé de nom : le
// jeu servait donc un math.js de la v1.50 à un index.html d'aujourd'hui, et
// la page mourait sur « Importing binding name 'SOMMET' is not found ».
//
// Le contrôle est dans CLAUDE.md, règle 4, et il se lance.
const VERSION = 'v1.84';
const BOITE = 'fly-or-die-' + VERSION;

// Le strict nécessaire pour décoller sans réseau. Depuis que three.js vit dans
// le dépôt, tout ce qui compte est de la même origine : plus rien à demander à
// un CDN, donc plus rien qui puisse tomber. La police non plus ne vient plus
// d'ailleurs (v1.35) : elle est dans le socle, et une première ouverture sans
// réseau a désormais exactement la même tête qu'une autre.
// Au-delà de ce délai, on sert la page en cache et l'on met à jour au
// lancement suivant. Un lien muet ne doit pas empêcher un jeu installé de
// démarrer.
const DELAI_RESEAU = 3500;

const SOCLE = [
  './',
  './index.html',
  // LA FEUILLE DE STYLE EST SORTIE DU FICHIER (v1.34) : sans cette ligne, le
  // jeu s'installerait sans son habillage et la première ouverture hors réseau
  // donnerait une page nue. C'est le seul prix du découpage, et il se paie ici.
  './jeu.css',
  './math.js',       // les calculs purs, sortis du fichier en v1.34
  // LA POLICE, DANS LE SOCLE. C'était la dernière chose que le jeu allait
  // chercher ailleurs, et la seule qui manquait à une première ouverture hors
  // réseau. Quarante-huit kilooctets pour quatre fichiers : moins qu'une seule
  // image du décor, et le jeu ne dépend plus de personne.
  './vendor/plex/plex-mono-400-latin.woff2',
  './vendor/plex/plex-mono-400-latin-ext.woff2',
  './vendor/plex/plex-mono-500-latin.woff2',
  './vendor/plex/plex-mono-500-latin-ext.woff2',
  './carte.html',
  './favicon.svg',
  './manifest.webmanifest',
  './icone-192.png',
  './icone-512.png',
  // LA MUSIQUE N'EST PAS PRE-CHARGEE. Elle pese pres de deux megaoctets, et la
  // tres grande majorite des parties ne franchit jamais la chaine : on ne va
  // pas la faire telecharger a tout le monde a l'installation. Elle sera mise
  // en cache la premiere fois qu'elle joue, par la regle generale, et sera la
  // les fois suivantes, y compris hors ligne.
  './vendor/three/three.module.js',
  './vendor/three/three.core.js',
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(BOITE);
    // Un seul élément injoignable ferait échouer tout addAll et le service
    // worker ne s'installerait pas du tout. On les prend donc un par un.
    await Promise.all(SOCLE.map(u =>
      c.add(new Request(u, { cache: 'reload' })).catch(() => {})));
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const noms = await caches.keys();
    await Promise.all(noms
      .filter(n => n.startsWith('fly-or-die-') && n !== BOITE)
      .map(n => caches.delete(n)));
  })());
});
// Volontairement pas de clients.claim(). Prendre la main sur la page déjà
// ouverte, c'est changer de gestionnaire de requêtes PENDANT qu'elle charge
// son module et sa bibliothèque 3D. Ce service worker ne s'occupe donc que du
// lancement suivant — le premier passage se déroule exactement comme avant
// qu'il existe.

// Le joueur a touché « RECHARGER » : la nouvelle version prend la main tout de
// suite au lieu d'attendre que tous les onglets soient fermés.
self.addEventListener('message', e => {
  if (e.data === 'SAUTER') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;

  // LES MÉDIAS NE PASSENT PAS PAR ICI. Un lecteur audio ne télécharge pas un
  // fichier d'un bloc : il demande des tranches, avec un en-tête `Range`, et
  // il attend une réponse 206 Partial Content qui ne contient que la tranche
  // demandée. Or tout ce qui descend plus bas répond par une réponse ENTIÈRE,
  // en 200 — depuis le cache ou depuis le réseau. Safari reçoit alors un
  // fichier complet là où il attendait un morceau, et abandonne : la musique
  // ne se charge jamais.
  //
  // Gérer les tranches à la main dans un service worker est possible, et c'est
  // une source de bogues sans fin. On ne s'en mêle pas : les requêtes de média
  // repartent au navigateur, qui sait faire ça depuis toujours. Le cache HTTP
  // ordinaire s'en occupe, et le fichier reste joignable hors ligne dès qu'il
  // y est entré.
  if (r.headers.has('range') || r.destination === 'audio' || r.destination === 'video') return;

  // LA PAGE : LE RÉSEAU D'ABORD, MAIS PAS INDÉFINIMENT.
  //
  // « Le réseau d'abord » sans limite de temps, c'est la pire des deux
  // stratégies sur un téléphone : un lien qui ne répond pas ne rend pas une
  // erreur, il PEND. Le jeu était installé, la page était dans le cache à
  // quelques millisecondes de là, et l'on regardait un écran vide en attendant
  // qu'un réseau muet veuille bien se décider.
  //
  // Trois secondes et demie, c'est la limite retenue par les bibliothèques
  // sérieuses du domaine : au-delà, on sert la version en cache — le joueur
  // joue — et la mise à jour se fera au lancement suivant. Une application
  // installée doit démarrer, même quand le réseau ment.
  // LES PLANCHES DE RÉGLAGE NE PASSENT PAS PAR ICI DU TOUT.
  //
  // decollage.html, platine.html, tonneau.html, guitare.html, montagnes.html :
  // ce sont des outils, pas le jeu. Elles doivent être la version qu'on vient
  // de pousser, toujours, sans quoi on règle une page d'hier et l'on se
  // demande pourquoi la correction n'arrive pas. Elles repartent au navigateur
  // sans qu'on s'en mêle.
  if (/\/(decollage|platine|tonneau|guitare|montagnes|carte|constellations|ennemis)\.html($|\?)/.test(r.url)) return;

  if (r.mode === 'navigate') {
    e.respondWith((async () => {
      const enCache = caches.match('./index.html', { cacheName: BOITE });
      try {
        const rep = await Promise.race([
          fetch(r),
          new Promise((_, non) => setTimeout(() => non(new Error('trop long')), DELAI_RESEAU))
        ]);
        // ET ON NE RANGE QUE LE JEU SOUS LA CLÉ DU JEU. Toute navigation
        // écrasait ./index.html avec ce qu'on venait d'ouvrir : aller voir une
        // planche remplaçait le jeu en cache par cette planche, et le
        // lancement hors réseau suivant ouvrait la planche à sa place.
        const chemin = new URL(r.url).pathname;
        if (chemin.endsWith('/') || chemin.endsWith('/index.html')) {
          const c = await caches.open(BOITE);
          c.put('./index.html', rep.clone());
        }
        return rep;
      } catch (err) {
        return (await enCache) || (await fetch(r).catch(() => Response.error()));
      }
    })());
    return;
  }

  // ---------------------------------------------------------------------------
  // LE CODE DU JEU : LE RÉSEAU D'ABORD, COMME LA PAGE.
  //
  // index.html partait chercher le réseau, math.js et jeu.css sortaient du
  // cache. Les trois forment UN SEUL programme : servir l'un frais et l'autre
  // vieux, c'est garantir qu'un jour ils ne se comprendront plus. C'est
  // arrivé, et le jeu ne démarrait plus du tout.
  //
  // Ils suivent donc la même règle que la page, avec le même délai. Hors
  // ligne, le cache prend le relais — et là les trois sont vieux ENSEMBLE,
  // donc cohérents. C'est la seule chose qui compte.
  //
  // Cette règle rend le numéro de version du cache facultatif pour la
  // correction : même oublié, le code ne peut plus se dépareiller. Le numéro
  // reste utile pour effacer l'ancien, et il a maintenant son contrôle.
  // ---------------------------------------------------------------------------
  if (/\/(math\.js|jeu\.css)($|\?)/.test(r.url)) {
    e.respondWith((async () => {
      try {
        const rep = await Promise.race([
          fetch(r),
          new Promise((_, non) => setTimeout(() => non(new Error('trop long')), DELAI_RESEAU))
        ]);
        if (rep && rep.status === 200 && rep.type !== 'opaque') {
          const c = await caches.open(BOITE);
          c.put(r, rep.clone());
        }
        return rep;
      } catch (err) {
        return (await caches.match(r, { cacheName: BOITE }))
            || (await fetch(r).catch(() => Response.error()));
      }
    })());
    return;
  }

  // TOUT LE RESTE : le cache d'abord. Une bibliothèque figée sur sa version ne
  // change jamais, et une police non plus.
  e.respondWith((async () => {
    // ON NE CHERCHE QUE DANS SA PROPRE BOÎTE. `caches.match(r)` fouille TOUTES
    // les boîtes, y compris celles des versions précédentes : une page toute
    // neuve pouvait donc recevoir le fichier d'une génération d'avant, et les
    // deux ne se connaissent pas. C'est la panne la plus difficile à
    // reproduire qu'un service worker sache produire.
    const trouve = await caches.match(r, { cacheName: BOITE });
    if (trouve) return trouve;
    try {
      const rep = await fetch(r);
      // On ne garde que ce qui a vraiment répondu. Une réponse opaque ne dit
      // pas si elle a réussi : la mettre en cache, c'est risquer d'y figer une
      // erreur pour toujours.
      if (rep && rep.status === 200 && rep.type !== 'opaque') {
        const c = await caches.open(BOITE);
        c.put(r, rep.clone());
      }
      return rep;
    } catch (err) {
      return Response.error();
    }
  })());
});
