import { StrictMode } from "react"
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import App from "./App.jsx"
import { PageProvider } from "./contexts/PageContext.jsx"
import { TicketsProvider } from "./contexts/TicketsContext.jsx"
import { ClientsProvider } from "./contexts/ClientsContext.jsx"
import { UsersProvider } from "./contexts/UsersContext.jsx"
import { AuthProvider } from './contexts/AuthContext.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PageProvider>
          <TicketsProvider>
            <ClientsProvider>
              <UsersProvider>
                <App />
              </UsersProvider>
            </ClientsProvider>
          </TicketsProvider>
        </PageProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
