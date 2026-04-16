import { expect, Locator, Page } from "@playwright/test";

export class cookieBanner {
    private readonly cookieBanner: Locator;

    constructor(page: Page) {
        this.cookieBanner = page.getByLabel('Cookie banner');
    }

    async close(): Promise<void> {
        await this.cookieBanner.waitFor({state: 'visible', timeout: 5000});
        await this.cookieBanner.getByRole('button', {name: 'Close'}).click();
        await expect(this.cookieBanner).not.toBeVisible();
    }
}