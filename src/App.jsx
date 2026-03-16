import { useState } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import './App.css'
import './reference-style.css'
import './layout.css'
import HomePage from './pages/HomePage'
import PostPage from './pages/PostPage'
import RecentPosts from './components/RecentPosts'
import AboutCard from './components/AboutCard'

function App() {
  const [leftOpen, setLeftOpen] = useState(false)
  const [rightOpen, setRightOpen] = useState(false)
  const location = useLocation()

  const closeOverlay = () => {
    setLeftOpen(false)
    setRightOpen(false)
  }

  const isHome = location.pathname === '/'

  const GRID_SPAN_COUNT = 400

  return (
    <div className="ref-page">
      <section className="ref-section ref-section--bg" aria-hidden="true">
        {Array.from({ length: GRID_SPAN_COUNT }, (_, i) => (
          <span key={i} className="ref-grid-span" />
        ))}
      </section>
      <div className="blog-layout">
      <header className="blog-layout__mobile-bar">
        <span className="blog-layout__mobile-bar-brand">曹同和</span>
        <div className="blog-layout__mobile-bar-actions">
          <button
            type="button"
            className="blog-layout__mobile-btn"
            onClick={() => setLeftOpen(true)}
            aria-label="開啟導航"
          >
            ☰
          </button>
          <button
            type="button"
            className="blog-layout__mobile-btn"
            onClick={() => setRightOpen(true)}
            aria-label="開啟側欄"
          >
            ⋮
          </button>
        </div>
      </header>

      <div
        className={`blog-layout__overlay ${leftOpen || rightOpen ? 'is-visible' : ''}`}
        onClick={closeOverlay}
        onKeyDown={(e) => e.key === 'Escape' && closeOverlay()}
        role="button"
        tabIndex={0}
        aria-label="關閉選單"
      />

      <aside className={`blog-layout__left ${leftOpen ? 'is-open' : ''}`}>
        <div className="blog-layout__brand">曹同和</div>
        <nav>
          <ul className="blog-layout__nav">
            <li className="blog-layout__nav-item">
              <Link
                to="/"
                className={`blog-layout__nav-link ${isHome ? 'blog-layout__nav-link--active' : ''}`}
                onClick={closeOverlay}
              >
                首頁
              </Link>
            </li>
            <li className="blog-layout__nav-item">
              <Link
                to="/"
                className="blog-layout__nav-link"
                onClick={closeOverlay}
              >
                文章
              </Link>
            </li>
            <li className="blog-layout__nav-item">
              <a href={isHome ? '#projects' : '/#projects'} className="blog-layout__nav-link" onClick={closeOverlay}>
                專案
              </a>
            </li>
            <li className="blog-layout__nav-item">
              <a href={isHome ? '#about' : '/#about'} className="blog-layout__nav-link" onClick={closeOverlay}>
                關於
              </a>
            </li>
            <li className="blog-layout__nav-item">
              <a href={isHome ? '#contact' : '/#contact'} className="blog-layout__nav-link" onClick={closeOverlay}>
                聯絡
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="blog-layout__main">
        <div className="blog-layout__main-inner">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/post/:slug" element={<PostPage />} />
          </Routes>
        </div>
      </main>

      <aside className={`blog-layout__right ${rightOpen ? 'is-open' : ''}`}>
        <RecentPosts />
        <AboutCard />
      </aside>
      </div>
    </div>
  )
}

export default App
