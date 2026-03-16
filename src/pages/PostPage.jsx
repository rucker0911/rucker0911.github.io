import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { getPostBySlug } from '../lib/posts'
import './PostPage.css'

export default function PostPage() {
  const { slug } = useParams()
  const post = slug ? getPostBySlug(slug) : null

  if (!post) {
    return (
      <div className="post-page">
        <p className="post-page__not-found">找不到該文章</p>
        <Link to="/" className="post-page__back">← 回首頁</Link>
      </div>
    )
  }

  return (
    <article className="post-page">
      <Link to="/" className="post-page__back">← 回首頁</Link>
      <header className="post-page__header">
        <h1 className="post-page__title">{post.title}</h1>
        <div className="post-page__meta">
          {post.date && <span>{post.date}</span>}
          {post.category && <span>{post.category}</span>}
          {post.tags.length > 0 && (
            <span className="post-page__tags">
              {post.tags.map((t) => (
                <span key={t} className="post-page__tag">{t}</span>
              ))}
            </span>
          )}
        </div>
      </header>
      <div className="post-page__body">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>
    </article>
  )
}
