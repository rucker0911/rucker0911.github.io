import { useEffect } from 'react'

const SITE_NAME = '曹同和'
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

export function usePageMeta({ title, description } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Python 後端 & IoT 開發`
    const desc = description || DEFAULT_DESCRIPTION

    document.title = fullTitle
    _setMetaContent('description', desc)
    _setMetaContent('og:title', fullTitle, 'property')
    _setMetaContent('og:description', desc, 'property')
    _setMetaContent('twitter:title', fullTitle)
    _setMetaContent('twitter:description', desc)
  }, [title, description])
}
