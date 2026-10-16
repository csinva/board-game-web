// Turn walkthrough player: a slideshow of board states with animated changes.
//
// A game provides walk(A) → [{ step, say, svg }, ...] where `step` is the index of
// the turn step the slide illustrates and `svg` is the full 320×200 scene.
// Wrap anything that should move between slides in A.k('key', svg): pieces with the
// same key slide from their old position to the new one, new keys pop in and keys
// that disappear fade out. Everything else simply swaps.

(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function center(el) {
    try { const b = el.getBBox(); return [b.x + b.width / 2, b.y + b.height / 2]; } catch (e) { return [0, 0]; }
  }

  window.mountWalk = function (root, frames, onFrame) {
    root.innerHTML = `
      <div class="walk-stage"><svg viewBox="0 0 320 200" class="walk-svg" role="img" aria-label="Animated walkthrough of a turn"></svg></div>
      <div class="walk-cap" aria-live="polite"><span class="walk-say"></span></div>
      <div class="walk-ctl">
        <button class="walk-btn" data-a="prev" aria-label="Previous slide">‹</button>
        <button class="walk-btn walk-play" data-a="play" aria-label="Play or pause">❚❚</button>
        <button class="walk-btn" data-a="next" aria-label="Next slide">›</button>
        <span class="walk-dots">${frames.map((_, i) => `<button data-i="${i}" aria-label="Slide ${i + 1}"></button>`).join('')}</span>
      </div>`;
    const svg = root.querySelector('svg'), say = root.querySelector('.walk-say');
    const dots = [...root.querySelectorAll('.walk-dots button')], playBtn = root.querySelector('.walk-play');
    let cur = -1, layer = null, timer = null, playing = !reduce, visible = false;

    function show(i) {
      i = (i + frames.length) % frames.length;
      const f = frames[i];
      const next = document.createElementNS(NS, 'g');
      next.innerHTML = f.svg;
      svg.appendChild(next);
      if (layer && !reduce) {
        const old = new Map([...layer.querySelectorAll('[data-k]')].map(el => [el.dataset.k, el]));
        next.querySelectorAll('[data-k]').forEach(el => {
          const prev = old.get(el.dataset.k);
          if (prev) {
            const [ox, oy] = center(prev), [nx, ny] = center(el);
            if (Math.abs(ox - nx) + Math.abs(oy - ny) > 0.5) {
              el.style.transform = `translate(${ox - nx}px, ${oy - ny}px)`;
              el.getBoundingClientRect();
              el.classList.add('walk-move');
              el.style.transform = '';
            }
            old.delete(el.dataset.k);
          } else if (i !== 0 || cur !== frames.length - 1) {
            el.classList.add('walk-enter');
          }
        });
        // Pieces that vanish fade out from where they were.
        const ghost = document.createElementNS(NS, 'g');
        old.forEach(el => { el.classList.add('walk-exit'); ghost.appendChild(el); });
        svg.appendChild(ghost);
        setTimeout(() => ghost.remove(), 700);
      }
      if (layer) layer.remove();
      layer = next;
      cur = i;
      say.innerHTML = window.md(f.say);
      dots.forEach((d, j) => d.classList.toggle('on', j === i));
      if (onFrame) onFrame(f, i);
      schedule();
    }

    function schedule() {
      clearTimeout(timer);
      if (!playing || !visible) return;
      const f = frames[cur];
      const ms = 2200 + 38 * f.say.length + (cur === frames.length - 1 ? 1500 : 0);
      timer = setTimeout(() => show(cur + 1), ms);
    }
    function setPlaying(p) { playing = p; playBtn.textContent = p ? '❚❚' : '▶'; schedule(); }

    root.querySelector('.walk-ctl').addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.a === 'play') return setPlaying(!playing);
      setPlaying(false);
      if (b.dataset.a === 'prev') show(cur - 1);
      else if (b.dataset.a === 'next') show(cur + 1);
      else if (b.dataset.i) show(+b.dataset.i);
    });
    new IntersectionObserver(es => { visible = es[0].isIntersecting; schedule(); }, { threshold: 0.4 }).observe(root);
    show(0);
    if (reduce) setPlaying(false);
  };
})();
