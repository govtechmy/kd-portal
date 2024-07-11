declare namespace NodeJS {
  export interface ProcessEnv {
    APP_ENV: string;
    APP_URL: string;
    REVALIDATE_TOKEN: string;
    AUTH_TOKEN: string;
    GOOGLE_API_KEY: string;
    LAST_UPDATED: string;
  }
}
