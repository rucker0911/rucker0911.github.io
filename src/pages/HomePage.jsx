import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllPosts, getCategories, getTags } from '../lib/posts'
import './HomePage.css'

const TAB_ALL = '全部'
const TAB_CATEGORY = '分類'
const TAB_TAG = '標籤'

export default function HomePage() {
  const allPosts = useMemo(() => getAllPosts(), [])
  const categories = useMemo(() => getCategories(allPosts), [allPosts])
  const tags = useMemo(() => getTags(allPosts), [allPosts])

  const [search, setSearch] = useState('')
  const [tab, setTab] = useState(TAB_ALL)
  const [categoryFilter, setCategoryFilter] = useState('')
  const [tagFilter, setTagFilter] = useState('')

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash) {
      const el = document.getElementById(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  const filteredPosts = useMemo(() => {
    let list = allPosts
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q))
      )
    }
    if (tab === TAB_CATEGORY && categoryFilter) {
      list = list.filter((p) => p.category === categoryFilter)
    }
    if (tab === TAB_TAG && tagFilter) {
      list = list.filter((p) => p.tags.includes(tagFilter))
    }
    return list
  }, [allPosts, search, tab, categoryFilter, tagFilter])

  return (
    <div className="home">
      <section id="home" className="home__welcome">
        <h1 className="home__welcome-title">Hi，我是曹同和</h1>
        <p className="home__welcome-desc">
          Python 後端與 IoT Edge 應用開發，參與智慧交通專案，熟悉異質協定整合與現場建置。
        </p>
      </section>

      <section id="posts" className="home__posts">
        <div className="home__toolbar">
          <input
            type="search"
            className="home__search"
            placeholder="搜尋文章…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="搜尋文章"
          />
          <div className="home__tabs">
            <button
              type="button"
              className={`home__tab ${tab === TAB_ALL ? 'is-active' : ''}`}
              onClick={() => setTab(TAB_ALL)}
            >
              全部
            </button>
            <button
              type="button"
              className={`home__tab ${tab === TAB_CATEGORY ? 'is-active' : ''}`}
              onClick={() => setTab(TAB_CATEGORY)}
            >
              分類
            </button>
            <button
              type="button"
              className={`home__tab ${tab === TAB_TAG ? 'is-active' : ''}`}
              onClick={() => setTab(TAB_TAG)}
            >
              標籤
            </button>
          </div>
          {tab === TAB_CATEGORY && categories.length > 0 && (
            <div className="home__filters">
              <button
                type="button"
                className={`home__filter-btn ${!categoryFilter ? 'is-active' : ''}`}
                onClick={() => setCategoryFilter('')}
              >
                全部
              </button>
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`home__filter-btn ${categoryFilter === c ? 'is-active' : ''}`}
                  onClick={() => setCategoryFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
          {tab === TAB_TAG && tags.length > 0 && (
            <div className="home__filters">
              <button
                type="button"
                className={`home__filter-btn ${!tagFilter ? 'is-active' : ''}`}
                onClick={() => setTagFilter('')}
              >
                全部
              </button>
              {tags.slice(0, 12).map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`home__filter-btn ${tagFilter === t ? 'is-active' : ''}`}
                  onClick={() => setTagFilter(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        <ul className="home__list">
          {filteredPosts.map((post) => (
            <li key={post.slug} className="home__list-item">
              <Link to={`/post/${post.slug}`} className="home__list-link">
                <span className="home__list-title">{post.title}</span>
                <span className="home__list-meta">
                  {post.date} {post.category && `· ${post.category}`}
                </span>
                {post.excerpt && (
                  <p className="home__list-excerpt">{post.excerpt}</p>
                )}
                {post.tags.length > 0 && (
                  <span className="home__list-tags">
                    {post.tags.map((t) => (
                      <span key={t} className="home__list-tag">{t}</span>
                    ))}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
        {filteredPosts.length === 0 && (
          <p className="home__empty">沒有符合的文章</p>
        )}
      </section>

      {/* <section id="projects" className="home__section">
        <h2 className="home__section-title">專案</h2>
        <p className="home__section-desc">新竹市號誌控制系統、動態號控、道路安全 CMS 整合、影像辨識個資遮罩等（詳見文章）。</p>
      </section>
      <section id="about" className="home__section">
        <h2 className="home__section-title">關於</h2>
        <p className="home__section-desc">曹同和，Python 後端與 IoT 應用開發，熟悉異質協定整合與現場建置。</p>
      </section>
      <section id="contact" className="home__section">
        <h2 className="home__section-title">聯絡</h2>
        <p className="home__section-desc">可透過 GitHub 或 LinkedIn 聯繫。</p>
      </section> */}
    </div>
  )
}
