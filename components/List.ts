import { expect, Locator, Page } from "@playwright/test";

export class List {
    private readonly list: Locator;

    constructor(page: Page) {
        this.list = page.getByTestId('list')
    }

    async expectListIsVisible(listName: string): Promise<void> {
        await expect(this.list.filter({hasText: listName})).toBeVisible();
    }
}