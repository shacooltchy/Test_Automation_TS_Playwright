import { expect, Locator, Page } from "@playwright/test";

export class NewListForm {
    private readonly newListForm: Locator
    readonly listNameTextArea: Locator;
    readonly addListButton: Locator;
    readonly cancelAddListButton: Locator;

    constructor(page: Page) {
        this.newListForm = page.locator('form').filter({has: page.getByRole('button', {name: 'Add list'})});
        this.listNameTextArea = this.newListForm.getByTestId('list-name-textarea');
        this.addListButton = this.newListForm.getByTestId('list-composer-add-list-button');
        this.cancelAddListButton = this.newListForm.getByTestId('list-composer-cancel-button');
    }

    async expectVisible(): Promise<void> {
        await expect(this.newListForm).toBeVisible();
    }

    async expectNotVisible(): Promise<void> {
        await expect(this.newListForm).not.toBeVisible();
    }
}