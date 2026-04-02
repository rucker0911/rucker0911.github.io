import matter from 'gray-matter'

/**
 * @typedef {Object} BlogPost
 * @property {string} slug 文章路徑識別（由檔名推導）
 * @property {string} title 顯示用標題
 * @property {string} date front matter 的 date（字串化）
 * @property {string} category 分類
 * @property {string[]} tags 標籤
 * @property {string} excerpt 摘要
 * @property {string} image 封面圖 URL（已含 base 或為絕對網址）
 * @property {string} body Markdown 本文（不含 YAML front matter）
 */

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
  const src = String(raw).trim()
  if (!src) return ''
  if (/^https?:\/\//i.test(src)) return src
  const base = import.meta.env.BASE_URL || '/'
  const relativePath = src.replace(/^\/+/, '')
  return base.endsWith('/') ? `${base}${relativePath}` : `${base}/${relativePath}`
}

function _getRawContent(raw) {
  if (typeof raw !== 'string') return ''
  return raw.replace(/^\uFEFF/, '')
}

function _stripFrontmatter(str) {
  if (!str || typeof str !== 'string') return str
  const s = str.trimStart()
  if (!s.startsWith('---')) return str
  const DELIMITER = '\n---'
  const end = s.indexOf(DELIMITER, 3)
  return end !== -1 ? s.slice(end + DELIMITER.length).trimStart() : str
}

/**
 * 以 gray-matter 分離 data 與本文；失敗時保留全文為 body，再去除殘留 frontmatter。
 * @param {string} content
 * @returns {{ data: Record<string, unknown>, body: string }}
 */
function _parseMatterBody(content) {
  let data = {}
  let body = content
  try {
    const parsed = matter(content)
    data = parsed.data || {}
    body = parsed.content ?? ''
  } catch {
    body = content
  }
  return { data, body: _stripFrontmatter(body) }
}

/**
 * 由 slug、matter data 與全文組出 {@link BlogPost} 欄位（tags/title 後備仍讀原始字串）。
 * @param {string} slug
 * @param {Record<string, unknown>} data
 * @param {string} body 已去除 front matter 的本文
 * @param {string} fullContent 原始檔案字串（供正則後備）
 * @returns {BlogPost}
 */
function _buildBlogPost(slug, data, body, fullContent) {
  const parsedTags = Array.isArray(data.tags) && data.tags.length > 0
    ? data.tags
    : _extractTagsFromRaw(fullContent)
  const title =
    String(data.title || _extractTitleFromRaw(fullContent) || _slugToTitle(slug)).trim()
    || _slugToTitle(slug)
  const date = data.date != null ? String(data.date) : ''
  const image = _normalizePostImage(data.image)
  return {
    slug,
    title,
    date,
    category: data.category ?? '',
    tags: parsedTags,
    excerpt: data.excerpt ?? '',
    image,
    body
  }
}

/**
 * @param {string} path Vite glob 路徑
 * @param {unknown} raw 模組載入的原始字串
 * @returns {BlogPost|null}
 */
function _parsePost(path, raw) {
  const content = _getRawContent(raw)
  if (!content.trim()) return null
  const { data, body } = _parseMatterBody(content)
  const slug = _slugFromPath(path)
  return _buildBlogPost(slug, data, body, content)
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

/** @returns {BlogPost[]} */
export function getAllPosts() {
  _buildCache()
  return _postsCache
}

/** @param {string} slug @returns {BlogPost|null} */
export function getPostBySlug(slug) {
  _buildCache()
  return _slugMap.get(slug) ?? null
}

/** @param {BlogPost[]} posts @returns {string[]} */
export function getCategories(posts) {
  const set = new Set(posts.map((p) => p.category).filter(Boolean))
  return [...set].sort()
}

/** @param {BlogPost[]} posts @returns {string[]} */
export function getTags(posts) {
  const set = new Set(posts.flatMap((p) => p.tags).filter(Boolean))
  return [...set].sort()
}
