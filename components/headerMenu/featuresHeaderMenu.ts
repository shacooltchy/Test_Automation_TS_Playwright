import { expect, Locator, Page } from "@playwright/test";

export class FeaturesHeaderMenu {
    private readonly page: Page;
    readonly inboxLinkButton: Locator;
    readonly plannerLinkButton: Locator;
    readonly automationLinkButton: Locator;
    readonly powerUpsLinkButton: Locator;
    readonly templatesLinkButton: Locator;
    readonly integrationsLinkButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inboxLinkButton = page.getByRole('link', { name: 'Inbox Capture every vital detail from emails, Slack, and more directly into your Trello Inbox.' });
        this.plannerLinkButton = page.getByRole('link', { name: 'Planner Sync your calendar and allocate focused time slots to boost productivity.' });
        this.automationLinkButton = page.getByRole('link', { name: 'Automation Automate tasks and workflows with Trello.' });
        this.powerUpsLinkButton = page.getByRole('link', { name: 'Power-Ups Power up your teams by linking their favorite tools with Trello plugins.' });
        this.templatesLinkButton = page.getByRole('link', { name: 'Templates Give your team a blueprint for success with easy-to-use templates from industry leaders and the Trello community.' });
        this.integrationsLinkButton = page.getByRole('link', { name: 'Integrations Find the apps your team is already using or discover new ways to get work done in Trello.' });
    }

    async expectVisible() {
        await expect(this.page.getByRole('heading', { name: 'Explore the features that help your team succeed' })).toBeVisible();
    }
}