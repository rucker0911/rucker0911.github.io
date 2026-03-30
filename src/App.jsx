import { useRef } from 'react'
import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
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
import ScrollToTopButton from './components/ScrollToTopButton'
import { useSidebarState } from './hooks/useSidebarState'
import { PROFILE_NAME } from './lib/profile'
import {
  IconNavHome,
  IconNavPosts,
  IconNavProjects,
  IconNavAbout,
  IconNavContact,
  IconChevronLeft,
  IconChevronRight,
} from './components/icons/LayoutIcons'

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
  const mainScrollRef = useRef(null)

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
                  <IconNavHome />
                </span>
                首頁
              </NavLink>
            </li>
            <li className="blog-layout__nav-item">
              <NavLink to="/posts" className={_postsNavClass} onClick={closeOverlay}>
                <span className="blog-layout__nav-icon" aria-hidden="true">
                  <IconNavPosts />
                </span>
                文章
              </NavLink>
            </li>
            <li className="blog-layout__nav-item">
              <NavLink to="/projects" className={_navClass} onClick={closeOverlay}>
                <span className="blog-layout__nav-icon" aria-hidden="true">
                  <IconNavProjects />
                </span>
                專案
              </NavLink>
            </li>
            <li className="blog-layout__nav-item">
              <NavLink to="/about" className={_navClass} onClick={closeOverlay}>
                <span className="blog-layout__nav-icon" aria-hidden="true">
                  <IconNavAbout />
                </span>
                關於
              </NavLink>
            </li>
            <li className="blog-layout__nav-item">
              <NavLink to="/contact" className={_navClass} onClick={closeOverlay}>
                <span className="blog-layout__nav-icon" aria-hidden="true">
                  <IconNavContact />
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
          {leftCollapsed ? <IconChevronRight /> : <IconChevronLeft />}
        </button>
        <div
          className="blog-layout__resize-handle blog-layout__resize-handle--left"
          onMouseDown={startResizeLeft}
          role="separator"
          aria-label="拖曳調整左側欄寬度"
        />
      </aside>

      <main ref={mainScrollRef} className="blog-layout__main">
        <ScrollToTopButton scrollRef={mainScrollRef} />
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
          {rightCollapsed ? <IconChevronLeft /> : <IconChevronRight />}
        </button>
      </aside>
      </div>
    </div>
  )
}

export default App
