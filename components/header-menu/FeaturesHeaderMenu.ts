import { expect, Locator, Page } from "@playwright/test";

export class FeaturesHeaderMenu {
    private readonly page: Page;
    private readonly inboxLinkButton: Locator;
    private readonly plannerLinkButton: Locator;
    private readonly automationLinkButton: Locator;
    private readonly powerUpsLinkButton: Locator;
    private readonly templatesLinkButton: Locator;
    private readonly integrationsLinkButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inboxLinkButton = page.getByRole('link', { name: 'Inbox Capture every vital detail from emails, Slack, and more directly into your Trello Inbox.' });
        this.plannerLinkButton = page.getByRole('link', { name: 'Planner Sync your calendar and allocate focused time slots to boost productivity.' });
        this.automationLinkButton = page.getByRole('link', { name: 'Automation Automate tasks and workflows with Trello.' });
        this.powerUpsLinkButton = page.getByRole('link', { name: 'Power-Ups Power up your teams by linking their favorite tools with Trello plugins.' });
        this.templatesLinkButton = page.getByRole('link', { name: 'Templates Give your team a blueprint for success with easy-to-use templates from industry leaders and the Trello community.' });
        this.integrationsLinkButton = page.getByRole('link', { name: 'Integrations Find the apps your team is already using or discover new ways to get work done in Trello.' });
    }

    async expectFeaturesMenuTabIsVisible() {
        await expect(this.page.getByTestId('bignav').getByText('Explore the features that help your team succeed')).toBeVisible();
    }

    async clickInboxLinkButton() {
        await this.inboxLinkButton.click();
    }

    async clickPlannerLinkButton() {
        await this.plannerLinkButton.click();
    }

    async clickAutomationLinkButton() {
        await this.automationLinkButton.click();
    }

    async clickPowerUpsLinkButton() {
        await this.powerUpsLinkButton.click();
    }

    async clickTemplatesLinkButton() {
        await this.templatesLinkButton.click();
    }

    async clickIntegrationsLinkButton() {
        await this.integrationsLinkButton.click();
    }
}