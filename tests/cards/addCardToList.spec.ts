import { ListAction } from "../../enums/ListAction";
import { test } from "../../fixtures/pages";
import { createBoard } from "../../helpers/api/boards/createBoard";
import { createList } from "../../helpers/api/lists/createList";
import { deleteTestBoard } from "../../helpers/testDataHelpers/deleteTestBoard";
import { randomName } from "../../utils/stringUtils";

test.describe('Add a card to the list tests', {tag: '@cards'}, () => {
    let boardName: string;
    let listName: string;
        
    test.beforeEach(async({ homePage, loginPage, boardsPage, boardDetailsPage }) => {
        // Create a board and a list via API
        boardName = randomName('Board');
        listName = randomName('List');
        const board = await createBoard(boardName);
        await createList(listName, board.id);
                        
        // Log in via UI
        await homePage.navigate();
        await homePage.expectPageIsVisible();
        await homePage.headerMenu.clickLogIn();
        await loginPage.logIn();
        await boardsPage.expectPageIsVisible();
        await boardsPage.newFeaturesBanner.closeIfVisible();
        await boardsPage.navigateToBoardFromWorkspacesSection(boardName);
        await boardDetailsPage.expectPageIsVisible(boardName);
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

        await test.step('Click Add Card button', async() => {
            await boardDetailsPage.list.clickAddCardButton();
        });

        await test.step('Verify card is added', async() => {
            await boardDetailsPage.list.card.expectCardIsVisible(cardTitle, listName);
        });

        await test.step('Enter a title of another card', async() => {
            await boardDetailsPage.list.enterATitle(cardTitle2)
        });

        await test.step('Click Add Card button', async() => {
            await boardDetailsPage.list.clickAddCardButton();
        });

        await test.step('Verify card is added', async() => {
            await boardDetailsPage.list.card.expectCardIsVisible(cardTitle2, listName);
        });

        await test.step('Close add a card form', async() => {
            await boardDetailsPage.list.clickCloseAddCardFormButton();
        });

        await test.step('Verify add card form is not visible', async() => {
            await boardDetailsPage.list.expectAddCardFormIsNotVisible();
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

        await test.step('Click Add Card button', async() => {
            await boardDetailsPage.list.clickAddCardButton();
        });

        await test.step('Verify card is added', async() => {
            await boardDetailsPage.list.card.expectCardIsVisible(cardTitle, listName);
        });
    });
});