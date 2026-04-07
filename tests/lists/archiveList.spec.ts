import { BoardMenuOptions } from "../../enums/BoardMenuOptions";
import { ListAction } from "../../enums/ListAction";
import {test} from "../../fixtures/pages";
import { createBoard } from "../../helpers/api/boards/createBoard";
import { addListToBoard } from "../../helpers/testDataHelpers/addListToBoard";
import { deleteTestBoard } from "../../helpers/testDataHelpers/deleteTestBoard";

test.describe('Archive a list tests', () => {
    let boardName: string;
    let listName: string;

    test.beforeEach(async({ homePage, loginPage, boardsPage, boardDetailsPage }) => {
        // Create a board and a list via API
        boardName = `Board ${Date.now()}`;
        listName = `List ${Date.now()}`;
        await createBoard(boardName);
        await addListToBoard(listName, boardName);
            
        // Log in via UI
        await homePage.navigate();
        await homePage.header.expectHeaderTitleIsVisible('Capture, organize, and tackle your to-dos from anywhere.');
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

    test('Archive a list', async({ boardDetailsPage } ) => {
        await test.step('Open Actions List', async() => {
            await boardDetailsPage.list.openListActionsPopover(listName);
            await boardDetailsPage.list.listActions.expectActionsListPopoverIsVisible();
        });

        await test.step('Click Archive this list option', async() => {
            await boardDetailsPage.list.listActions.clickAction(ListAction.ArchiveThisList);
        });

        await test.step('Verify list alert is visible', async() => {
            await boardDetailsPage.listArchivedAlert.expectAlertIsVisible();
        });

        await test.step('Verify list is not visible on the board', async() => {
            await boardDetailsPage.list.expectListIsNotVisible(listName);
        });

        await test.step('Open board menu', async() => {
            await boardDetailsPage.clickOnBoardMenuButton();
            await boardDetailsPage.boardMenu.expectMenuToBeVisible();
        });

        await test.step('Click Archived items option', async() => {
            await boardDetailsPage.boardMenu.clickOption(BoardMenuOptions.ArchivedItems);
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
    });

    test('Undo archiving a list in the alert modal', async({ boardDetailsPage }) => {
        await test.step('Open Actions List', async() => {
            await boardDetailsPage.list.openListActionsPopover(listName);
            await boardDetailsPage.list.listActions.expectActionsListPopoverIsVisible();
        });

        await test.step('Click Archive this list option', async() => {
            await boardDetailsPage.list.listActions.clickAction(ListAction.ArchiveThisList);
        });

        await test.step('Verify list is not visible on the board', async() => {
            await boardDetailsPage.list.expectListIsNotVisible(listName);
        });

        await test.step('Click undo button in the List archived alert modal', async() => {
            await boardDetailsPage.listArchivedAlert.clickUndoButton();
        });

        await test.step('Verify Unarchived list alert is visible', async() => {
            await boardDetailsPage.unarchivedListAlert.expectAlertIsVisible();
        });

        await test.step('Verify list is visible on the board', async() => {
            await boardDetailsPage.list.expectListIsVisible(listName);
        })
    });
});