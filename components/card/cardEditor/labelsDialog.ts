import { expect, Locator, Page } from "@playwright/test";

export class LabelsDialog {
    private readonly dialog: Locator;

    constructor(page: Page) {
        this.dialog = page.getByTestId('labels-popover-labels-screen');
    }

    async closeDialog(): Promise<void> {
        await this.dialog.getByRole('button', { name: 'Close popover' }).click();
    }

    async expectDialogIsVisible(): Promise<void> {
        await expect(this.dialog).toBeVisible();
    }

    async expectDialogIsNotVisible(): Promise<void> {
        await expect(this.dialog).not.toBeVisible();
    }

    async clickLabel(labelColor?: string, labelTitle?: string ): Promise<void> {
        if(!labelColor && !labelTitle) {
            throw new Error('Either labelColor or labelTitle must be provided');
        }

        if(labelColor && labelTitle) {
            await this.dialog.getByLabel(`Color: ${labelColor}, title: ${labelTitle}`, { exact: true }).click();
            return;
        } else if(labelColor) {
            await this.dialog.getByLabel(`Color: ${labelColor}, title: none`, { exact: true }).click();
            return;
        } else if(labelTitle) {
             await this.dialog.getByLabel(`Color: none, title: ${labelTitle}`, { exact: true }).click();
             return;
        }
    }
}