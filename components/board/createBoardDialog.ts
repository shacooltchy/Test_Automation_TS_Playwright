import { expect, Locator, Page } from "@playwright/test";
import { Dropdown } from "../dropdown";

export class CreateBoardDialog {
    private readonly dialog: Locator;
    readonly boardTitleTextbox: Locator;
    readonly visibilityDropdown: Dropdown;
    readonly createButton: Locator;

    constructor(page: Page) {
        this.dialog = page.getByRole('dialog').filter({has: page.getByRole('heading', {name: 'Create board', exact: true})});
        this.boardTitleTextbox = this.dialog.getByLabel('Board title');
        this.visibilityDropdown = new Dropdown(page, this.dialog.getByTestId('create-board-select-visibility'));
        this.createButton = this.dialog.getByRole('button', {name: 'Create', exact: true});
    }

    async expectVisible(): Promise<void> {
        expect(this.dialog).toBeVisible();
    }

    async expectNotVisible(): Promise<void> {
        expect(this.dialog).not.toBeVisible();
    }

    async selectBackground(backgroundName: string = 'A lone figure stands on rolling sand dunes at sunset.'): Promise<void> {
        await this.dialog.getByRole('radio', { name: backgroundName }).click();
    }
}