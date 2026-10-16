// The Board Game Deep-Dive: scatter any two dimensions, plus a "gamer profile" reading.
(function () {
  // Brighter family colours for the dark background.
  const FAM_C = { build: '#ff8a5c', engine: '#5fd39a', cards: '#b48cff', tile: '#5dade2', classic: '#d9c7a8', hidden: '#ff6b81', coop: '#3fd0c9', party: '#ffc94d', trick: '#ff8fc8', deck: '#c3dc6e', conflict: '#9aa8d6', epic: '#e0a560' };

  const METRICS = [
    { k: 'weight', label: 'Rules', lo: '🪶 learn it in minutes', hi: '🧠 bring the rulebook', blurb: 'How much rules overhead before your first turn.' },
    { k: 'luck', label: 'Luck', lo: '♟️ pure skill', hi: '🎲 the dice decide', blurb: 'How much randomness swings the result.' },
    { k: 'interaction', label: 'Interaction', lo: '🧘 solitaire with friends', hi: '🤝 in each other’s business', blurb: 'How much your moves change everyone else’s game.' },
    { k: 'mean', label: 'Meanness', lo: '🫶 friendly', hi: '🔪 friendships at risk', blurb: 'Attacks, stealing, betrayal and take-that.' },
    { k: 'talk', label: 'Table talk', lo: '🤫 library quiet', hi: '📣 everyone yelling', blurb: 'How much talking the game needs, or provokes.' },
    { k: 'depth', label: 'Depth', lo: '🎈 solved in an evening', hi: '🌌 a lifetime to master', blurb: 'How far skill can keep improving.' },
    { k: 'fame', label: 'Fame', lo: '💎 hobby secret', hi: '🌍 in every closet', blurb: 'How likely a random person has played it.' },
    { k: 'theme', label: 'Theme', lo: '🔷 pure abstract', hi: '🐉 it’s a story', blurb: 'How much the setting shapes how it plays.' },
    { k: 'downtime', label: 'Downtime', lo: '⚡ always your turn', hi: '☕ go make tea', blurb: 'How long you wait between your turns.' },
    { k: 'time', label: 'Play time', lo: '⏱️ 15 minutes', hi: '🌙 all evening', blurb: 'Box play time, log scale.', fmt: v => v >= 60 ? (v / 60).toFixed(v % 60 ? 1 : 0) + 'h' : Math.round(v) + 'm' },
    { k: 'teach', label: 'Teach time', lo: '📇 explain in 2 min', hi: '📚 an hour of rules', blurb: 'Minutes to explain it to a new table, log scale.', fmt: v => Math.round(v) + 'm' },
  ];
  const M = Object.fromEntries(METRICS.map(m => [m.k, m]));

  loadGames().then(() => {
    const games = DD_ROWS.filter(r => GAME_BY_ID[r[0]]).map(r => {
      const g = GAME_BY_ID[r[0]];
      return { id: r[0], g, name: g.name, fam: g.family, c: FAM_C[g.family] || '#ccc', weight: r[1], luck: r[2], interaction: r[3], mean: r[4], talk: r[5], depth: r[6], fame: r[7], theme: r[8], downtime: r[9], teachMin: r[10], quip: r[11],
        playMin: (g.time[0] + g.time[1]) / 2, heavy: g.profile.complexity >= 4, coop: g.mechanics.includes('cooperative') };
    });
    // Log-scaled derived metrics.
    const logNorm = (key, out) => {
      const vs = games.map(s => Math.log(s[key])), lo = Math.min(...vs), hi = Math.max(...vs);
      games.forEach(s => s[out] = Math.round(100 * (Math.log(s[key]) - lo) / (hi - lo)));
      M[out].raw = key; M[out].inv = v => Math.exp(lo + (hi - lo) * v / 100);
    };
    logNorm('playMin', 'time'); logNorm('teachMin', 'teach');

    document.getElementById('sub').innerHTML = `<b>${games.length} games</b> scored on 11 traits. Pick a trait per axis, filter by family, hover a dot for details.`;

    // ---------- tabs ----------
    document.querySelectorAll('.tab').forEach(t => t.onclick = () => {
      document.querySelectorAll('.tab').forEach(x => x.classList.toggle('active', x === t));
      document.querySelectorAll('.page').forEach(p => p.classList.toggle('hidden', p.id !== 'page-' + t.dataset.page));
      hideTip();
    });

    // ---------- chart ----------
    let mx = M.weight, my = M.interaction;
    const off = new Set();
    const stage = document.getElementById('stage'), tip = document.getElementById('tip');
    const TOUCH = matchMedia('(hover: none), (pointer: coarse)').matches;

    const fams = Object.keys(FAMILIES).filter(k => games.some(s => s.fam === k));
    const covers = document.getElementById('covers');
    covers.innerHTML = fams.map(k => `<button class="cover" data-f="${k}" style="--c:${FAM_C[k]}">${FAMILIES[k].label}</button>`).join('');
    covers.onclick = e => {
      const b = e.target.closest('.cover'); if (!b) return;
      const k = b.dataset.f, solo = !off.has(k) && off.size === fams.length - 1;
      off.clear();
      if (!solo) fams.forEach(f => f !== k && off.add(f));
      covers.querySelectorAll('.cover').forEach(c => c.classList.toggle('off', off.has(c.dataset.f)));
      draw();
    };

    const pills = (el, axis) => {
      el.innerHTML = METRICS.map(m => `<button class="pill" data-k="${m.k}">${m.label}</button>`).join('');
      el.onclick = e => { const b = e.target.closest('.pill'); if (!b) return; if (axis === 'x') mx = M[b.dataset.k]; else my = M[b.dataset.k]; draw(); };
    };
    pills(document.getElementById('pillsX'), 'x'); pills(document.getElementById('pillsY'), 'y');

    // Static scaffolding: grid lines, ticks, axis labels, corners.
    stage.innerHTML = '';
    const mk = (cls, html = '') => { const d = document.createElement('div'); d.className = cls; d.innerHTML = html; stage.appendChild(d); return d; };
    const grid = [0, 25, 50, 75, 100].map(v => ({ v, h: mk('grid-line'), w: mk('grid-line'), tx: mk('tick'), ty: mk('tick') }));
    const yHi = mk('ylab hi'), yLo = mk('ylab lo'), yBlurb = mk('yblurb');
    const corners = ['tl', 'tr', 'bl', 'br'].map(k => Object.assign(mk('corner'), { k }));
    const hash = s => { let h = 0; for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return h; };
    const dots = games.map(s => {
      const d = mk('dot' + (s.heavy ? ' heavy' : ''));
      d.style.setProperty('--c', s.c);
      d.jx = ((hash(s.id) % 100) / 100 - 0.5) * 2.2; d.jy = ((hash(s.id + 'y') % 100) / 100 - 0.5) * 2.2;
      d.onmouseenter = () => !TOUCH && showTip(s, d);
      d.onmouseleave = () => !TOUCH && scheduleHide();
      d.onclick = e => { e.stopPropagation(); TOUCH ? showTip(s, d) : (location.href = 'game.html?g=' + s.id); };
      return d;
    });
    const labels = Array.from({ length: 8 }, () => mk('lbl'));
    document.addEventListener('click', e => { if (!tip.contains(e.target)) hideTip(); });

    function geom() {
      const W = stage.clientWidth, H = stage.clientHeight, mobile = W < 600;
      const pl = mobile ? 50 : 76, pr = 16, pt = 22, pb = 26;
      return { W, H, x: v => pl + v / 100 * (W - pl - pr), y: v => H - pb - v / 100 * (H - pt - pb), pl, pb };
    }
    const tickText = (m, v) => m.fmt ? m.fmt(m.inv(v)) : v;

    function draw() {
      const G = geom();
      document.querySelectorAll('#pillsX .pill').forEach(p => p.classList.toggle('on', p.dataset.k === mx.k));
      document.querySelectorAll('#pillsY .pill').forEach(p => p.classList.toggle('on', p.dataset.k === my.k));
      grid.forEach(({ v, h, w, tx, ty }) => {
        Object.assign(h.style, { left: G.x(0) + 'px', width: (G.x(100) - G.x(0)) + 'px', top: G.y(v) + 'px', height: '1px' });
        Object.assign(w.style, { top: G.y(100) + 'px', height: (G.y(0) - G.y(100)) + 'px', left: G.x(v) + 'px', width: '1px' });
        tx.textContent = tickText(mx, v); Object.assign(tx.style, { left: (G.x(v) - 8) + 'px', top: (G.y(0) + 6) + 'px' });
        ty.textContent = tickText(my, v); Object.assign(ty.style, { left: (G.pl - 24) + 'px', top: (G.y(v) - 7) + 'px' });
      });
      yHi.textContent = my.hi; yLo.textContent = my.lo; yBlurb.textContent = my.blurb;
      document.getElementById('xLo').textContent = mx.lo; document.getElementById('xHi').textContent = mx.hi;
      document.getElementById('xBlurb').textContent = mx.blurb;
      const strip = t => t.replace(/^\S+\s/, '');
      corners.forEach(c => {
        const top = c.k[0] === 't', left = c.k[1] === 'l';
        c.textContent = `${strip(left ? mx.lo : mx.hi)} · ${strip(top ? my.hi : my.lo)}`;
        Object.assign(c.style, { top: (top ? G.y(100) + 4 : G.y(0) - 18) + 'px', left: left ? (G.x(0) + 8) + 'px' : 'auto', right: left ? 'auto' : '22px' });
      });
      games.forEach((s, i) => {
        const d = dots[i];
        d.style.left = G.x(Math.max(0, Math.min(100, s[mx.k] + d.jx))) + 'px';
        d.style.top = G.y(Math.max(0, Math.min(100, s[my.k] + d.jy))) + 'px';
        d.classList.toggle('off', off.has(s.fam));
      });
      // Label the extremes of what is visible.
      const vis = games.filter(s => !off.has(s.fam));
      const pick = new Set();
      const by = (f, dir) => [...vis].sort((a, b) => dir * (f(b) - f(a)));
      [by(s => s[my.k], 1)[0], by(s => s[my.k], 1)[1], by(s => s[my.k], -1)[0], by(s => s[mx.k], 1)[0], by(s => s[mx.k], -1)[0],
        by(s => s[mx.k] + s[my.k], 1)[0], by(s => s[mx.k] - s[my.k], 1)[0], by(s => s[my.k] - s[mx.k], 1)[0]].forEach(s => s && pick.add(s));
      const list = [...pick];
      labels.forEach((l, i) => {
        const s = list[i];
        l.style.display = s ? '' : 'none';
        if (!s) return;
        l.textContent = s.name;
        l.style.left = G.x(s[mx.k]) + 'px'; l.style.top = G.y(s[my.k]) + 'px';
      });
      boards(vis);
    }

    function boards(vis) {
      const block = (m, arrow) => {
        const top = [...vis].sort((a, b) => b[m.k] - a[m.k]).slice(0, 7);
        return `<div class="board"><h4>${arrow} ${m.label} <span>· top 7</span></h4><ol>${top.map(s => `<li data-id="${s.id}" style="--c:${s.c}"><i></i>${esc(s.name)}<b>${m.fmt ? m.fmt(s[M[m.k].raw]) : s[m.k]}</b></li>`).join('')}</ol></div>`;
      };
      const el = document.getElementById('boards');
      el.innerHTML = block(my, '↑') + block(mx, '→');
      el.querySelectorAll('li').forEach(li => {
        const i = games.findIndex(s => s.id === li.dataset.id);
        li.onmouseenter = () => { dots[i].classList.add('focus'); if (!TOUCH) showTip(games[i], dots[i]); };
        li.onmouseleave = () => { dots[i].classList.remove('focus'); scheduleHide(); };
        li.onclick = () => location.href = 'game.html?g=' + li.dataset.id;
      });
    }

    // ---------- tooltip card ----------
    let hideTimer = null;
    function hideTip() { tip.style.opacity = 0; tip.style.pointerEvents = 'none'; }
    function scheduleHide() { hideTimer = setTimeout(hideTip, 250); }
    tip.onmouseenter = () => clearTimeout(hideTimer);
    tip.onmouseleave = scheduleHide;
    const BAR_KEYS = ['weight', 'luck', 'interaction', 'mean', 'talk', 'depth'];
    function showTip(s, el) {
      clearTimeout(hideTimer);
      const g = s.g;
      tip.style.setProperty('--c', s.c);
      tip.innerHTML = `<div class="t-art"><svg viewBox="0 0 320 200">${g.art(A)}</svg></div><div class="t-body">
        <div class="t-fam">${FAMILIES[s.fam].label}${s.heavy ? ' · heavy' : ''}</div><h3>${esc(s.name)}</h3>
        <p class="t-quip">${esc(s.quip)}</p>
        <div class="t-meta">${g.players[0]}–${g.players[1]} players · ${g.time[0]}–${g.time[1]} min · ~${s.teachMin} min to teach</div>
        <div class="t-bars">${BAR_KEYS.map(k => `<span>${M[k].label}</span><span><i style="width:${s[k]}%"></i></span><span>${s[k]}</span>`).join('')}</div>
        <a class="t-go" href="game.html?g=${s.id}">Learn it in one page →</a></div>`;
      const r = el.getBoundingClientRect(), tw = 300, th = tip.offsetHeight || 420, pad = 14;
      let x = r.right + pad; if (x + tw > innerWidth - 8) x = r.left - tw - pad; if (x < 8) x = Math.max(8, (innerWidth - tw) / 2);
      let y = r.top - th / 3; y = Math.max(8, Math.min(innerHeight - th - 8, y));
      tip.style.left = x + 'px'; tip.style.top = y + 'px'; tip.style.opacity = 1; tip.style.pointerEvents = 'auto';
    }

    addEventListener('resize', draw);
    draw();

    // ---------- profile ----------
    const pop = k => games.reduce((a, s) => a + s[k], 0) / games.length;
    const THEMES = [
      { name: 'Brain Burner', emoji: '🧠', c: '#b48cff', v: s => s.weight, blurb: 'You want the rulebook to fight back. A heavy game is a weekend plan, not a threat.' },
      { name: 'Dice Gambler', emoji: '🎲', c: '#ffc94d', v: s => s.luck, blurb: 'You want the table to gasp. Swingy luck keeps everyone in it, and you live for the comeback.' },
      { name: 'Table Shark', emoji: '🦈', c: '#ff6b81', v: s => s.mean, blurb: 'Direct conflict doesn’t scare you; it’s the point. Your friends know to watch their backs.' },
      { name: 'Smooth Talker', emoji: '🗣️', c: '#ff8fc8', v: s => s.talk, blurb: 'The game is the conversation. Rules are just an excuse to negotiate, accuse and persuade.' },
      { name: 'Grand Strategist', emoji: '♟️', c: '#5dade2', v: s => s.depth, blurb: 'You want a game you can still be getting better at in ten years.' },
      { name: 'Hidden-Gem Hunter', emoji: '💎', c: '#3fd0c9', v: s => 100 - s.fame, blurb: 'You like the games other people haven’t heard of yet. Your shelf is a recommendation engine.' },
      { name: 'Story Seeker', emoji: '🐉', c: '#e0a560', v: s => s.theme, blurb: 'You play for the world: planets, forests, spice. The mechanics should feel like the story.' },
      { name: 'Marathon Gamer', emoji: '🌙', c: '#9aa8d6', v: s => s.time, blurb: 'Clear the evening. You want long arcs, big turns and a game still going at midnight.' },
      { name: 'Team Player', emoji: '🤝', c: '#5fd39a', v: s => s.coop ? 100 : (s.g.mechanics.includes('team') ? 60 : 0), blurb: 'Winning together beats winning alone. You like a table that cheers instead of sulks.' },
      { name: 'Quiet Optimizer', emoji: '🧩', c: '#d9c7a8', v: s => 100 - s.interaction, blurb: 'You like a puzzle in your own corner, building something perfect while others do the same.' },
    ];
    THEMES.forEach(t => { t.mean = games.reduce((a, s) => a + t.v(s), 0) / games.length; });

    const picks = [];
    const search = document.getElementById('search'), suggest = document.getElementById('suggest'), chips = document.getElementById('chips'), btn = document.getElementById('readBtn');
    function refresh() {
      chips.innerHTML = picks.map(s => `<button data-id="${s.id}" style="--c:${s.c}"><i></i>${esc(s.name)}</button>`).join('');
      btn.disabled = picks.length < 3;
      btn.textContent = picks.length < 3 ? `Pick ${3 - picks.length} more game${3 - picks.length > 1 ? 's' : ''}` : 'Read my table';
      document.querySelectorAll('.cat button').forEach(b => b.classList.toggle('picked', picks.some(p => p.id === b.dataset.id)));
      refreshSuggest();
    }
    function refreshSuggest() {
      const q = search.value.trim().toLowerCase();
      if (!q || picks.length >= 5) { suggest.style.display = 'none'; return; }
      const hits = games.filter(s => !picks.includes(s) && s.name.toLowerCase().includes(q)).slice(0, 6);
      suggest.innerHTML = hits.map(s => `<button data-id="${s.id}" style="--c:${s.c}"><i></i>${esc(s.name)}</button>`).join('');
      suggest.style.display = hits.length ? 'block' : 'none';
    }
    const add = id => { const s = games.find(x => x.id === id); if (s && !picks.includes(s) && picks.length < 5) picks.push(s); search.value = ''; refresh(); };
    search.oninput = refreshSuggest;
    search.onkeydown = e => { if (e.key === 'Enter') { const b = suggest.querySelector('button'); if (b) add(b.dataset.id); } };
    suggest.onclick = e => { const b = e.target.closest('button'); if (b) add(b.dataset.id); };
    chips.onclick = e => { const b = e.target.closest('button'); if (!b) return; picks.splice(picks.findIndex(s => s.id === b.dataset.id), 1); refresh(); };
    const cat = document.getElementById('catalogue');
    cat.innerHTML = fams.map(k => `<div class="cat" style="--c:${FAM_C[k]}"><h4>${FAMILIES[k].label}</h4><div>${games.filter(s => s.fam === k).map(s => `<button data-id="${s.id}" style="--c:${s.c}"><i></i>${esc(s.name)}</button>`).join('')}</div></div>`).join('');
    cat.onclick = e => { const b = e.target.closest('button'); if (!b) return; const i = picks.findIndex(s => s.id === b.dataset.id); i >= 0 ? picks.splice(i, 1) : add(b.dataset.id); refresh(); };

    btn.onclick = () => {
      const avg = f => picks.reduce((a, s) => a + f(s), 0) / picks.length;
      const scored = THEMES.map(t => ({ t, avg: avg(t.v), lift: avg(t.v) - t.mean })).sort((a, b) => b.lift - a.lift);
      const top = scored[0];
      const names = picks.map(s => `<b>${esc(s.name)}</b>`);

      // Observations, seeded by the picks so the same order reads the same way.
      const obs = [];
      const famSet = new Set(picks.map(s => s.fam));
      const heavies = picks.filter(s => s.heavy), lights = picks.filter(s => s.weight <= 15);
      if (famSet.size >= 4) obs.push(`You pulled from ${famSet.size} different families of games. You don’t have a genre; you have taste.`);
      if (famSet.size === 1) obs.push(`Every pick is from ${FAMILIES[picks[0].fam].label.toLowerCase()}. That’s not a preference, that’s citizenship.`);
      if (heavies.length && lights.length) obs.push(`${esc(heavies[0].name)} next to ${esc(lights[0].name)}: you’ll play a three-hour epic on Saturday and a ten-minute filler on a Tuesday, and mean both.`);
      if (picks.some(s => s.coop) && picks.some(s => s.mean >= 75)) obs.push('You like games where everyone wins together and games where you stab your friends. Possibly the same friends.');
      if (avg(s => s.fame) >= 80) obs.push('Your picks are the classics everyone knows. You’re the person who gets new players to the table.');
      if (avg(s => s.fame) <= 55) obs.push('Most of your picks are hobby favourites the average person has never heard of. You’re the friend with the shelf.');
      if (avg(s => s.talk) >= 75) obs.push('Your games are loud. If the table isn’t arguing, something is wrong.');
      if (avg(s => s.talk) <= 25) obs.push('Your games are quiet. The only sound is someone counting points under their breath.');
      if (!obs.length) obs.push('Your picks sit close together: you know exactly what you want from a game night.');

      // Recommendations: closest unpicked games to the set, curated kin boosted, with the reason.
      const cand = games.filter(s => !picks.includes(s)).map(s => {
        let best = null, total = 0;
        picks.forEach(p => {
          const sim = similarity(p.g, s.g);
          total += sim.score;
          if (!best || sim.score > best.sim.score) best = { p, sim };
        });
        const fit = top.t.v(s) / 100;
        return { s, score: total / picks.length + 0.25 * fit, best };
      }).sort((a, b) => b.score - a.score);
      const recs = cand.slice(0, 3);
      const wild = games.filter(s => !picks.includes(s) && !famSet.has(s.fam) && !recs.some(r => r.s === s))
        .sort((a, b) => top.t.v(b) - top.t.v(a))[0];
      const why = r => {
        const k = kinOf(r.best.p.id).find(x => x.id === r.s.id);
        return k ? `Because you like ${esc(r.best.p.name)}: ${md(k.why)}` : `Close to ${esc(r.best.p.name)}${r.best.sim.shared.length ? ': ' + r.best.sim.shared.slice(0, 2).map(m => MECHANICS[m].toLowerCase()).join(' and ') : ''}.`;
      };
      const rec = (s, kicker, text) => `<a class="rec" href="game.html?g=${s.id}" style="--c:${s.c}"><div class="k">${kicker}</div><h4>${esc(s.name)}</h4><p>${text}</p></a>`;

      document.getElementById('result').innerHTML = `<div class="res-card" style="--c:${top.t.c}">
        <div class="res-head"><div class="res-emoji">${top.t.emoji}</div><div><div class="res-kicker">Your table says you’re a</div><div class="res-name">${top.t.name}</div></div></div>
        <p class="res-blurb">${top.t.blurb}</p>
        <div class="minors">${scored.slice(0, 4).map(x => `<div class="minor" style="--c:${x.t.c}"><span>${x.t.emoji} ${x.t.name}</span><span class="bar"><i style="width:${Math.round(x.avg)}%"></i></span><b>${Math.round(x.avg)}</b></div>`).join('')}</div>
        <p class="reading">You picked ${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}. ${obs.slice(0, 2).join(' ')}</p>
        <h3>Play next</h3>
        <div class="recs">${recs.map(r => rec(r.s, 'Closest match', why(r))).join('')}${wild ? rec(wild, 'Wild card', `Outside your usual families, but very ${top.t.name.toLowerCase()}: ${esc(wild.quip)}`) : ''}</div>
      </div>`;
      const u = new URL(location.href); u.searchParams.set('picks', picks.map(p => p.id).join(',')); history.replaceState(null, '', u);
      document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    refresh();

    // Shareable profiles: deepdive.html?picks=catan,dominion,codenames
    const shared = (new URLSearchParams(location.search).get('picks') || '').split(',').filter(Boolean);
    if (shared.length) {
      shared.forEach(add);
      document.querySelector('.tab[data-page="profile"]').click();
      if (picks.length >= 3) btn.click();
    }
  });
})();
