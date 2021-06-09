declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    TEST_DATABASE_URL: string;
    REDIS_URL: string;
    PORT: string;
    SECRET: string;
    CORS_ORIGIN: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    CLOUDINARY_NAME: string;
    AWS_DATABASE_URL: string;
    S3_BUCKET_NAME: string;
    CLOUDFRONT_API_ENDPOINT: string;
    CF_DOMAIN_NAME: string;
  }
}