import { expect } from "@playwright/test";
import { ListAction } from "../../../enums/listAction";
import { test } from "../../../fixtures/pages";
import { createBoard } from "../../../helpers/api/boards/createBoard";
import { createList } from "../../../helpers/api/lists/createList";
import { deleteTestBoard } from "../../../helpers/testDataHelpers/deleteTestBoard";
import { randomName } from "../../../utils/stringUtils";

test.describe('Add a card to the list tests', {tag: '@card'}, () => {
    test.use({ storageState: 'playwright/.auth/user.json'});
    let boardName: string;
    let listName: string;
        
    test.beforeEach(async({ page, boardDetailsPage }) => {
        // Create a board and a list via API
        boardName = randomName('Board');
        listName = randomName('List');
        const board = await createBoard(boardName);
        await createList(listName, board.id);
                        
        // Navigate to board via UI
        await page.goto(board.url);
        await boardDetailsPage.expectPageVisible(boardName);
        await boardDetailsPage.adBanner.minimizeIfVisible();
    });
                
    test.afterEach(async () => {
        // Clean up created board via API
        await deleteTestBoard(boardName);
    });
    
    test('Add a card', async({ boardDetailsPage } ) => {
        const cardTitle = randomName('Card');
        const cardTitle2 = randomName('Card_2');

        await test.step('Click add a card button', async() => {
            await boardDetailsPage.list.clickAddACardButton(listName);
        });

        await test.step('Enter a card title', async() => {
            await boardDetailsPage.list.enterATitle(cardTitle)
        });

        await test.step('Click Add Card button in the card composer', async() => {
            await boardDetailsPage.list.cardComposerCreateANewCardButton.click();
        });

        await test.step('Verify card is added', async() => {
            await boardDetailsPage.list.card.expectCardVisible(cardTitle, listName);
        });

        await test.step('Enter a title of another card', async() => {
            await boardDetailsPage.list.enterATitle(cardTitle2)
        });

        await test.step('Click Add Card button in the card composer', async() => {
            await boardDetailsPage.list.cardComposerCreateANewCardButton.click();
        });

        await test.step('Verify card is added', async() => {
            await boardDetailsPage.list.card.expectCardVisible(cardTitle2, listName);
        });

        await test.step('Close add a card form', async() => {
            await boardDetailsPage.list.cardComposerCloseButton.click();
        });

        await test.step('Verify add card form is not visible', async() => {
            await expect(boardDetailsPage.list.cardComposerForm).not.toBeVisible();
        });
    });

    test('Add a card using list actions menu', async({ boardDetailsPage } ) => {
        const cardTitle = randomName('Card');

        await test.step('Open list actions', async() => {
            await boardDetailsPage.list.openListActionsMenu(listName);
        });

        await test.step('Click Add a card option', async() => {
            await boardDetailsPage.list.listActionsMenu.clickAction(ListAction.AddCard);
        });

        await test.step('Enter a card title', async() => {
            await boardDetailsPage.list.enterATitle(cardTitle)
        });

        await test.step('Click Add Card button in the card composer', async() => {
            await boardDetailsPage.list.cardComposerCreateANewCardButton.click();
        });

        await test.step('Verify card is added', async() => {
            await boardDetailsPage.list.card.expectCardVisible(cardTitle, listName);
        });
    });
});