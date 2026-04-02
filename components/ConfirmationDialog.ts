import { expect, Locator, Page } from "@playwright/test";

export class ConfirmationDialog {
    private readonly page: Page;
    private readonly dialog: Locator;
    private readonly confirmButtonName: string;

    constructor(page: Page, dialogTitle: string, confirmButtonName: string) {
        this.page = page;
        this.dialog = this.page.getByRole('dialog').getByRole('heading', { name: dialogTitle, exact: true }).locator('..').locator('..');
        this.confirmButtonName = confirmButtonName;
    }

    async expectDialogToBeVisible(): Promise<void> {
        await expect(this.dialog).toBeVisible();
    }

    async clickConfirmButton(): Promise<void> {
        await this.dialog.getByRole('button', { name: this.confirmButtonName, exact: true }).click();
    }
}