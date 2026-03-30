/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { IconChevronUp } from './icons/LayoutIcons'

const SHOW_AFTER_PX = 240

function _windowScrollTop() {
  return window.scrollY || document.documentElement.scrollTop || 0
}

export default function ScrollToTopButton({ scrollRef }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = scrollRef?.current
    const update = () => {
      const mainTop = el?.scrollTop ?? 0
      const winTop = _windowScrollTop()
      setVisible(mainTop > SHOW_AFTER_PX || winTop > SHOW_AFTER_PX)
    }
    update()
    el?.addEventListener('scroll', update, { passive: true })
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      el?.removeEventListener('scroll', update)
      window.removeEventListener('scroll', update)
    }
  }, [scrollRef])

  const handleClick = () => {
    scrollRef?.current?.scrollTo({ top: 0, behavior: 'smooth' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <button
      type="button"
      className="blog-layout__scroll-top"
      onClick={handleClick}
      aria-label="回到置頂"
      title="回到置頂"
    >
      <IconChevronUp />
    </button>
  )
}
