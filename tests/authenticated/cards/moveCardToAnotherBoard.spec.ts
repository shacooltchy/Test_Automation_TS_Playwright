import { test } from "../../../fixtures/pages";
import { createList } from "../../../helpers/api/lists/createList";
import { createBoard } from "../../../helpers/api/boards/createBoard";
import { deleteTestBoard } from "../../../helpers/testDataHelpers/deleteTestBoard";
import { createCard } from "../../../helpers/api/cards/createCard";
import { randomName } from "../../../utils/stringUtils";
import { QuickCardEditorOption } from "../../../enums/quickCardEditorOption";

test.describe('Move card to another board', {tag: '@card'}, () => {
    test.use({ storageState: 'playwright/.auth/user.json'});
    let boardName: string;
    let listName: string;
    let cardTitle: string;
    let boardName2: string;
    let listName2: string;
    let cardTitle2: string;
            
    test.beforeEach(async({ page, boardDetailsPage }) => {
        // Create boards, lists and cards via API
        boardName = randomName('Board');
        listName = randomName('List');
        cardTitle = randomName('Card');
        boardName2 = randomName('Board 2');
        listName2 = randomName('List 2');
        cardTitle2 = randomName('Card 2');
        
        const board = await createBoard(boardName);
        const list = await createList(listName, board.id);
        await createCard(cardTitle, list.id);
        const board2 = await createBoard(boardName2);
        const list2 = await createList(listName2, board2.id);
        await createCard(cardTitle2, list2.id); // Create a card in the second list to be able to move the first card before it and verify the position

        // Navigate to board via UI
        await page.goto(board.url);
        await boardDetailsPage.expectPageVisible(boardName);
        await boardDetailsPage.adBanner.minimizeIfVisible();
    });
                    
    test.afterEach(async () => {
        // Clean up created board via API
        await deleteTestBoard(boardName);
        await deleteTestBoard(boardName2);
    });

    test('Move card to another board', async( {boardDetailsPage, boardsPage} ) => {
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
            await boardDetailsPage.list.card.quickCardEditor.moveCardActionDialog.expectDialogVisible();
        });

        await test.step('Select new board', async() => {
            await boardDetailsPage.list.card.quickCardEditor.moveCardActionDialog.boardSelectDropdown.selectOption(boardName2);
        });

        await test.step('Select new list', async() => {
            await boardDetailsPage.list.card.quickCardEditor.moveCardActionDialog.listSelectDropdown.selectOption(listName2);
        });

        await test.step('Select position', async() => {
            await boardDetailsPage.list.card.quickCardEditor.moveCardActionDialog.positionSelectDropdown.selectOption('1');
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

        await test.step('Verify card is not visible in the old list', async() => {
            await boardDetailsPage.list.card.expectCardNotVisible(cardTitle, listName);
        });

        await test.step('Navigate to the second board', async() => {
            await boardDetailsPage.authenticatedHeader.clickBackToHomeButton();
            await boardsPage.expectPageVisible();
            await boardsPage.navigateToBoardFromWorkspacesSection(boardName2);
            await boardDetailsPage.expectPageVisible(boardName2);
        });

        await test.step('Verify card is visible in the new list', async() => {
            await boardDetailsPage.list.card.expectCardVisible(cardTitle, listName2);
        });

        await test.step('Verify card position in the new list', async() => {
            await boardDetailsPage.list.expectCardPositionInList(cardTitle, listName2, 1);
        });
    });
});