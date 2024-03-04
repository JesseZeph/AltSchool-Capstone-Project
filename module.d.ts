declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    jwtSecret: string;
    jwtRefreshToken: string;
  }
}
