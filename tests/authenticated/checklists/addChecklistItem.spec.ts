import { test } from "../../../fixtures/pages";
import { randomName } from "../../../utils/stringUtils";
import { deleteTestBoard } from "../../../helpers/testDataHelpers/deleteTestBoard";
import { createBoard } from "../../../helpers/api/boards/createBoard";
import { createList } from "../../../helpers/api/lists/createList";
import { createCard } from "../../../helpers/api/cards/createCard";
import { createChecklist } from "../../../helpers/api/checklists/createChecklist";
import { expect } from "@playwright/test";


test.describe('Add and item to a checklist tests', {tag: '@checklist'}, () => {
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

    test('Add an item', async({boardDetailsPage}) => {
        const itemTitle = randomName('Checklist item');

        await test.step('Click card', async() => {
            await boardDetailsPage.list.card.clickCard(cardTitle);
        });

        await test.step('Verify card editor is visible', async() => {
            await boardDetailsPage.cardEditor.expectVisible();
        });

        await test.step('Click Add an item button', async() => {
            await boardDetailsPage.cardEditor.checklist.clickAddAnItemButton(checklistTitle);
        });

        await test.step('Verify item title textbox is visible', async() => {
            await expect(boardDetailsPage.cardEditor.checklist.itemTitleTextBox).toBeVisible();
        });

        await test.step('Enter item title', async() => {
            await boardDetailsPage.cardEditor.checklist.itemTitleTextBox.fill(itemTitle);
        });

        await test.step('Click add button', async() => {
            await boardDetailsPage.cardEditor.checklist.addButton.click();
        });

        await test.step('Verify item title textbox is still visible', async() => {
            await expect(boardDetailsPage.cardEditor.checklist.itemTitleTextBox).toBeVisible();
        });

        await test.step('Click cancel button', async() => {
            await boardDetailsPage.cardEditor.checklist.cancelButton.click();
        });

        await test.step('Verify item title textbox is not visible', async() => {
            await expect(boardDetailsPage.cardEditor.checklist.itemTitleTextBox).not.toBeVisible();
        });

        await test.step('Verify item is added to the checklist', async() => {
            await boardDetailsPage.cardEditor.checklist.expectItem(checklistTitle, itemTitle);
        });

        await test.step('Close card editor', async() => {
            await boardDetailsPage.cardEditor.close();
        });

        await test.step('Verify card has a checklist', async() => {
            await boardDetailsPage.list.card.expectCardHasChecklist(cardTitle, listName);
        });

        await test.step('Clisk the checklist badge', async() => {
            await boardDetailsPage.list.card.clickChecklistBadge(cardTitle, listName);
        });

        await test.step('Verify Checklist section is visible', async() => {
            await boardDetailsPage.list.card.expectChecklistSectionVisible(cardTitle, listName);
        });

        await test.step('Verify Checklist item is visible', async() => {
            await boardDetailsPage.list.card.expectChecklistItemVisible(cardTitle, listName, itemTitle);
        });
    });
});