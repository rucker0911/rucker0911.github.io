import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import './App.css'
import './reference-style.css'
import './layout.css'
import HomePage from './pages/HomePage'
import PostPage from './pages/PostPage'
import PostsPage from './pages/PostsPage'
import ProjectsPage from './pages/ProjectsPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import RecentPosts from './components/RecentPosts'
import AboutCard from './components/AboutCard'
import NotFoundPage from './pages/NotFoundPage'
import { useSidebarState } from './hooks/useSidebarState'
import { PROFILE_NAME } from './lib/profile'

function App() {
  const {
    leftOpen, setLeftOpen,
    rightOpen, setRightOpen,
    leftCollapsed, setLeftCollapsed,
    rightCollapsed, setRightCollapsed,
    leftW, rightW,
    closeOverlay,
    startResizeLeft,
    startResizeRight,
  } = useSidebarState()
  const { pathname } = useLocation()

  const _navClass = ({ isActive }) =>
    `blog-layout__nav-link${isActive ? ' blog-layout__nav-link--active' : ''}`

  const _postsNavClass = ({ isActive }) =>
    `blog-layout__nav-link${isActive || pathname.startsWith('/post/') ? ' blog-layout__nav-link--active' : ''}`

  return (
    <div className="ref-page">
      <section className="ref-section ref-section--bg" aria-hidden="true" />
      <div
        className="blog-layout"
        style={{
          '--layout-left-width': `${leftW}px`,
          '--layout-right-width': `${rightW}px`
        }}
      >
      <header className="blog-layout__mobile-bar">
        <span className="blog-layout__mobile-bar-brand">{PROFILE_NAME}</span>
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

      <aside className={`blog-layout__left ${leftOpen ? 'is-open' : ''} ${leftCollapsed ? 'blog-layout__left--collapsed' : ''}`}>
        <div className="blog-layout__left-content">
          <div className="blog-layout__brand">{PROFILE_NAME}</div>
          <nav>
          <ul className="blog-layout__nav">
            <li className="blog-layout__nav-item">
              <NavLink to="/" end className={_navClass} onClick={closeOverlay}>
                <span className="blog-layout__nav-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                </span>
                首頁
              </NavLink>
            </li>
            <li className="blog-layout__nav-item">
              <NavLink to="/posts" className={_postsNavClass} onClick={closeOverlay}>
                <span className="blog-layout__nav-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
                </span>
                文章
              </NavLink>
            </li>
            <li className="blog-layout__nav-item">
              <NavLink to="/projects" className={_navClass} onClick={closeOverlay}>
                <span className="blog-layout__nav-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
                </span>
                專案
              </NavLink>
            </li>
            <li className="blog-layout__nav-item">
              <NavLink to="/about" className={_navClass} onClick={closeOverlay}>
                <span className="blog-layout__nav-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                </span>
                關於
              </NavLink>
            </li>
            <li className="blog-layout__nav-item">
              <NavLink to="/contact" className={_navClass} onClick={closeOverlay}>
                <span className="blog-layout__nav-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                </span>
                聯絡
              </NavLink>
            </li>
          </ul>
        </nav>
        </div>
        <button
          type="button"
          className="blog-layout__sidebar-toggle blog-layout__sidebar-toggle--left"
          onClick={() => setLeftCollapsed((c) => !c)}
          aria-label={leftCollapsed ? '展開左側欄' : '收合左側欄'}
          title={leftCollapsed ? '展開左側欄' : '收合左側欄'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {leftCollapsed ? <path d="M9 18l6-6-6-6" /> : <path d="M15 18l-6-6 6-6" />}
          </svg>
        </button>
        <div
          className="blog-layout__resize-handle blog-layout__resize-handle--left"
          onMouseDown={startResizeLeft}
          role="separator"
          aria-label="拖曳調整左側欄寬度"
        />
      </aside>

      <main className="blog-layout__main">
        <div className="blog-layout__main-inner">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/post/:slug" element={<PostPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </main>

      <aside className={`blog-layout__right ${rightOpen ? 'is-open' : ''} ${rightCollapsed ? 'blog-layout__right--collapsed' : ''}`}>
        <div
          className="blog-layout__resize-handle blog-layout__resize-handle--right"
          onMouseDown={startResizeRight}
          role="separator"
          aria-label="拖曳調整右側欄寬度"
        />
        <div className="blog-layout__right-content">
          <AboutCard />
          <RecentPosts />
        </div>
        <button
          type="button"
          className="blog-layout__sidebar-toggle blog-layout__sidebar-toggle--right"
          onClick={() => setRightCollapsed((c) => !c)}
          aria-label={rightCollapsed ? '展開右側欄' : '收合右側欄'}
          title={rightCollapsed ? '展開右側欄' : '收合右側欄'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {rightCollapsed ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
          </svg>
        </button>
      </aside>
      </div>
    </div>
  )
}

export default App
