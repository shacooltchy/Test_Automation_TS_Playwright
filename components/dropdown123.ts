import { Locator, Page } from "@playwright/test";

export class Dropdown {
    private readonly page: Page;
    private readonly dropdownLocator: Locator;
    private readonly availableOptions: string[];

    constructor(page: Page, dropdownLocator: Locator, availableOptions: string[]) {
        this.page = page;
        this.dropdownLocator = dropdownLocator;
        this.availableOptions = availableOptions;
    }

    async select(optionText: string): Promise<void> {
        if (!this.availableOptions.includes(optionText)) {
            throw new Error(`Option "${optionText}" is not available in the dropdown. Available options are: ${this.availableOptions.join(', ')}`);
        }
        await this.dropdownLocator.click();
        await this.page.getByRole('option', { name: optionText }).click();
    }
}