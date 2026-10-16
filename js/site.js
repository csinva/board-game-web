// Shared top bar + footer.
(function () {
  const page = document.body.dataset.page;
  const logo = '<svg viewBox="0 0 32 32"><rect x="3" y="3" width="26" height="26" rx="6" fill="#c2562b" stroke="#2a2420" stroke-width="2.5"/><circle cx="11" cy="11" r="2.6" fill="#fff"/><circle cx="21" cy="21" r="2.6" fill="#fff"/><circle cx="21" cy="11" r="2.6" fill="#fff"/><circle cx="11" cy="21" r="2.6" fill="#fff"/></svg>';
  const link = (href, label, key) => `<a href="${href}" class="${page === key ? 'on' : ''}">${label}</a>`;
  document.body.insertAdjacentHTML('afterbegin', `<header class="topbar">
    <a class="brand" href="index.html">${logo}Board Game Web</a>
    <nav>${link('index.html', 'All games', 'home')}${link('map.html', 'Find similar games', 'map')}${link('deepdive.html', 'Explore games by their traits', 'deepdive')}</nav>
  </header>`);
  if (page !== 'map') document.body.insertAdjacentHTML('beforeend', `<footer class="site-foot">
    Rules are summarized; check the rulebook for edge cases. ·
    <a href="https://github.com/csinva/board-game-web">Source on GitHub</a></footer>`);
})();
