import { useState, useEffect, useCallback, useRef } from 'react'

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

  const leftWidthRef = useRef(leftWidth)
  const rightWidthRef = useRef(rightWidth)
  useEffect(() => { leftWidthRef.current = leftWidth }, [leftWidth])
  useEffect(() => { rightWidthRef.current = rightWidth }, [rightWidth])

  useEffect(() => {
    const p = _loadPrefs()
    if (p) {
      setLeftWidth(p.leftWidth)
      setRightWidth(p.rightWidth)
      setLeftCollapsed(p.leftCollapsed)
      setRightCollapsed(p.rightCollapsed)
    }
  }, [])

  // Debounce 300ms：拖曳過程中不會每毫秒都寫 localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      _savePrefs({ leftWidth, rightWidth, leftCollapsed, rightCollapsed })
    }, 300)
    return () => clearTimeout(timer)
  }, [leftWidth, rightWidth, leftCollapsed, rightCollapsed])

  const closeOverlay = useCallback(() => {
    setLeftOpen(false)
    setRightOpen(false)
  }, [])

  const startResizeLeft = useCallback(
    _createResizeHandler(() => leftWidthRef.current, setLeftWidth, 'left'),
    []
  )

  const startResizeRight = useCallback(
    _createResizeHandler(() => rightWidthRef.current, setRightWidth, 'right'),
    []
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
