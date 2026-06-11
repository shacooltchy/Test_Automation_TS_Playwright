import { expect, Locator, Page } from "@playwright/test";

export class ConfirmationDialog {
    private readonly dialog: Locator;
    readonly confirmButton: Locator;
    private readonly textArea: Locator | undefined;

    constructor(page: Page, dialogTitle: string, confirmButtonName: string, hasTextArea: boolean = false) {
        this.dialog = page.getByRole('dialog').filter({ has: page.getByRole('heading', { name: dialogTitle, exact: true }) });
        this.confirmButton = this.dialog.getByRole('button', { name: confirmButtonName, exact: true });
        if (hasTextArea) {
            this.textArea = this.dialog.getByRole('textbox');
        }
    }

    async expectDialogToBeVisible(): Promise<void> {
        await expect(this.dialog).toBeVisible();
    }

    async expectTextAreaValue(expectedValue: string): Promise<void> {
        if (this.textArea) {
            await expect(this.textArea).toHaveValue(expectedValue);
        } else {
            throw new Error('Text area is not defined for this dialog');
        }
    }

    async enterText(text: string): Promise<void> {
        if (this.textArea) {
            await this.textArea.fill(text);
        } else {
            throw new Error('Text area is not defined for this dialog');
        }
    }
}