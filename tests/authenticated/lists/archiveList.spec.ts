import { BoardMenuOption } from "../../../components/board/boardMenu/boardPopoverMenu";
import { ListAction } from "../../../enums/listAction";
import {test} from "../../../fixtures/pages";
import { createBoard } from "../../../helpers/api/boards/createBoard";
import { addListToBoard } from "../../../helpers/testDataHelpers/addListToBoard";
import { deleteTestBoard } from "../../../helpers/testDataHelpers/deleteTestBoard";
import { randomName } from "../../../utils/stringUtils";

test.describe('Archive a list tests', {tag: '@list'}, () => {
    test.use({ storageState: 'playwright/.auth/user.json'});
    let boardName: string;
    let listName: string;

    test.beforeEach(async({ page, boardDetailsPage }) => {
        // Create a board and a list via API
        boardName = randomName('Board');
        listName = randomName('List');
        const board = await createBoard(boardName);
        await addListToBoard(listName, boardName);
            
        // Navigate to board via UI
        await page.goto(board.url);
        await boardDetailsPage.expectPageVisible(boardName);
        await boardDetailsPage.adBanner.minimizeIfVisible();
    });
    
    test.afterEach(async () => {
        // Clean up created board via API
        await deleteTestBoard(boardName);
    });

    test('Archive a list', async({ boardDetailsPage } ) => {
        await test.step('Open Actions List', async() => {
            await boardDetailsPage.list.openListActionsMenu(listName);
            await boardDetailsPage.list.listActionsMenu.expectVisible();
        });

        await test.step('Click Archive this list option', async() => {
            await boardDetailsPage.list.listActionsMenu.clickAction(ListAction.ArchiveThisList);
        });

        await test.step('Verify list alert is visible', async() => {
            await boardDetailsPage.listArchivedAlert.expectVisible();
        });

        await test.step('Verify list is not visible on the board', async() => {
            await boardDetailsPage.list.expectNotVisible(listName);
        });

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
    });

    test('Undo archiving a list in the alert modal', async({ boardDetailsPage }) => {
        await test.step('Open Actions List', async() => {
            await boardDetailsPage.list.openListActionsMenu(listName);
            await boardDetailsPage.list.listActionsMenu.expectVisible();
        });

        await test.step('Click Archive this list option', async() => {
            await boardDetailsPage.list.listActionsMenu.clickAction(ListAction.ArchiveThisList);
        });

        await test.step('Verify list is not visible on the board', async() => {
            await boardDetailsPage.list.expectNotVisible(listName);
        });

        await test.step('Click undo button in the List archived alert modal', async() => {
            await boardDetailsPage.listArchivedAlert.clickButton('Undo');
        });

        await test.step('Verify Unarchived list alert is visible', async() => {
            await boardDetailsPage.unarchivedListAlert.expectVisible();
        });

        await test.step('Verify list is visible on the board', async() => {
            await boardDetailsPage.list.expectVisible(listName);
        })
    });
});