import { Locator, Page } from "@playwright/test";
import { ComponentBase } from "./componentBase";

export class DescriptionTextEditor extends ComponentBase {
    private readonly textToolbar: Locator;
    readonly cancelButton: Locator;
    readonly saveButton: Locator

    constructor(page: Page, rootLocator: Locator = page.locator('.akEditor')) {
        super(rootLocator);
        this.textToolbar = rootLocator;
        this.cancelButton = page.getByTestId('description-cancel-button');
        this.saveButton = page.getByTestId('description-save-button');
    }

    async enterDescription(description: string): Promise<void> {
        await this.textToolbar.getByRole('textbox', { name: 'Description' }).fill(description);
    }
}