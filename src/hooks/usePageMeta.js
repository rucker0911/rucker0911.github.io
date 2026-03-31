import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE_NAME = '曹同和'
const SITE_URL = 'https://rucker0911.github.io'
const DEFAULT_DESCRIPTION = '曹同和的個人技術部落格，專注於 Python 後端、IoT Edge 應用、智慧交通系統與異質協定整合。'
const DEFAULT_OG_IMAGE = `${SITE_URL}/my_image.jpg`

function _absoluteShareImage(url) {
  const raw = url != null && String(url).trim()
  if (!raw) return DEFAULT_OG_IMAGE
  const s = String(url).trim()
  if (/^https?:\/\//i.test(s)) return s
  if (s.startsWith('/')) return `${SITE_URL}${s}`
  return `${SITE_URL}/${s.replace(/^\/+/, '')}`
}

function _setMetaContent(name, content, attr = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function _setCanonical(url) {
  let el = document.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', url)
}

export function usePageMeta({ title, description, image } = {}) {
  const { pathname } = useLocation()

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Python 後端 & IoT 開發`
    const desc = description || DEFAULT_DESCRIPTION
    const url = `${SITE_URL}${pathname}`
    const ogImage = _absoluteShareImage(image)

    document.title = fullTitle
    _setMetaContent('description', desc)
    _setMetaContent('og:title', fullTitle, 'property')
    _setMetaContent('og:description', desc, 'property')
    _setMetaContent('og:url', url, 'property')
    _setMetaContent('og:image', ogImage, 'property')
    _setMetaContent('twitter:title', fullTitle)
    _setMetaContent('twitter:description', desc)
    _setMetaContent('twitter:image', ogImage)
    _setCanonical(url)
  }, [title, description, image, pathname])
}
