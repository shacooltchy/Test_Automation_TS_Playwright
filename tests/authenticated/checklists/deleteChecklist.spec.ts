import { test } from "../../../fixtures/pages";
import { randomName } from "../../../utils/stringUtils";
import { deleteTestBoard } from "../../../helpers/testDataHelpers/deleteTestBoard";
import { createBoard } from "../../../helpers/api/boards/createBoard";
import { createList } from "../../../helpers/api/lists/createList";
import { createCard } from "../../../helpers/api/cards/createCard";
import { createChecklist } from "../../../helpers/api/checklists/createChecklist";


test.describe('Delete checklist tests', {tag: '@checklist'}, () => {
    test.use({ storageState: 'playwright/.auth/user.json'});
    let boardName: string;
    let listName: string;
    let cardTitle: string;
    let checklistTitle: string;
            
    test.beforeEach(async({ page, boardDetailsPage }) => {
        // Create a board and, a list and a card via API
        boardName = randomName('Board');
        listName = randomName('List');
        cardTitle = randomName('Card');
        checklistTitle = randomName('Checklist');


        const board = await createBoard(boardName);
        const list = await createList(listName, board.id);
        const card = await createCard(cardTitle, list.id);
        await createChecklist(checklistTitle, card.id);

        // Navigate to board via UI
        await page.goto(board.url);
        await boardDetailsPage.expectPageVisible(boardName);
        await boardDetailsPage.adBanner.minimizeIfVisible();
    });
                    
    test.afterEach(async () => {
        // Clean up created board via API
        await deleteTestBoard(boardName);
    });

    test('Delete checklist', async({boardDetailsPage}) => {
        await test.step('Click card', async() => {
            await boardDetailsPage.list.card.clickCard(cardTitle);
        });

        await test.step('Verify card editor is visible', async() => {
            await boardDetailsPage.cardEditor.expectVisible();
        });

        await test.step('Click checklist delete button', async() => {
            await boardDetailsPage.cardEditor.checklist.clickDeleteButton(checklistTitle);
        });

        await test.step('Verify Delete checklist confirmation dialog is visible', async() => {
            await boardDetailsPage.cardEditor.checklist.deleteChecklistConfirmationDialog.expectDialogVisible();
        });

        await test.step('Click Delete checklist button in the confirmation dialog', async() => {
            await boardDetailsPage.cardEditor.checklist.deleteChecklistConfirmationDialog.clickActionButton();
        });

        await test.step('Verify checklist is removed from card editor', async() => {
            await boardDetailsPage.cardEditor.checklist.expectNotVisible(checklistTitle);
        });

        await test.step('Reopen card editor and verify checklist is deleted', async() => {
            await boardDetailsPage.cardEditor.clickCloseButton();
            await boardDetailsPage.cardEditor.expectNotVisible();
            await boardDetailsPage.list.card.clickCard(cardTitle);
            await boardDetailsPage.cardEditor.expectVisible();
            await boardDetailsPage.cardEditor.checklist.expectNotVisible(checklistTitle);
        });
    });
});