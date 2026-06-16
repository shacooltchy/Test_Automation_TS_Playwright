import { ListAction } from "../../../enums/listAction";
import {test} from "../../../fixtures/pages";
import { createBoard } from "../../../helpers/api/boards/createBoard";
import { createCard } from "../../../helpers/api/cards/createCard";
import { createList } from "../../../helpers/api/lists/createList";
import { deleteTestBoard } from "../../../helpers/testDataHelpers/deleteTestBoard";
import { randomName } from "../../../utils/stringUtils";

test.describe('Copy list tests', {tag: '@list'}, () => {
    test.use({ storageState: 'playwright/.auth/user.json'});
    let boardName: string;
    let listName: string;
    let cardTitle: string;

    test.beforeEach(async({ page, boardDetailsPage }) => {
        // Create a board and a list via API
        boardName = randomName('Board');
        listName = randomName('List');
        cardTitle = randomName('Card');
        const board = await createBoard(boardName);
        const list = await createList(listName, board.id);
        await createCard(cardTitle, list.id);
        
        // Navigate to board via UI
        await page.goto(board.url);
        await boardDetailsPage.expectPageVisible(boardName);
        await boardDetailsPage.adBanner.minimizeIfVisible();
    });

    test.afterEach(async () => {
        // Clean up created board via API
        await deleteTestBoard(boardName);
    });

    test('Copy a list', async({ boardDetailsPage }) => {
        await test.step('Open list actions', async() => {
            await boardDetailsPage.list.openListActionsMenu(listName);
            await boardDetailsPage.list.listActionsMenu.expectVisible();
        });

        await test.step('Click Copy list option', async() => {
            await boardDetailsPage.list.listActionsMenu.clickAction(ListAction.CopyList);
        });

        await test.step('Verify Copy list confirmation dialog is visible', async() => {
            await boardDetailsPage.list.copyListConfirmationDialog.expectVisible();
        });

        await test.step('Verify the default name in the confirmation dialog is correct', async() => {
            await boardDetailsPage.list.copyListConfirmationDialog.expectTextAreaValue(listName);
        });

        let copiedListName: string;
        await test.step('Change the default name for the copied list', async() => {
            copiedListName = `${listName} Copy`;
            await boardDetailsPage.list.copyListConfirmationDialog.enterText(copiedListName);
        });

        await test.step('Click Create list button on the confirmation dialog', async() => {
            await boardDetailsPage.list.copyListConfirmationDialog.confirmButton.click();
        });

        await test.step('Verify the list is copied with the correct name', async() => {
            await boardDetailsPage.list.expectVisible(copiedListName);
        });

        await test.step('Verify the card from the original list is copied to the new list', async() => {
            await boardDetailsPage.list.card.expectVisible(cardTitle, copiedListName);
        });

        await test.step('Verify the original list is still visible', async() => {
            await boardDetailsPage.list.expectVisible(listName);
            await boardDetailsPage.list.card.expectVisible(cardTitle, listName);
        });
    });
});
    