// Client behaviour for the whole site. No dependencies.
const d = document;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const $ = (s, el = d) => el.querySelector(s);
const $$ = (s, el = d) => [...el.querySelectorAll(s)];

/* ---------- type fitting ---------- */
// The name: two lines fitted to one measure, a thin wide bed over a thick compressed one.
function fitName() {
  const box = $('.name'); if (!box) return;
  const W = box.clientWidth;
  $$('span', box).forEach((s) => { s.style.fontSize = '100px'; s.style.fontSize = (100 * W / s.getBoundingClientRect().width) + 'px'; });
}
// Layer titles: fitted at their widest setting, so the width axis can animate without reflow.
const titles = $$('.ttl[data-w]');
function fitTitles() {
  titles.forEach((h) => {
    const s = h.firstElementChild; h.style.setProperty('--w', h.dataset.w); h.style.fontSize = '100px';
    const max = +h.dataset.max || 190;
    h.style.fontSize = Math.min(max, 100 * h.clientWidth / s.getBoundingClientRect().width * 0.995) + 'px';
  });
}
function stretchTitles() {
  const vh = innerHeight;
  titles.forEach((h) => {
    const p = reduce ? 1 : clamp((vh - h.getBoundingClientRect().top) / (vh * 0.62), 0, 1);
    h.style.setProperty('--w', 50 + (h.dataset.w - 50) * (1 - Math.pow(1 - p, 3)));
  });
}

/* ---------- the column ---------- */
const rail = $('#rail'), marker = $('#marker'), idx = $('#idx');
const secs = $$('[data-sec]');
function sizeRail() {
  if (!secs.length) return;
  secs.forEach((s) => { const b = $(`.band[data-band="${s.dataset.sec}"]`, rail); if (b) b.style.flexGrow = s.offsetHeight; });
}
function moveMarker() {
  const max = d.documentElement.scrollHeight - innerHeight; const p = max > 0 ? clamp(scrollY / max, 0, 1) : 0;
  const cur = $('.band[aria-current]:not(.top)', rail);
  if (cur) { const r = cur.getBoundingClientRect(); marker.style.transform = `translateY(${r.top + p * (r.height - 2)}px)`; }
  else marker.style.transform = `translateY(${p * (innerHeight - 2)}px)`;
}
function setIndex(open) {
  rail.classList.toggle('open', open); idx.setAttribute('aria-expanded', open);
  if (open) $('.band', rail).focus({ preventScroll: true });
}
idx.addEventListener('click', () => setIndex(!rail.classList.contains('open')));
addEventListener('keydown', (e) => { if (e.key === 'Escape' && rail.classList.contains('open')) { setIndex(false); idx.focus(); } });
d.addEventListener('click', (e) => { if (rail.classList.contains('open') && !rail.contains(e.target) && !idx.contains(e.target)) setIndex(false); });
rail.addEventListener('click', (e) => { if (e.target.closest('.band')) setIndex(false); });
// Pointing at the column opens it (with a short delay, so passing over it does nothing); tabbing into it opens it too.
if (matchMedia('(hover: hover) and (min-width: 861px)').matches) {
  let tIn, tOut;
  rail.addEventListener('pointerenter', () => { clearTimeout(tOut); tIn = setTimeout(() => { rail.classList.add('open'); idx.setAttribute('aria-expanded', true); }, 140); });
  rail.addEventListener('pointerleave', () => { clearTimeout(tIn); tOut = setTimeout(() => { if (!rail.matches(':focus-within')) { rail.classList.remove('open'); idx.setAttribute('aria-expanded', false); } }, 260); });
}
rail.addEventListener('focusin', (e) => { if (e.target.matches(':focus-visible')) { rail.classList.add('open'); idx.setAttribute('aria-expanded', true); } });
rail.addEventListener('focusout', () => setTimeout(() => { if (!rail.matches(':focus-within') && !rail.matches(':hover')) { rail.classList.remove('open'); idx.setAttribute('aria-expanded', false); } }, 0));

/* ---------- the cross-section on the surface ---------- */
// A balanced, kinematic model of a small thrust duplex, drawn with no vertical exaggeration.
//
// Each thrust is a simple-step fault-bend fold (Suppe, 1983): a flat floor thrust, a ramp of dip θ,
// and a flat roof thrust. The hanging wall moves parallel to the fault segment beneath it, so there
// are three velocity domains separated by two fixed axial surfaces:
//   A  through the base of the ramp, bisecting the bend (keeps bed thickness on the back limb)
//   B  through the top of the ramp, at Suppe's axial angle γ, where tan θ = sin 2γ / (2 cos²γ + 1)
// Slip passed on to the roof thrust is reduced by R = sin(γ − θ) / sin γ, which is what conserves
// bed length and thickness through the forelimb. The footwall does not move.
//
// Two ramps break forward in sequence (the second forms nearer the foreland and carries the first
// piggyback), and the uplift is eroded as it grows. It plays on its own after the page loads; nothing is random.
function crossSection(el) {
  const beds = JSON.parse(el.dataset.beds), N = beds.length;
  const svg = $('svg', el), NS = 'http://www.w3.org/2000/svg';
  const mk = (tag, attrs = {}) => { const n = d.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); return n; };
  svg.removeAttribute('preserveAspectRatio');
  const defs = mk('defs'), cp = mk('clipPath', { id: 'xs-clip' }), cpp = mk('path'); cp.appendChild(cpp); defs.appendChild(cp); svg.appendChild(defs);
  const g = mk('g', { 'clip-path': 'url(#xs-clip)' }); svg.appendChild(g);
  const paths = beds.map((b, i) => {
    const p = mk('path', { class: 'bed', fill: b.c, stroke: b.c, 'stroke-width': 0.7, 'stroke-linejoin': 'round' }); // self-coloured stroke hides seams between slices
    p.addEventListener('pointerenter', () => hov(i, true)); p.addEventListener('pointerleave', () => hov(i, false));
    p.addEventListener('click', () => { const t = d.getElementById(b.slug); if (t) t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); });
    g.appendChild(p); return p;
  });
  const basePath = mk('path', { fill: el.dataset.base }); g.appendChild(basePath);
  const hz = mk('path', { class: 'hz' }); g.appendChild(hz);          // bedding contacts only, so an unbroken bed shows no future fault
  const oldFault = mk('path', { class: 'fault old' }), fault = mk('path', { class: 'fault' }); g.appendChild(oldFault); g.appendChild(fault);
  const topo = mk('path', { class: 'topo' }); svg.appendChild(topo);
  const labels = beds.map((b) => { const a = d.createElement('span'); a.className = 'xs-l mono'; a.style.setProperty('--t', b.t); a.innerHTML = `<b>${b.name}</b><i>${b.n}</i>`; el.appendChild(a); return a; });
  function hov(i, on) { el.classList.toggle('hov', on); paths[i].classList.toggle('on', on); labels[i].classList.toggle('on', on); }

  // ---- kinematics (elevation z is positive upward; the floor thrust is z = 0) ----
  const theta = 24 * Math.PI / 180;
  let lo = Math.PI / 3, hi = Math.PI / 2 - 1e-6;                       // first-mode root of Suppe's equation
  for (let k = 0; k < 60; k++) { const gm = (lo + hi) / 2; if (Math.sin(2 * gm) / (2 * Math.cos(gm) ** 2 + 1) > Math.tan(theta)) lo = gm; else hi = gm; }
  const gamma = (lo + hi) / 2, R = Math.sin(gamma - theta) / Math.sin(gamma);
  const cT = Math.cos(theta), sT = Math.sin(theta), rA = Math.cos(theta / 2), rB = Math.sin(gamma - theta);
  let M = null; // the model for the current size

  const mkFault = (x1, zU) => ({ x1, x2: x1 + zU / Math.tan(theta), zU,
    ramp: (z) => x1 + z / Math.tan(theta) });
  // Move one hanging-wall point through the velocity field of fault F for a slip of s (exact, piecewise).
  function advect(F, x, z, s) {
    let rem = s;
    for (let k = 0; k < 6 && rem > 1e-9; k++) {
      const b = (x - F.x2) * Math.sin(gamma) - (z - F.zU) * Math.cos(gamma);   // signed distance past axial surface B
      if (b >= 0) { x += R * rem; break; }                                     // above the roof thrust
      const a = (x - F.x1) * Math.cos(theta / 2) + z * Math.sin(theta / 2);    // signed distance past axial surface A
      if (a >= 0) { const t = -b / rB, dd = Math.min(t, rem); x += cT * dd; z += sT * dd; rem -= dd; if (t > dd) break; x += 1e-7; } // above the ramp
      else { const t = -a / rA, dd = Math.min(t, rem); x += dd; rem -= dd; if (t > dd) break; x += 1e-7; }                         // above the floor thrust
    }
    return [x, z];
  }

  function rebuild() {
    const w = el.clientWidth, h = el.clientHeight; if (!w || !h) return;
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    const cut = w / h < 2.4 ? 2 : 4;                                   // beds cut by the ramps (fewer on narrow screens)
    const need = cut === 4 ? 46 : 24;                                  // width the structure needs, in bed thicknesses
    const TH = Math.min(h / (N + 1.4 + cut * 0.62 + 0.6), w / need);   // bed thickness in px
    const zTop = N * TH, zU = cut * TH, rampLen = zU / sT;
    const yb = h - 1.4 * TH;                                           // svg y of the floor thrust (basement below it)
    const S1 = rampLen * 0.94, S2 = rampLen * 0.9;
    const F1 = mkFault(w * (cut === 4 ? 0.22 : 0.1), zU), F2 = mkFault(F1.x2 + (cut === 4 ? 5.5 : 3) * TH, zU);
    const xmin = -(S1 + S2) - 2 * TH, xmax = w + 2 * TH, step = Math.max(5, TH / 3.5);
    const span = (xa, xb, z) => { const o = []; const n = Math.max(1, Math.ceil(Math.abs(xb - xa) / step)); for (let k = 0; k <= n; k++) o.push([xa + (xb - xa) * k / n, z]); return o; };
    const side = (xa, za, xb, zb) => { const o = []; for (let k = 1; k < 5; k++) o.push([xa + (xb - xa) * k / 5, za + (zb - za) * k / 5]); return o; };
    // a quadrilateral slice of a bed between two (possibly inclined) cuts, as a dense ring of points
    const quad = (xlb, xlt, xrb, xrt, zb, zt) => { const bot = span(xlb, xrb, zb), tp = span(xrt, xlt, zt); return { pts: [...bot, ...side(xrb, zb, xrt, zt), ...tp, ...side(xlt, zt, xlb, zb)], nb: bot.length, nt: tp.length }; };
    const polys = beds.map((_, i) => {
      const zb = (N - 1 - i) * TH, zt = zb + TH;
      if (zb >= zU - 1e-6) return [{ ...quad(xmin, xmin, xmax, xmax, zb, zt), h1: true, h2: true }];
      return [
        { ...quad(xmin, xmin, F1.ramp(zb), F1.ramp(zt), zb, zt), h1: true, h2: true },                 // hanging wall of thrust 1
        { ...quad(F1.ramp(zb), F1.ramp(zt), F2.ramp(zb), F2.ramp(zt), zb, zt), h1: false, h2: true },  // the horse between the ramps
        { ...quad(F2.ramp(zb), F2.ramp(zt), xmax, xmax, zb, zt), h1: false, h2: false },               // footwall of both
      ];
    });
    M = { w, h, TH, zTop, zU, yb, S1, S2, F1, F2, xmin, xmax, polys,
      top: span(xmin, xmax, zTop),
      f1: [...span(F1.x1, F1.x2, 0).map(([x], k, a) => [x, zU * k / (a.length - 1)]), ...span(F1.x2, F2.x2, zU)] };
    basePath.setAttribute('d', `M${xmin},${yb} L${xmax},${yb} L${xmax},${h + 2} L${xmin},${h + 2}Z`);
    labels.forEach((l, i) => { l.style.top = (yb - (N - 0.5 - i) * TH) + 'px'; });
    frame();
  }

  const ease = (p) => p * p * (3 - 2 * p);
  function draw(q) {
    if (!M) return;
    const { yb, zTop, F1, F2, w, h } = M;
    const s1 = M.S1 * ease(clamp(q / 0.45, 0, 1)), s2 = M.S2 * ease(clamp((q - 0.45) / 0.43, 0, 1)), ero = clamp((q - 0.88) / 0.12, 0, 1);
    const move = (P, x, z) => { if (P.h1 && s1 > 0) [x, z] = advect(F1, x, z, s1); if (P.h2 && s2 > 0) [x, z] = advect(F2, x, z, s2); return [x, z]; };
    const fmt = (x, z) => x.toFixed(1) + ',' + (yb - z).toFixed(1);
    let lines = '';
    M.polys.forEach((parts, i) => {
      let dstr = '';
      parts.forEach((P) => {
        const c = P.pts.map(([x, z]) => fmt(...move(P, x, z)));
        dstr += 'M' + c.join('L') + 'Z';
        lines += 'M' + c.slice(0, P.nb).join('L') + 'M' + c.slice(P.nb + 4, P.nb + 4 + P.nt).join('L');
      });
      paths[i].setAttribute('d', dstr);
    });
    hz.setAttribute('d', lines);
    // the land surface: the deformed top of the stack, bevelled by erosion as it rises
    const top = M.top.map(([x, z]) => move({ h1: true, h2: true }, x, z));
    const rise = Math.max(0, ...top.map((p) => p[1])) - zTop;
    // erosion keeps pace with uplift: relief is limited while the folds grow, then lowered further at the end
    const relief = Math.min(0.55 * rise, 2.5 * M.TH) * (1 - 0.5 * ero), k = M.TH * 0.16;
    const surf = top.map(([x, z]) => { const cap = zTop + relief + M.TH * (0.16 + 0.1 * Math.sin(x / (3.1 * M.TH)));
      return [x, -k * Math.log(Math.exp(-z / k + cap / k) + 1) + cap]; });                        // smooth minimum of bed top and erosion level
    const sd = 'M' + surf.map(([x, z]) => fmt(x, z)).join('L');
    topo.setAttribute('d', sd); cpp.setAttribute('d', sd + `L${M.xmax},${h + 2}L${M.xmin},${h + 2}Z`);
    // faults: the active one in full, the abandoned ramp carried passively
    const A = s2 > 0 ? F2 : F1;
    fault.setAttribute('d', `M${fmt(M.xmin, 0)}L${fmt(A.x1, 0)}L${fmt(A.x2, A.zU)}L${fmt(M.xmax, A.zU)}`);
    fault.style.opacity = clamp(q * 9, 0, 1);
    oldFault.setAttribute('d', s2 > 0 ? 'M' + M.f1.map(([x, z]) => fmt(...advect(F2, x, z, s2))).join('L') : '');
  }
  // Plays once, slowly, from the moment the page is seen: thrust 1, thrust 2, then erosion. It holds the
  // final section, pauses while the hero is off screen or the tab is hidden, and is static for reduced motion.
  const DUR = 26000, DELAY = 900;
  let elapsed = 0, last = null, raf = 0, visible = true;
  const qNow = () => (reduce ? 1 : clamp((elapsed - DELAY) / DUR, 0, 1));
  function frame() { draw(qNow()); }
  function step(ts) {
    raf = 0; if (last !== null) elapsed += Math.min(100, ts - last); last = ts; frame();
    if (qNow() < 1 && visible && !d.hidden) raf = requestAnimationFrame(step); else last = null;
  }
  const play = () => { if (!raf && !reduce && qNow() < 1) { last = null; raf = requestAnimationFrame(step); } };
  new IntersectionObserver((es) => { visible = es[0].isIntersecting; if (visible) play(); }).observe(el);
  d.addEventListener('visibilitychange', () => { if (!d.hidden) play(); });
  rebuild();
  const seek = (q) => { elapsed = DELAY + clamp(q, 0, 1) * DUR; frame(); };   // jump to a stage (used by the checking tools)
  return { frame, rebuild, draw, seek, progress: qNow };
}
const xsEl = $('.xs'); const xs = xsEl ? crossSection(xsEl) : null;
if (xs) window.__xs = xs; // exposed for checking the model frame by frame

/* ---------- reveals ---------- */
const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.08 });
$$('.rv').forEach((el) => io.observe(el));

/* ---------- notes ---------- */
const ntog = $('#ntog');
if (ntog) {
  const flip = () => { const on = ntog.getAttribute('aria-pressed') !== 'true'; ntog.setAttribute('aria-pressed', on); d.body.classList.toggle('notes-on', on); };
  ntog.addEventListener('click', flip);
  addEventListener('keydown', (e) => { if (e.key.toLowerCase() === 'n' && !e.metaKey && !e.ctrlKey && !e.altKey && !/input|textarea/i.test(e.target.tagName)) flip(); });
  $$('figure.f').forEach((f) => {
    const set = (n, on) => $$(`[data-n="${n}"]`, f).forEach((el) => el.classList.toggle('hot', on));
    $$('.pin, ol.nt li', f).forEach((el) => {
      ['pointerenter', 'focus'].forEach((ev) => el.addEventListener(ev, () => set(el.dataset.n, true)));
      ['pointerleave', 'blur'].forEach((ev) => el.addEventListener(ev, () => set(el.dataset.n, false)));
    });
  });
}

/* ---------- lightbox ---------- */
const lb = $('#lb'), lbi = $('#lb-i'), lbs = $('#lb-s');
function openLB(img) {
  lbi.src = img.dataset.full || img.currentSrc || img.src; lbi.alt = img.alt; lbs.classList.remove('z');
  lbi.dataset.w = img.dataset.fw || ''; lb.showModal();
}
d.addEventListener('click', (e) => {
  const img = e.target.closest('figure.f .ph img'); if (img && !e.target.closest('.pin')) openLB(img);
});
lbi.addEventListener('click', (e) => {
  e.stopPropagation();
  const r = lbi.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
  const z = lbs.classList.toggle('z');
  if (z) requestAnimationFrame(() => { lbs.scrollLeft = lbi.offsetWidth * px - lbs.clientWidth / 2; lbs.scrollTop = lbi.offsetHeight * py - lbs.clientHeight / 2; });
});
lbs.addEventListener('click', () => lb.close());
$('#lb-x').addEventListener('click', () => lb.close());
dragScroll(lbs, () => lbs.classList.contains('z'));

/* ---------- drag to scroll ---------- */
function dragScroll(el, when = () => true) {
  let down = false, moved = false, sx = 0, sy = 0, sl = 0, st = 0;
  el.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse' || !when()) return; down = true; moved = false; sx = e.clientX; sy = e.clientY; sl = el.scrollLeft; st = el.scrollTop; });
  addEventListener('pointermove', (e) => { if (!down) return; const dx = e.clientX - sx, dy = e.clientY - sy; if (Math.abs(dx) + Math.abs(dy) > 5) moved = true; el.scrollLeft = sl - dx; el.scrollTop = st - dy; });
  addEventListener('pointerup', () => { down = false; });
  el.addEventListener('click', (e) => { if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; } }, true);
}
$$('.strip').forEach((s) => dragScroll(s));

/* ---------- wiring ---------- */
let tick = false;
function onScroll() { moveMarker(); stretchTitles(); }
addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(() => { onScroll(); tick = false; }); } }, { passive: true });
function layout() { fitName(); fitTitles(); sizeRail(); if (xs) xs.rebuild(); onScroll(); }
addEventListener('resize', layout); addEventListener('load', layout);
(d.fonts && d.fonts.ready ? d.fonts.ready : Promise.resolve()).then(layout);
layout();
