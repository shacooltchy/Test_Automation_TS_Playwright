import { expect, Locator, Page } from "@playwright/test";

export class AddToCardDialog {
    private readonly dialog: Locator;

    constructor(page: Page) {
        this.dialog = page.getByRole('dialog').filter({ has: page.getByRole('heading', { name: 'Add to card', exact: true }) });
    }

    async expectDialogIsVisible(): Promise<void> {
        await expect(this.dialog).toBeVisible();
    }

    async expectDialogIsNotVisible(): Promise<void> {
        await expect(this.dialog).not.toBeVisible();
    }

    async clickAddToCardAction(action: AddToCardAction): Promise<void> {
        await this.dialog.getByRole('button', { name: action }).click();
    }
}

export enum AddToCardAction {
    Labels = 'Labels',
    Dates = 'Dates',
    Checklist = 'Checklist',
    Members = 'Members',
    Attachments = 'Attachments',
    CustomFields = 'Custom Fields'
}