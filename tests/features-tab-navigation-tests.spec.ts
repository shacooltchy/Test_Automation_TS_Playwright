import { test } from '../fixtures/pages'; //extended playwright test
import { HomePage } from '../pages/HomePage';
import { InboxPage } from '../pages/InboxPage';
import { IntegrationsPage } from '../pages/IntegrationsPage';
import { PlannerPage } from '../pages/PlannerPage';
import { PowerUpsPage } from '../pages/PowerUpsPage';
import { TemplatesPage } from '../pages/TemplatesPage';

//grouped tests with common setup in beforeEach hook, tagged with @smoke for selective execution
test.describe('Features tab navigation tests - inbox, planner', {tag: '@smoke'}, () => {
    let homePage: HomePage;

    //use beforeEach hook to perform common operations
    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        await homePage.navigate();
        await homePage.header.expectHeaderTitleIsVisible('Capture, organize, and tackle your to-dos from anywhere.');
    });

    test('Navigate to Inbox page', async ({page}) => {
        const inboxPage = new InboxPage(page);
    
        await homePage.headerMenu.clickFeatures();
        await homePage.featuresHeaderMenu.expectFeaturesMenuTabIsVisible();
        await homePage.featuresHeaderMenu.clickInboxLinkButton();

        await inboxPage.header.expectHeaderTitleIsVisible('Trello Inbox');
    });

    test('Navigate to Planner page', async ({ page }) => {
        const plannerPage = new PlannerPage(page);

        await homePage.headerMenu.clickFeatures();
        await homePage.featuresHeaderMenu.expectFeaturesMenuTabIsVisible();
        await homePage.featuresHeaderMenu.clickPlannerLinkButton();

        await plannerPage.header.expectHeaderTitleIsVisible('Trello Planner');
    });
});

test('Navigate to Automation page', {tag: '@smoke'}, async ({ homePage, automationPage }) => {
    await homePage.navigate();
    await homePage.header.expectHeaderTitleIsVisible('Capture, organize, and tackle your to-dos from anywhere.');
    await homePage.headerMenu.clickFeatures();
    await homePage.featuresHeaderMenu.expectFeaturesMenuTabIsVisible();
    await homePage.featuresHeaderMenu.clickAutomationLinkButton();

    await automationPage.header.expectHeaderTitleIsVisible('Automate your workflow with Trello');
});

test('Navigate to Power-Ups page', {tag: '@smoke'}, async ({ page }) => {
    const homePage = new HomePage(page);
    const powerUpsPage = new PowerUpsPage(page);

    await homePage.navigate();
    await homePage.header.expectHeaderTitleIsVisible('Capture, organize, and tackle your to-dos from anywhere.');
    await homePage.headerMenu.clickFeatures();
    await homePage.featuresHeaderMenu.expectFeaturesMenuTabIsVisible();
    await homePage.featuresHeaderMenu.clickPowerUpsLinkButton();

    await powerUpsPage.header.expectHeaderTitleIsVisible('Power-Ups for Trello');
});

test('Navigate to Templates page', {tag: '@smoke'}, async ({ page }) => {
    const homePage = new HomePage(page);
    const templatesPage = new TemplatesPage(page);

    await homePage.navigate();
    await homePage.header.expectHeaderTitleIsVisible('Capture, organize, and tackle your to-dos from anywhere.');
    await homePage.headerMenu.clickFeatures();
    await homePage.featuresHeaderMenu.expectFeaturesMenuTabIsVisible();
    await homePage.featuresHeaderMenu.clickTemplatesLinkButton();

    await templatesPage.header.expectHeaderTitleIsVisible('Templates for Trello');
});

test('Navigate to Integrations page', {tag: '@smoke'}, async ({ page }) => {
    const homePage = new HomePage(page);
    const integrationsPage = new IntegrationsPage(page);

    await homePage.navigate();
    await homePage.header.expectHeaderTitleIsVisible('Capture, organize, and tackle your to-dos from anywhere.');
    await homePage.headerMenu.clickFeatures();
    await homePage.featuresHeaderMenu.expectFeaturesMenuTabIsVisible();
    await homePage.featuresHeaderMenu.clickIntegrationsLinkButton();

    await integrationsPage.header.expectHeaderTitleIsVisible('Connect Trello to everything');
});

