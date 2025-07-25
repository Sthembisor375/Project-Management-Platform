import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { PageProvider } from './contexts/PageContext.jsx'
import { TicketsProvider } from './contexts/TicketsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PageProvider>
        <TicketsProvider>
          <App />
        </TicketsProvider>
      </PageProvider>
    </BrowserRouter>
  </StrictMode>,
)
