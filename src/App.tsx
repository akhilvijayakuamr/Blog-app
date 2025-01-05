import React from 'react'
import Login from './component/User/Login/Login'
import UserHome from './component/User/Home/UserHome'
import PostView from './component/User/PostView/PostView'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Verify from './component/User/Verification/Verify'
import CreatePost from './component/User/Post/CreatePost'
import UpdatePost from './component/User/Home/UpdatePost/UpdatePost'
import PublicRoute from './Route/PublicRoute'
import PrivateRoute from './Route/PrivateRoute'



const App: React.FC = () => {


  return (
    <Router>
      <Routes>
      
        <Route element={<PublicRoute />}>
          <Route path='/' element={<Login />} />
          <Route path='/verify' element={<Verify />} />
        </Route>

        <Route element={<PrivateRoute/>}>
          <Route path='/home' element={<UserHome />} />
          <Route path='/post' element={<PostView />} />
          <Route path='/createPost' element={<CreatePost />} />
          <Route path='/updatePost' element={<UpdatePost />} />
        </Route>

      </Routes>
    </Router>
  )
}

export default App
