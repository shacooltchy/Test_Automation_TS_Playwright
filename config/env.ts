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
    email: requireEnv('EMAIL'),
    password: requireEnv('PASSWORD'),
    apiUrl: requireEnv('API_URL'),
    apiKey: requireEnv('TRELLO_KEY'),
    apiToken: requireEnv('TRELLO_TOKEN')
    //debug: process.env.DEBUG === 'true',
    //environment: process.env.ENV ?? 'local'
};