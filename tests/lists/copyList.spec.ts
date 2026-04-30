import { ListAction } from "../../enums/listAction";
import {test} from "../../fixtures/pages";
import { createBoard } from "../../helpers/api/boards/createBoard";
import { createCard } from "../../helpers/api/cards/createCard";
import { createList } from "../../helpers/api/lists/createList";
import { deleteTestBoard } from "../../helpers/testDataHelpers/deleteTestBoard";
import { randomName } from "../../utils/stringUtils";

test.describe('Copy list tests', () => {
    let boardName: string;
    let listName: string;
    let cardTitle: string;

    test.beforeEach(async({ homePage, loginPage, boardsPage, boardDetailsPage }) => {
        // Create a board and a list via API
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

    test('Copy a list', async({ boardDetailsPage }) => {
        await test.step('Open list actions', async() => {
            await boardDetailsPage.list.openListActionsMenu(listName);
            await boardDetailsPage.list.listActionsMenu.expectListActionsMenuIsVisible();
        });

        await test.step('Click Copy list option', async() => {
            await boardDetailsPage.list.listActionsMenu.clickAction(ListAction.CopyList);
        });

        await test.step('Verify Copy list confirmation dialog is visible', async() => {
            await boardDetailsPage.list.copyListConfirmationDialog.expectDialogToBeVisible();
        });

        await test.step('Verify the default name in the confirmation dialog is correct', async() => {
            await boardDetailsPage.list.copyListConfirmationDialog.expectTextAreaValue(listName);
        });

        let copiedListName: string;
        await test.step('Change the default name for the copied list', async() => {
            copiedListName = `${listName} Copy`;
            await boardDetailsPage.list.copyListConfirmationDialog.enterText(copiedListName);
        });

        await test.step('Click Create list button on the confirmation dialog', async() => {
            await boardDetailsPage.list.copyListConfirmationDialog.clickConfirmButton();
        });

        await test.step('Verify the list is copied with the correct name', async() => {
            await boardDetailsPage.list.expectListIsVisible(copiedListName);
        });

        await test.step('Verify the card from the original list is copied to the new list', async() => {
            await boardDetailsPage.list.card.expectCardVisible(cardTitle, copiedListName);
        });

        await test.step('Verify the original list is still visible', async() => {
            await boardDetailsPage.list.expectListIsVisible(listName);
            await boardDetailsPage.list.card.expectCardVisible(cardTitle, listName);
        });
    });
});
    