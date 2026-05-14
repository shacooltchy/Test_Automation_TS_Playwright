import { expect, Locator, Page } from "@playwright/test";

export class DescriptionTextEditor {
    private readonly textToolbar: Locator;
    readonly cancelButton: Locator;
    readonly saveButton: Locator

    constructor(page: Page) {
        this.textToolbar = page.locator('.akEditor');
        this.cancelButton = page.getByTestId('description-cancel-button');
        this.saveButton = page.getByTestId('description-save-button');
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
}