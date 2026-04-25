import { ListAction } from "../../enums/listAction";
import { test } from "../../fixtures/pages";
import { createBoard } from "../../helpers/api/boards/createBoard";
import { createList } from "../../helpers/api/lists/createList";
import { deleteTestBoard } from "../../helpers/testDataHelpers/deleteTestBoard";
import { randomName } from "../../utils/stringUtils";

test.describe('Move list to another board tests', () => {
    let boardName: string;
    let boardName2: string;
    let listName: string;

    test.beforeEach(async({ homePage, loginPage, boardsPage, boardDetailsPage }) => {
        // Create 2 boards and a list via API
        boardName = randomName('Board');
        boardName2 = randomName('Board_2');
        listName = randomName('List');
        const board = await createBoard(boardName);
        await createBoard(boardName2);
        await createList(listName, board.id);
                            
        // Log in via UI
        await homePage.navigate();
        await homePage.expectPageVisible();
        await homePage.headerMenu.clickLogIn();
        await loginPage.logIn();
        await boardsPage.expectPageVisible();
        await boardsPage.newFeaturesBanner.closeIfVisible();
        await boardsPage.navigateToBoardFromWorkspacesSection(boardName);
        await boardDetailsPage.expectPageVisible(boardName);
        await boardDetailsPage.adBanner.minimizeIfVisible();
    });

    test.afterEach(async() => {
        // Clean up created boards via API
        await deleteTestBoard(boardName);
        await deleteTestBoard(boardName2);
    });

    test('Move a list to another board', async({ boardDetailsPage, boardsPage }) => {
        await test.step('Open list actions menu', async() => {
            await boardDetailsPage.list.openListActionsMenu(listName);
            await boardDetailsPage.list.listActionsMenu.expectListActionsMenuIsVisible();
        });

        await test.step('Click Move list option', async() => {
            await boardDetailsPage.list.listActionsMenu.clickAction(ListAction.MoveList);
        });

        await test.step('Verify Move list dialog is visible', async() => {
            await boardDetailsPage.list.moveListActionDialog.expectDialogVisible();
        });

        await test.step('Select the destination board', async() => {
            await boardDetailsPage.list.moveListActionDialog.boardSelectDropdown.selectOption(boardName2);
        });

        await test.step('Select the position in the destination board', async() => {
            await boardDetailsPage.list.moveListActionDialog.positionSelectDropdown.selectOption('2');
        });

        await test.step('Click Move button', async() => {
            await boardDetailsPage.list.moveListActionDialog.clickActionButton();
        });

        await test.step('Verify Moved list alert is visible', async() => {
            await boardDetailsPage.movedListAlert.expectAlertIsVisible();
        });

        await test.step('Verify list is not visible on the source board', async() => {
            await boardDetailsPage.list.expectListIsNotVisible(listName);
        });

        await test.step('Navigate to the destination board', async() => {
            await boardDetailsPage.authenticatedHeader.clickBackToHomeButton();
            await boardsPage.expectPageVisible();
            await boardsPage.navigateToBoardFromWorkspacesSection(boardName2);
            await boardDetailsPage.expectPageVisible(boardName2);
        });

        await test.step('Verify list is visible on the destination board', async() => {
            await boardDetailsPage.list.expectListIsVisible(listName);
        });

        await test.step('Verify list position on the destination board', async() => {
            await boardDetailsPage.expectListPosition(listName, 2);
        });
    });
});