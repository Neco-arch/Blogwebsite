import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Blog from './components/blog.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>                                        
        <Route path='/' element={<Blog />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);