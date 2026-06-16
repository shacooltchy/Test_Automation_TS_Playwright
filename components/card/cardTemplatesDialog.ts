import { expect, Locator, Page } from "@playwright/test"
import { ComponentBase } from "../componentBase";

export class CardTemplatesDialog extends ComponentBase {
    private readonly dialog: Locator;
    readonly createANewTemplateButton: Locator;
    readonly templateTitleTextbox: Locator;
    readonly cancelAddingNewCardButton: Locator;
    readonly addButton: Locator;
    readonly cardComposerCreateANewTemplateButton: Locator;

    constructor(page: Page, rootLocator: Locator = page.getByRole('dialog').filter({ has: page.getByRole('heading', { name: 'Card templates', exact: true }) })) {
        super(rootLocator);
        this.dialog = rootLocator;
        this.createANewTemplateButton = this.dialog.getByTestId('create-new-template-card-button');
        this.templateTitleTextbox = this.dialog.getByRole('textbox', {name: 'Template title'});
        this.cancelAddingNewCardButton = this.dialog.getByRole('button', { name: 'Cancel adding new card' });
        this.addButton = this.dialog.getByTestId('new-template-card-submit-button');
        this.cardComposerCreateANewTemplateButton = this.dialog.getByTestId('create-template-button-from-card-composer');
    }

    async expectNoTemplates(): Promise<void> {
        await expect(this.dialog.getByText('You don’t have any templates. Create a template to make copying cards easy.')).toBeVisible();
    }

    async expectCardTemplate(title: string): Promise<void> {
        expect(this.dialog.getByRole('button', {name: title})).toBeVisible();
    }

    async clickCardTemplate(title: string) {
        await this.dialog.getByRole('button', {name: title}).click();
    }
}