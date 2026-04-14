import { SolutionsLinkButton } from "../components/headerMenu/solutionsHeaderMenu";
import { test } from "../fixtures/pages"; //to trzeba recznie dodac

test.describe('Solutions tab navigation tests', {tag: '@smoke'}, () => {
    test.beforeEach(async({homePage}) => {
        await homePage.navigate();
        await homePage.headerMenu.clickSolutions();
    });

    test('Navigate to Marketing Teams', async ({homePage, marketingTeamsPage}) => {
        await test.step('Click Marketing Teams link button in the Solutions Tab', async () => {
            await homePage.solutionsHeaderMenu.clickSolutionsHeaderMenuLinkButton(SolutionsLinkButton.MarketingTeams);
        });

        await test.step('Verify Marketing Teams page is visible', async () => {
            await marketingTeamsPage.expectPageIsVisible();
            await marketingTeamsPage.header.expectHeaderTitleIsVisible('Trello For Marketing Teams');
        });
    });

    test('Navigate to Product Management Teams', {tag: '@Product Management Teams'}, async({homePage, productManagementPage}) => {
        await test.step('Click Product Management Teams link button in the Solutions Tab', async () => {
            await homePage.solutionsHeaderMenu.clickSolutionsHeaderMenuLinkButton(SolutionsLinkButton.ProductManagement);
        });

        await test.step('Verify Product Management Teams page is visible', async () => {
            await productManagementPage.expectPageIsVisible();
            await productManagementPage.header.expectHeaderTitleIsVisible('Trello For Product Management Teams');
        });
    });

    test('Navigate to Engineering Teams', async({homePage, engineeringTeamsPage}) => {
        await test.step('Click Marketing Temas link button in the Solutions Tab', async () => {
            await homePage.solutionsHeaderMenu.clickSolutionsHeaderMenuLinkButton(SolutionsLinkButton.EngineeringTeams);
        });

        await test.step('Verify Marketing Teams page is visible', async () => {
            await engineeringTeamsPage.expectPageIsVisible();
            await engineeringTeamsPage.header.expectHeaderTitleIsVisible('Trello for Engineering Teams');
        });
    });

    test('Navigate to Design Teams', async({homePage, designTeamsPage}) => {
        await test.step('Click Design Teams link button in the Solutions Tab', async () => {
            await homePage.solutionsHeaderMenu.clickSolutionsHeaderMenuLinkButton(SolutionsLinkButton.DesignTeams);
        });

        await test.step('Verify Design Teams page is visible', async () => {
            await designTeamsPage.expectPageIsVisible();
            await designTeamsPage.header.expectHeaderTitleIsVisible('Trello For Design Teams');
        });
    });

    test('Navigate to Startups', async({homePage, startupsPage}) => {
        await test.step('Click Startups link button in the Solutions Tab', async () => {
            await homePage.solutionsHeaderMenu.clickSolutionsHeaderMenuLinkButton(SolutionsLinkButton.Startups);
        });

        await test.step('Verify Startups page is visible', async () => {
            await startupsPage.expectPageIsVisible();
            await startupsPage.header.expectHeaderTitleIsVisible('Trello For Startups');
        });
    });

    test('Navigate to Remote Teams', async({homePage, remoteTeamsPage}) => {
        await test.step('Click Remote Teams link button in the Solutions Tab', async () => {
            await homePage.solutionsHeaderMenu.clickSolutionsHeaderMenuLinkButton(SolutionsLinkButton.RemoteTeams);
        });

        await test.step('Verify Remote Teams page is visible', async () => {
            await remoteTeamsPage.expectPageIsVisible();
            await remoteTeamsPage.header.expectHeaderTitleIsVisible('Trello For Remote Teams');
        });
    });
});