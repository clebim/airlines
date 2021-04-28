declare namespace NodeJS {
  export interface ProcessEnv {
    APP_API_URL?: string;
    APP_WEB_URL?: string;
    NODE_ENV?: string;
    PORT?: string;
    APP_SECRET?: string;
    EXPIRES_IN?: string;
    MAIL_DRIVER?: string;
    STORAGE_DRIVER?: string;
    POSTGRES_HOST?: string;
    POSTGRES_USER?: string;
    POSTGRES_PASS?: string;
    POSTGRES_NAME?: string;
    MONGO_HOST?: string;
    MONGO_USER?: string;
    MONGO_PASS?: string;
    MONGO_NAME?: string;
    REDIS_HOST?: string;
    REDIS_PORT?: string;
    REDIS_PASS?: string;
    AWS_ACCESS_KEY_ID?: string;
    AWS_SECRET_ACCESS_KEY?: string;
    MAIL_HOST?: string;
    MAIL_PORT?: number;
    MAIL_USER?: number;
    MAIL_PASSWORD?: string;
  }
}
