// cabeçalho e rodapé partilhados por todas as páginas
const page = document.body.dataset.page;
const nav = [
  ['index.html', 'Início', 'inicio'],
  ['sobre.html', 'Sobre', 'sobre'],
  ['projetos.html', 'Projetos', 'projetos'],
  ['contacto.html', 'Contacto', 'contacto'],
];
const sun = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
const moon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

document.body.insertAdjacentHTML('afterbegin', `
<header><div class="wrap">
  <a class="brand" href="index.html">Hélio Cuna</a>
  <nav>${nav.map(([href, label, id]) => `<a href="${href}"${id === page ? ' aria-current="page"' : ''}>${label}</a>`).join('')}</nav>
  <button class="theme-btn" id="theme" aria-label="Mudar tema"></button>
</div></header>`);

document.body.insertAdjacentHTML('beforeend', `
<footer><div class="wrap">
  <span>© ${new Date().getFullYear()} Hélio Julião Paulo Cuna</span>
  <a href="https://github.com/Aliengho" target="_blank" rel="noopener">github.com/Aliengho</a>
</div></footer>`);

// tema claro/escuro
const root = document.documentElement, themeBtn = document.getElementById('theme');
function setTheme(t) {
  root.dataset.theme = t;
  themeBtn.innerHTML = t === 'light' ? moon : sun;
  try { localStorage.setItem('tema', t); } catch (e) {}
}
let saved = null;
try { saved = localStorage.getItem('tema'); } catch (e) {}
setTheme(saved || 'dark');
themeBtn.onclick = () => setTheme(root.dataset.theme === 'light' ? 'dark' : 'light');

// repositórios do GitHub
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const langColor = { JavaScript: '#f1e05a', TypeScript: '#3178c6', HTML: '#e34c26', CSS: '#663399', Python: '#3572a5', Java: '#b07219', Kotlin: '#a97bff' };

function loadRepos() {
  return fetch('https://api.github.com/users/Aliengho/repos?per_page=100&sort=pushed')
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(list => list.filter(r => !r.fork && r.name.toLowerCase() !== 'aliengho'));
}

function projectHTML(r) {
  const year = new Date(r.pushed_at).getFullYear();
  return `<a class="project" href="${esc(r.homepage || r.html_url)}" target="_blank" rel="noopener">
    <h3>${esc(r.name.replace(/[-_]/g, ' '))} <span class="arrow">→</span></h3>
    <p>${esc(r.description || 'Sem descrição.')}</p>
    <div class="meta">${r.language ? `<span class="dot" style="background:${langColor[r.language] || '#888'}"></span>${esc(r.language)}<br>` : ''}${year}</div>
  </a>`;
}

const errorMsg = '<p class="empty">Não foi possível carregar os projetos agora. Veja todos em <a class="link" href="https://github.com/Aliengho?tab=repositories">github.com/Aliengho</a>.</p>';

// lista curta (início)
const featured = document.getElementById('featured');
if (featured) {
  loadRepos()
    .then(rs => { featured.innerHTML = rs.slice(0, 3).map(projectHTML).join('') || '<p class="empty">Em breve.</p>'; })
    .catch(() => { featured.innerHTML = errorMsg; });
}

// lista completa com filtros (projetos)
const all = document.getElementById('all-projects');
if (all) {
  const filters = document.getElementById('filters');
  loadRepos().then(rs => {
    const langs = [...new Set(rs.map(r => r.language).filter(Boolean))];
    filters.innerHTML = ['Todos', ...langs].map((l, i) => `<button aria-pressed="${i === 0}" data-l="${i ? esc(l) : ''}">${esc(l)}</button>`).join('');
    const show = l => { all.innerHTML = rs.filter(r => !l || r.language === l).map(projectHTML).join(''); };
    filters.onclick = e => {
      const b = e.target.closest('button'); if (!b) return;
      filters.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b));
      show(b.dataset.l);
    };
    show('');
    const count = document.getElementById('count');
    if (count) count.textContent = `${rs.length} repositórios públicos`;
  }).catch(() => { all.innerHTML = errorMsg; });
}
