import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'blog-sidebar-prefs'
const MIN_SIDEBAR = 160
const MAX_SIDEBAR = 420
const COLLAPSED_WIDTH = 48
const DEFAULT_LEFT = 220
const DEFAULT_RIGHT = 260

function _loadPrefs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const p = JSON.parse(raw)
    return {
      leftWidth: Math.min(MAX_SIDEBAR, Math.max(MIN_SIDEBAR, Number(p.leftWidth) || DEFAULT_LEFT)),
      rightWidth: Math.min(MAX_SIDEBAR, Math.max(MIN_SIDEBAR, Number(p.rightWidth) || DEFAULT_RIGHT)),
      leftCollapsed: Boolean(p.leftCollapsed),
      rightCollapsed: Boolean(p.rightCollapsed)
    }
  } catch {
    return null
  }
}

function _savePrefs(prefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
  } catch {}
}

function _createResizeHandler(getWidth, setWidth, direction) {
  return (e) => {
    e.preventDefault()
    const startX = e.clientX
    const startW = getWidth()
    const onMove = (e2) => {
      const dx = direction === 'left' ? e2.clientX - startX : startX - e2.clientX
      setWidth(Math.min(MAX_SIDEBAR, Math.max(MIN_SIDEBAR, startW + dx)))
    }
    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }
}

export function useSidebarState() {
  const [leftOpen, setLeftOpen] = useState(false)
  const [rightOpen, setRightOpen] = useState(false)
  const [leftWidth, setLeftWidth] = useState(DEFAULT_LEFT)
  const [rightWidth, setRightWidth] = useState(DEFAULT_RIGHT)
  const [leftCollapsed, setLeftCollapsed] = useState(false)
  const [rightCollapsed, setRightCollapsed] = useState(false)

  useEffect(() => {
    const p = _loadPrefs()
    if (p) {
      setLeftWidth(p.leftWidth)
      setRightWidth(p.rightWidth)
      setLeftCollapsed(p.leftCollapsed)
      setRightCollapsed(p.rightCollapsed)
    }
  }, [])

  useEffect(() => {
    _savePrefs({ leftWidth, rightWidth, leftCollapsed, rightCollapsed })
  }, [leftWidth, rightWidth, leftCollapsed, rightCollapsed])

  const closeOverlay = useCallback(() => {
    setLeftOpen(false)
    setRightOpen(false)
  }, [])

  const startResizeLeft = useCallback(
    _createResizeHandler(() => leftWidth, setLeftWidth, 'left'),
    [leftWidth]
  )

  const startResizeRight = useCallback(
    _createResizeHandler(() => rightWidth, setRightWidth, 'right'),
    [rightWidth]
  )

  const leftW = leftCollapsed ? COLLAPSED_WIDTH : leftWidth
  const rightW = rightCollapsed ? COLLAPSED_WIDTH : rightWidth

  return {
    leftOpen, setLeftOpen,
    rightOpen, setRightOpen,
    leftCollapsed, setLeftCollapsed,
    rightCollapsed, setRightCollapsed,
    leftW,
    rightW,
    closeOverlay,
    startResizeLeft,
    startResizeRight,
  }
}
