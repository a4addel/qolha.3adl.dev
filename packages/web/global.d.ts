declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production";
            PORT?: string;
            ALGO_API_ID: string;
            ALOG_SEARCH_ONLY_KEY: string;
            DATABASE_URL: string;
            GOOGLE_CLIENT_ID: string;
            GOOGLE_SECRET: string;
            MAILERSEND: string;
        }
    }
}

export {};
