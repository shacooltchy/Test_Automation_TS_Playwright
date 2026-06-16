import { expect, Locator, Page } from "@playwright/test";
import { ComponentBase } from "./componentBase";

export class ConfirmationDialog extends ComponentBase {
    //private readonly dialog: Locator;
    readonly confirmButton: Locator;
    private readonly textArea: Locator | undefined;

    constructor(page: Page, dialogTitle: string, confirmButtonName: string, hasTextArea: boolean = false, rootLocator: Locator = page.getByRole('dialog').filter({ has: page.getByRole('heading', { name: dialogTitle, exact: true }) })) {
        super(rootLocator);
        //this.dialog = rootLocator;
        this.confirmButton = rootLocator.getByRole('button', { name: confirmButtonName, exact: true });
        if (hasTextArea) {
            this.textArea = rootLocator.getByRole('textbox');
        }
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