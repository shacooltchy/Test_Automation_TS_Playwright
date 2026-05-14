import { expect } from "@playwright/test";
import { test } from "../../../fixtures/pages";
import { createBoard } from "../../../helpers/api/boards/createBoard";
import { createList } from "../../../helpers/api/lists/createList";
import { deleteTestBoard } from "../../../helpers/testDataHelpers/deleteTestBoard";
import { randomName } from "../../../utils/stringUtils";

test.describe('Add a card template to a list tests', {tag: '@card'}, () => {
    test.use({ storageState: 'playwright/.auth/user.json'});
    let boardName: string;
    let listName: string;
        
    test.beforeEach(async({ page, boardDetailsPage }) => {
        // Create a board and a list via API
        boardName = randomName('Board');
        listName = randomName('List');
        const board = await createBoard(boardName);
        await createList(listName, board.id);
                        
        // Navigate to board via UI
        await page.goto(board.url);
        await boardDetailsPage.expectPageVisible(boardName);
        await boardDetailsPage.adBanner.minimizeIfVisible();
    });
                
    test.afterEach(async () => {
        // Clean up created board via API
        await deleteTestBoard(boardName);
    });
    
    test('Add a card template to a list', async({ boardDetailsPage } ) => {
        const cardTemplateTitle = randomName('Card template');
        const cardTemplateTitle2 = randomName('Card template 2');

        await test.step('Click the Create from template button', async() => {
            await boardDetailsPage.list.clickCreateCardFromTemplateButton(listName);
        });

        await test.step('Verify Card Templates modal is visible', async() => {
            await boardDetailsPage.list.cardTemplatesDialog.expectVisible();
        });

        await test.step('Verify Card templates dialog has no tamplates', async() => {
            await boardDetailsPage.list.cardTemplatesDialog.expectNoTemplates();
        });

        await test.step('Click Create a new template button', async() => {
            await boardDetailsPage.list.cardTemplatesDialog.createANewTemplateButton.click();
        });

        await test.step('Verify Template title textbox is visible', async() => {
            await expect(boardDetailsPage.list.cardTemplatesDialog.templateTitleTextbox).toBeVisible();
        });

        await test.step('Click cancel button', async() => {
            await boardDetailsPage.list.cardTemplatesDialog.cancelAddingNewCardButton.click();
        });

        await test.step('Verify Template title textbox is not visible', async() => {
            await expect(boardDetailsPage.list.cardTemplatesDialog.templateTitleTextbox).not.toBeVisible();
        });

        await test.step('Click Create a new template button', async() => {
            await boardDetailsPage.list.cardTemplatesDialog.createANewTemplateButton.click();
        });

        await test.step('Enter a card template title', async() => {
            await boardDetailsPage.list.cardTemplatesDialog.templateTitleTextbox.fill(cardTemplateTitle);
        });

        await test.step('Click Add button', async() => {
            await boardDetailsPage.list.cardTemplatesDialog.addButton.click();
        });

        await test.step('Verify Card Templates modal is not visible', async() => {
            await boardDetailsPage.list.cardTemplatesDialog.expectNotVisible();
        });

        await test.step('Verify card template editor is displayed', async() => {
            await boardDetailsPage.cardTemplateEditor.expectVisible();
        });

        await test.step('Click close card template editor', async() => {
            await boardDetailsPage.cardTemplateEditor.closeButton.click();
        });

        await test.step('Verify card template editor is not displayed', async() => {
            await boardDetailsPage.cardTemplateEditor.expectNotVisible();
        });

        await test.step('Verify card template is added to list', async() => {
            await boardDetailsPage.list.cardTemplate.expectVisible(cardTemplateTitle, listName);
        });

        await test.step('Click the Create from template button', async() => {
            await boardDetailsPage.list.clickCreateCardFromTemplateButton(listName);
        });

        await test.step('Expect card template is added to the Card templates dialog', async() => {
            await boardDetailsPage.list.cardTemplatesDialog.expectVisible();
            await boardDetailsPage.list.cardTemplatesDialog.expectCardTemplate(cardTemplateTitle);
        });

        await test.step('Click Create a new template button in the Card templates dialog which has already existing templates', async() => {
            await boardDetailsPage.list.cardTemplatesDialog.cardComposerCreateANewTemplateButton.click();
        });

        await test.step('Enter a card template title', async() => {
            await boardDetailsPage.list.cardTemplatesDialog.templateTitleTextbox.fill(cardTemplateTitle2);
        });

        await test.step('Click Add button', async() => {
            await boardDetailsPage.list.cardTemplatesDialog.addButton.click();
        });

        await test.step('Verify Card Templates modal is not visible', async() => {
            await boardDetailsPage.list.cardTemplatesDialog.expectNotVisible();
        });

        await test.step('Verify card template editor is displayed', async() => {
            await boardDetailsPage.cardTemplateEditor.expectVisible();
        });

        await test.step('Close card template editor', async() => {
            await boardDetailsPage.cardTemplateEditor.close();
        });

        await test.step('Verify card template is added to list', async() => {
            await boardDetailsPage.list.cardTemplate.expectVisible(cardTemplateTitle2, listName);
        });

        await test.step('Click the Create from template button', async() => {
            await boardDetailsPage.list.clickCreateCardFromTemplateButton(listName);
        });

        await test.step('Expect card template is added to the Card templates dialog', async() => {
            await boardDetailsPage.list.cardTemplatesDialog.expectVisible();
            await boardDetailsPage.list.cardTemplatesDialog.expectCardTemplate(cardTemplateTitle2);
        });
    });
});