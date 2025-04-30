import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Set document title and meta tags
document.title = 'Saumya - Calm Corner ✨'
document.querySelector('meta[name="viewport"]')?.setAttribute('content', 'width=device-width, initial-scale=1')
document.querySelector('meta[charset="UTF-8"]')?.setAttribute('charset', 'UTF-8')

// Add Poppins font
const link = document.createElement('link')
link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap'
link.rel = 'stylesheet'
document.head.appendChild(link)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
