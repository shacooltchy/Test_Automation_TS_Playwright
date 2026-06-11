import { test } from "../../../fixtures/pages";
import { createBoard } from "../../../helpers/api/boards/createBoard";
import { createList } from "../../../helpers/api/lists/createList";
import { archiveUnarchiveList } from "../../../helpers/api/lists/archiveUnarchiveList";
import { deleteTestBoard } from "../../../helpers/testDataHelpers/deleteTestBoard";
import { randomName } from "../../../utils/stringUtils";
import { BoardMenuOption } from "../../../components/board/boardMenu/boardPopoverMenu";

test.describe('Delete a list tests', {tag: '@list'}, () => {
    test.use({ storageState: 'playwright/.auth/user.json'});
    let boardName: string;
    let listName: string;
    
    test.beforeEach(async({ page, boardDetailsPage }) => {
        // Create a board, a list and archive a list via API
        boardName = randomName('Board');
        listName = randomName('List');
        const board = await createBoard(boardName);
        const list = await createList(listName, board.id);
        await archiveUnarchiveList(list.id, true);
                    
        // Navigate to board via UI
        await page.goto(board.url);
        await boardDetailsPage.expectPageVisible(boardName);
        await boardDetailsPage.adBanner.minimizeIfVisible();
    });
            
    test.afterEach(async () => {
        // Clean up created board via API
        await deleteTestBoard(boardName);
    });

    test('Delete a list', async({ boardDetailsPage } ) => {
        await test.step('Open board menu', async() => {
            await boardDetailsPage.boardMenuButton.click();
        });

        await test.step('Verify board menu is visible', async() => {
            await boardDetailsPage.boardMenu.expectMenuToBeVisible();
        });
        
        await test.step('Click Archived items option', async() => {
            await boardDetailsPage.boardMenu.clickOption(BoardMenuOption.ArchivedItems);
        });
        
        await test.step('Verify Archived Items popover is visible', async() => {
            await boardDetailsPage.boardMenu.archivedItems.expectVisible();
        });
        
        await test.step('Show archived lists', async() => {
            await boardDetailsPage.boardMenu.archivedItems.viewArchivedItems('Lists');
        });
        
        await test.step('Verify the list is on the Archived items list', async() => {
            await boardDetailsPage.boardMenu.archivedItems.expectItemIsArchived(listName);
        });
    
        await test.step('Delete a list', async() => {
            await boardDetailsPage.boardMenu.archivedItems.deleteItem(listName);
        });

        await test.step('Verify confirmation dialog is visible', async() => {
            await boardDetailsPage.boardMenu.archivedItems.deleteItemConfirmationDialog.expectDialogToBeVisible();
        });

        await test.step('Confirm list deletion', async() => {
            await boardDetailsPage.boardMenu.archivedItems.deleteItemConfirmationDialog.confirmButton.click();
        });
    
        await test.step('Verify the list in not on the Archived items list', async() => {
            await boardDetailsPage.boardMenu.archivedItems.expectItemIsNotArchived(listName);
        });
    
        await test.step('Click close button on archived items list', async() => {
            await boardDetailsPage.boardMenu.archivedItems.closeButton.click();
        });
    
        await test.step('Verify Archived items list is not visible', async() => {
            await boardDetailsPage.boardMenu.archivedItems.expectNotVisible();
        });
    
        await test.step('Verify list is not visible on the board', async() => {
            await boardDetailsPage.list.expectNotVisible(listName);
        });
    });
});