import { test } from '../../../fixtures/pages'; //extended playwright test
import { HomePage } from '../../../pages/homePage';
import { InboxPage } from '../../../pages/inboxPage';
import { IntegrationsPage } from '../../../pages/integrationsPage';
import { PlannerPage } from '../../../pages/plannerPage';
import { PowerUpsPage } from '../../../pages/powerUpsPage';
import { TemplatesPage } from '../../../pages/templatesPage';

//grouped tests with common setup in beforeEach hook, tagged with @smoke for selective execution
//inbox and planner are sometimes not available - bug?
test.describe.skip('Features tab navigation tests - inbox, planner', {tag: '@smoke'}, () => {
    let homePage: HomePage;

    //use beforeEach hook to perform common operations
    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        await homePage.navigate();
        await homePage.expectPageVisible();
    });

    test('Navigate to Inbox page', async ({page}) => {
        const inboxPage = new InboxPage(page);
    
        await homePage.headerMenu.clickFeatures();
        await homePage.featuresHeaderMenu.expectVisible();
        await homePage.featuresHeaderMenu.clickInboxLinkButton();

        await inboxPage.header.expectTitleVisible('Trello Inbox');
    });

    test('Navigate to Planner page', async ({ page }) => {
        const plannerPage = new PlannerPage(page);

        await homePage.headerMenu.clickFeatures();
        await homePage.featuresHeaderMenu.expectVisible();
        await homePage.featuresHeaderMenu.clickPlannerLinkButton();

        await plannerPage.header.expectTitleVisible('Trello Planner');
    });
});

test('Navigate to Automation page', {tag: '@smoke'}, async ({ homePage, automationPage }) => {
    await homePage.navigate();
    await homePage.expectPageVisible();
    await homePage.headerMenu.clickFeatures();
    await homePage.featuresHeaderMenu.expectVisible();
    await homePage.featuresHeaderMenu.clickAutomationLinkButton();

    await automationPage.header.expectTitleVisible('Automate your workflow with Trello');
});

test('Navigate to Power-Ups page', {tag: '@smoke'}, async ({ page }) => {
    const homePage = new HomePage(page);
    const powerUpsPage = new PowerUpsPage(page);

    await homePage.navigate();
    await homePage.expectPageVisible();
    await homePage.headerMenu.clickFeatures();
    await homePage.featuresHeaderMenu.expectVisible();
    await homePage.featuresHeaderMenu.clickPowerUpsLinkButton();

    await powerUpsPage.header.expectTitleVisible('Power-Ups for Trello');
});

test('Navigate to Templates page', {tag: '@smoke'}, async ({ page }) => {
    const homePage = new HomePage(page);
    const templatesPage = new TemplatesPage(page);

    await homePage.navigate();
    await homePage.expectPageVisible();
    await homePage.headerMenu.clickFeatures();
    await homePage.featuresHeaderMenu.expectVisible();
    await homePage.featuresHeaderMenu.clickTemplatesLinkButton();

    await templatesPage.header.expectTitleVisible('Templates for Trello');
});

test('Navigate to Integrations page', {tag: '@smoke'}, async ({ page }) => {
    const homePage = new HomePage(page);
    const integrationsPage = new IntegrationsPage(page);

    await homePage.navigate();
    await homePage.expectPageVisible();
    await homePage.headerMenu.clickFeatures();
    await homePage.featuresHeaderMenu.expectVisible();
    await homePage.featuresHeaderMenu.clickIntegrationsLinkButton();

    await integrationsPage.header.expectTitleVisible('Connect Trello to everything');
});

