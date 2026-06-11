import { BoardMenuOption } from "../../../components/board/boardMenu/boardPopoverMenu";
import { test } from "../../../fixtures/pages";
import { createBoard } from "../../../helpers/api/boards/createBoard";
import { closeTestBoard } from "../../../helpers/testDataHelpers/closeTestBoard";
import { deleteTestBoard } from "../../../helpers/testDataHelpers/deleteTestBoard";
import { randomName } from "../../../utils/stringUtils";

test.describe('Reopen board tests', {tag: '@boards'}, () => {
    test.use({ storageState: 'playwright/.auth/user.json'});
    let boardName: string;
    
    test.beforeEach(async ({ boardsPage }) => {
        // Create and close a board via API
        boardName = randomName('Board');
        await createBoard(boardName);
        await closeTestBoard(boardName);
        // Navigate to boards via UI
        await boardsPage.navigate();
    });
    
    test.afterEach(async () => {
        // Clean up created board via API
        await deleteTestBoard(boardName);
    });

    test('Reopen a closed board in the Closed Boards dialog', async ({ boardsPage }) => {
        await test.step('Click View all closed boards button', async () => {
            await boardsPage.clickViewAllClosedBoardsButton();
        });

        await test.step('Verify the closed boards dialog is visible', async () => {
            await boardsPage.closedBoardsDialog.expectVisible();
        });

        await test.step('Click the reopen board button in the closed boards dialog', async () => {
            await boardsPage.closedBoardsDialog.clickReopenBoardButton(boardName);
        });

        await test.step('Verify the Reopen board confirmation banner is visible in the closed boards dialog', async () => {
            await boardsPage.closedBoardsDialog.reopenBoardConfirmationDialog.expectDialogToBeVisible();
        });

        await test.step('Confirm Reopen board action in the closed boards dialog', async () => {
            await boardsPage.closedBoardsDialog.reopenBoardConfirmationDialog.confirmButton.click();
        });

        await test.step('Verify the board is no longer visible in the closed boards dialog', async () => {
            await boardsPage.closedBoardsDialog.expectBoardNotVisibleInClosedBoards(boardName);
        });

        await test.step('Close the closed boards dialog', async () => {
            await boardsPage.closedBoardsDialog.close();
        });

        await test.step('Verify the reopened board is visible in the workspaces section', async () => {
            await boardsPage.expectBoardVisibleInTheWorkspacesSection(boardName);
        });
    });

    test('Reopen a closed board on the Board details page', async({ boardsPage, boardDetailsPage}) => {
        await test.step('Click View all closed boards button', async () => {
            await boardsPage.clickViewAllClosedBoardsButton();
        });

        await test.step('Navigate to the board details from the closed boards dialog', async () => {
            await boardsPage.closedBoardsDialog.navigateToBoard(boardName);
            await boardDetailsPage.expectPageVisible(boardName);
            await boardDetailsPage.adBanner.minimizeIfVisible();
        });

        await test.step('Click on board menu button', async () => {
            await boardDetailsPage.boardMenuButton.click();
            await boardDetailsPage.boardMenu.expectMenuToBeVisible();
        });

        await test.step('Click on Reopen board button', async () => {
            await boardDetailsPage.boardMenu.clickOption(BoardMenuOption.ReopenBoard);
        });

        await test.step('Verify the Reopen board confirmation dialog is visible', async () => {
            await boardDetailsPage.boardMenu.reopenBoardConfirmationDialog.expectDialogToBeVisible();
        });

        await test.step('Confirm Reopen board action', async () => {
            await boardDetailsPage.boardMenu.reopenBoardConfirmationDialog.confirmButton.click();
        });
        
        await test.step('Verify the board details page is visible and the board is reopened', async () => {
            await boardDetailsPage.expectBoardIsNotClosed();
        });

        await test.step('Navigate back to boards page', async () => {
            await boardDetailsPage.authenticatedHeader.backToHomeButton.click();
            await boardsPage.expectPageVisible();
        });

        await test.step('Verify the reopened board is visible in the workspaces section', async () => {
            await boardsPage.expectBoardVisibleInTheWorkspacesSection(boardName);
        });
    });
});