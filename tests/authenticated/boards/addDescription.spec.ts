import { BoardMenuOption } from "../../../components/board/boardMenu/boardPopoverMenu";
import { test } from "../../../fixtures/pages";
import { createBoard } from "../../../helpers/api/boards/createBoard";
import { deleteTestBoard } from "../../../helpers/testDataHelpers/deleteTestBoard";
import { randomName } from "../../../utils/stringUtils";

test.describe('Add description to board tests', {tag: '@boards'}, () => {
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

    test('Add description to board on the Board details page', async ({ boardDetailsPage, page }) => {
        await test.step('Open board menu', async () => {
            await boardDetailsPage.boardMenuButton.click();
            await boardDetailsPage.boardMenu.expectMenuToBeVisible();
        });

        await test.step('Click About this board option', async () => {
            await boardDetailsPage.boardMenu.clickOption(BoardMenuOption.AboutThisBoard);
        });

        await test.step('Verify About this board popover is visible', async () => {
            await boardDetailsPage.boardMenu.aboutThisBoard.expectVisible();
        });

        await test.step('Click description button', async () => {
            await boardDetailsPage.boardMenu.aboutThisBoard.descriptionButton.click();
        });

        await test.step('Verify description editor is visible', async () => {
            await boardDetailsPage.boardMenu.aboutThisBoard.descriptionEditor.expectVisible();
        });

        let descriptionText = 'Board description';
        await test.step('Enter description and save', async () => {
            await boardDetailsPage.boardMenu.aboutThisBoard.descriptionEditor.enterDescription(descriptionText);
            await boardDetailsPage.boardMenu.aboutThisBoard.descriptionEditor.saveButton.click();
        });

        await test.step('Verify description editor is not visible', async () => {
            await boardDetailsPage.boardMenu.aboutThisBoard.descriptionEditor.expectNotVisible();
        });
        
        await test.step('Verify description is added to the board', async () => {
            await boardDetailsPage.boardMenu.aboutThisBoard.expectDescription(descriptionText);
        });

        await test.step('Refresh the page and verify description is still visible', async () => {
            await page.reload();
            await boardDetailsPage.boardMenuButton.click();
            await boardDetailsPage.boardMenu.clickOption(BoardMenuOption.AboutThisBoard);
            await boardDetailsPage.boardMenu.aboutThisBoard.expectDescription(descriptionText);
        });
    });
});
