// Renders the standardized one-page "game sheet" for a game object.
// Panels are numbered in teaching order. Optional extras: walk (animated turn),
// extended (collapsible deep detail for complex games), and bridges from kin games.

(function () {
  const { esc, md } = window;

  const ICON = {
    people: '<svg viewBox="0 0 24 24" class="ico"><circle cx="9" cy="8" r="3.2"/><path d="M3 19c0-3.5 2.7-6 6-6s6 2.5 6 6z"/><circle cx="17" cy="9" r="2.6"/><path d="M15.5 13.3c3 .1 5.5 2.4 5.5 5.7h-4.4"/></svg>',
    clock: '<svg viewBox="0 0 24 24" class="ico"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M12 7v5.5l3.5 2" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    age: '<svg viewBox="0 0 24 24" class="ico"><path d="M5 20v-7h14v7z"/><path d="M8 13v-3h2v3M14 13v-3h2v3" /><path d="M9 7.5c0-1 1-2.2 1-2.2s1 1.2 1 2.2a1 1 0 0 1-2 0zM15 7.5c0-1 1-2.2 1-2.2s1 1.2 1 2.2a1 1 0 0 1-2 0z"/></svg>',
    book: '<svg viewBox="0 0 24 24" class="ico"><path d="M4 5c3-1.5 6-1.5 8 .5v14c-2-2-5-2-8-.5zM20 5c-3-1.5-6-1.5-8 .5v14c2-2 5-2 8-.5z"/></svg>',
  };

  const range = (r, unit = '') => r[0] === r[1] ? `${r[0]}${unit}` : `${r[0]}–${r[1]}${unit}`;
  const dots = (n, max = 5) => Array.from({ length: max }, (_, i) => `<i class="${i < Math.round(n) ? 'on' : ''}"></i>`).join('');
  const weightWord = n => ['', 'Very light', 'Light', 'Medium', 'Heavy', 'Very heavy'][Math.round(n)];

  function chips(g) {
    return `<div class="chips">
      <span class="chip" title="Players">${ICON.people}${range(g.players)} players${g.best ? ` <em>best ${esc(g.best)}</em>` : ''}</span>
      <span class="chip" title="Play time">${ICON.clock}${range(g.time)} min</span>
      <span class="chip" title="Minimum age">${ICON.age}${g.age}+</span>
      <span class="chip" title="Rules complexity">${ICON.book}<span class="dots">${dots(g.profile.complexity)}</span>${weightWord(g.profile.complexity)}</span>
    </div>`;
  }

  function panel(num, title, body, cls) {
    return `<section class="panel ${cls}">
      <h2>${num ? `<span class="num">${num}</span>` : ''}${title}</h2>${body}</section>`;
  }

  function turnDiagram(t) {
    const type = t.type || 'sequence';
    const intro = t.intro || { sequence: 'On your turn, in order:', choose: 'On your turn, do <b>one</b> of:', simultaneous: 'Everyone plays <b>at the same time</b>:', round: 'Each round:' }[type];
    const outro = t.outro || { sequence: 'Next player', choose: 'Next player', simultaneous: 'Next round', round: 'Next round' }[type];
    const steps = t.steps.map((s, i) => `<li data-step="${i}"><span class="verb">${type === 'choose' ? String.fromCharCode(65 + i) : i + 1}. ${esc(s.verb)}</span><span class="what">${md(s.text)}</span></li>`).join('');
    return `<p class="turn-intro">${intro}</p><ol class="turn turn-${type}">${steps}</ol><div class="turn-loop"><span>↻ ${esc(outro)}</span></div>`;
  }

  function endPanel(g) {
    let s = `<p class="end-trigger">${md(g.end.trigger.charAt(0).toUpperCase() + g.end.trigger.slice(1))}</p>`;
    if (g.end.detail) s += `<p class="small">${md(g.end.detail)}</p>`;
    if (g.scoring && g.scoring.length) {
      const tot = g.scoring.reduce((a, b) => a + b.share, 0);
      const shades = [1, 0.72, 0.5, 0.33, 0.2, 0.12];
      s += `<div class="score-label">Where points usually come from</div><div class="scorebar">${g.scoring.map((x, i) =>
        `<span style="flex:${x.share};--o:${shades[i % shades.length]}" title="${esc(x.label)}: ~${Math.round(100 * x.share / tot)}%"></span>`).join('')}</div>
        <ul class="score-legend">${g.scoring.map((x, i) => `<li><i style="--o:${shades[i % shades.length]}"></i>${esc(x.label)}</li>`).join('')}</ul>`;
    }
    if (g.end.results) {
      s += `<ul class="results">${g.end.results.map(r => `<li><b>${esc(r.side)}</b> ${md(r.text)}</li>`).join('')}</ul>`;
    }
    return s;
  }

  function radar(g, size = 190) {
    const axes = window.PROFILE_AXES, n = axes.length, cx = size / 2, cy = size / 2 + 2, R = size * 0.32;
    const pt = (i, v) => { const a = -Math.PI / 2 + i * 2 * Math.PI / n; return [cx + R * v / 5 * Math.cos(a), cy + R * v / 5 * Math.sin(a)]; };
    let s = `<svg viewBox="0 0 ${size} ${size}" class="radar" role="img" aria-label="Game profile">`;
    for (let k = 1; k <= 5; k++) s += `<polygon points="${axes.map((_, i) => pt(i, k).join(',')).join(' ')}" class="ring${k === 5 ? ' outer' : ''}"/>`;
    axes.forEach((ax, i) => {
      const [x, y] = pt(i, 5), [lx, ly] = pt(i, 6.35);
      s += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" class="spoke"/>`;
      s += `<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="central">${ax.label}</text>`;
    });
    s += `<polygon points="${axes.map((ax, i) => pt(i, g.profile[ax.key]).join(',')).join(' ')}" class="shape"/>`;
    axes.forEach((ax, i) => { const [x, y] = pt(i, g.profile[ax.key]); s += `<circle cx="${x}" cy="${y}" r="3" class="pt"><title>${ax.label}: ${g.profile[ax.key]}/5</title></circle>`; });
    return s + '</svg>';
  }
  window.radarSVG = radar;

  function profileBars(g) {
    return `<ul class="pbars">${window.PROFILE_AXES.map(ax => `<li><span class="pl">${ax.label}</span><span class="pd dots">${dots(g.profile[ax.key])}</span><span class="ph">${g.profile[ax.key] >= 3.5 ? esc(ax.hi) : g.profile[ax.key] <= 2 ? esc(ax.lo) : ''}</span></li>`).join('')}</ul>`;
  }

  function similarList(g) {
    return `<ul class="similar">${window.mostSimilar(g, 4).map(s => `<li><a href="game.html?g=${s.game.id}" style="--fam:${window.FAMILIES[s.game.family].color}"><b>${esc(s.game.name)}</b><span>${s.why ? md(s.why) : 'Shares ' + s.shared.slice(0, 3).map(m => window.MECHANICS[m].toLowerCase()).join(', ')}</span></a></li>`).join('')}</ul>`;
  }

  // "I already know …" bar: only kin games (curated close relatives) are offered.
  function knowBar(g) {
    const kin = window.kinOf(g.id).filter(k => window.bridgeFor(g.id, k.id));
    if (!kin.length) return '';
    return `<div class="know-bar"><span class="know-lbl">Already know one of these? Pick it and this page explains ${esc(g.name)} in its terms:</span>
      ${kin.map(k => { const o = window.GAME_BY_ID[k.id]; return `<button class="know-pill" data-know="${o.id}" style="--fam:${window.FAMILIES[o.family].color}">${esc(o.name)}</button>`; }).join('')}</div>
      <div id="bridge-slot"></div>`;
  }

  window.renderBridge = function (g, knownId) {
    const b = window.bridgeFor(g.id, knownId);
    if (!b) return '';
    const k = window.GAME_BY_ID[knownId];
    return `<section class="bridge">
      <h2><span class="bridge-from">Coming from ${esc(k.name)}</span>${md(b.headline)}</h2>
      <div class="bridge-grid">
        <div><h3>Works the same</h3><ul class="same">${b.same.map(x => `<li>${md(x)}</li>`).join('')}</ul>
        ${b.terms.length ? `<h3>Same idea, new name</h3><ul class="rename">${b.terms.map(t => `<li><span class="old">${esc(t.known)}</span><span class="arr">→</span><span class="new">${esc(t.learn)}</span></li>`).join('')}</ul>` : ''}</div>
        <div><h3>What changes</h3><table class="bridge-diff"><thead><tr><th></th><th>In ${esc(k.name)}</th><th>In ${esc(g.name)}</th></tr></thead>
        <tbody>${b.diff.map(d => `<tr><th>${esc(d.topic)}</th><td>${md(d.known)}</td><td>${md(d.learn)}</td></tr>`).join('')}</tbody></table></div>
      </div></section>`;
  };

  // A plain-language script for teaching the game out loud, built from the sheet.
  function teachScript(g, knownId) {
    const lower = s => s.charAt(0).toLowerCase() + s.slice(1);
    const strip = s => s.replace(/\*\*/g, '');
    const t = g.turn, type = t.type || 'sequence';
    const steps = t.steps.map(s => `<b>${esc(s.verb)}</b>: ${lower(md(s.text))}`);
    const turnLine = t.intro ? t.intro : {
      sequence: `On your turn you do ${t.steps.length} things in order.`,
      choose: `On your turn you pick just <b>one</b> of ${t.steps.length} actions.`,
      simultaneous: 'Everyone plays at the same time, so there is no waiting.',
      round: `Each round goes through ${t.steps.length} steps.`,
    }[type];
    return `<ol class="script">
      <li><span class="cue">The story</span><div>“This is <b>${esc(g.name)}</b>. ${esc(g.theme)}”</div></li>
      <li><span class="cue">The goal</span><div>“${md(g.goal.text)}”</div></li>
      <li><span class="cue">The clock</span><div>“The game ends when ${lower(md(g.end.trigger))}.${g.end.detail ? ' ' + md(g.end.detail) : ''}”</div></li>
      <li><span class="cue">The turn</span><div>“${turnLine}<ul>${steps.map(s => `<li>${s}</li>`).join('')}</ul>”</div></li>
      <li><span class="cue">The heart</span><div>“The interesting part: ${lower(md(g.tension))}”</div></li>
      <li><span class="cue">Show it</span><div>Play one turn face-up, narrating: “${md(g.example)}”</div></li>
      <li><span class="cue">Then stop</span><div>Start playing. Mention these only when they first come up: ${g.gotchas.map(x => `<i>${esc(strip(x).split(/[.;:]/)[0])}</i>`).join(', ')}.</div></li>
    </ol>`;
  }

  function turnPanel(g) {
    const frames = g.walk ? g.walk(window.A) : null;
    const left = turnDiagram(g.turn);
    if (!frames || !frames.length) return `<div class="turn-wrap solo">${left}<div class="example-inline"><h3>One turn, played out</h3><p class="example">${md(g.example)}</p></div></div>`;
    return `<div class="turn-wrap"><div>${left}</div><div class="walk" id="walk"></div></div>`;
  }

  function extended(g) {
    if (!g.extended || !g.extended.length) return '';
    return `<details class="extended"><summary>Extended details <span>for when you’re ready to go deeper</span></summary>
      <div class="ext-grid">${g.extended.map(x => `<section><h3>${esc(x.title)}</h3>${x.text ? `<p>${md(x.text)}</p>` : ''}${x.items ? `<ul>${x.items.map(i => `<li>${md(i)}</li>`).join('')}</ul>` : ''}</section>`).join('')}</div></details>`;
  }

  window.renderSheet = function (g) {
    const fam = window.FAMILIES[g.family];
    const accent = g.color || fam.color;
    const heavy = g.profile.complexity >= 4;
    const refPanel = g.ref ? panel('', `Quick reference: ${esc(g.ref.title)}`, `<table class="ref">${g.ref.rows.map(r => `<tr><th>${md(r[0])}</th><td>${md(r[1])}</td></tr>`).join('')}</table>`, 'p-ref') : '';
    return `<article class="sheet${g.ref ? '' : ' no-ref'}" style="--accent:${accent}">
      <header class="sheet-head">
        <div class="title-block">
          <a class="fam-badge" href="map.html?focus=${g.id}" style="--fam:${fam.color}">${esc(fam.label)}</a>${heavy ? '<span class="heavy-badge" title="Rules weight 4–5 of 5">Heavy game</span>' : ''}
          <h1>${esc(g.name)}</h1>
          <div class="byline">${g.year < 0 ? 'c. ' + -g.year + ' BC' : g.year} · ${esc(g.designer)}</div>
        </div>
        <div class="head-right">
          <p class="pitch">${md(g.pitch)}</p>
          ${chips(g)}
        </div>
      </header>
      ${knowBar(g)}
      <div class="sheet-grid">
        ${panel(1, 'What it is', `<figure class="art"><svg viewBox="0 0 320 200" role="img" aria-label="Illustration of ${esc(g.name)}">${g.art(window.A)}</svg></figure><p class="theme">${md(g.theme)}</p>`, 'p-art')}
        ${panel(2, 'How you win', `<div class="goal-big">${esc(g.goal.big)}</div><p>${md(g.goal.text)}</p>`, 'p-goal')}
        ${panel(3, 'How it ends', endPanel(g), 'p-end')}
        ${panel(4, 'Your turn', turnPanel(g), 'p-turn')}
        ${panel(5, 'How it flows', `<div class="flow">${g.flow.map(st => `<div class="stage"><div class="stage-label">${esc(st.label)}</div><ul>${st.items.map(i => `<li>${md(i)}</li>`).join('')}</ul></div>`).join('<div class="flow-arrow" aria-hidden="true">→</div>')}</div>`, 'p-flow')}
        ${panel(6, 'The key decision', `<p class="tension-big">${md(g.tension)}</p>`, 'p-tension')}
        ${panel('', 'Setup', `<ol class="setup">${g.setup.map(x => `<li>${md(x)}</li>`).join('')}</ol>`, 'p-setup')}
        ${refPanel}
        ${panel('', 'Key terms', `<dl class="terms">${g.terms.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${md(v)}</dd>`).join('')}</dl>`, 'p-terms')}
        ${panel(7, 'Rules people miss', `<ul class="warn">${g.gotchas.map(x => `<li>${md(x)}</li>`).join('')}</ul>`, 'p-gotchas')}
        ${panel(8, 'First-game tips', `<ul class="tips">${g.tips.map(x => `<li>${md(x)}</li>`).join('')}</ul>`, 'p-tips')}
        ${panel('', 'What it feels like', `<div class="profile">${radar(g)}${profileBars(g)}</div>`, 'p-profile')}
        ${panel('', 'Similar games', similarList(g), 'p-similar')}
      </div>
      <footer class="sheet-foot"><span>${g.mechanics.map(m => `<span class="mech">${esc(window.MECHANICS[m])}</span>`).join('')}</span><span class="foot-brand">Board Game Field Guide</span></footer>
    </article>
    ${extended(g)}
    <details class="teach"><summary>Teaching it to others? A read-aloud script</summary>${teachScript(g)}</details>`;
  };

  // Wire up the interactive parts after the sheet is in the DOM.
  window.activateSheet = function (g, root) {
    const el = root.querySelector('#walk');
    if (el && g.walk) {
      const items = [...root.querySelectorAll('.turn li[data-step]')];
      window.mountWalk(el, g.walk(window.A), f => items.forEach(li => li.classList.toggle('now', +li.dataset.step === f.step)));
    }
    const pills = [...root.querySelectorAll('.know-pill')];
    if (!pills.length) return;
    const slot = root.querySelector('#bridge-slot');
    const pick = (id, remember) => {
      pills.forEach(p => p.classList.toggle('on', p.dataset.know === id));
      slot.innerHTML = id ? window.renderBridge(g, id) : '';
      if (remember) window.knownGames.toggle(remember.id, remember.on);
      const u = new URL(location.href);
      id ? u.searchParams.set('know', id) : u.searchParams.delete('know');
      history.replaceState(null, '', u);
    };
    pills.forEach(p => p.onclick = () => {
      const on = !p.classList.contains('on');
      pick(on ? p.dataset.know : null, { id: p.dataset.know, on });
    });
    const fromUrl = new URLSearchParams(location.search).get('know');
    const known = window.knownGames.get();
    const auto = pills.map(p => p.dataset.know).find(id => id === fromUrl) || pills.map(p => p.dataset.know).find(id => known.includes(id));
    if (auto) pick(auto);
  };
})();
