import { PROFILE_NAME, PROFILE_AVATAR, PROFILE_BIO_SHORT, PROFILE_BIO, PROFILE_TECH_STACK } from '../lib/profile'
import { usePageMeta } from '../hooks/usePageMeta'
import './HomePage.css'

export default function AboutPage() {
  usePageMeta({ title: '關於', description: PROFILE_BIO_SHORT })
  return (
    <div className="home">
      <section className="home__section">
        <h1 className="home__section-title">關於</h1>
        <div className="home__about-portrait">
          <div className="home__about-portrait-screen">
            <div className="home__about-portrait-ring">
              <img
                className="home__about-portrait-img"
                src={PROFILE_AVATAR}
                alt={PROFILE_NAME}
                width={200}
                height={200}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
        <p className="home__section-desc" style={{ marginBottom: '1rem' }}>
          {PROFILE_BIO_SHORT}
        </p>
        <p className="home__welcome-desc" style={{ marginBottom: '1rem' }}>
          {PROFILE_BIO}
        </p>
        <p className="home__welcome-desc">
          技術棧：{PROFILE_TECH_STACK}
        </p>
      </section>
    </div>
  )
}
