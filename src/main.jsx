import { StrictMode } from "react"
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import App from "./App.jsx"
import { PageProvider } from "./contexts/PageContext.jsx"
import { TicketsProvider } from "./contexts/TicketsContext.jsx"
import { ClientsProvider } from "./contexts/ClientsContext.jsx"
import { AuthProvider } from './contexts/AuthContext.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PageProvider>
          <TicketsProvider>
            <ClientsProvider>
              <App />
            </ClientsProvider>
          </TicketsProvider>
        </PageProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
