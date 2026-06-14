import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const root = document.getElementById('root')

// If the markup was pre-rendered (SSG), hydrate it; otherwise mount fresh.
if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    root,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
