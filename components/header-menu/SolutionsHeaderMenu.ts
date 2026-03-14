import { Locator, Page } from "@playwright/test";

//refactoring z uzyciem enuma
export class SolutionsHeaderMenu {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickSolutionsHeaderMenuLinkButton(option: SolutionsLinkButton)
    {
        await this.page.getByRole('link', {name: option}).click();
    }
}

export enum SolutionsLinkButton {
    MarketingTeams = 'Marketing teams Whether launching a new product, campaign, or creating content, Trello helps marketing teams succeed.',
    ProductManagement = 'Product management',
    EngineeringTeams = 'Engineering teams',
    DesignTeams = 'Design teams',
    Startups = 'Startups',
    RemoteTeams = 'Remote teams'
}