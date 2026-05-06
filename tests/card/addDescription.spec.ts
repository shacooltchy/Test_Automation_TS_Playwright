import { test } from "../../fixtures/pages";
import { createList } from "../../helpers/api/lists/createList";
import { createBoard } from "../../helpers/api/boards/createBoard";
import { deleteTestBoard } from "../../helpers/testDataHelpers/deleteTestBoard";
import { createCard } from "../../helpers/api/cards/createCard";
import { randomName } from "../../utils/stringUtils";

test.describe('Add card description', {tag: '@card'}, () => {
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

    test('Add description to a card', async( {boardDetailsPage} ) => {
        await test.step('Click card', async() => {
            await boardDetailsPage.list.card.clickCard(cardTitle);
        });

        await test.step('Verify card editor is visible', async() => {
            await boardDetailsPage.cardEditor.expectVisible();
        });

        await test.step('Click description button in the card editor', async() => {
            await boardDetailsPage.cardEditor.clickDescriptionButton();
        });

        await test.step('Verify description text editor is visible', async() => {
            await boardDetailsPage.cardEditor.descriptionTextEditor.expectVisible();
        });

        await test.step('Enter description', async() => {
            await boardDetailsPage.cardEditor.descriptionTextEditor.enterDescription('Card description')
        });

        await test.step('Click save button', async() => {
            await boardDetailsPage.cardEditor.descriptionTextEditor.clickSaveButton();
        });

        await test.step('Verify description text editor is not visible', async() => {
            await boardDetailsPage.cardEditor.descriptionTextEditor.expectNotVisible();
        });

        await test.step('Verify description is added to the card editor', async() => {
            await boardDetailsPage.cardEditor.expectDescription('Card description');
        });

        await test.step('Close card editor', async() => {
            await boardDetailsPage.cardEditor.clickCloseButton();
            await boardDetailsPage.cardEditor.expectNotVisible();
        });

        await test.step('Verify card is marked that it has description', async() => {
            await boardDetailsPage.list.card.expectCardHasDescription(cardTitle, listName);
        });
    });
});