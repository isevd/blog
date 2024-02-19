import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { message } from 'antd'

import defaultAvatar from '../../assets/avatar.png'

import style from './headerUserInfo.module.css'

const HeaderUserInfo = ({ user, logout }) => {
  return (
    <div className={style['user-info']}>
      <Link to="/new-article">
        <div className={style['create-article']}>Create article</div>
      </Link>
      <div>
        <Link to="/profile">
          <span className={style['author-name']}>{user.username}</span>
        </Link>
      </div>
      <div className={style['user-avatar']}>
        <Link to="/profile">
          <img
            src={user.image || defaultAvatar}
            alt="user's avatar"
            onError={(e) => {
              e.target.src = defaultAvatar
            }}
          />
        </Link>
      </div>
      <button
        type="button"
        className={classNames(style.btn, style['btn-log-out'])}
        onClick={() => {
          logout()
          localStorage.removeItem('user')
          message.info('Logout success')
        }}
      >
        Log Out
      </button>
    </div>
  )
}

export default HeaderUserInfo
