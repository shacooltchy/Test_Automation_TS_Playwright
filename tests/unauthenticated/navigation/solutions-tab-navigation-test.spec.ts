import { SolutionsLinkButton } from "../../../components/headerMenu/solutionsHeaderMenu";
import { test } from "../../../fixtures/pages"; //to trzeba recznie dodac

test.describe('Solutions tab navigation tests', {tag: '@smoke'}, () => {
    test.beforeEach(async({homePage}) => {
        await homePage.navigate();
        await homePage.cookieBanner.close();
        await homePage.headerMenu.solutionsButton.click();
    });

    test('Navigate to Marketing Teams', async ({homePage, marketingTeamsPage}) => {
        await test.step('Click Marketing Teams link button in the Solutions Tab', async () => {
            await homePage.solutionsHeaderMenu.clickSolutionsHeaderMenuLinkButton(SolutionsLinkButton.MarketingTeams);
        });

        await test.step('Verify Marketing Teams page is visible', async () => {
            await marketingTeamsPage.expectPageVisible();
            await marketingTeamsPage.header.expectTitleVisible('Trello For Marketing Teams');
        });
    });

    test('Navigate to Product Management Teams', {tag: '@Product Management Teams'}, async({homePage, productManagementPage}) => {
        await test.step('Click Product Management Teams link button in the Solutions Tab', async () => {
            await homePage.solutionsHeaderMenu.clickSolutionsHeaderMenuLinkButton(SolutionsLinkButton.ProductManagement);
        });

        await test.step('Verify Product Management Teams page is visible', async () => {
            await productManagementPage.expectPageVisible();
            await productManagementPage.header.expectTitleVisible('Trello For Product Management Teams');
        });
    });

    test('Navigate to Engineering Teams', async({homePage, engineeringTeamsPage}) => {
        await test.step('Click Marketing Temas link button in the Solutions Tab', async () => {
            await homePage.solutionsHeaderMenu.clickSolutionsHeaderMenuLinkButton(SolutionsLinkButton.EngineeringTeams);
        });

        await test.step('Verify Marketing Teams page is visible', async () => {
            await engineeringTeamsPage.expectPageVisible();
            await engineeringTeamsPage.header.expectTitleVisible('Trello for Engineering Teams');
        });
    });

    test('Navigate to Design Teams', async({homePage, designTeamsPage}) => {
        await test.step('Click Design Teams link button in the Solutions Tab', async () => {
            await homePage.solutionsHeaderMenu.clickSolutionsHeaderMenuLinkButton(SolutionsLinkButton.DesignTeams);
        });

        await test.step('Verify Design Teams page is visible', async () => {
            await designTeamsPage.expectPageVisible();
            await designTeamsPage.header.expectTitleVisible('Trello For Design Teams');
        });
    });

    test('Navigate to Startups', async({homePage, startupsPage}) => {
        await test.step('Click Startups link button in the Solutions Tab', async () => {
            await homePage.solutionsHeaderMenu.clickSolutionsHeaderMenuLinkButton(SolutionsLinkButton.Startups);
        });

        await test.step('Verify Startups page is visible', async () => {
            await startupsPage.expectPageVisible();
            await startupsPage.header.expectTitleVisible('Trello For Startups');
        });
    });

    test('Navigate to Remote Teams', async({homePage, remoteTeamsPage}) => {
        await test.step('Click Remote Teams link button in the Solutions Tab', async () => {
            await homePage.solutionsHeaderMenu.clickSolutionsHeaderMenuLinkButton(SolutionsLinkButton.RemoteTeams);
        });

        await test.step('Verify Remote Teams page is visible', async () => {
            await remoteTeamsPage.expectPageVisible();
            await remoteTeamsPage.header.expectTitleVisible('Trello For Remote Teams');
        });
    });
});