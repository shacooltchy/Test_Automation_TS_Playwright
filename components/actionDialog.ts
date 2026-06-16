import { Locator, Page } from "@playwright/test";
import { ComponentBase } from "./componentBase";

export class ActionDialog extends ComponentBase {
    readonly dialog: Locator;
    readonly actionButton: Locator;

    constructor(page: Page, dialogTitle: string, actionButton: string, exactTitle: boolean = true, rootLocator: Locator = page.getByRole('dialog').filter({ has: page.getByRole('heading', { name: dialogTitle, exact: exactTitle }) })) {
        super(rootLocator);
        this.dialog = rootLocator;
        this.actionButton = this.dialog.getByRole('button', { name: actionButton, exact: true });
    }

    async closeDialog(): Promise<void> {
        await this.dialog.getByRole('button', { name: 'Close popover' }).click();
        await this.expectNotVisible();
    }
}