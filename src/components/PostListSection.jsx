import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getAllPosts, getCategories, getTags } from '../lib/posts'
import './PostListSection.css'

const TAB_ALL = '全部'
const TAB_CATEGORY = '分類'
const TAB_TAG = '標籤'
const VIEW_LIST = 'list'
const VIEW_GRID = 'grid'

export default function PostListSection() {
  const allPosts = useMemo(() => getAllPosts(), [])
  const categories = useMemo(() => getCategories(allPosts), [allPosts])
  const tags = useMemo(() => getTags(allPosts), [allPosts])

  const [search, setSearch] = useState('')
  const [tab, setTab] = useState(TAB_ALL)
  const [categoryFilter, setCategoryFilter] = useState('')
  const [tagFilter, setTagFilter] = useState('')
  const [viewMode, setViewMode] = useState(VIEW_LIST)

  const filteredPosts = useMemo(() => {
    let list = allPosts
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.excerpt?.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q))) ||
          (p.category && p.category.toLowerCase().includes(q))
      )
    }
    if (tab === TAB_CATEGORY && categoryFilter) {
      list = list.filter((p) => p.category === categoryFilter)
    }
    if (tab === TAB_TAG && tagFilter) {
      list = list.filter((p) => p.tags && p.tags.includes(tagFilter))
    }
    return list
  }, [allPosts, search, tab, categoryFilter, tagFilter])

  return (
    <section className="home__posts">
      <div className="home__toolbar">
        <div className="home__search-wrap">
          <span className="home__search-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </span>
          <input
            type="search"
            className="home__search"
            placeholder="搜尋文章、標籤…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="搜尋文章"
          />
        </div>
        <div className="home__toolbar-row">
          <div className="home__tabs">
            <button type="button" className={`home__tab ${tab === TAB_ALL ? 'is-active' : ''}`} onClick={() => setTab(TAB_ALL)}>全部</button>
            <button type="button" className={`home__tab ${tab === TAB_CATEGORY ? 'is-active' : ''}`} onClick={() => setTab(TAB_CATEGORY)}>分類</button>
            <button type="button" className={`home__tab ${tab === TAB_TAG ? 'is-active' : ''}`} onClick={() => setTab(TAB_TAG)}>標籤</button>
          </div>
          <div className="home__view-mode" aria-label="文章檢視方式">
            <button type="button" className={`home__view-btn ${viewMode === VIEW_LIST ? 'is-active' : ''}`} onClick={() => setViewMode(VIEW_LIST)} title="列表" aria-label="列表檢視" aria-pressed={viewMode === VIEW_LIST}>
              <svg className="home__view-icon" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
                <rect x="1" y="1" width="22" height="3" rx="0.5" /><rect x="1" y="6" width="22" height="3" rx="0.5" /><rect x="1" y="11" width="22" height="3" rx="0.5" />
              </svg>
            </button>
            <button type="button" className={`home__view-btn ${viewMode === VIEW_GRID ? 'is-active' : ''}`} onClick={() => setViewMode(VIEW_GRID)} title="網格併排" aria-label="網格檢視" aria-pressed={viewMode === VIEW_GRID}>
              <svg className="home__view-icon" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
                <rect x="1" y="1" width="10" height="6" rx="0.5" /><rect x="13" y="1" width="10" height="6" rx="0.5" /><rect x="1" y="9" width="10" height="6" rx="0.5" /><rect x="13" y="9" width="10" height="6" rx="0.5" />
              </svg>
            </button>
          </div>
        </div>
        {tab === TAB_CATEGORY && categories.length > 0 && (
          <div className="home__filters">
            <button type="button" className={`home__filter-btn ${!categoryFilter ? 'is-active' : ''}`} onClick={() => setCategoryFilter('')}>全部</button>
            {categories.map((c) => (
              <button key={c} type="button" className={`home__filter-btn ${categoryFilter === c ? 'is-active' : ''}`} onClick={() => setCategoryFilter(c)}>{c}</button>
            ))}
          </div>
        )}
        {tab === TAB_TAG && tags.length > 0 && (
          <div className="home__filters">
            <button type="button" className={`home__filter-btn ${!tagFilter ? 'is-active' : ''}`} onClick={() => setTagFilter('')}>全部</button>
            {tags.slice(0, 12).map((t) => (
              <button key={t} type="button" className={`home__filter-btn ${tagFilter === t ? 'is-active' : ''}`} onClick={() => setTagFilter(t)}>{t}</button>
            ))}
          </div>
        )}
      </div>

      <ul className={`home__list ${viewMode === VIEW_GRID ? 'home__list--grid' : ''}`}>
        {filteredPosts.map((post) => (
          <li key={post.slug} className="home__list-item">
            <Link
              to={`/post/${post.slug}`}
              className={`home__list-link${post.image ? ' home__list-link--thumb' : ''}`}
            >
              {post.image && (
                <span className="home__list-thumb-wrap" aria-hidden="true">
                  <img src={post.image} alt="" className="home__list-thumb" loading="lazy" decoding="async" />
                </span>
              )}
              <span className="home__list-text">
                <span className="home__list-title">{post.title}</span>
                <span className="home__list-meta">{post.date} {post.category && `· ${post.category}`}</span>
                {post.tags && post.tags.length > 0 && (
                  <span className="home__list-tags">
                    {post.tags.map((t) => (
                      <span key={t} className="home__list-tag">{t}</span>
                    ))}
                  </span>
                )}
                {post.excerpt && <p className="home__list-excerpt">{post.excerpt}</p>}
              </span>
              <span className="home__list-bar" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
      {filteredPosts.length === 0 && <p className="home__empty">沒有符合的文章</p>}
    </section>
  )
}
