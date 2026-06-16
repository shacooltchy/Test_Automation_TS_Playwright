import { Locator, Page } from "@playwright/test";
import { ComponentBase } from "../componentBase";

export class NewListForm extends ComponentBase {
    private readonly newListForm: Locator
    readonly listNameTextArea: Locator;
    readonly addListButton: Locator;
    readonly cancelAddListButton: Locator;

    constructor(page: Page, rootLocator: Locator = page.locator('form').filter({has: page.getByRole('button', {name: 'Add list'})})) {
        super(rootLocator);
        this.newListForm = rootLocator;
        this.listNameTextArea = this.newListForm.getByTestId('list-name-textarea');
        this.addListButton = this.newListForm.getByTestId('list-composer-add-list-button');
        this.cancelAddListButton = this.newListForm.getByTestId('list-composer-cancel-button');
    }
}