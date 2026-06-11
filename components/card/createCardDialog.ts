import { expect, Locator, Page } from "@playwright/test";

export class CreateCardDialog {
    private readonly dialog: Locator;
    readonly createCardButton: Locator;

    constructor(page: Page) {
        this.dialog = page.getByRole('dialog').filter({ has: page.getByRole('heading', { name: 'Create card', exact: true }) });
        this.createCardButton = this.dialog.getByRole('button', { name: 'Create card' });
    }
    
    async expectVisible(): Promise<void> {
        await expect(this.dialog).toBeVisible();
    }

    async expectNotVisible(): Promise<void> {
        await expect(this.dialog).not.toBeVisible();
    }
}