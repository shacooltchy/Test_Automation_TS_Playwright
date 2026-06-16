import { Locator, Page } from "@playwright/test";
import { ComponentBase } from "../../componentBase";

export class AddToCardDialog extends ComponentBase {
    private readonly dialog: Locator;

    constructor(page: Page, rootLocator: Locator = page.getByRole('dialog').filter({ has: page.getByRole('heading', { name: 'Add to card', exact: true }) })) {
        super(rootLocator);
        this.dialog = rootLocator;
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