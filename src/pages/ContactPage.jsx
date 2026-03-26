import { usePageMeta } from '../hooks/usePageMeta'
import './HomePage.css'

export default function ContactPage() {
  usePageMeta({ title: '聯絡', description: '透過 Email、GitHub 或 LinkedIn 與曹同和聯繫。' })
  return (
    <div className="home">
      <section className="home__section">
        <h1 className="home__section-title">聯絡</h1>
        <p className="home__section-desc">
          可透過{' '}
          <a href="mailto:rucker0911@gmail.com" className="home__contact-link">rucker0911@gmail.com</a>
          {' '}或 GitHub 或 LinkedIn 與我聯繫。
        </p>
        <p className="home__welcome-desc" style={{ marginTop: '1rem' }}>
          <a href="https://github.com/rucker0911" target="_blank" rel="noopener noreferrer" className="home__contact-link">GitHub</a>
          {' · '}
          <a href="https://www.linkedin.com/in/tonghe-tsao-744024385/" target="_blank" rel="noopener noreferrer" className="home__contact-link">LinkedIn</a>
        </p>
      </section>
    </div>
  )
}
