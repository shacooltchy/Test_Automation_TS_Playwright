import { expect, Locator, Page } from "@playwright/test";
import { QuickCardEditor } from "./QuickCardEditor";

export class Card {
    private readonly card: Locator;
    readonly quickCardEditor: QuickCardEditor;

    constructor(page: Page) {
        this.card = page.getByTestId('list-card');
        this.quickCardEditor = new QuickCardEditor(page);
    }

    async expectCardIsVisible(cardTitle: string): Promise<void> {
        await expect(this.card.filter({hasText: cardTitle})).toBeVisible();
    }

    async expectCardIsNotVisible(cardTitle: string): Promise<void> {
        await expect(this.card.filter({hasText: cardTitle})).not.toBeVisible();
    }

    async clickEditCardButton(cardTitle: string): Promise<void> {
        await this.card.filter({hasText: cardTitle}).hover();
        await this.card.filter({hasText: cardTitle}).getByTestId('quick-card-editor-button').click();
    }
}