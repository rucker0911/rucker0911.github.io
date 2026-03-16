import { useState } from 'react'
import './App.css'
import './reference-style.css'
// import CyberpunkDemo from './CyberpunkDemo.jsx'

const GRID_SPAN_COUNT = 400

function App() {
  const [showCyberDemo, setShowCyberDemo] = useState(false)

  if (showCyberDemo) {
    return (
      <>
        <CyberpunkDemo />
        <div style={{ position: 'fixed', bottom: 16, right: 16 }}>
          <button
            type="button"
            onClick={() => setShowCyberDemo(false)}
            style={{
              padding: '0.5rem 1rem',
              background: 'rgba(0,255,200,0.2)',
              border: '1px solid #00ffc8',
              color: '#00ffc8',
              cursor: 'pointer',
              borderRadius: 4
            }}
          >
            回首頁
          </button>
        </div>
      </>
    )
  }

  return (
    <div className="ref-page">
      <section className="ref-section">
        {Array.from({ length: GRID_SPAN_COUNT }, (_, i) => (
          <span key={i} className="ref-grid-span" />
        ))}
        <div className="ref-card">
          <div className="ref-content">
            <h1>Rucker.github.io</h1>
            <p className="tagline">用 React + Vite 建置的個人網站</p>

            <div className="ref-block">
              <h2>歡迎</h2>
              <p>這是你的 GitHub Pages 網站，由 Vite 建置、部署到 GitHub Pages。</p>
              <p style={{ marginTop: '0.75rem' }}>
              </p>
            </div>

            <div className="ref-block">
              <h2>About Me</h2>
              <p>我是 Rucker，一名軟體工程師，主要使用 Python 和 React 進行開發。</p>
            </div>

            <div className="ref-block">
              <h2>Projects</h2>
              <p>我目前正在開發的專案</p>
            </div>

            <div className="ref-block">
              <h2>Contact</h2>
              <p>你可以透過以下方式聯繫我</p>
            </div>

            <p className="ref-footer">© {new Date().getFullYear()} rucker.github.io</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
