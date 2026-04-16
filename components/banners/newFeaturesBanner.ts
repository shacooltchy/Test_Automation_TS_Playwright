import { Locator, Page } from "@playwright/test";

export class newFeaturesBanner {
    private readonly newFeaturesBanner: Locator;

    constructor(page: Page) {
        this.newFeaturesBanner = page.getByTestId('spotlight--dialog');
    }

    async closeIfVisible(): Promise<void> {
        try {
            await this.newFeaturesBanner.getByRole('button', { name: 'Dismiss' }).click();
        } catch {

        }
    }
}