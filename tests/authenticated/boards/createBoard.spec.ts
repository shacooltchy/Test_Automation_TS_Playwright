import { BoardVisibility } from "../../../enums/boardVisibility";
import { test } from "../../../fixtures/pages";
import { deleteTestBoard } from "../../../helpers/testDataHelpers/deleteTestBoard";
import { randomName } from "../../../utils/stringUtils";

test.describe('Create board tests', {tag: '@boards'}, () => {
    test.use({ storageState: 'playwright/.auth/user.json'});
    let boardName: string;

    test.beforeEach(async ({ boardsPage }) => {
        // Navigate to boards via UI
        await boardsPage.navigate();
    });

    test.afterEach(async () => {
        // Clean up created boards via API if needed
        await deleteTestBoard(boardName);
    });

    test('Create new board', async ({ boardsPage, boardDetailsPage }) => {
        boardName = randomName('Board');

        await test.step('Click the Create new board tile', async () => {
            await boardsPage.clickCreateNewBoardTile();
        });

        await test.step('Verify the Create board modal is visible', async () => {
            await boardsPage.expectCreateBoardModalVisible();
        });

        await test.step('Select board background', async () => {
            await boardsPage.selectBoardBackground();
        });

        await test.step('Enter board title', async () => {
            await boardsPage.enterBoardTitle(boardName);
        });

        await test.step('Select board visibility', async () => {
            await boardsPage.visibilityDropdown.selectOption(BoardVisibility.Workspace);
        });

        await test.step('Click the Create board submit button', async () => {
            await boardsPage.clickCreateBoardSubmitButton();
        });

        await test.step('Verify the new board details page is visible', async () => {
            await boardDetailsPage.expectPageVisible(boardName);
        });

        await test.step('Go back to home', async () => {
            await boardDetailsPage.authenticatedHeader.clickBackToHomeButton();
            await boardsPage.expectPageVisible();
        });

        await test.step('Verify the new board is visible on the boards page', async () => {
            await boardsPage.expectBoardVisibleInTheWorkspacesSection(boardName);
        });
    });
});