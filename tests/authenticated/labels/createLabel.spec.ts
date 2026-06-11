import { BoardMenuOption } from "../../../components/board/boardMenu/boardPopoverMenu";
import { NewLabelColor } from "../../../components/board/boardMenu/createNewLabelDialog";
import { LabelColor } from "../../../components/card/cardEditor/labelsDialog";
import { test } from "../../../fixtures/pages";
import { createBoard } from "../../../helpers/api/boards/createBoard";
import { deleteTestBoard } from "../../../helpers/testDataHelpers/deleteTestBoard";
import { randomName } from "../../../utils/stringUtils";

test.describe('Create new label tests', {tag: '@labels'}, () => {
    test.use({ storageState: 'playwright/.auth/user.json'});
    let boardName: string;

    test.beforeEach(async ({ page, boardDetailsPage }) => {
        // Create a board via API
        boardName = randomName('Board');
        const board = await createBoard(boardName);
        // Navigate to board via UI
        await page.goto(board.url);
        await boardDetailsPage.expectPageVisible(boardName);
        await boardDetailsPage.adBanner.minimizeIfVisible();
    });

    test.afterEach(async () => {
        // Clean up created board via API
        await deleteTestBoard(boardName);
    });

    test('Create a new label in the board menu', async ({ boardDetailsPage }) => {
        const labelName = randomName('Label');
        await test.step('Open board menu', async () => {
            await boardDetailsPage.boardMenuButton.click();
        });

        await test.step('Click the Labels option in the board menu', async () => {
            await boardDetailsPage.boardMenu.clickOption(BoardMenuOption.Labels);
        });

        await test.step('Verify Labels dialog is visible', async () => {
            await boardDetailsPage.boardMenu.boardMenuLabelsDialog.expectVisible();
        });

        await test.step('Click Create new label button in the Labels dialog', async () => {
            await boardDetailsPage.boardMenu.boardMenuLabelsDialog.createNewLabelButton.click();
        });

        await test.step('Verify Create a new label dialog is visible', async () => {
            await boardDetailsPage.boardMenu.createNewLabelDialog.expectVisible();
        });

        await test.step('Enter label title', async () => {
            await boardDetailsPage.boardMenu.createNewLabelDialog.labelTitle.fill(labelName);
        });

        await test.step('Select label color', async () => {
            await boardDetailsPage.boardMenu.createNewLabelDialog.selectColor(NewLabelColor.subtle_green);
        });

        await test.step('Click Create button in the Create new label dialog', async () => {
            await boardDetailsPage.boardMenu.createNewLabelDialog.createButton.click();
        });

        await test.step('Verify Create a new label dialog is not visible', async () => {
            await boardDetailsPage.boardMenu.createNewLabelDialog.expectNotVisible();
        });

        await test.step('Verify the new label is visible in the Labels dialog', async () => {
            await boardDetailsPage.boardMenu.boardMenuLabelsDialog.expectLabel(LabelColor.subtle_green, labelName);
        });
    });
});