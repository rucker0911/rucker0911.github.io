import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import './HomePage.css'

export default function NotFoundPage() {
  usePageMeta({ title: '404 找不到頁面' })
  const navigate = useNavigate()
  const handleBack = useCallback(() => navigate('/'), [navigate])

  return (
    <div className="home">
      <section className="home__section">
        <h1 className="home__section-title">404</h1>
        <p className="home__section-desc">找不到這個頁面。</p>
        <button type="button" className="home__404-back" onClick={handleBack}>
          ← 回首頁
        </button>
      </section>
    </div>
  )
}
