import { test } from "../../fixtures/pages";
import { createList } from "../../helpers/api/lists/createList";
import { createBoard } from "../../helpers/api/boards/createBoard";
import { deleteTestBoard } from "../../helpers/testDataHelpers/deleteTestBoard";
import { createNewCard } from "../../helpers/api/cards/createNewCard";
import { CardEditorOption } from "../../enums/CardEditorOption";
import { BoardMenuOption } from "../../enums/BoardMenuOption";

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
            await boardDetailsPage.list.card.quickCardEditor.clickOption(CardEditorOption.Archive);
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