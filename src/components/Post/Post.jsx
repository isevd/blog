import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { formattedDate } from '../../utils/utils'
import { Link, useNavigate } from 'react-router-dom'
import { Popconfirm } from 'antd'

import classNames from 'classnames'
import ReactMarkdown from 'react-markdown'

import Favorite from '../Favorite/Favorite'

import defaultAvatar from '../../assets/avatar.png'

import style from './post.module.css'

let key = 0

const Post = ({
  slug,
  title,
  tagList,
  favorited,
  favoritesCount,
  authorName,
  avatar,
  createdAt,
  description,
  body,
  showBtn,
  onFavorite,
}) => {
  const [deleting, setDeleting] = useState(false)
  const navigate = useNavigate()
  const token = useSelector((state) => state.user.user.token)

  useEffect(() => {
    async function fetchDelete() {
      const res = await fetch(
        `https://blog.kata.academy/api/articles/${slug}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      if (res.ok) {
        navigate('/')
      }
    }

    if (deleting) {
      fetchDelete()
    }
  }, [deleting, navigate, slug, token])

  const tags = tagList.map((tag) => <span key={key++}>{tag}</span>)

  const btn = (
    <div className={style['right-block-second-floor']}>
      <Popconfirm
        placement="rightTop"
        title="Are you sure to delete this article?"
        onConfirm={() => setDeleting(true)}
        okText="Yes"
        cancelText="No"
      >
        <button
          type="button"
          className={classNames(style.btn, style['btn-delete'])}
        >
          Delete
        </button>
      </Popconfirm>
      <Link to={`/articles/${slug}/edit`}>
        <button
          type="button"
          className={classNames(style.btn, style['btn-edit'])}
        >
          Edit
        </button>
      </Link>
    </div>
  )

  return (
    <article className={style.container}>
      <div className={style.header}>
        <div className={style['left-block']}>
          <div className={style['title-group']}>
            <h2 className={style.title}>
              <Link to={`/articles/${slug}`}>
                {title.length > 0 ? title : 'no-title'}
              </Link>
            </h2>
            <Favorite
              favorited={favorited}
              favoritesCount={favoritesCount}
              onFavorite={onFavorite}
              slug={slug}
            />
          </div>
          <div className={style.tag}>{tags}</div>
          <div className={style.text}>
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
        </div>
        <div className={style['right-block']}>
          <div className={style['right-block-first-floor']}>
            <div className={style['author-date-block']}>
              <span className={style['author-name']}>{authorName}</span>
              <span className={style.date}>{formattedDate(createdAt)}</span>
            </div>
            <div className={style['user-avatar']}>
              <img
                src={avatar}
                alt="user's avatar"
                onError={(e) => {
                  e.target.src = defaultAvatar
                }}
              />
            </div>
          </div>
          {showBtn && btn}
        </div>
      </div>
      <ReactMarkdown>{body}</ReactMarkdown>
    </article>
  )
}

export default Post
