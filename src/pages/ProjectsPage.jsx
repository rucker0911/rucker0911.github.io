import { Link } from 'react-router-dom'
import { getAllPosts } from '../lib/posts'
import { usePageMeta } from '../hooks/usePageMeta'
import './HomePage.css'

export default function ProjectsPage() {
  usePageMeta({ title: '專案', description: '新竹市號誌控制系統、動態號控、道路安全 CMS 整合、影像辨識個資遮罩等專案紀錄。' })
  const posts = getAllPosts()

  return (
    <div className="home">
      <section className="home__section">
        <h1 className="home__section-title">專案</h1>
        <p className="home__section-desc">
          新竹市號誌控制系統、動態號控、道路安全 CMS 整合、影像辨識個資遮罩等，詳見下方文章。
        </p>
      </section>
      <section className="home__posts">
        <ul className="home__list">
          {posts.map((p) => (
            <li key={p.slug} className="home__list-item">
              <Link to={`/post/${p.slug}`} className="home__list-link">
                <span className="home__list-title">{p.title}</span>
                <span className="home__list-meta">{p.date} {p.category && `· ${p.category}`}</span>
                {p.tags && p.tags.length > 0 && (
                  <span className="home__list-tags">
                    {p.tags.map((t) => (
                      <span key={t} className="home__list-tag">{t}</span>
                    ))}
                  </span>
                )}
                {p.excerpt && <p className="home__list-excerpt">{p.excerpt}</p>}
                <span className="home__list-bar" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
