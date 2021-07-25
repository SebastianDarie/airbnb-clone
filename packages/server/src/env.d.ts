declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    REDIS_URL: string;
    PORT: string;
    SECRET: string;
    CORS_ORIGIN: string;
    S3_BUCKET_NAME: string;
    CLOUDFRONT_API_ENDPOINT: string;
    CF_DOMAIN_NAME: string;
    STRIPE_API_KEY: string;
  }
}