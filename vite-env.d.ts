/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY?: string;
  // Add other environment variables used in your project here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
