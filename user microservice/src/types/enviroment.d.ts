export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      mongo_uri: string;
      email: string;
      email_password: string;
    }
  }
}
