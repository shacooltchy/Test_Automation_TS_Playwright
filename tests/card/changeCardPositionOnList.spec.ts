import { test } from "../../fixtures/pages";
import { createList } from "../../helpers/api/lists/createList";
import { createBoard } from "../../helpers/api/boards/createBoard";
import { deleteTestBoard } from "../../helpers/testDataHelpers/deleteTestBoard";
import { createNewCard } from "../../helpers/api/cards/createNewCard";
import { randomName } from "../../utils/stringUtils";
import { QuickCardEditorOption } from "../../enums/quickCardEditorOption";

test.describe('Change card position on list tests', {tag: '@card'}, () => {
    let boardName: string;
    let listName: string;
    let cardTitle: string;
            
    test.beforeEach(async({ homePage, loginPage, boardsPage, boardDetailsPage }) => {
        // Create a board and, a list and a card via API
        boardName = randomName('Board');
        listName = randomName('List');
        cardTitle = randomName('Card');

        const board = await createBoard(boardName);
        const list = await createList(listName, board.id);
        await createNewCard(cardTitle, list.id);
        await createNewCard(randomName('Card'), list.id); // Create a second card to be able to change position of the first card

        // Log in via UI
        await homePage.navigate();
        await homePage.expectPageVisible();
        await homePage.headerMenu.clickLogIn();
        await loginPage.logIn();
        await boardsPage.expectPageVisible();
        await boardsPage.newFeaturesBanner.closeIfVisible();
        await boardsPage.navigateToBoardFromWorkspacesSection(boardName);
        await boardDetailsPage.expectPageVisible(boardName);
        await boardDetailsPage.adBanner.minimizeIfVisible();
    });
                    
    test.afterEach(async () => {
        // Clean up created board via API
        await deleteTestBoard(boardName);
    });

    test('Change card position on list in the quick card editor', async( {boardDetailsPage} ) => {
        await test.step('Click edit card button', async() => {
            await boardDetailsPage.list.card.clickEditCardButton(cardTitle);
        });

        await test.step('Verify quick card editor is visible', async() => {
            await boardDetailsPage.list.card.quickCardEditor.expectQuickCardEditorVisible();
        });

        await test.step('Click Move button in the quick card editor', async() => {
            await boardDetailsPage.list.card.quickCardEditor.clickOption(QuickCardEditorOption.Move);
        });

        await test.step('Verify Move card dialog is visible', async() => {
            await boardDetailsPage.list.card.quickCardEditor.moveCardActionDialog.expectDialogToBeVisible();
        });

        await test.step('Select new position', async() => {
            await boardDetailsPage.list.card.quickCardEditor.moveCardActionDialog.positionSelectDropdown.selectOption('2');
        });

        await test.step('Click Move button', async() => {
            await boardDetailsPage.list.card.quickCardEditor.moveCardActionDialog.clickActionButton();
        });

        await test.step('Verify Move card dialog is not visible', async() => {
            await boardDetailsPage.list.card.quickCardEditor.moveCardActionDialog.expectDialogNotVisible();
        });

        await test.step('Verify quick card editor is not visible', async() => {
            await boardDetailsPage.list.card.quickCardEditor.expectQuickCardEditorNotVisible();
        });

        await test.step('Verify card is visible in the list', async() => {
            await boardDetailsPage.list.card.expectCardVisible(cardTitle, listName);
        });

        await test.step('Verify card position in the list', async() => {
            await boardDetailsPage.list.expectCardPositionInList(cardTitle, listName, 2);
        });
    });
});