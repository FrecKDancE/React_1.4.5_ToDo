import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App/App.jsx'

createRoot(document.getElementById('todoapp')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
