// Save, load, and apply user theme preference
const themeSelect = document.getElementById('theme-select');

function applyTheme(theme) {
  if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
}

function loadTheme() {
  const saved = localStorage.getItem('theme-choice') || 'system';
  themeSelect.value = saved;
  applyTheme(saved);
}

themeSelect.addEventListener('change', function() {
  const theme = this.value;
  localStorage.setItem('theme-choice', theme);
  applyTheme(theme);
});

// Listen to system preference changes if user selects "system"
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (themeSelect.value === 'system') applyTheme('system');
});

loadTheme();
