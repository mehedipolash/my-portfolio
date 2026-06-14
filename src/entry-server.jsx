import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

// Rendered at build time to inject static HTML into dist/index.html (SEO).
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
