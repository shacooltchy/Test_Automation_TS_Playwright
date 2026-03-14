export const ENV = {
    baseUrl: process.env.BASE_URL ?? 'https://trello.com', // use it in playwright.config.ts
    //apiUrl: process.env.API_URL ?? 'https://api.trello.com',
    email: process.env.ADMIN_EMAIL ?? '',
    password: process.env.ADMIN_PASSWORD ?? '',
    //debug: process.env.DEBUG === 'true',
    //environment: process.env.ENV ?? 'local'
};