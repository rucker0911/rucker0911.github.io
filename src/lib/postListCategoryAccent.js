export function getCategoryAccent(category) {
  const c = String(category || '').trim()
  if (!c) return 'rgba(0, 224, 255, 0.55)'
  if (c === '專案') return 'rgba(0, 255, 255, 0.85)'
  if (c === '技術') return 'rgba(172, 214, 255, 0.85)'
  if (c === '筆記') return 'rgba(120, 255, 214, 0.75)'
  return 'rgba(0, 224, 255, 0.55)'
}
