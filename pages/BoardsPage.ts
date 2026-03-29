import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Dropdown } from "../components/Dropdown";
import { selectFromDropdown } from "../utils/dropdownHelpers";

export class BoardsPage extends BasePage {
    readonly visibilityDropdown: Dropdown;

    constructor(page: Page) {
        super(page);
        this.visibilityDropdown = new Dropdown(page, this.page.getByTestId('create-board-select-visibility'), ['Private Only board members', 'Workspace All members', 'Public Anyone']);
    }

    async expectPageIsVisible(): Promise<void> {
        await super.expectPageIsVisible(/boards/, 'Boards | Trello');
    }

    async clickCreateNewBoardTile(): Promise<void> {
        await this.page.getByTestId('create-board-tile').click();
    }

    async expectCreateBoardModalIsVisible(): Promise<void> {
        await expect(this.page.getByRole('dialog').getByRole('heading', { name: 'Create board' })).toBeVisible();
    }

    async selectBoardBackground(backgroundName: string = 'Wavy blue lines against a dark background.'): Promise<void> {
        await this.page.getByRole('radio', { name: backgroundName }).click();
    }

    async enterBoardTitle(title: string): Promise<void> {
        await this.page.getByTestId('create-board-title-input').fill(title);
    }

    async selectBoardVisibility(visibility: 'Private Only board members' | 'Workspace All members' | 'Public Anyone' = 'Workspace All members'): Promise<void> {
        await this.page.getByTestId('create-board-select-visibility').click();
        await this.page.getByRole('option', { name: visibility }).click();
    }

    async selectBoardVisibilityUsingHelper(visibility: 'Private Only board members' | 'Workspace All members' | 'Public Anyone' = 'Workspace All members'): Promise<void> {
        await selectFromDropdown(this.page.getByTestId('create-board-select-visibility'), visibility);
    }

    async clickCreateBoardSubmitButton(): Promise<void> {
        await this.page.getByTestId('create-board-submit-button').click();
    }

    async expectBoardIsVisibleInTheWorkspacesSection(boardName: string): Promise<void> {
        const workspaceSection = this.page.getByRole('heading', { name: 'YOUR WORKSPACES', exact: true }).locator('..');
        await expect(workspaceSection.getByRole('link', { name: boardName, exact: true })).toBeVisible();
    }
}