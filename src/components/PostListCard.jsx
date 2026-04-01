/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { getCategoryAccent } from '../lib/postListCategoryAccent'

export default function PostListCard({ post }) {
  return (
    <li className="home__list-item">
      <Link
        to={`/post/${post.slug}`}
        className={`home__list-link${post.image ? ' home__list-link--thumb' : ''}`}
        style={{ '--card-accent': getCategoryAccent(post.category) }}
      >
        {post.image && (
          <span className="home__list-thumb-wrap" aria-hidden="true">
            <img src={post.image} alt="" className="home__list-thumb" loading="lazy" decoding="async" />
          </span>
        )}
        <span className="home__list-text">
          <span className="home__list-title">{post.title}</span>
          <span className="home__list-meta">
            {post.date} {post.category && `· ${post.category}`}
          </span>
          {post.tags && post.tags.length > 0 && (
            <span className="home__list-tags">
              {post.tags.map((t) => (
                <span key={t} className="home__list-tag">
                  {t}
                </span>
              ))}
            </span>
          )}
          {post.excerpt && <p className="home__list-excerpt">{post.excerpt}</p>}
        </span>
        <span className="home__list-bar" aria-hidden="true" />
      </Link>
    </li>
  )
}
