import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import PostListSection from '../components/PostListSection'
import { usePageMeta } from '../hooks/usePageMeta'
import './HomePage.css'

export default function HomePage() {
  usePageMeta()
  const location = useLocation()

  useEffect(() => {
    const hash = (location.hash || window.location.hash).slice(1)
    if (hash) {
      const el = document.getElementById(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [location.hash])

  return (
    <div className="home">
      <section id="home" className="home__welcome">
        <div className="home__welcome-inner">
          <div className="home__welcome-heading">
            <h1 className="home__welcome-title">Hi，我是曹同和</h1>
            <span className="home__welcome-decor" aria-hidden="true">
              <svg
                className="home__welcome-decor-svg"
                width="72"
                height="48"
                viewBox="0 0 72 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 14V4h10M58 4h10v10M68 34v10H58M14 44H4V34"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 24h28"
                  stroke="currentColor"
                  strokeWidth="0.9"
                  strokeDasharray="2 5"
                  strokeLinecap="round"
                  opacity="0.55"
                />
                <circle cx="36" cy="24" r="2" fill="currentColor" opacity="0.35" />
                <circle cx="36" cy="24" r="5" stroke="currentColor" strokeWidth="0.75" opacity="0.25" />
              </svg>
            </span>
          </div>
          <p className="home__welcome-desc">
            熟悉 Python 後端與 IoT Edge 應用開發，具備兩年以上開發經驗，熟悉網路路由與私有網路建置。
            除了系統開發，也曾實際到現場（如路口、中心機房）進行場勘、設備佈建與測試，具備從邊緣端到機房的完整建置經驗。
          </p>
        </div>
      </section>
      <section id="posts">
        <PostListSection />
      </section>
    </div>
  )
}
