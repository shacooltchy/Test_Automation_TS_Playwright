import { expect, Locator, Page } from "@playwright/test";

export class CreateCardDialog {
    private readonly dialog: Locator;

    constructor(page: Page) {
        this.dialog = page.getByRole('dialog').filter({ has: page.getByRole('heading', { name: 'Create card', exact: true }) });
    }
    
    async expectVisible(): Promise<void> {
        await expect(this.dialog).toBeVisible();
    }

    async expectNotVisible(): Promise<void> {
        await expect(this.dialog).not.toBeVisible();
    }

    async clickCreateCardButton(): Promise<void> {
        await this.dialog.getByRole('button', {name: 'Create card'}).click();
    }
}