import { BoardMenuOption } from '../../enums/boardMenuOption';
import { test } from '../../fixtures/pages'
import { createBoard } from '../../helpers/api/boards/createBoard';
import { archiveUnarchiveList } from '../../helpers/api/lists/archiveUnarchiveList';
import { createList } from '../../helpers/api/lists/createList';
import { deleteTestBoard } from '../../helpers/testDataHelpers/deleteTestBoard';
import { randomName } from '../../utils/stringUtils';

test.describe('Unarchive a list tests', {tag: '@list'}, () => {
    test.use({ storageState: 'playwright/.auth/user.json'});
    let boardName: string;
    let listName: string;

    test.beforeEach(async({ page, boardDetailsPage }) => {
        // Create a board and a list via API
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

    test('Restore a list', async({ boardDetailsPage } ) => {
        await test.step('Open board menu', async() => {
            await boardDetailsPage.clickOnBoardMenuButton();
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

        await test.step('Unarchive a list', async() => {
            await boardDetailsPage.boardMenu.archivedItems.restoreItem(listName);
        });

        await test.step('Verify the list in not on the Archived items list', async() => {
            await boardDetailsPage.boardMenu.archivedItems.expectItemIsNotArchived(listName);
        });

        await test.step('Close archived items list', async() => {
            await boardDetailsPage.boardMenu.archivedItems.close();
        });

        await test.step('Verify Archived items list is not visible', async() => {
            await boardDetailsPage.boardMenu.archivedItems.expectNotVisible();
        });

        await test.step('Verify list is visible on the board', async() => {
            await boardDetailsPage.list.expectVisible(listName);
        });
    });
})