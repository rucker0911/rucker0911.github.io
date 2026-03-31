import { useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { getPostBySlug } from '../lib/posts'
import { usePageMeta } from '../hooks/usePageMeta'
import './PostPage.css'

export default function PostPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const post = slug ? getPostBySlug(slug) : null

  usePageMeta({
    title: post?.title,
    description: post?.excerpt || undefined,
    image: post?.image || undefined,
  })

  const handleBack = useCallback(() => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/posts')
    }
  }, [navigate])

  if (!post) {
    return (
      <div className="post-page">
        <p className="post-page__not-found">找不到該文章</p>
        <button type="button" className="post-page__back" onClick={handleBack}>← 返回</button>
      </div>
    )
  }

  return (
    <article className="post-page">
      <button type="button" className="post-page__back" onClick={handleBack}>← 返回</button>
      {post.image && (
        <div className="post-page__cover">
          <img src={post.image} alt="" className="post-page__cover-img" decoding="async" loading="eager" />
        </div>
      )}
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
