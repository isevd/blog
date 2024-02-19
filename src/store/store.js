import { configureStore } from '@reduxjs/toolkit'

import postsListReducer from './postsSlice'
import userReducer from './userSlice'
import articleReducer from './articleSlice'

export default configureStore({
  reducer: {
    postsList: postsListReducer,
    article: articleReducer,
    user: userReducer,
  },
})
