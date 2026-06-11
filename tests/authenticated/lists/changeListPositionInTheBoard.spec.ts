import { ListAction } from "../../../enums/listAction";
import { test } from "../../../fixtures/pages";
import { createBoard } from "../../../helpers/api/boards/createBoard";
import { createList } from "../../../helpers/api/lists/createList";
import { deleteTestBoard } from "../../../helpers/testDataHelpers/deleteTestBoard";
import { randomName } from "../../../utils/stringUtils";

test.describe('Change list position in the board tests', {tag: '@list'}, () => {
    test.use({ storageState: 'playwright/.auth/user.json'});
    let boardName: string;
    let listName: string;

    test.beforeEach(async({ page, boardDetailsPage }) => {
        // Create aboard and a list via API
        boardName = randomName('Board');
        listName = randomName('List');
        const board = await createBoard(boardName);
        await createList(listName, board.id);
                            
        // Navigate to board via UI
        await page.goto(board.url);
        await boardDetailsPage.expectPageVisible(boardName);
        await boardDetailsPage.adBanner.minimizeIfVisible();
    });

    test.afterEach(async() => {
        // Clean up created boards via API
        await deleteTestBoard(boardName);
    });

    test('Change list position', async({ boardDetailsPage}) => {
        await test.step('Open list actions menu', async() => {
            await boardDetailsPage.list.openListActionsMenu(listName);
            await boardDetailsPage.list.listActionsMenu.expectVisible();
        });

        await test.step('Click Move list option', async() => {
            await boardDetailsPage.list.listActionsMenu.clickAction(ListAction.MoveList);
        });

        await test.step('Verify Move list dialog is visible', async() => {
            await boardDetailsPage.list.moveListActionDialog.expectDialogVisible();
        });

        await test.step('Select new position', async() => {
            await boardDetailsPage.list.moveListActionDialog.positionSelectDropdown.selectOption('2');
        });

        await test.step('Click Move button', async() => {
            await boardDetailsPage.list.moveListActionDialog.actionButton.click();
        });

        await test.step('Verify list is visible', async() => {
            await boardDetailsPage.list.expectVisible(listName);
        });

        await test.step('Verify list position', async() => {
            await boardDetailsPage.expectListPosition(listName, 2);
        });
    });
});