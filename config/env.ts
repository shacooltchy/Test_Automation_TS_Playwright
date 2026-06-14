import dotenv from 'dotenv';
dotenv.config();

function requireEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}

export const ENV = {
    baseUrl: requireEnv('BASE_URL'),
    email: requireEnv('EMAIL'),
    password: requireEnv('PASSWORD'),
    apiUrl: requireEnv('API_URL'),
    apiKey: requireEnv('TRELLO_KEY'),
    apiToken: requireEnv('TRELLO_TOKEN')
};