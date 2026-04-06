/* eslint-disable react/prop-types */

const makeStroke = (strokeWidth) => ({
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
})

const NAV_STROKE    = makeStroke(1.5)
const TOGGLE_STROKE = makeStroke(2)

export function IconNavHome({ size = 16, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...NAV_STROKE} {...rest}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

export function IconNavPosts({ size = 16, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...NAV_STROKE} {...rest}>
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  )
}

export function IconNavProjects({ size = 16, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...NAV_STROKE} {...rest}>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  )
}

export function IconNavAbout({ size = 16, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...NAV_STROKE} {...rest}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

export function IconNavContact({ size = 16, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...NAV_STROKE} {...rest}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

export function IconChevronLeft({ size = 14, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...TOGGLE_STROKE} {...rest}>
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

export function IconChevronRight({ size = 14, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...TOGGLE_STROKE} {...rest}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

export function IconChevronUp({ size = 20, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...TOGGLE_STROKE} {...rest}>
      <path d="M18 15l-6-6-6 6" />
    </svg>
  )
}
