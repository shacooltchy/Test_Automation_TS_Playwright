import { expect } from "@playwright/test";
import { test } from "../../fixtures/pages";
import { createBoard } from "../../helpers/api/boards/createBoard";
import { deleteTestBoard } from "../../helpers/testDataHelpers/deleteTestBoard";
import { randomName } from "../../utils/stringUtils";

test.describe('Add a list test', () => {
    let boardName: string;
    
    test.beforeEach(async({ homePage, loginPage, boardsPage, boardDetailsPage }) => {
        // Create a board via API
        boardName = randomName('Board');
        await createBoard(boardName);
        
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

    test('Cancel adding list to the board', async({boardDetailsPage}) => {
        await test.step('Click Add a list button', async() => {
            await boardDetailsPage.clickAddAListButton();
        });

        await test.step('Verify new list form is visible', async() => {
            await boardDetailsPage.newListForm.expectNewListFormIsVisible();
        });

        await test.step('Click add list cancel button', async() => {
            boardDetailsPage.newListForm.clickCancelAddListButton();
        });

        await test.step('Verify Add list form is not visible', async() => {
            boardDetailsPage.newListForm.expectNewListFormIsNotVisible();
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