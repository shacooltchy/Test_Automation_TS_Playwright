import { test } from "../../../fixtures/pages";
import { createList } from "../../../helpers/api/lists/createList";
import { createBoard } from "../../../helpers/api/boards/createBoard";
import { deleteTestBoard } from "../../../helpers/testDataHelpers/deleteTestBoard";
import { createCard } from "../../../helpers/api/cards/createCard";
import { BoardMenuOption } from "../../../enums/boardMenuOption";
import { QuickCardEditorOption } from "../../../enums/quickCardEditorOption";
import { CardEditorAction } from "../../../enums/cardEditorAction";
import { randomName } from "../../../utils/stringUtils";

test.describe('Archive a card tests', {tag: '@card'}, () => {
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

    test('Archive a card in the quick card editor', async( {boardDetailsPage} ) => {
        await test.step('Click edit card button', async() => {
            await boardDetailsPage.list.card.clickEditCardButton(cardTitle);
        });

        await test.step('Verify quick card editor is visible', async() => {
            await boardDetailsPage.list.card.quickCardEditor.expectVisible();
        });

        await test.step('Click archive button in the quick card editor', async() => {
            await boardDetailsPage.list.card.quickCardEditor.clickOption(QuickCardEditorOption.Archive);
        });

        await test.step('Verify card is not visible in the list', async() => {
            await boardDetailsPage.list.card.expectCardNotVisible(cardTitle, listName);
        });

        await test.step('Click the board menu', async() => {
            await boardDetailsPage.clickOnBoardMenuButton();
        });

        await test.step('Click Archived items option', async() => {
            await boardDetailsPage.boardMenu.clickOption(BoardMenuOption.ArchivedItems);
        });

        await test.step('Verify Archived Items popover is visible', async() => {
            await boardDetailsPage.boardMenu.archivedItems.expectVisible();
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
            await boardDetailsPage.cardEditor.expectVisible();
        });

        await test.step('Click the Actions button in the card editor', async() => {
            await boardDetailsPage.cardEditor.actionsButton.click();
        });

        await test.step('Click the Archive option', async() => {
            await boardDetailsPage.cardEditor.clickAction(CardEditorAction.Archive);
        });

        await test.step('Verify card is marked Archived', async() => {
            await boardDetailsPage.cardEditor.expectCardArchived();
        });

        await test.step('Click close the card editor', async() => {
            await boardDetailsPage.cardEditor.closeButton.click();
        });

        await test.step('Verify card editor is not visible', async() => {
            await boardDetailsPage.cardEditor.expectNotVisible();
        });

        await test.step('Verify card is not visible in the list', async() => {
            await boardDetailsPage.list.card.expectCardNotVisible(cardTitle, listName);
        });

        await test.step('Click the board menu', async() => {
            await boardDetailsPage.clickOnBoardMenuButton();
        });

        await test.step('Click Archived items option', async() => {
            await boardDetailsPage.boardMenu.clickOption(BoardMenuOption.ArchivedItems);
        });

        await test.step('Verify Archived Items popover is visible', async() => {
            await boardDetailsPage.boardMenu.archivedItems.expectVisible();
        });

        await test.step('Show archived cards', async() => {
            await boardDetailsPage.boardMenu.archivedItems.viewArchivedItems('Cards');
        });

        await test.step('Verify erchived card is visble in the Archived items list', async() => {
            await boardDetailsPage.boardMenu.archivedItems.expectItemIsArchived(cardTitle);
        });
    });
});