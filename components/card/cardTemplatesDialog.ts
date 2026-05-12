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

    async expectNoTemplates(): Promise<void> {
        await expect(this.dialog.getByText('You don’t have any templates. Create a template to make copying cards easy.')).toBeVisible();
    }

    async clickCreateANewTemplateButton(): Promise<void> {
        await this.dialog.getByTestId('create-new-template-card-button').click();
    }

    async expectTemplateTitleTextboxVisible(): Promise<void> {
        await expect(this.dialog.getByRole('textbox', {name: 'Template title'})).toBeVisible();
    }

    async expectTemplateTitleTextboxNotVisible(): Promise<void> {
        await expect(this.dialog.getByRole('textbox', {name: 'Template title'})).not.toBeVisible();
    }

    async clickCancelAddingNewCardButton(): Promise<void> {
        await this.dialog.getByRole('button', { name: 'Cancel adding new card' }).click();
    }

    async enterTitle(title: string) {
        await this.dialog.getByRole('textbox', {name: 'Template title'}).fill(title);
    }

    async clickAddButton() {
        await this.dialog.getByTestId('new-template-card-submit-button').click();
    }

    async expectCardTemplate(title: string): Promise<void> {
        expect(this.dialog.getByRole('button', {name: title})).toBeVisible();
    }

    async clickCreateANewTemplateButtonFromCardComposer(): Promise<void> {
        await this.dialog.getByTestId('create-template-button-from-card-composer').click();
    }

    async clickCardTemplate(title: string) {
        await this.dialog.getByRole('button', {name: title}).click();
    }
}