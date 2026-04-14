import { expect, Locator, Page } from "@playwright/test";

export class NewListForm {
    private readonly newListForm: Locator

    constructor(page: Page) {
        this.newListForm = page.locator('form').filter({has: page.getByRole('button', {name: 'Add list'})});
    }

    async expectNewListFormIsVisible(): Promise<void> {
        await expect(this.newListForm).toBeVisible();
    }

    async expectNewListFormIsNotVisible(): Promise<void> {
        await expect(this.newListForm).not.toBeVisible();
    }

    async enterNewListName(name: string): Promise<void> {
        await this.newListForm.getByTestId('list-name-textarea').fill(name);
    }

    async clickAddListButton(): Promise <void> {
        await this.newListForm.getByTestId('list-composer-add-list-button').click();
    }

    async clickCancelAddListButton(): Promise<void> {
        await this.newListForm.getByTestId('list-composer-cancel-button').click();
    }
}