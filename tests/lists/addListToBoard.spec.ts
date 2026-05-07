import { expect } from "@playwright/test";
import { test } from "../../fixtures/pages";
import { createBoard } from "../../helpers/api/boards/createBoard";
import { deleteTestBoard } from "../../helpers/testDataHelpers/deleteTestBoard";
import { randomName } from "../../utils/stringUtils";

test.describe('Add a list test', {tag: '@list'}, () => {
    test.use({ storageState: 'playwright/.auth/user.json'});
    let boardName: string;
    
    test.beforeEach(async({ page, boardDetailsPage }) => {
        // Create a board via API
        boardName = randomName('Board');
        const board = await createBoard(boardName);
        
        // Navigate to board via UI
        await page.goto(board.url);
        await boardDetailsPage.expectPageVisible(boardName);
        await boardDetailsPage.adBanner.minimizeIfVisible();
    });

    test.afterEach(async () => {
        // Clean up created board via API
        await deleteTestBoard(boardName);
    });

    test('Cancel adding list to the board', async({boardDetailsPage}) => {
        await test.step('Click Add a list button', async() => {
            await boardDetailsPage.clickAddAListButton();
        });

        await test.step('Verify new list form is visible', async() => {
            await boardDetailsPage.newListForm.expectVisible();
        });

        await test.step('Click add list cancel button', async() => {
            boardDetailsPage.newListForm.clickCancelAddListButton();
        });

        await test.step('Verify Add list form is not visible', async() => {
            boardDetailsPage.newListForm.expectNotVisible();
        });

        await test.step('Verify Add list button is visible', async() => {
            await expect(boardDetailsPage.addListButton).toBeVisible();
        });
    });

    test('Add a list to the board', async({ boardDetailsPage }) => {
        let listName = randomName('List');
        await test.step('Click Add a list button', async() => {
            await boardDetailsPage.clickAddAListButton();
        });

        await test.step('Verify new list form is visible', async() => {
            await boardDetailsPage.newListForm.expectVisible();
        });

        await test.step('Enter list name', async() => {
            await boardDetailsPage.newListForm.enterNewListName(listName);
        });

        await test.step('Click add list button', async() => {
            await boardDetailsPage.newListForm.clickAddListButton();
        });

        await test.step('Verify new list is visible on the board', async() => {
            await boardDetailsPage.list.expectVisible(listName);
        });
    });
});