import { expect, Locator, Page } from "@playwright/test";

export class Card {
    private readonly card: Locator;
    constructor(page: Page) {
        this.card = page.getByTestId('list-card');
    }

    async expectCardIsVisible(cardTitle: string) {
        await expect(this.card.filter({hasText: cardTitle})).toBeVisible();
    }
}