declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_HOST: string;
      APP_PORT: number;
      FRONT_URL: string;
      DB_USER: string;
      DB_PASS: string;
      DB_NAME: string;
      DB_HOST: string;
      DB_PORT: number;
      DB_DIALECT: string;
    }
  }
}

export { __global };
