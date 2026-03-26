import PostListSection from '../components/PostListSection'
import { usePageMeta } from '../hooks/usePageMeta'
import './HomePage.css'

export default function PostsPage() {
  usePageMeta({ title: '文章', description: '技術與專案相關文章，可依分類或標籤篩選。' })
  return (
    <div className="home">
      <section className="home__section">
        <h1 className="home__section-title">文章</h1>
        <p className="home__section-desc">技術與專案相關文章，可依分類或標籤篩選。</p>
      </section>
      <PostListSection />
    </div>
  )
}
