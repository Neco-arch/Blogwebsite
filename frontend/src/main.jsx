import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Blog from './components/blog.jsx'
import SpecificBlog from './components/blogpage.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/sign_up.jsx'
import Login from './components/login.jsx'
import Dashboard from './components/admincomponents/Dashboard.jsx'
import NavBar from './components/topbar.jsx'
import dotenv from 'dotenv';
import Logout from './components/logout.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<NavBar/>}>
        <Route path='/' element={<Blog />} />
        <Route path='/blogpanel' element={<Dashboard/>}></Route>
        <Route path='/blog/:postid' element={<SpecificBlog/>}></Route>
        </Route>                            
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/logout' element={<Logout/>}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);