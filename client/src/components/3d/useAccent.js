import { useEffect, useState } from 'react';

const read = () => {
  const [r, g, b] = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim().split(/\s+/);
  return `rgb(${r}, ${g}, ${b})`;
};

// Three.js materials can't read CSS variables, so the current accent is passed in as a colour.
export function useAccent() {
  const [accent, setAccent] = useState(read);

  useEffect(() => {
    const update = () => setAccent(read());
    window.addEventListener('themechange', update);
    return () => window.removeEventListener('themechange', update);
  }, []);

  return accent;
}
