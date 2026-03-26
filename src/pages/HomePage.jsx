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
        <h1 className="home__welcome-title">Hi，我是曹同和</h1>
        <p className="home__welcome-desc">
          熟悉 Python 後端與 IoT Edge 應用開發，具備兩年以上開發經驗，熟悉網路路由與私有網路建置。
          除了系統開發，也曾實際到現場（如路口、中心機房）進行場勘、設備佈建與測試，具備從邊緣端到機房的完整建置經驗。
        </p>
      </section>
      <section id="posts">
        <PostListSection />
      </section>
    </div>
  )
}
