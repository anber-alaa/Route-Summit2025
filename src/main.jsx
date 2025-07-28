import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Supports weights 100-900
import '@fontsource-variable/outfit';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>,
)
