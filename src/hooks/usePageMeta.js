import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE_NAME = '曹同和'
const SITE_URL = 'https://rucker0911.github.io'
const DEFAULT_DESCRIPTION = '曹同和的個人技術部落格，專注於 Python 後端、IoT Edge 應用、智慧交通系統與異質協定整合。'

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

export function usePageMeta({ title, description } = {}) {
  const { pathname } = useLocation()

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Python 後端 & IoT 開發`
    const desc = description || DEFAULT_DESCRIPTION
    const url = `${SITE_URL}${pathname}`

    document.title = fullTitle
    _setMetaContent('description', desc)
    _setMetaContent('og:title', fullTitle, 'property')
    _setMetaContent('og:description', desc, 'property')
    _setMetaContent('og:url', url, 'property')
    _setMetaContent('twitter:title', fullTitle)
    _setMetaContent('twitter:description', desc)
    _setCanonical(url)
  }, [title, description, pathname])
}
