import { BoardMenuOption } from '../../enums/BoardMenuOption';
import { test } from '../../fixtures/pages'
import { createBoard } from '../../helpers/api/boards/createBoard';
import { archiveUnarchiveList } from '../../helpers/api/lists/archiveUnarchiveList';
import { createList } from '../../helpers/api/lists/createList';
import { deleteTestBoard } from '../../helpers/testDataHelpers/deleteTestBoard';
import { randomName } from '../../utils/stringUtils';

test.describe('Unarchive a list tests', () => {
    let boardName: string;
    let listName: string;

    test.beforeEach(async({ homePage, loginPage, boardsPage, boardDetailsPage }) => {
        // Create a board and a list via API
        boardName = randomName('Board');
        listName = randomName('List');
        const board = await createBoard(boardName);
        const list = await createList(listName, board.id);
        await archiveUnarchiveList(list.id, true);
                
        // Log in via UI
        await homePage.navigate();
        await homePage.expectPageIsVisible();
        await homePage.headerMenu.clickLogIn();
        await loginPage.logIn();
        await boardsPage.expectPageIsVisible();
        await boardsPage.navigateToBoardFromWorkspacesSection(boardName);
        await boardDetailsPage.expectPageIsVisible(boardName);
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
            await boardDetailsPage.boardMenu.archivedItems.expectPopoverIsVisible();
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
            await boardDetailsPage.boardMenu.archivedItems.expectPopoverIsNotVisible();
        });

        await test.step('Verify list is visible on the board', async() => {
            await boardDetailsPage.list.expectListIsVisible(listName);
        });
    });
})