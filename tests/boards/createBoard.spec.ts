import { test } from "../../fixtures/pages";
import { generateTestDataName } from "../../utils/stringUtils";

test.describe('Create board tests', () => {
  test.beforeEach(async ({homePage, loginPage, boardsPage }) => {
    await homePage.navigate();
    await homePage.header.expectHeaderTitleIsVisible('Capture, organize, and tackle your to-dos from anywhere.');
    await homePage.headerMenu.clickLogIn();
    await loginPage.logIn();
    await boardsPage.expectPageIsVisible();
  });

  test('Create new board', async ({ boardsPage, boardDetailsPage }) => {
    let boardName = generateTestDataName("Board");

    await boardsPage.clickCreateNewBoardTile();
    await boardsPage.selectBoardBackground();
    await boardsPage.enterBoardTitle(boardName);
    //await boardsPage.selectBoardVisibility('Private');
    await boardsPage.visibilityDropdown.selectOption('Private');
    await boardsPage.clickCreateBoardSubmitButton();
    await boardDetailsPage.expectPageIsVisible(boardName);
  });
});