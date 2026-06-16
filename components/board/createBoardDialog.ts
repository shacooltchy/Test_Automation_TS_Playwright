import { Locator, Page } from "@playwright/test";
import { Dropdown } from "../dropdown";
import { ComponentBase } from "../componentBase";

export class CreateBoardDialog extends ComponentBase {
    private readonly dialog: Locator;
    readonly boardTitleTextbox: Locator;
    readonly visibilityDropdown: Dropdown;
    readonly createButton: Locator;

    constructor(page: Page, rootLocator: Locator = page.getByRole('dialog').filter({has: page.getByRole('heading', {name: 'Create board', exact: true})})) {
        super(rootLocator);
        this.dialog = rootLocator;
        this.boardTitleTextbox = this.dialog.getByLabel('Board title');
        this.visibilityDropdown = new Dropdown(page, this.dialog.getByTestId('create-board-select-visibility'));
        this.createButton = this.dialog.getByRole('button', {name: 'Create', exact: true});
    }

    async selectBackground(backgroundName: string = 'Mountain peaks glowing orange at sunset under a dark sky.'): Promise<void> {
        await this.dialog.getByRole('radio', { name: backgroundName }).click();
    }
}