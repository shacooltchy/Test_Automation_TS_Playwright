import { test } from "../../../fixtures/pages";
import { createBoard } from "../../../helpers/api/boards/createBoard";
import { createList } from "../../../helpers/api/lists/createList";
import { deleteTestBoard } from "../../../helpers/testDataHelpers/deleteTestBoard";
import { randomName } from "../../../utils/stringUtils";

test.describe('Add a card to the list using a template tests', {tag: '@card'}, () => {
    test.use({ storageState: 'playwright/.auth/user.json'});
    let boardName: string;
    let listName: string;
    let cardTemplateTitle: string;
        
    test.beforeEach(async({ page, boardDetailsPage }) => {
        // Create a board and a list via API
        boardName = randomName('Board');
        listName = randomName('List');
        cardTemplateTitle = randomName('Card template');

        const board = await createBoard(boardName);
        await createList(listName, board.id);
                        
        // Navigate to board via UI
        await page.goto(board.url);
        await boardDetailsPage.expectPageVisible(boardName);
        await boardDetailsPage.adBanner.minimizeIfVisible();

        await boardDetailsPage.list.clickCreateCardFromTemplateButton(listName);
        await boardDetailsPage.list.cardTemplatesDialog.clickCreateANewTemplateButton();
        await boardDetailsPage.list.cardTemplatesDialog.enterTitle(cardTemplateTitle);
        await boardDetailsPage.list.cardTemplatesDialog.clickAddButton();
        await boardDetailsPage.cardTemplateEditor.clickCloseButton();

    });
                
    test.afterEach(async () => {
        // Clean up created board via API
        await deleteTestBoard(boardName);
    });
    
    test('Add a card using a template', async({ boardDetailsPage } ) => {
        await test.step('Click the Create from template button', async() => {
            await boardDetailsPage.list.clickCreateCardFromTemplateButton(listName);
        });

        await test.step('Click card template', async() => {
            await boardDetailsPage.list.cardTemplatesDialog.clickCardTemplate(cardTemplateTitle);
        });

        await test.step('Verify Create card dialog is visible', async() => {
            await boardDetailsPage.list.createCardDialog.expectVisible();
        });

        await test.step('Click Create card button', async() => {
            await boardDetailsPage.list.createCardDialog.clickCreateCardButton();
        });

        await test.step('Verify Create card dialog is not visible', async() => {
            await boardDetailsPage.list.createCardDialog.expectNotVisible();
        });

        await test.step('Verify card is added and has the same name as card template', async() => {
            await boardDetailsPage.list.card.expectCardVisible(cardTemplateTitle, listName);
        });
    });
});