import { BoardVisibility } from "../../enums/BoardVisibility";
import { test } from "../../fixtures/pages";
import { deleteTestBoard } from "../../helpers/testDataHelpers/deleteTestBoard";
import { generateTestDataName } from "../../utils/stringUtils";

test.describe('Create board tests', {tag: '@boards'}, () => {
    let boardName: string;

    test.beforeEach(async ({homePage, loginPage, boardsPage }) => {
        await homePage.navigate();
        await homePage.expectPageIsVisible();
        await homePage.headerMenu.clickLogIn();
        await loginPage.logIn();
        await boardsPage.expectPageIsVisible();
        await boardsPage.closeNewFeaturesBannerIfVisible();
    });

    test.afterEach(async () => {
        // Clean up created boards via API if needed
        await deleteTestBoard(boardName);
    });

    test('Create new board', async ({ boardsPage, boardDetailsPage }) => {
        boardName = generateTestDataName("Board");

        await test.step('Click the Create new board tile', async () => {
            await boardsPage.clickCreateNewBoardTile();
        });

        await test.step('Verify the Create board modal is visible', async () => {
            await boardsPage.expectCreateBoardModalIsVisible();
        });

        await test.step('Select board background', async () => {
            await boardsPage.selectBoardBackground();
        });

        await test.step('Enter board title', async () => {
            await boardsPage.enterBoardTitle(boardName);
        });

        await test.step('Select board visibility', async () => {
            //await boardsPage.selectBoardVisibility('Workspace All members');
            //await boardsPage.selectBoardVisibilityUsingHelper('Workspace All members');

            await boardsPage.visibilityDropdown.select(BoardVisibility.Workspace);
        });

        await test.step('Click the Create board submit button', async () => {
            await boardsPage.clickCreateBoardSubmitButton();
        });

        await test.step('Verify the new board details page is visible', async () => {
            await boardDetailsPage.expectPageIsVisible(boardName);
        });

        await test.step('Go back to home', async () => {
            await boardDetailsPage.authenticatedHeader.clickBackToHomeButtonAndExpectBoardsPage();
        });

        await test.step('Verify the new board is visible on the boards page', async () => {
            await boardsPage.expectBoardIsVisibleInTheWorkspacesSection(boardName);
        });
    });
});