import { test } from "../../fixtures/pages";
import { createBoard } from "../../helpers/api/boards/createBoard";
import { deleteBoard } from "../../helpers/api/boards/deleteBoard";
import { getBoards } from "../../helpers/api/boards/getBoards";

test.describe('Delete board tests', () => {
    let boardName: string;
    test.beforeEach(async ({ homePage, loginPage, boardsPage }) => {
        // Create a board via API
        boardName = `Board to delete ${Date.now()}`;
        await createBoard(boardName);

        // Log in via UI
        await homePage.navigate();
        await homePage.header.expectHeaderTitleIsVisible('Capture, organize, and tackle your to-dos from anywhere.');
        await homePage.headerMenu.clickLogIn();
        await loginPage.logIn();
        await boardsPage.expectPageIsVisible();
    });

    test.afterEach(async () => {
        // Clean up created board via API if it still exists
        const boards = await getBoards();
        const board = boards.find((b: any) => b.name === boardName);
        if (board) {
            await deleteBoard(board.id);
        }
    });

    test('Delete a board', async ({ boardsPage, boardDetailsPage }) => {
        await test.step('Navigate to the board details page', async () => {
             await boardsPage.navigateToBoardFromWorkspacesSection(boardName);
             await boardDetailsPage.expectPageIsVisible(boardName);
        });

        await test.step('Click on board menu button', async () => {
            await boardDetailsPage.clickOnBoardMenuButton();
            await boardDetailsPage.expectBoardMenuToBeVisible();
        });

        await test.step('Click on Close board button', async () => {
            await boardDetailsPage.clickCloseBoardButton();
            await boardDetailsPage.expectCloseBoardConfirmationDialogToBeVisible();
        });

        await test.step('Confirm Close board action', async () => {
            await boardDetailsPage.confirmCloseBoard();
        });

        await test.step('Verify the board is closed', async () => {
            await boardDetailsPage.expectBoardIsClosed();
        });

        await test.step('Click on board menu button again', async () => {
            await boardDetailsPage.clickOnBoardMenuButton();
            await boardDetailsPage.expectBoardMenuToBeVisible();
        });

        await test.step('Click on Delete board button', async () => {
            await boardDetailsPage.clickDeleteBoardButton();
            await boardDetailsPage.expectDeleteBoardConfirmationDialogToBeVisible();
        });

        await test.step('Confirm Delete board action', async () => {
            await boardDetailsPage.confirmDeleteBoard();
        });

        await test.step('Verify the board is no longer visible in the workspace section', async () => {
            await boardsPage.expectPageIsVisible();
            await boardsPage.expectBoardIsNotVisibleInTheWorkspacesSection(boardName);
        });
    });
});
