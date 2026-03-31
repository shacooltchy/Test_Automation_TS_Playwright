import { test } from "../../fixtures/pages";
import { createBoard } from "../../helpers/api/boards/createBoard";
import { closeTestBoard } from "../../helpers/testDataHelpers/closeTestBoard";
import { deleteTestBoard } from "../../helpers/testDataHelpers/deleteTestBoard";

test.describe('Reopen board tests', {tag: '@boards'}, () => {
    let boardName: string;
    
    test.beforeEach(async ({homePage, loginPage, boardsPage }) => {
        // Create and close a board via API
        boardName = `Board to reopen ${Date.now()}`;
        await createBoard(boardName);
        await closeTestBoard(boardName);
        // Log in via UI
        await homePage.navigate();
        await homePage.header.expectHeaderTitleIsVisible('Capture, organize, and tackle your to-dos from anywhere.');
        await homePage.headerMenu.clickLogIn();
        await loginPage.logIn();
        await boardsPage.expectPageIsVisible();
    });
    
    test.afterEach(async () => {
        // Clean up created board via API
        await deleteTestBoard(boardName);
    });

    test('Reopen a closed board in the Closed Boards dialog', async ({ boardsPage }) => {
        await test.step('Click View all closed boards button', async () => {
            await boardsPage.clickViewAllClosedBoardsButton();
        });

        await test.step('Reopen the closed board from the closed boards dialog', async () => {
            await boardsPage.reopenBoardFromClosedBoardsDialog(boardName);
        });

        await test.step('Verify the board is no longer visible in the closed boards dialog', async () => {
            await boardsPage.expectBoardIsNotVisibleInClosedBoards(boardName);
        });

        await test.step('Close the closed boards dialog', async () => {
            await boardsPage.closeClosedBoardsDialog();
        });

        await test.step('Verify the reopened board is visible in the workspaces section', async () => {
            await boardsPage.expectBoardIsVisibleInTheWorkspacesSection(boardName);
        });
    });
});