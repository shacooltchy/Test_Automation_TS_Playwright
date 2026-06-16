import { BoardMenuOption, BoardMenuVisibilityStatus } from "../../../components/board/boardMenu/boardPopoverMenu";
import { ChangeVisibilityPopoverOption } from "../../../components/board/boardMenu/changeVisibility";
import { test } from "../../../fixtures/pages";
import { createBoard } from "../../../helpers/api/boards/createBoard";
import { deleteTestBoard } from "../../../helpers/testDataHelpers/deleteTestBoard";
import { randomName } from "../../../utils/stringUtils";

test.describe('Change board visibility tests', {tag: '@boards'}, () => {
    test.use({ storageState: 'playwright/.auth/user.json'});
    let boardName: string;

    test.beforeEach(async ({page, boardDetailsPage }) => {
        //create a board via API and navigate to boards page
        boardName = randomName('Board');
        let board = await createBoard(boardName);
        // navigate to board details page
        await page.goto(board.url);
        await boardDetailsPage.expectPageVisible(boardName);
        await boardDetailsPage.adBanner.minimizeIfVisible();
    });

    test.afterEach(async ({ page }) => {
        //delete the created board via API
        await deleteTestBoard(boardName);
    });

    test('Change board visibility to workspace', async ({ boardDetailsPage, page }) => {
        await test.step('Open board menu', async () => {
            await boardDetailsPage.boardMenuButton.click();
            await boardDetailsPage.boardMenu.expectVisible();
        });

        await test.step('Click visibility option', async () => {
            await boardDetailsPage.boardMenu.clickOption(BoardMenuOption.Visibility);
        });

        await test.step('Verify visibility popover is visible', async () => {
            await boardDetailsPage.boardMenu.changeVisibilityPopover.expectVisible();
        });

        await test.step('Verify workspace option not selected', async () => {
            await boardDetailsPage.boardMenu.changeVisibilityPopover.expectVisibilityNotSelected(ChangeVisibilityPopoverOption.Workspace);
        });

        await test.step('Change visibility to workspace', async () => {
            await boardDetailsPage.boardMenu.changeVisibilityPopover.selectVisibility(ChangeVisibilityPopoverOption.Workspace);
        });

        await test.step('Verify visibility is changed to workspace', async () => {
            await boardDetailsPage.boardMenu.changeVisibilityPopover.expectVisibilitySelected(ChangeVisibilityPopoverOption.Workspace);
        });

        await test.step('Close visibility popover', async () => {
            await boardDetailsPage.boardMenu.changeVisibilityPopover.closeButton.click();
            await boardDetailsPage.boardMenu.changeVisibilityPopover.expectNotVisible();
        });

        await test.step('Verify board visibility is updated in the board menu', async () => {
            await boardDetailsPage.boardMenu.expectVisibilitySelected(BoardMenuVisibilityStatus.Workspace);
        });

        await test.step('Refresh the page and verify visibility is still workspace', async () => {
            await page.reload();
            await boardDetailsPage.expectPageVisible(boardName);
            await boardDetailsPage.boardMenuButton.click();
            await boardDetailsPage.boardMenu.expectVisibilitySelected(BoardMenuVisibilityStatus.Workspace);
        });
    });
});