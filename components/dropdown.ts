import { Locator, Page } from "@playwright/test";

export class Dropdown {
    private readonly page: Page;
    private readonly dropdownLocator: Locator;

    constructor(page: Page, dropdownLocator: Locator) {
        this.page = page;
        this.dropdownLocator = dropdownLocator;
    }

    async selectOption(optionText: string): Promise<void> {
        await this.dropdownLocator.click();
        await this.page.getByRole('option', { name: optionText }).click();
    }
}