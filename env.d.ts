declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URI: string;
    PAYLOAD_SECRET: string;

    APP_URL: string;
    AUTH_TOKEN: string;
    APP_ENV: string;

    REVALIDATE_TOKEN: string;
    GOOGLE_API_KEY: string;
    S3_BUCKET: string;
    S3_ACCESS_KEY_ID: string;
    S3_SECRET_ACCESS_KEY: string;
    S3_REGION: string;
    LAST_UPDATED: string;
  }
}
