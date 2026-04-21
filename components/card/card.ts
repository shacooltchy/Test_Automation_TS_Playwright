import { expect, Locator, Page } from "@playwright/test";
import { QuickCardEditor } from "./quickCardEditor/quickCardEditor";

export class Card {
    private readonly page: Page;
    private readonly card: Locator;
    readonly quickCardEditor: QuickCardEditor;

    constructor(page: Page) {
        this.page = page;
        this.card = page.getByTestId('list-card');
        this.quickCardEditor = new QuickCardEditor(page);
    }

    async clickCard(cardTitle: string): Promise<void> {
        await this.card.filter({hasText: cardTitle}).click();
    }

    async expectCardVisible(cardTitle: string, listName: string): Promise<void> {
        const list = this.page.getByTestId('list').filter({has: this.page.getByRole('heading', {name: listName, exact: true})});
        await expect(list.getByTestId('list-card').filter({hasText: cardTitle})).toBeVisible();
    }

    async expectCardNotVisible(cardTitle: string, listName: string): Promise<void> {
        const list = this.page.getByTestId('list').filter({has: this.page.getByRole('heading', {name: listName, exact: true})});
        await expect(list.getByTestId('list-card').filter({hasText: cardTitle})).not.toBeVisible();
    }

    async clickEditCardButton(cardTitle: string): Promise<void> {
        await this.card.filter({hasText: cardTitle}).hover();
        await this.card.filter({hasText: cardTitle}).getByTestId('quick-card-editor-button').click();
    }
}