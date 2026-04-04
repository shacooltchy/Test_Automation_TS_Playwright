import { BoardMenuOptions } from "../../enums/BoardMenuOptions";
import { test } from "../../fixtures/pages";
import { createBoard } from "../../helpers/api/boards/createBoard";
import { deleteTestBoard } from "../../helpers/testDataHelpers/deleteTestBoard";

test.describe('Close board tests', {tag: '@boards'}, () => {
    let boardName: string;

    test.beforeEach(async ({ homePage, loginPage, boardsPage }) => {
        // Create a board via API
        boardName = `Board to close ${Date.now()}`;
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
        await deleteTestBoard(boardName);
    });

    test('Close a board', async ({ boardsPage, boardDetailsPage }) => {
        await test.step('Navigate to the board details page', async () => {
             await boardsPage.navigateToBoardFromWorkspacesSection(boardName);
             await boardDetailsPage.expectPageIsVisible(boardName);
        }); 

        await test.step('Click on board menu button', async () => {
            await boardDetailsPage.clickOnBoardMenuButton();
            await boardDetailsPage.boardMenu.expectMenuToBeVisible();
        });

        await test.step('Click on Close board button', async () => {
            await boardDetailsPage.boardMenu.clickOption(BoardMenuOptions.CloseBoard);
            await boardDetailsPage.boardMenu.closeBoardConfirmationDialog.expectDialogToBeVisible();
        });

        await test.step('Confirm Close board action', async () => {
            await boardDetailsPage.boardMenu.closeBoardConfirmationDialog.clickConfirmButton();
        });

        await test.step('Verify the board is closed', async () => {
            await boardDetailsPage.expectBoardIsClosed();
        }); 

        await test.step('Navigate back to boards page', async () => {
            await boardDetailsPage.authenticatedHeader.clickBackToHomeButtonAndExpectBoardsPage();
        });

        await test.step('Verify the closed board is not visible in the workspaces section', async () => {
            await boardsPage.expectBoardIsNotVisibleInTheWorkspacesSection(boardName);
        });

        await test.step('Click View all closed boards button', async () => {
            await boardsPage.clickViewAllClosedBoardsButton();
        });

        await test.step('Verify the closed board is visible in the closed boards dialog', async () => {
            await boardsPage.closedBoardsDialog.expectBoardIsVisibleInClosedBoards(boardName);
        });
    });
});