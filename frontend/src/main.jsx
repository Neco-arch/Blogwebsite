import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Blog from './components/blog.jsx'
import SpecificBlog from './components/blogpage.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/sign_up.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>                                        
        <Route path='/' element={<Blog />} />
        <Route path='/blog/:postid' element={<SpecificBlog/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);