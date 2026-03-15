import dotenv from 'dotenv'; // add it to get variables from .env file
dotenv.config();

function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

export const ENV = {
    baseUrl: requireEnv('BASE_URL'), // use it in playwright.config.ts
    //apiUrl: process.env.API_URL ?? 'https://api.trello.com',
    email: requireEnv('EMAIL'),
    password: requireEnv('PASSWORD'),
    //debug: process.env.DEBUG === 'true',
    //environment: process.env.ENV ?? 'local'
};