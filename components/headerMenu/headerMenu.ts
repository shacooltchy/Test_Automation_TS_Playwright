import { Locator, Page } from "@playwright/test";

export class HeaderMenu {
    private readonly headerMenu: Locator;
    readonly featuresButton: Locator;
    readonly solutionsButton: Locator;
    readonly plansButton: Locator;
    readonly pricingButton: Locator;
    readonly resourcesButton: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.headerMenu = page.getByText('FeaturesSolutionsPlansPricingResourcesLog in');
        this.featuresButton = this.headerMenu.getByRole('button', { name: 'Features' });
        this.solutionsButton = this.headerMenu.getByRole('button', { name: 'Solutions' });
        this.plansButton = this.headerMenu.getByRole('button', { name: 'Plans' });
        this.pricingButton = this.headerMenu.getByRole('button', { name: 'Pricing' });
        this.resourcesButton = this.headerMenu.getByRole('button', { name: 'Resources' });
        this.loginButton = this.headerMenu.getByRole('link', { name: 'Log in' });
    }
}