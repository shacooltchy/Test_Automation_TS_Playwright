import { test } from "../../../fixtures/pages";
import { createBoard } from "../../../helpers/api/boards/createBoard";
import { createCard } from "../../../helpers/api/cards/createCard";
import { createCheckitemOnChecklist } from "../../../helpers/api/checklists/createCheckitemOnChecklist";
import { createChecklist } from "../../../helpers/api/checklists/createChecklist";
import { createList } from "../../../helpers/api/lists/createList";
import { deleteTestBoard } from "../../../helpers/testDataHelpers/deleteTestBoard";
import { randomName } from "../../../utils/stringUtils";

test.describe('Check a checklist item tests', {tag: '@checklist'}, () => {
    test.use({ storageState: 'playwright/.auth/user.json'});
    let boardName: string;
    let listName: string;
    let cardTitle: string;
    let checklistTitle: string;
    let itemTitle: string;
    let itemTitle2: string;
    let itemTitle3: string;
    let itemTitle4: string;
            
    test.beforeEach(async({ page, boardDetailsPage }) => {
        // Create a board, a list, a card and a checklist with items via API
        boardName = randomName('Board');
        listName = randomName('List');
        cardTitle = randomName('Card');
        checklistTitle = randomName('Checklist');
        itemTitle = randomName('Checklist item');
        itemTitle2 = randomName('Checklist item');
        itemTitle3 = randomName('Checklist item');
        itemTitle4 = randomName('Checklist item');

        const board = await createBoard(boardName);
        const list = await createList(listName, board.id);
        const card = await createCard(cardTitle, list.id);
        const checklist = await createChecklist(checklistTitle, card.id);
        await createCheckitemOnChecklist(itemTitle, checklist.id);
        await createCheckitemOnChecklist(itemTitle2, checklist.id);
        await createCheckitemOnChecklist(itemTitle3, checklist.id);
        await createCheckitemOnChecklist(itemTitle4, checklist.id);

        // Navigate to board via UI
        await page.goto(board.url);
        await boardDetailsPage.expectPageVisible(boardName);
        await boardDetailsPage.adBanner.minimizeIfVisible();
    });

    test.afterEach(async () => {
        // Clean up created board via API
        await deleteTestBoard(boardName);
    });

    test('Check a checkitem in the card editor', async({boardDetailsPage}) => {
        await test.step('Verify checklist badge progress is 0/4', async() => {
            await boardDetailsPage.list.card.expectChecklistBadgeProgress(cardTitle, listName, '0/4');
        });

        await test.step('Open card editor', async() => {
            await boardDetailsPage.list.card.clickCard(cardTitle);
            await boardDetailsPage.cardEditor.expectVisible();
        });

        await test.step('Check the first checklist item', async() => {
            await boardDetailsPage.cardEditor.checklist.checkItem(checklistTitle, itemTitle);
        });

        await test.step('Verify the checklist progress is 25%', async() => {
            await boardDetailsPage.cardEditor.checklist.expectChecklistProgress(checklistTitle, '0.25');
        });

        await test.step('Check the second checklist item', async() => {
            await boardDetailsPage.cardEditor.checklist.checkItem(checklistTitle, itemTitle2);
        });

        await test.step('Verify the checklist progress is 50%', async() => {
            await boardDetailsPage.cardEditor.checklist.expectChecklistProgress(checklistTitle, '0.5');
        });

        await test.step('Check the third checklist item', async() => {
            await boardDetailsPage.cardEditor.checklist.checkItem(checklistTitle, itemTitle3);
        });

        await test.step('Verify the checklist progress is 75%', async() => {
            await boardDetailsPage.cardEditor.checklist.expectChecklistProgress(checklistTitle, '0.75');
        });

        await test.step('Check the fourth checklist item', async() => {
            await boardDetailsPage.cardEditor.checklist.checkItem(checklistTitle, itemTitle4);
        });

        await test.step('Verify the checklist progress is 100%', async() => {
            await boardDetailsPage.cardEditor.checklist.expectChecklistProgress(checklistTitle, '1');
        });

        await test.step('Close card editor', async() => {
            await boardDetailsPage.cardEditor.close();
        });

        await test.step('Verify checklist badge progress is 4/4', async() => {
            await boardDetailsPage.list.card.expectChecklistBadgeProgress(cardTitle, listName, '4/4');
        });

        await test.step('Reopen card editor', async() => {
            await boardDetailsPage.list.card.clickCard(cardTitle);
            await boardDetailsPage.cardEditor.expectVisible();
        });

        await test.step('Uncheck the second checklist item', async() => {
            await boardDetailsPage.cardEditor.checklist.uncheckItem(checklistTitle, itemTitle2);
        });

        await test.step('Verify the checklist progress is 75%', async() => {
            await boardDetailsPage.cardEditor.checklist.expectChecklistProgress(checklistTitle, '0.75');
        });

        await test.step('Close card editor', async() => {
            await boardDetailsPage.cardEditor.close();
        });

        await test.step('Verify checklist badge progress is 3/4', async() => {
            await boardDetailsPage.list.card.expectChecklistBadgeProgress(cardTitle, listName, '3/4');
        });
    });
});
