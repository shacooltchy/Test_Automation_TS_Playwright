import { Locator, Page } from "@playwright/test";
import { ComponentBase } from "../componentBase";

export class CreateCardDialog extends ComponentBase {
    private readonly dialog: Locator;
    readonly createCardButton: Locator;

    constructor(page: Page, rootLocator: Locator = page.getByRole('dialog').filter({ has: page.getByRole('heading', { name: 'Create card', exact: true }) })) {
        super(rootLocator);
        this.dialog = rootLocator;
        this.createCardButton = this.dialog.getByRole('button', { name: 'Create card' });
    }
}