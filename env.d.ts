declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        NEXT_PUBLIC_APP_URL: string;
        AUTH_SECRET: string;
        SENDER_GMAIL: string;
        SENDER_GMAIL_PASS: string;
        NEXT_PUBLIC_RECAPTCHA_SITE_KEY: string;
        RECAPTCHA_SECRET_KEY: string;
    }
}