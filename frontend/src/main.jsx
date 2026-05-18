import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Blog from './components/blog.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Blog></Blog>
  </StrictMode>,
)
