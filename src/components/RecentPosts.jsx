import { Link } from 'react-router-dom'
import { getAllPosts } from '../lib/posts'
import './RecentPosts.css'

const RECENT_COUNT = 5

export default function RecentPosts() {
  const posts = getAllPosts().slice(0, RECENT_COUNT)

  return (
    <div className="recent-posts">
      <h2 className="recent-posts__title">最近文章</h2>
      {posts.length === 0 ? (
        <p className="recent-posts__empty">尚未有貼文</p>
      ) : (
        <ul className="recent-posts__list">
          {posts.map((p) => (
            <li key={p.slug} className="recent-posts__item">
              <Link to={`/post/${p.slug}`} className="recent-posts__link">
                {p.title}
              </Link>
              <span className="recent-posts__date">{p.date}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
