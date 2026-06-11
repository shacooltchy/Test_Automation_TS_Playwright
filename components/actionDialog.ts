import { expect, Locator, Page } from "@playwright/test";

export class ActionDialog {
    readonly dialog: Locator;
    readonly actionButton: Locator;

    constructor(page: Page, dialogTitle: string, actionButton: string, exactTitle: boolean = true) {
        this.dialog = page.getByRole('dialog').filter({ has: page.getByRole('heading', { name: dialogTitle, exact: exactTitle }) });
        this.actionButton = this.dialog.getByRole('button', { name: actionButton, exact: true });
    }

    async expectDialogVisible(): Promise<void> {
        await expect(this.dialog).toBeVisible();
    }

    async expectDialogNotVisible(): Promise<void> {
        await expect(this.dialog).not.toBeVisible();
    }

    async closeDialog(): Promise<void> {
        await this.dialog.getByRole('button', { name: 'Close popover' }).click();
        await this.expectDialogNotVisible();
    }
}