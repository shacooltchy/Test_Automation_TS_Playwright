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
            await boardsPage.createBoardDialog.expectVisible();
        });

        await test.step('Select board background', async () => {
            await boardsPage.createBoardDialog.selectBackground();
        });

        await test.step('Enter board title', async () => {
            await boardsPage.createBoardDialog.boardTitleTextbox.fill(boardName);
        });

        await test.step('Select board visibility', async () => {
            await boardsPage.createBoardDialog.visibilityDropdown.selectOption(BoardVisibility.Workspace);
        });

        await test.step('Click the Create board submit button', async () => {
            await boardsPage.createBoardDialog.createButton.click();
        });

        await test.step('Verify the new board details page is visible', async () => {
            await boardDetailsPage.expectPageVisible(boardName);
        });

        await test.step('Go back to home button', async () => {
            await boardDetailsPage.authenticatedHeader.backToHomeButton.click();
            await boardsPage.expectPageVisible();
        });

        await test.step('Verify the new board is visible on the boards page', async () => {
            await boardsPage.expectBoardVisibleInTheWorkspacesSection(boardName);
        });
    });
});