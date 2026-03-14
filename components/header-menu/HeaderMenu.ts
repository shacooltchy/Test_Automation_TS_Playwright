import { Locator, Page } from "@playwright/test";

export class HeaderMenu {
    private readonly page: Page;
    private readonly componentRoot: Locator;
    private readonly featuresButton: Locator;
    private readonly solutionsButton: Locator;
    private readonly plansButton: Locator;
    private readonly pricingButton: Locator;
    private readonly resourcesButton: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.componentRoot = page.getByTestId('bignav');
        this.featuresButton = page.getByRole('button', { name: 'Features' });
        this.solutionsButton = this.componentRoot.getByRole('button', { name: 'Solutions' });
        this.plansButton = page.getByRole('button', { name: 'Plans' });
        this.pricingButton = page.getByRole('button', { name: 'Pricing' });
        this.resourcesButton = page.getByRole('button', { name: 'Resources' });
        this.loginButton = this.componentRoot.getByRole('link', { name: 'Log in' });
    }

    async clickFeatures() {
        await this.featuresButton.click();
    }

    async clickSolutions() {
        await this.solutionsButton.click();
    }

    async clickPlans() {
        await this.plansButton.click();
    }

    async clickPricing() {
        await this.pricingButton.click();
    }

    async clickResources() {
        await this.resourcesButton.click();
    }

    async clickLogIn() {
        await this.loginButton.click();
    }
}