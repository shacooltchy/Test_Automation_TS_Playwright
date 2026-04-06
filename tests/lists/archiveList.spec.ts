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

    test('Archive a list', async({ boardDetailsPage} ) => {
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
    });
});