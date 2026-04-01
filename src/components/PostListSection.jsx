import { useState, useMemo } from 'react'
import { getAllPosts, getCategories, getTags } from '../lib/posts'
import { TAB_ALL, TAB_CATEGORY, TAB_TAG, VIEW_LIST, VIEW_GRID } from '../lib/postListConstants'
import PostListToolbar from './PostListToolbar'
import PostListCard from './PostListCard'
import './PostListSection.css'

export default function PostListSection() {
  const allPosts = useMemo(() => getAllPosts(), [])
  const categories = useMemo(() => getCategories(allPosts), [allPosts])
  const tags = useMemo(() => getTags(allPosts), [allPosts])

  const [search, setSearch] = useState('')
  const [tab, setTab] = useState(TAB_ALL)
  const [categoryFilter, setCategoryFilter] = useState('')
  const [tagFilter, setTagFilter] = useState('')
  const [viewMode, setViewMode] = useState(VIEW_LIST)

  const filteredPosts = useMemo(() => {
    let list = allPosts
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      list = list.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.excerpt?.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q))) ||
          (p.category && p.category.toLowerCase().includes(q))
      )
    }
    if (tab === TAB_CATEGORY && categoryFilter) {
      list = list.filter((p) => p.category === categoryFilter)
    }
    if (tab === TAB_TAG && tagFilter) {
      list = list.filter((p) => p.tags && p.tags.includes(tagFilter))
    }
    return list
  }, [allPosts, search, tab, categoryFilter, tagFilter])

  return (
    <section className="home__posts">
      <PostListToolbar
        search={search}
        onSearchChange={setSearch}
        tab={tab}
        onTabChange={setTab}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        tagFilter={tagFilter}
        onTagFilterChange={setTagFilter}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        categories={categories}
        tags={tags}
      />

      <ul className={`home__list ${viewMode === VIEW_GRID ? 'home__list--grid' : ''}`}>
        {filteredPosts.map((post) => (
          <PostListCard key={post.slug} post={post} />
        ))}
      </ul>
      {filteredPosts.length === 0 && <p className="home__empty">沒有符合的文章</p>}
    </section>
  )
}
