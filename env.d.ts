declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URI: string;
    PAYLOAD_SECRET: string;

    APP_URL: string;
    AUTH_TOKEN: string;
    APP_ENV: string;

    REVALIDATE_TOKEN: string;
    GOOGLE_API_KEY: string;
    LAST_UPDATED: string;
  }
}
