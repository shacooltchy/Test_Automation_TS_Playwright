import { test } from "../../fixtures/pages";
import { createList } from "../../helpers/api/lists/createList";
import { createBoard } from "../../helpers/api/boards/createBoard";
import { deleteTestBoard } from "../../helpers/testDataHelpers/deleteTestBoard";
import { createNewCard } from "../../helpers/api/cards/createNewCard";
import { BoardMenuOption } from "../../enums/BoardMenuOption";
import { QuickCardEditorOption } from "../../enums/QuickCardEditorOption";
import { CardEditorAction } from "../../enums/CardEditorAction";

test.describe('Archive a card tests', {tag: '@cards'}, () => {
    let boardName: string;
    let listName: string;
    let cardTitle: string;
            
    test.beforeEach(async({ homePage, loginPage, boardsPage, boardDetailsPage }) => {
        // Create a board and, a list and a card via API
        boardName = `Board ${Date.now()}`;
        listName = `List ${Date.now()}`;
        cardTitle = `Card ${Date.now()}`;

        const board = await createBoard(boardName);
        const list = await createList(listName, board.id);
        await createNewCard(cardTitle, list.id);

        // Log in via UI
        await homePage.navigate();
        await homePage.expectPageIsVisible();
        await homePage.headerMenu.clickLogIn();
        await loginPage.logIn();
        await boardsPage.expectPageIsVisible();
        await boardsPage.navigateToBoardFromWorkspacesSection(boardName);
        await boardDetailsPage.expectPageIsVisible(boardName);
    });
                    
    test.afterEach(async () => {
        // Clean up created board via API
        await deleteTestBoard(boardName);
    });

    test('Archive a card in the quick card editor', async( {boardDetailsPage} ) => {
        await test.step('Click edit card button', async() => {
            await boardDetailsPage.list.card.clickEditCardButton(cardTitle);
        });

        await test.step('Verify quick card editor is visible', async() => {
            await boardDetailsPage.list.card.quickCardEditor.expectQuickCardEditorIsVisible();
        });

        await test.step('Click archive button in the quick card editor', async() => {
            await boardDetailsPage.list.card.quickCardEditor.clickOption(QuickCardEditorOption.Archive);
        });

        await test.step('Verify card is not visible in the list', async() => {
            await boardDetailsPage.list.card.expectCardIsNotVisible(cardTitle);
        });

        await test.step('Click the board menu', async() => {
            await boardDetailsPage.clickOnBoardMenuButton();
        });

        await test.step('Click Archived items option', async() => {
            await boardDetailsPage.boardMenu.clickOption(BoardMenuOption.ArchivedItems);
        });

        await test.step('Verify Archived Items popover is visible', async() => {
            await boardDetailsPage.boardMenu.archivedItems.expectPopoverIsVisible();
        });

        await test.step('Show archived cards', async() => {
            await boardDetailsPage.boardMenu.archivedItems.viewArchivedItems('Cards');
        });

        await test.step('Verify erchived card is visble in the Archived items list', async() => {
            await boardDetailsPage.boardMenu.archivedItems.expectItemIsArchived(cardTitle);
        });
    });

    test('Archive a card in the card editor', async( {boardDetailsPage} ) => {
        await test.step('Click card', async() => {
            await boardDetailsPage.list.card.clickCard(cardTitle);
        });

        await test.step('Verify card editor is visible', async() => {
            await boardDetailsPage.cardEditor.expectCardEditorIsVisible();
        });

        await test.step('Click Actions button in the card editor', async() => {
            await boardDetailsPage.cardEditor.clickActionsButton();
        });

        await test.step('Click the Archive option', async() => {
            await boardDetailsPage.cardEditor.clickAction(CardEditorAction.Archive);
        });

        await test.step('Verify card is marked Archived', async() => {
            await boardDetailsPage.cardEditor.expectCardIsArchived();
        });

        await test.step('Close the card editor', async() => {
            await boardDetailsPage.cardEditor.clickCloseButton();
        });

        await test.step('Verify card editor is not visible', async() => {
            await boardDetailsPage.cardEditor.expectCardEditorIsNotVisible();
        });

        await test.step('Verify card is not visible in the list', async() => {
            await boardDetailsPage.list.card.expectCardIsNotVisible(cardTitle);
        });

        await test.step('Click the board menu', async() => {
            await boardDetailsPage.clickOnBoardMenuButton();
        });

        await test.step('Click Archived items option', async() => {
            await boardDetailsPage.boardMenu.clickOption(BoardMenuOption.ArchivedItems);
        });

        await test.step('Verify Archived Items popover is visible', async() => {
            await boardDetailsPage.boardMenu.archivedItems.expectPopoverIsVisible();
        });

        await test.step('Show archived cards', async() => {
            await boardDetailsPage.boardMenu.archivedItems.viewArchivedItems('Cards');
        });

        await test.step('Verify erchived card is visble in the Archived items list', async() => {
            await boardDetailsPage.boardMenu.archivedItems.expectItemIsArchived(cardTitle);
        });
    });
});