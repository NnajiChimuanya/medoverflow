export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      mongo_uri: string;
    }
  }
}
