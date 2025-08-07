import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initAllAnimations } from './utils/animations.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Initialize modern animations after React mounts
setTimeout(() => {
  initAllAnimations();
}, 100);
