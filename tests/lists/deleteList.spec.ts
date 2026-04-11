import { test } from "../../fixtures/pages";
import { createBoard } from "../../helpers/api/boards/createBoard";
import { createList } from "../../helpers/api/lists/createList";
import { archiveUnarchiveList } from "../../helpers/api/lists/archiveUnarchiveList";
import { deleteTestBoard } from "../../helpers/testDataHelpers/deleteTestBoard";
import { BoardMenuOption } from "../../enums/BoardMenuOption";

test.describe('Delete a list tests', () => {
    let boardName: string;
    let listName: string;
    
    test.beforeEach(async({ homePage, loginPage, boardsPage, boardDetailsPage }) => {
        // Create a board, a list and archive a list via API
        boardName = `Board ${Date.now()}`;
        listName = `List ${Date.now()}`;
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

    test('Delete a list', async({ boardDetailsPage } ) => {
        await test.step('Open board menu', async() => {
            await boardDetailsPage.clickOnBoardMenuButton();
        });

        await test.step('Verify board menu is visible', async() => {
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
    
        await test.step('Delete a list', async() => {
            await boardDetailsPage.boardMenu.archivedItems.deleteItem(listName);
        });

        await test.step('Verify confirmation dialog is visible', async() => {
            await boardDetailsPage.boardMenu.archivedItems.deleteItemConfirmationDialog.expectDialogToBeVisible();
        });

        await test.step('Confirm list deletion', async() => {
            await boardDetailsPage.boardMenu.archivedItems.deleteItemConfirmationDialog.clickConfirmButton();
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
    
        await test.step('Verify list is not visible on the board', async() => {
            await boardDetailsPage.list.expectListIsNotVisible(listName);
        });
    });
});