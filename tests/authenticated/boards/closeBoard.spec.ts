import { BoardMenuOption } from "../../../components/board/boardMenu/boardPopoverMenu";
import { test } from "../../../fixtures/pages";
import { createBoard } from "../../../helpers/api/boards/createBoard";
import { deleteTestBoard } from "../../../helpers/testDataHelpers/deleteTestBoard";
import { randomName } from "../../../utils/stringUtils";

test.describe('Close board tests', {tag: '@boards'}, () => {
    test.use({ storageState: 'playwright/.auth/user.json'});
    let boardName: string;

    test.beforeEach(async ({ boardsPage }) => {
        // Create a board via API
        boardName = randomName('Board');
        await createBoard(boardName);
        // Navigate to boards via UI
        await boardsPage.navigate();
        
    });

    test.afterEach(async () => {
        // Clean up created board via API if it still exists
        await deleteTestBoard(boardName);
    });

    test('Close a board', async ({ boardsPage, boardDetailsPage }) => {
        await test.step('Navigate to the board details page', async () => {
             await boardsPage.navigateToBoardFromWorkspacesSection(boardName);
             await boardDetailsPage.expectPageVisible(boardName);
             await boardDetailsPage.adBanner.minimizeIfVisible();
        }); 

        await test.step('Click on board menu button', async () => {
            await boardDetailsPage.clickOnBoardMenuButton();
            await boardDetailsPage.boardMenu.expectMenuToBeVisible();
        });

        await test.step('Click on Close board button', async () => {
            await boardDetailsPage.boardMenu.clickOption(BoardMenuOption.CloseBoard);
            await boardDetailsPage.boardMenu.closeBoardConfirmationDialog.expectDialogToBeVisible();
        });

        await test.step('Confirm Close board action', async () => {
            await boardDetailsPage.boardMenu.closeBoardConfirmationDialog.clickConfirmButton();
        });

        await test.step('Verify the board is closed', async () => {
            await boardDetailsPage.expectBoardIsClosed();
        }); 

        await test.step('Navigate back to boards page', async () => {
            await boardDetailsPage.authenticatedHeader.clickBackToHomeButton();
            await boardsPage.expectPageVisible();
        });

        await test.step('Verify the closed board is not visible in the workspaces section', async () => {
            await boardsPage.expectBoardNotVisibleInTheWorkspacesSection(boardName);
        });

        await test.step('Click View all closed boards button', async () => {
            await boardsPage.clickViewAllClosedBoardsButton();
        });

        await test.step('Verify the closed board is visible in the closed boards dialog', async () => {
            await boardsPage.closedBoardsDialog.expectBoardVisibleInClosedBoards(boardName);
        });
    });
});