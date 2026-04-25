import { expect, Page } from "@playwright/test";

export class Checklist {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async expectVisible(title: string) {
        await expect(this.page.getByTestId('checklist-container').filter({hasText: title})).toBeVisible();
    }

    async expectNotVisible(title: string) {
        await expect(this.page.getByTestId('checklist-container').filter({hasText: title})).not.toBeVisible();
    }
}