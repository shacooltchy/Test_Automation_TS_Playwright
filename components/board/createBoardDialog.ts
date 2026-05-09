import { expect, Locator, Page } from "@playwright/test";
import { Dropdown } from "../dropdown";

export class CreateBoardDialog {
    private readonly dialog: Locator;
    readonly visibilityDropdown: Dropdown;

    constructor(page: Page) {
        this.dialog = page.getByRole('dialog').filter({has: page.getByRole('heading', {name: 'Create board', exact: true})});
        this.visibilityDropdown = new Dropdown(page, this.dialog.getByTestId('create-board-select-visibility'));
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

    async enterTitle(title: string): Promise<void> {
        await this.dialog.getByTestId('create-board-title-input').fill(title);
    }

    async clickCreateButton(): Promise<void> {
        await this.dialog.getByTestId('create-board-submit-button').click();
    }
}