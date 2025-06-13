document.addEventListener('DOMContentLoaded', () => {
  fetch('/components/header.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('header').innerHTML = html;
      initThemeToggle();
    })
    .catch(err => console.error('Error cargando header:', err));
});

function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  // Tema inicial
  const saved = localStorage.getItem('theme') || 'light';
  applyTheme(saved);
  // Cambiar al hacer click
  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark'
      ? 'light'
      : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('themeToggle');
  btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}