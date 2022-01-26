/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SERVER_PORT: number;
  readonly VITE_APP_TITLE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
