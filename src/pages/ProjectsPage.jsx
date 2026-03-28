import PostListSection from '../components/PostListSection'
import { usePageMeta } from '../hooks/usePageMeta'
import './HomePage.css'

export default function ProjectsPage() {
  usePageMeta({ title: '專案', description: '新竹市號誌控制系統、動態號控、道路安全 CMS 整合、影像辨識個資遮罩等專案紀錄。' })

  return (
    <div className="home">
      <section className="home__section">
        <h1 className="home__section-title">專案</h1>
        <p className="home__section-desc">
          新竹市號誌控制系統、動態號控、道路安全 CMS 整合、影像辨識個資遮罩等，詳見下方文章。
        </p>
      </section>
      <PostListSection />
    </div>
  )
}
