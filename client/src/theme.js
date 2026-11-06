const KEY = 'portfolio-theme';

export function getTheme() {
  return document.documentElement.dataset.theme || 'steel';
}

export function setTheme(name) {
  document.documentElement.dataset.theme = name;
  window.dispatchEvent(new Event('themechange'));
  try {
    localStorage.setItem(KEY, name);
  } catch {
    // Private mode can block storage; the theme still applies for this visit.
  }
}

export function restoreTheme() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'steel' || saved === 'mint') document.documentElement.dataset.theme = saved;
  } catch {
    // Same as above: fall back to the default theme.
  }
}
