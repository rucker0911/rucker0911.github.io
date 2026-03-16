import matter from 'gray-matter'

const postModules = import.meta.glob('../posts/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
})

function _slugFromPath(path) {
  const name = (path.split('/').pop() || '').replace(/\?.*$/, '')
  return name.replace(/\.md$/, '') || path
}

function _slugToTitle(slug) {
  return slug
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(' ')
}

function _getRawContent(raw) {
  if (typeof raw === 'string') return raw
  let r = raw
  while (r != null && typeof r === 'object') {
    if (typeof r.default === 'string') return r.default
    if (typeof r.default === 'object' && r.default !== null) r = r.default
    else break
  }
  return ''
}

function _parsePost(path, raw) {
  const content = _getRawContent(raw)
  if (!content.trim()) return null
  let data = {}
  let body = content
  try {
    const parsed = matter(content)
    data = parsed.data || {}
    body = parsed.content ?? ''
  } catch {
    body = content
  }
  body = _stripFrontmatterFromBody(body)
  const slug = _slugFromPath(path)
  const title = data.title ?? _slugToTitle(slug)
  const date = data.date != null ? String(data.date) : ''
  return {
    slug,
    title: title && String(title).trim() ? title : _slugToTitle(slug),
    date,
    category: data.category ?? '',
    tags: Array.isArray(data.tags) ? data.tags : (data.tags ? [data.tags] : []),
    excerpt: data.excerpt ?? '',
    body
  }
}

function _stripFrontmatterFromBody(body) {
  if (!body || typeof body !== 'string') return body
  const trimmed = body.replace(/^\uFEFF/, '').trim()
  if (trimmed.startsWith('---')) {
    const secondDash = trimmed.indexOf('\n---', 3)
    if (secondDash !== -1) return trimmed.slice(secondDash + 4).trim()
  }
  return body
}

export function getAllPosts() {
  const posts = Object.entries(postModules)
    .map(([path, raw]) => _parsePost(path, raw))
    .filter(Boolean)
  return posts.sort((a, b) => (b.date < a.date ? -1 : 1))
}

export function getPostBySlug(slug) {
  const all = getAllPosts()
  return all.find((p) => p.slug === slug) ?? null
}

export function getCategories(posts) {
  const set = new Set(posts.map((p) => p.category).filter(Boolean))
  return [...set].sort()
}

export function getTags(posts) {
  const set = new Set(posts.flatMap((p) => p.tags))
  return [...set].sort()
}
