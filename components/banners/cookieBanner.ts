import { expect, Locator, Page } from "@playwright/test";

export class cookieBanner {
    private readonly cookieBanner: Locator;

    constructor(page: Page) {
        this.cookieBanner = page.getByLabel('Cookie banner');
    }

    async close(): Promise<void> {
        try {
        await this.cookieBanner.waitFor({state: 'visible', timeout: 1500});
        await this.cookieBanner.getByRole('button', {name: 'Close'}).click();
        await expect(this.cookieBanner).not.toBeVisible();
        } catch {
            //Cookie banner not found, skipping close step.
        }
    }
}