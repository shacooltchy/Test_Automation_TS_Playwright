import { test } from "../../../fixtures/pages";
import { createList } from "../../../helpers/api/lists/createList";
import { createBoard } from "../../../helpers/api/boards/createBoard";
import { deleteTestBoard } from "../../../helpers/testDataHelpers/deleteTestBoard";
import { createCard } from "../../../helpers/api/cards/createCard";
import { randomName } from "../../../utils/stringUtils";
import { AddToCardAction } from "../../../components/card/cardEditor/addToCardDialog";

test.describe('Add checklist to a card', {tag: '@checklist'}, () => {
    test.use({ storageState: 'playwright/.auth/user.json'});
    let boardName: string;
    let listName: string;
    let cardTitle: string;
            
    test.beforeEach(async({ page, boardDetailsPage }) => {
        // Create a board and, a list and a card via API
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

    test('Add checklist', async( {boardDetailsPage} ) => {
        await test.step('Click card', async() => {
            await boardDetailsPage.list.card.clickCard(cardTitle);
        });

        await test.step('Verify card editor is visible', async() => {
            await boardDetailsPage.cardEditor.expectVisible();
        });

        await test.step('Click Add button in the card editor', async() => {
            await boardDetailsPage.cardEditor.clickAddButton();
        });

        await test.step('Verify Add to card dialog is visible', async() => {
            await boardDetailsPage.cardEditor.addToCardDialog.expectVisible();
        });

        await test.step('Click the Checklist button in the Add to card dialog', async() => {
            await boardDetailsPage.cardEditor.addToCardDialog.clickAddToCardAction(AddToCardAction.Checklist);
        });

        await test.step('Verify Checklist dialog is visible', async() => {
            await boardDetailsPage.cardEditor.addChecklistDialog.expectDialogVisible();
        });

        let checklistTitle = randomName('Checklist');
        await test.step('Enter checklist title', async() => {
            
            await boardDetailsPage.cardEditor.addChecklistDialog.enterTitle(checklistTitle);
        });

        await test.step('Click the Add button', async() => {
            await boardDetailsPage.cardEditor.addChecklistDialog.clickActionButton();
        });

        await test.step('Verify Add checklist dialog is not visible', async() => {
            await boardDetailsPage.cardEditor.addChecklistDialog.expectDialogNotVisible();
        });

        await test.step('Verify checklist is added to the card editor', async() => {
            await boardDetailsPage.cardEditor.checklist.expectVisible(checklistTitle);
        });
    });
});