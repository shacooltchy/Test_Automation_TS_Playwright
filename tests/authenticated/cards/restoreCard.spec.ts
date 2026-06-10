import { BoardMenuOption } from "../../../components/board/boardMenu/boardPopoverMenu";
import { CardEditorAction } from "../../../enums/cardEditorAction";
import { test } from "../../../fixtures/pages";
import { createBoard } from "../../../helpers/api/boards/createBoard";
import { archiveUnarchiveCard } from "../../../helpers/api/cards/archiveUnarchiveCard";
import { createCard } from "../../../helpers/api/cards/createCard";
import { createList } from "../../../helpers/api/lists/createList";
import { deleteTestBoard } from "../../../helpers/testDataHelpers/deleteTestBoard";
import { randomName } from "../../../utils/stringUtils";

test.describe('Unarchive a card tests', {tag: '@card'}, () => {
    test.use({ storageState: 'playwright/.auth/user.json'});
    let boardName: string;
    let listName: string;
    let cardTitle: string;
            
    test.beforeEach(async({ page, boardDetailsPage }) => {
        // Create a board and, a list,a card and archive a card via API
        boardName = randomName('Board');
        listName = randomName('List');
        cardTitle = randomName('Card');

        const board = await createBoard(boardName);
        const list = await createList(listName, board.id);
        const card = await createCard(cardTitle, list.id);
        await archiveUnarchiveCard(card.id, true);

        // Navigate to board via UI
        await page.goto(board.url);
        await boardDetailsPage.expectPageVisible(boardName);
        await boardDetailsPage.adBanner.minimizeIfVisible();
    });
                    
    test.afterEach(async () => {
        // Clean up created board via API
        await deleteTestBoard(boardName);
    });

    test('Restore a card', async( {boardDetailsPage} ) => {
        await test.step('Open board menu', async() => {
            await boardDetailsPage.clickOnBoardMenuButton();
            await boardDetailsPage.boardMenu.expectMenuToBeVisible();
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
    
        await test.step('Verify the card is on the Archived items list', async() => {
            await boardDetailsPage.boardMenu.archivedItems.expectItemIsArchived(cardTitle);
        });

        await test.step('Unarchive a card', async() => {
            await boardDetailsPage.boardMenu.archivedItems.restoreItem(cardTitle);
        });

        await test.step('Verify the list in not on the Archived items list', async() => {
            await boardDetailsPage.boardMenu.archivedItems.expectItemIsNotArchived(cardTitle);
        });

        await test.step('Click close button on archived items list', async() => {
            await boardDetailsPage.boardMenu.archivedItems.closeButton.click();
        });

        await test.step('Verify Archived items list is not visible', async() => {
            await boardDetailsPage.boardMenu.archivedItems.expectNotVisible();
        });

        await test.step('Verify card is visible on the board', async() => {
            await boardDetailsPage.list.card.expectCardVisible(cardTitle, listName);
        });
    });

    test('Restore a card in the card editor', async( {boardDetailsPage} ) => {
        await test.step('Open board menu', async() => {
            await boardDetailsPage.clickOnBoardMenuButton();
            await boardDetailsPage.boardMenu.expectMenuToBeVisible();
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
    
        await test.step('Verify the card is on the Archived items list', async() => {
            await boardDetailsPage.boardMenu.archivedItems.expectItemIsArchived(cardTitle);
        });

        await test.step('Open card editor of the archived card', async() => {
            await boardDetailsPage.boardMenu.archivedItems.openCardEditor(cardTitle);
        });

        await test.step('Verify card editor is visible', async() => {
            await boardDetailsPage.cardEditor.expectVisible();
        });

        await test.step('Click the Actions button in the card editor', async() => {
            await boardDetailsPage.cardEditor.actionsButton.click();
        });

        await test.step('Click the Restore option in the card editor', async() => {
            await boardDetailsPage.cardEditor.clickAction(CardEditorAction.Restore);
        });

        await test.step('Verify card is not marked Archived', async() => {
            await boardDetailsPage.cardEditor.expectCardNotArchived();
        });

        await test.step('Close the card editor', async() => {
            await boardDetailsPage.cardEditor.close();
        });

        await test.step('Verify card is visible on the board', async() => {
            await boardDetailsPage.list.card.expectCardVisible(cardTitle, listName);
        });
    });
});