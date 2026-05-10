import { expect, Locator, Page } from "@playwright/test"

export class CardTemplatesDialog {
    private readonly dialog: Locator;

    constructor(page: Page) {
        this.dialog = page.getByRole('dialog').filter({ has: page.getByRole('heading', { name: 'Card templates', exact: true }) });
    }

    async expectVisible(): Promise<void> {
        await expect(this.dialog).toBeVisible();
    }
    
    async expectNotVisible(): Promise<void> {
        await expect(this.dialog).not.toBeVisible();
    }

    async clickCreateANewTemplateButton(): Promise<void> {
        await this.dialog.getByTestId('create-new-template-card-button').click();
    }

    async enterTitle(title: string) {
        await this.dialog.getByRole('textbox', {name: 'Template title'}).fill(title);
    }

    async clickAddButton() {
        await this.dialog.getByTestId('new-template-card-submit-button').click();
    }
}