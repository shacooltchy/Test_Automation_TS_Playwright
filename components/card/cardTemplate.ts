import { expect, Locator, Page } from "@playwright/test";

export class CardTemplate {
    private readonly page: Page;
    private readonly cardTemplate: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cardTemplate = page.getByTestId('list-card').filter({has: page.getByTestId('badge-card-template')});
    }

    async expectVisible(cardTemplateTitle: string, listName: string): Promise<void> {
        const list = this.page.getByTestId('list').filter({has: this.page.getByRole('heading', {name: listName, exact: true})});
        await expect(list.getByTestId('list-card').filter({hasText: cardTemplateTitle, has: this.page.getByTestId('badge-card-template')})).toBeVisible();
    }
}