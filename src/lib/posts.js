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

function _normalizePostImage(raw) {
  if (raw == null) return ''
  const s = String(raw).trim()
  if (!s) return ''
  if (/^https?:\/\//i.test(s)) return s
  const base = import.meta.env.BASE_URL || '/'
  const path = s.replace(/^\/+/, '')
  return base.endsWith('/') ? `${base}${path}` : `${base}/${path}`
}

function _getRawContent(raw) {
  if (typeof raw !== 'string') return ''
  return raw.replace(/^\uFEFF/, '')
}

function _stripFrontmatter(str) {
  if (!str || typeof str !== 'string') return str
  const s = str.trimStart()
  if (!s.startsWith('---')) return str
  const end = s.indexOf('\n---', 3)
  return end !== -1 ? s.slice(end + 4).trimStart() : str
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
  body = _stripFrontmatter(body)
  const slug = _slugFromPath(path)
  const parsedTags = Array.isArray(data.tags) && data.tags.length > 0
    ? data.tags
    : _extractTagsFromRaw(content)
  const title = data.title ? data.title : _extractTitleFromRaw(content) || _slugToTitle(slug)
  const date = data.date != null ? String(data.date) : ''
  const image = _normalizePostImage(data.image)
  return {
    slug,
    title: title && String(title).trim() ? title : _slugToTitle(slug),
    date,
    category: data.category ?? '',
    tags: parsedTags,
    excerpt: data.excerpt ?? '',
    image,
    body
  }
}

function _extractTagsFromRaw(content) {
  if (!content || typeof content !== 'string') return []
  const match = content.match(/tags:\s*\[([^\]]*)\]/)
  if (!match) return []
  return match[1]
    .split(',')
    .map((s) => s.replace(/^["'\s]+|["'\s]+$/g, '').trim())
    .filter(Boolean)
}

function _extractTitleFromRaw(content) {
  if (!content || typeof content !== 'string') return ''
  const match = content.match(/title:\s*["']([^"']*)["']/)
  return match ? match[1].trim() : ''
}

let _postsCache = null
let _slugMap = null

function _buildCache() {
  if (_postsCache) return
  const posts = Object.entries(postModules)
    .map(([path, raw]) => _parsePost(path, raw))
    .filter(Boolean)
  _postsCache = posts.sort((a, b) => {
    if (b.date > a.date) return 1
    if (b.date < a.date) return -1
    return a.slug.localeCompare(b.slug)
  })
  _slugMap = new Map(_postsCache.map((p) => [p.slug, p]))
}

export function getAllPosts() {
  _buildCache()
  return _postsCache
}

export function getPostBySlug(slug) {
  _buildCache()
  return _slugMap.get(slug) ?? null
}

export function getCategories(posts) {
  const set = new Set(posts.map((p) => p.category).filter(Boolean))
  return [...set].sort()
}

export function getTags(posts) {
  const set = new Set(posts.flatMap((p) => p.tags).filter(Boolean))
  return [...set].sort()
}
