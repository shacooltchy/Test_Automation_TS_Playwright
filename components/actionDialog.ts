import { expect, Locator, Page } from "@playwright/test";

export class ActionDialog {
    readonly dialog: Locator;
    private readonly actionButtonName: string;

    constructor(page: Page, dialogTitle: string, actionButton: string, exactTitle: boolean = true) {
        this.dialog = page.getByRole('dialog').filter({ has: page.getByRole('heading', { name: dialogTitle, exact: exactTitle }) });
        this.actionButtonName = actionButton;
    }

    async expectDialogVisible(): Promise<void> {
        await expect(this.dialog).toBeVisible();
    }

    async expectDialogNotVisible(): Promise<void> {
        await expect(this.dialog).not.toBeVisible();
    }

    async clickActionButton(): Promise<void> {
        await this.dialog.getByRole('button', { name: this.actionButtonName, exact: true }).click();
    }

    async closeDialog(): Promise<void> {
        await this.dialog.getByRole('button', { name: 'Close popover' }).click();
        await this.expectDialogNotVisible();
    }
}