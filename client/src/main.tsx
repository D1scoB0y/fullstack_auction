import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { UserProvider } from './context/UserContext.tsx'
import { HelmetProvider } from 'react-helmet-async'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './assets/globals.css'
import { SnackbarProvider } from './context/SnackbarContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}
    >
        <HelmetProvider>
            <UserProvider>
                <SnackbarProvider>
                    <App />
                </SnackbarProvider>
            </UserProvider>
        </HelmetProvider>
    </GoogleOAuthProvider>,
)
