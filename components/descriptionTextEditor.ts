import { expect, Locator, Page } from "@playwright/test";

export class DescriptionTextEditor {
    private readonly page: Page;
    private readonly textToolbar: Locator;
    constructor(page: Page) {
        this.page = page;
        this.textToolbar = page.locator('.akEditor');
    }

    async expectVisible(): Promise<void> {
        await expect(this.textToolbar).toBeVisible();
    }

    async expectNotVisible(): Promise<void> {
        await expect(this.textToolbar).not.toBeVisible();
    }

    async enterDescription(description: string): Promise<void> {
        await this.textToolbar.getByRole('textbox', { name: 'Description' }).fill(description);
    }

    async clickCancelButton(): Promise<void> {
        await this.page.getByTestId('description-cancel-button').click();
    }

    async clickSaveButton(): Promise<void> {
        await this.page.getByTestId('description-save-button').click();
    }
}