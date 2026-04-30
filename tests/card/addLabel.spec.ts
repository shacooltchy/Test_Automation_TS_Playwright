import { test } from "../../fixtures/pages";
import { createList } from "../../helpers/api/lists/createList";
import { createBoard } from "../../helpers/api/boards/createBoard";
import { deleteTestBoard } from "../../helpers/testDataHelpers/deleteTestBoard";
import { createCard } from "../../helpers/api/cards/createCard";
import { randomName } from "../../utils/stringUtils";
import { AddToCardAction } from "../../components/card/cardEditor/addToCardDialog";

test.describe('Add card label tests', {tag: '@card'}, () => {
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
        await createCard(cardTitle, list.id);

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

    //fix locator for selecting a label
    test.skip('Add a label to a card', async( {boardDetailsPage} ) => {
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
            await boardDetailsPage.cardEditor.addToCardDialog.expectDialogIsVisible();
        });

        await test.step('Click the Labels button in the Add to card dialog', async() => {
            await boardDetailsPage.cardEditor.addToCardDialog.clickAddToCardAction(AddToCardAction.Labels);
        });

        await test.step('Verify Labels dialog is visible', async() => {
            await boardDetailsPage.cardEditor.labelsDialog.expectDialogIsVisible();
        });

        await test.step('Click a label in the Labels dialog', async() => {
            await boardDetailsPage.cardEditor.labelsDialog.clickLabel('yellow');
        });

        await test.step('Close the Labels dialog', async() => {
            await boardDetailsPage.cardEditor.labelsDialog.closeDialog();
        });

        await test.step('Verify Labels dialog is not visible', async() => {
            await boardDetailsPage.cardEditor.labelsDialog.expectDialogIsNotVisible();
        });

        await test.step('Verify label is added to the card editor', async() => {
            await boardDetailsPage.cardEditor.expectLabel('yellow');
        });
    });
});