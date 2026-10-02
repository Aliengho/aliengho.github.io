// ícones (traço simples, sem emojis)
const P = {
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  up: '<path d="M12 19V5M5 12l7-7 7 7"/>',
  code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
  github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3.1-.3 6.4-1.5 6.4-7A5.4 5.4 0 0 0 20 4.8 5 5 0 0 0 19.9 1S18.7.7 16 2.5a13.4 13.4 0 0 0-7 0C6.3.7 5.1 1 5.1 1A5 5 0 0 0 5 4.8a5.4 5.4 0 0 0-1.5 3.7c0 5.4 3.3 6.6 6.4 7A3.4 3.4 0 0 0 9 18.1V22"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
  star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2L5.8 21 7 14.2 2 9.3l6.9-1z"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
  server: '<rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 6h.01M6 18h.01"/>',
  bot: '<rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4M8 16h.01M16 16h.01"/>',
  phone: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>',
  tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>',
  bulb: '<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>',
  cap: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
};
const icon = n => `<svg class="ic" viewBox="0 0 24 24">${P[n]}</svg>`;
document.querySelectorAll('[data-icon]').forEach(el => el.insertAdjacentHTML('afterbegin', icon(el.dataset.icon)));

// navegação e rodapé partilhados
const page = document.body.dataset.page;
const pages = [['index.html', 'Início', 'inicio'], ['sobre.html', 'Sobre', 'sobre'], ['projetos.html', 'Projetos', 'projetos'], ['contacto.html', 'Contacto', 'contacto']];
document.body.insertAdjacentHTML('afterbegin', `
<canvas id="stars"></canvas>
<nav><div class="wrap">
  <a href="index.html" class="logo"><span>Alien</span>Ghost</a>
  <div class="links" id="links">${pages.map(([h, l, id]) => `<a href="${h}"${id === page ? ' aria-current="page"' : ''}>${l}</a>`).join('')}</div>
  <div style="display:flex;gap:8px">
    <button class="btn-icon" id="theme" aria-label="Mudar tema"></button>
    <button class="btn-icon" id="menu" aria-label="Menu">${icon('menu')}</button>
  </div>
</div></nav>`);
document.body.insertAdjacentHTML('beforeend', `
<footer><div class="wrap">Feito por <b>Hélio Julião Paulo Cuna</b> · © ${new Date().getFullYear()} · <a href="https://github.com/Aliengho" target="_blank" rel="noopener">github.com/Aliengho</a></div></footer>
<button class="btn-icon" id="top" aria-label="Voltar ao topo">${icon('up')}</button>`);

// tema claro/escuro
const root = document.documentElement, themeBtn = document.getElementById('theme');
function setTheme(t) { root.dataset.theme = t; themeBtn.innerHTML = icon(t === 'light' ? 'moon' : 'sun'); try { localStorage.setItem('tema', t); } catch (e) {} }
let saved = null; try { saved = localStorage.getItem('tema'); } catch (e) {}
setTheme(saved || 'dark');
themeBtn.onclick = () => setTheme(root.dataset.theme === 'light' ? 'dark' : 'light');

// menu mobile
const links = document.getElementById('links');
document.getElementById('menu').onclick = () => links.classList.toggle('open');

// estrelas
const cv = document.getElementById('stars'), cx = cv.getContext('2d'); let st = [];
function size() { cv.width = innerWidth; cv.height = innerHeight; st = Array.from({ length: Math.min(160, innerWidth / 8) }, () => ({ x: Math.random() * cv.width, y: Math.random() * cv.height, r: Math.random() * 1.4 + .2, s: Math.random() * .3 + .05 })); }
function draw() {
  cx.clearRect(0, 0, cv.width, cv.height);
  const c = root.dataset.theme === 'light' ? '20,23,38' : '200,255,230';
  st.forEach(p => { p.y -= p.s; if (p.y < 0) p.y = cv.height; cx.fillStyle = `rgba(${c},${.3 + p.r / 3})`; cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 7); cx.fill(); });
  requestAnimationFrame(draw);
}
size(); draw(); addEventListener('resize', size);

// revelar ao rolar + botão topo
const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('in')), { threshold: .12 });
const watch = () => document.querySelectorAll('.rv:not(.in)').forEach(el => io.observe(el));
watch();
const topBtn = document.getElementById('top');
addEventListener('scroll', () => topBtn.classList.toggle('show', scrollY > 600));
topBtn.onclick = () => scrollTo({ top: 0 });

// efeito de escrita (início)
const typed = document.getElementById('typed');
if (typed) {
  const words = ['sites modernos', 'bots de WhatsApp', 'apps Android', 'automações', 'ideias em código'];
  let wi = 0, ci = 0, del = false;
  (function type() {
    const w = words[wi]; typed.textContent = w.slice(0, ci);
    if (!del && ci++ === w.length) { del = true; return setTimeout(type, 1500); }
    if (del && ci-- === 0) { del = false; wi = (wi + 1) % words.length; ci = 0; }
    setTimeout(type, del ? 40 : 85);
  })();
}

// projetos do GitHub
const colors = { JavaScript: '#f1e05a', TypeScript: '#3178c6', HTML: '#e34c26', CSS: '#563d7c', Python: '#3572A5', Java: '#b07219', Kotlin: '#A97BFF' };
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
let repos = [];
const reposReady = fetch('https://api.github.com/users/Aliengho/repos?per_page=100&sort=pushed')
  .then(r => r.ok ? r.json() : Promise.reject())
  .then(d => (repos = d.filter(r => !r.fork && r.name.toLowerCase() !== 'aliengho')));

const card = r => `
  <article class="card proj rv">
    <div class="top"><span class="ico">${icon('folder')}</span>
      <span class="ext">${r.homepage ? `<a href="${esc(r.homepage)}" target="_blank" rel="noopener">${icon('link')} Site</a>` : ''}<a href="${esc(r.html_url)}" target="_blank" rel="noopener">${icon('github')} Código</a></span></div>
    <h3>${esc(r.name.replace(/[-_]/g, ' '))}</h3>
    <p>${esc(r.description || 'Projeto em desenvolvimento.')}</p>
    <div class="meta">${r.language ? `<span><i class="lang-dot" style="background:${colors[r.language] || '#8b91a8'}"></i>${esc(r.language)}</span>` : ''}<span>${icon('star')} ${r.stargazers_count}</span><span>${icon('clock')} ${new Date(r.pushed_at).toLocaleDateString('pt-PT')}</span></div>
  </article>`;
const failMsg = '<p style="color:var(--muted)">Não foi possível carregar agora. Veja todos em <a style="color:var(--accent)" href="https://github.com/Aliengho?tab=repositories">github.com/Aliengho</a>.</p>';

const box = document.getElementById('projects');
if (box) {
  const limit = Number(box.dataset.limit) || Infinity, fb = document.getElementById('filters');
  const render = f => { box.innerHTML = repos.filter(r => !f || r.language === f).slice(0, limit).map(card).join('') || '<p style="color:var(--muted)">Nenhum projeto aqui ainda.</p>'; watch(); };
  reposReady.then(() => {
    if (fb) {
      const langs = [...new Set(repos.map(r => r.language).filter(Boolean))];
      fb.innerHTML = ['Todos', ...langs].map((l, i) => `<button class="${i ? '' : 'on'}" data-f="${i ? esc(l) : ''}">${esc(l)}</button>`).join('');
      fb.onclick = e => { const b = e.target.closest('button'); if (!b) return; fb.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b)); render(b.dataset.f); };
    }
    render('');
  }).catch(() => { box.innerHTML = failMsg; });
}

// estatísticas (sobre)
const sRepos = document.getElementById('s-repos');
if (sRepos) {
  reposReady.then(() => {
    sRepos.textContent = repos.length;
    document.getElementById('s-langs').textContent = new Set(repos.map(r => r.language).filter(Boolean)).size;
  }).catch(() => {});
  fetch('https://api.github.com/users/Aliengho').then(r => r.json()).then(u => {
    const y = (Date.now() - new Date(u.created_at)) / 31557600000;
    document.getElementById('s-years').textContent = y < 1 ? '<1' : Math.floor(y) + '+';
  }).catch(() => {});
}

// terminal interativo (contacto)
const tin = document.getElementById('tin');
if (tin) {
  const tbody = document.getElementById('tbody'), tline = document.getElementById('tline');
  const cmds = {
    ajuda: 'Comandos: <span class="p">sobre</span>, <span class="p">skills</span>, <span class="p">projetos</span>, <span class="p">github</span>, <span class="p">tema</span>, <span class="p">alien</span>, <span class="p">limpar</span>',
    sobre: 'Hélio Julião Paulo Cuna — estudante e developer de Moçambique. Sites, bots e apps.',
    skills: 'HTML · CSS · JavaScript · TypeScript · Node.js · Python · Java · Android · Git',
    projetos: () => repos.length ? repos.slice(0, 8).map(r => '• ' + esc(r.name)).join('<br>') : 'A carregar projetos…',
    github: () => { open('https://github.com/Aliengho', '_blank'); return 'A abrir o GitHub…'; },
    tema: () => { themeBtn.click(); return 'Tema alterado.'; },
    alien: '<pre>   .-""""-.\n  /  o  o  \\\n |    __    |\n  \\  \\__/  /\n   `-.__.-`   alien ghost</pre>',
    sudo: 'Boa tentativa — aqui é preciso senha.'
  };
  tin.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const c = tin.value.trim().toLowerCase(); tin.value = '';
    const echo = document.createElement('div'); echo.innerHTML = `<span class="p">hélio@aliengho:~$</span> ${esc(c)}`;
    tbody.insertBefore(echo, tline);
    if (c === 'limpar' || c === 'clear') { [...tbody.children].forEach(n => n !== tline && n.remove()); return; }
    if (!c) return;
    const out = document.createElement('div'), h = cmds[c];
    out.innerHTML = h ? (typeof h === 'function' ? h() : h) : `Comando não encontrado: ${esc(c)}. Escreve <span class="p">ajuda</span>.`;
    tbody.insertBefore(out, tline); tbody.scrollTop = tbody.scrollHeight;
  });
  document.querySelector('.term').addEventListener('click', () => tin.focus());
}
