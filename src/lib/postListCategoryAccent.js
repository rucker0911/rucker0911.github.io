/** 分類名稱 → 卡片左側強調色（與 PostListSection 視覺一致） */
export const CATEGORY_ACCENT_MAP = {
  專案: 'rgba(0, 255, 255, 0.85)',
  技術: 'rgba(172, 214, 255, 0.85)',
  筆記: 'rgba(120, 255, 214, 0.75)',
}

export const DEFAULT_CATEGORY_ACCENT = 'rgba(0, 224, 255, 0.55)'

export function getCategoryAccent(category) {
  const c = String(category || '').trim()
  if (!c) return DEFAULT_CATEGORY_ACCENT
  return CATEGORY_ACCENT_MAP[c] ?? DEFAULT_CATEGORY_ACCENT
}
