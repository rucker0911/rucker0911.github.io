/* eslint-disable react/prop-types */
import {
  TAB_ALL,
  TAB_CATEGORY,
  TAB_TAG,
  VIEW_LIST,
  VIEW_GRID,
  TAG_FILTER_DISPLAY_LIMIT,
} from '../lib/postListConstants'

export default function PostListToolbar({
  search,
  onSearchChange,
  tab,
  onTabChange,
  categoryFilter,
  onCategoryFilterChange,
  tagFilter,
  onTagFilterChange,
  viewMode,
  onViewModeChange,
  categories,
  tags,
}) {
  return (
    <div className="home__toolbar">
      <div className="home__search-wrap">
        <span className="home__search-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </span>
        <input
          type="search"
          className="home__search"
          placeholder="搜尋文章、標籤…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="搜尋文章"
        />
      </div>
      <div className="home__toolbar-row">
        <div className="home__tabs">
          <button type="button" className={`home__tab ${tab === TAB_ALL ? 'is-active' : ''}`} onClick={() => onTabChange(TAB_ALL)}>
            全部
          </button>
          <button type="button" className={`home__tab ${tab === TAB_CATEGORY ? 'is-active' : ''}`} onClick={() => onTabChange(TAB_CATEGORY)}>
            分類
          </button>
          <button type="button" className={`home__tab ${tab === TAB_TAG ? 'is-active' : ''}`} onClick={() => onTabChange(TAB_TAG)}>
            標籤
          </button>
        </div>
        <div className="home__view-mode" aria-label="文章檢視方式">
          <button
            type="button"
            className={`home__view-btn ${viewMode === VIEW_LIST ? 'is-active' : ''}`}
            onClick={() => onViewModeChange(VIEW_LIST)}
            title="列表"
            aria-label="列表檢視"
            aria-pressed={viewMode === VIEW_LIST}
          >
            <svg className="home__view-icon" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
              <rect x="1" y="1" width="22" height="3" rx="0.5" />
              <rect x="1" y="6" width="22" height="3" rx="0.5" />
              <rect x="1" y="11" width="22" height="3" rx="0.5" />
            </svg>
          </button>
          <button
            type="button"
            className={`home__view-btn ${viewMode === VIEW_GRID ? 'is-active' : ''}`}
            onClick={() => onViewModeChange(VIEW_GRID)}
            title="網格併排"
            aria-label="網格檢視"
            aria-pressed={viewMode === VIEW_GRID}
          >
            <svg className="home__view-icon" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
              <rect x="1" y="1" width="10" height="6" rx="0.5" />
              <rect x="13" y="1" width="10" height="6" rx="0.5" />
              <rect x="1" y="9" width="10" height="6" rx="0.5" />
              <rect x="13" y="9" width="10" height="6" rx="0.5" />
            </svg>
          </button>
        </div>
      </div>
      {tab === TAB_CATEGORY && categories.length > 0 && (
        <div className="home__filters">
          <button type="button" className={`home__filter-btn ${!categoryFilter ? 'is-active' : ''}`} onClick={() => onCategoryFilterChange('')}>
            全部
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={`home__filter-btn ${categoryFilter === c ? 'is-active' : ''}`}
              onClick={() => onCategoryFilterChange(c)}
            >
              {c}
            </button>
          ))}
        </div>
      )}
      {tab === TAB_TAG && tags.length > 0 && (
        <div className="home__filters">
          <button type="button" className={`home__filter-btn ${!tagFilter ? 'is-active' : ''}`} onClick={() => onTagFilterChange('')}>
            全部
          </button>
          {tags.slice(0, TAG_FILTER_DISPLAY_LIMIT).map((t) => (
            <button
              key={t}
              type="button"
              className={`home__filter-btn ${tagFilter === t ? 'is-active' : ''}`}
              onClick={() => onTagFilterChange(t)}
            >
              {t}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
