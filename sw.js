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
const VERSION = 'v0.58';
const BOITE = 'fly-or-die-' + VERSION;

// Le strict nécessaire pour décoller sans réseau. Les polices viennent d'un
// autre domaine et leurs URL sont écrites dans une feuille de style qu'on ne
// lit pas ici : elles se mettent en cache toutes seules au premier passage.
const SOCLE = [
  './',
  './index.html',
  './favicon.svg',
  './manifest.webmanifest',
  './icone-192.png',
  './icone-512.png',
  'https://cdn.jsdelivr.net/npm/three@0.186.0/build/three.module.js',
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

  // LA PAGE : le réseau d'abord.
  if (r.mode === 'navigate') {
    e.respondWith((async () => {
      try {
        const rep = await fetch(r);
        const c = await caches.open(BOITE);
        c.put('./index.html', rep.clone());
        return rep;
      } catch (err) {
        return (await caches.match('./index.html')) || Response.error();
      }
    })());
    return;
  }

  // TOUT LE RESTE : le cache d'abord. Une bibliothèque figée sur sa version ne
  // change jamais, et une police non plus.
  e.respondWith((async () => {
    const trouve = await caches.match(r);
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
