/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_LAYER: "mock" | "fake" | "real";
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
