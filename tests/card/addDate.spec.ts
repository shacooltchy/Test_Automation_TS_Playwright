import { test } from "../../fixtures/pages";
import { createList } from "../../helpers/api/lists/createList";
import { createBoard } from "../../helpers/api/boards/createBoard";
import { deleteTestBoard } from "../../helpers/testDataHelpers/deleteTestBoard";
import { createNewCard } from "../../helpers/api/cards/createNewCard";
import { randomName } from "../../utils/stringUtils";
import { AddToCardAction } from "../../components/card/cardEditor/addToCardDialog";

test.describe('Add date to a card', {tag: '@card'}, () => {
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

        // Log in via UI and navigate to a board
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

    test('Add due date to a card', async( {boardDetailsPage} ) => {
        await test.step('Click card', async() => {
            await boardDetailsPage.list.card.clickCard(cardTitle);
        });

        await test.step('Verify card editor is visible', async() => {
            await boardDetailsPage.cardEditor.expectCardEditorIsVisible();
        });

        await test.step('Click Add button in the card editor', async() => {
            await boardDetailsPage.cardEditor.clickAddButton();
        });

        await test.step('Verify Add to card dialog is visible', async() => {
            await boardDetailsPage.cardEditor.addToCardDialog.expectDialogIsVisible();
        });

        await test.step('Click the Dates button in the Add to card dialog', async() => {
            await boardDetailsPage.cardEditor.addToCardDialog.clickAddToCardAction(AddToCardAction.Dates);
        });

        await test.step('Verify Dates dialog is visible', async() => {
            await boardDetailsPage.cardEditor.datesDialog.expectDialogIsVisible();
        });

        await test.step('Select date in calendar', async() => {
            await boardDetailsPage.cardEditor.datesDialog.calendar.selectDate('8/23/2027');
        });

        await test.step('Click Save button in the Dates dialog', async() => {
            await boardDetailsPage.cardEditor.datesDialog.clickSaveButton();
        });

        await test.step('Verify due date is added to the card editor', async() => {
            await boardDetailsPage.cardEditor.expectDueDate('Aug 23, 2027');
        });

        await test.step('Close card editor', async() => {
            await boardDetailsPage.cardEditor.clickCloseButton();
            await boardDetailsPage.cardEditor.expectCardEditorIsNotVisible();
        });

        await test.step('Verify due date is added to the card', async() => {
            await boardDetailsPage.list.card.expectCardHasDueDate(cardTitle, listName);
        });
    });
});