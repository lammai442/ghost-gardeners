interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // Lägg till fler VITE_*-variabler här om du behöver
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}