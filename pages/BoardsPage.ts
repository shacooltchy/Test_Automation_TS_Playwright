import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Dropdown } from "../components/dropdown";

export class BoardsPage extends BasePage {
    readonly visibilityDropdown: Dropdown;

    constructor(page: Page) {
        super(page);
        this.visibilityDropdown = new Dropdown(page, this.page.getByTestId('create-board-select-visibility'));
    }

    async expectPageIsVisible(): Promise<void> {
        await super.expectPageIsVisible(/boards/, 'Boards | Trello');
    }

    async clickCreateNewBoardTile(): Promise<void> {
        await this.page.getByTestId('create-board-tile').click();
    }

    async selectBoardBackground(backgroundName: string = 'Wavy blue lines against a dark background.'): Promise<void> {
        await this.page.getByRole('radio', { name: backgroundName }).click();
    }

    async enterBoardTitle(title: string): Promise<void> {
        await this.page.getByTestId('create-board-title-input').fill(title);
    }

    async selectBoardVisibility(visibility: 'Workspace' | 'Private' | 'Public' = 'Workspace'): Promise<void> {
        await this.page.getByTestId('create-board-select-visibility').click();
        await this.page.getByRole('option', { name: visibility }).click();
    }

    async clickCreateBoardSubmitButton(): Promise<void> {
        await this.page.getByTestId('create-board-submit-button').click();
    }
}