/// <reference types="vite/client" />

declare module "*.module.css";

interface ImportMetaEnv {
    readonly VITE_GOOGLE_OAUTH_CLIENT_ID: string
    readonly VITE_GOOGLE_RECAPTCHA_KEY_ID: string
    readonly VITE_BACKEND_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
