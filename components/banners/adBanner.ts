import { Locator, Page } from "@playwright/test";

export class adBanner {
    private readonly adBanner: Locator;

    constructor(page: Page) {
        this.adBanner = page.getByTestId('ad-container');
    }

    async minimizeIfVisible(): Promise<void> {
        try{
            await this.adBanner.getByRole('button', { name: 'Minimize' }).click();
        } catch {
            
        }
    }
}