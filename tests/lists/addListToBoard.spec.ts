import { test } from "../../fixtures/pages";
import { createBoard } from "../../helpers/api/boards/createBoard";
import { deleteTestBoard } from "../../helpers/testDataHelpers/deleteTestBoard";

test.describe('Add a list test', () => {
    let boardName: string;
    test.beforeEach(async({ homePage, loginPage, boardsPage, boardDetailsPage }) => {
        // Create a board via API
        boardName = `Board ${Date.now()}`;
        await createBoard(boardName);
        
        // Log in via UI
        await homePage.navigate();
        await homePage.header.expectHeaderTitleIsVisible('Capture, organize, and tackle your to-dos from anywhere.');
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

    test('Add a list to the board', async({ boardDetailsPage }) => {
        let listName = `List ${Date.now()}`
        await test.step('Click Add a list button', async() => {
            await boardDetailsPage.clickAddAListButton();
        });

        await test.step('Verify new list form is visible', async() => {
            await boardDetailsPage.newListForm.expectNewListFormIsVisible();
        });

        await test.step('Enter list name', async() => {
            await boardDetailsPage.newListForm.enterNewListName(listName);
        });

        await test.step('Click add list button', async() => {
            await boardDetailsPage.newListForm.clickAddListButton();
        });

        await test.step('Verify new list is visible on the board', async() => {
            await boardDetailsPage.list.expectListIsVisible(listName);
        });
    });
});