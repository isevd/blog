import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

import {
  HOME_PATH,
  ARTICLES_PATH,
  ARTICLE_PATH,
  EDIT_ARTICLE_PATH,
  NEW_ARTICLE_PATH,
  SIGN_UP_PATH,
  SIGN_IN_PATH,
  PROFILE_PATH,
  NOT_FOUND_PATH,
} from '../src/utils/paths'

import Layout from './components/Layout/Layout'
import Posts from './pages/Posts'
import Post from './pages/Post'
import EditPost from './pages/EditArticle'
import CreateNewArticle from './pages/NewArticle'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={HOME_PATH} element={<Layout />}>
      <Route index element={<Posts />} />
      <Route path={ARTICLES_PATH} element={<Posts />} />
      <Route path={ARTICLE_PATH} element={<Post />} />
      <Route path={EDIT_ARTICLE_PATH} element={<EditPost />} />
      <Route path={NEW_ARTICLE_PATH} element={<CreateNewArticle />} />
      <Route path={SIGN_UP_PATH} element={<SignUp />} />
      <Route path={SIGN_IN_PATH} element={<SignIn />} />
      <Route path={PROFILE_PATH} element={<Profile />} />
      <Route
        path={NOT_FOUND_PATH}
        element={<h1 style={{ textAlign: 'center' }}>Page 404</h1>}
      />
    </Route>
  )
)

export default function App() {
  return <RouterProvider router={router} />
}
