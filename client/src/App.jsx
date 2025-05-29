import React, { useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home/page"
import MainLayout from './layout/MainLayout'
import OtherLayout from './layout/OtherLayout'
import Login from './pages/Login/page'
import SignUp from './pages/SignUp/page'
import Profile from './pages/Profile/page'
import AllBlogs from './pages/All Blogs/page'
import DashboardProfile from './components/Profile/DashboardProfile'
import Favourites from './components/Profile/Favourites'
import LikedBlogs from './components/Profile/LikedBlogs'
import Description from './pages/Description/Description'
import Categories from './pages/Categories/Categories'
import AdminLogin from './pages/Admin Login/AdminLogin'
import AdminDashboard from './pages/AdminDashboard/page'
import Dashboard from './components/Admin Components/Dashboard/Dashboard'
import AddBlogs from './components/Admin Components/Add Blog/AddBlogs'
import EditBlogs from './components/Admin Components/Edit Blog/EditBlogs'
import UpdateBlog from './components/Admin Components/Edit Blog/Compo/UpdateBlog'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { authActions } from './store/auth'

const App = () => {
  const backendLink = useSelector((state)=>state.prod.link)
  const dispatch = useDispatch()
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${backendLink}/api/v1/check-cookie`, {
        withCredentials:true,
      })
      if(res.data.message === true){
        dispatch(authActions.login())
      }
    }
    fetch()
  },[])
  return (
    <>
    <ToastContainer />
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='/all-blogs' element={<AllBlogs />} />
          <Route path='/description/:id' element={<Description />} />
          <Route path='/cat/:id' element={<Categories />} />
          <Route path='/profile' element={<Profile />}>
            <Route index element={<DashboardProfile />} />
            <Route path='/profile/favourites' element={<Favourites />} />
            {/* <Route path='/profile/liked-blogs' element={<LikedBlogs />} /> */}
          </Route>
        </Route>
        <Route element={<OtherLayout />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/admin-login' element={<AdminLogin />} />
          <Route path='/admin-dashboard' element={<AdminDashboard />} >
            <Route index element={<Dashboard />} />
            <Route path='/admin-dashboard/add-blogs' element={<AddBlogs />} />
            <Route path='/admin-dashboard/edit-blogs' element={<EditBlogs />} />
            <Route path='/admin-dashboard/update-blog/:id' element={<UpdateBlog />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App