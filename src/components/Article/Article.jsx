import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { message } from 'antd'
import { fetchArticle } from '../../store/articleSlice'
import Post from '../Post'

import style from './article.module.css'

const Article = () => {
  const { slug } = useParams()

  const dispatch = useDispatch()

  const article = useSelector((state) => state.article.article)
  const userName = useSelector((state) => state.user.user.username)
  const status = useSelector((state) => state.article.status)
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  const token = useSelector((state) => state.user.user.token)
  const error = useSelector((state) => state.article.error)

  useEffect(() => {
    const dataForm = {
      resource: `articles/${slug}`,
      method: 'GET',
      token,
    }
    dispatch(fetchArticle(dataForm))
  }, [dispatch, slug, token])

  const onFavorite = (slugPath, method) => {
    if (isLoggedIn) {
      const dataForm = {
        resource: `articles/${slugPath}/favorite`,
        method,
        token,
      }
      dispatch(fetchArticle(dataForm))
    }
  }

  let content

  if (status === 'succeeded') {
    content = (
      <div className={style.container}>
        <Post
          key={article.slug}
          slug={article.slug}
          title={article.title}
          tagList={article.tagList}
          favorited={article.favorited}
          favoritesCount={article.favoritesCount}
          authorName={article.author.username}
          avatar={article.author.image}
          createdAt={article.createdAt}
          updatedAt={article.updatedAt}
          description={article.description}
          body={article.body}
          showBtn={userName === article.author.username}
          onFavorite={onFavorite}
        />
      </div>
    )
  } else if (status === 'failed') {
    message.error(error)
  }

  return content
}

export default Article
