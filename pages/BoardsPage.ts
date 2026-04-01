import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Dropdown } from "../components/Dropdown";
import { BoardVisibility } from "../enums/BoardVisibility";

export class BoardsPage extends BasePage {
    readonly visibilityDropdown: Dropdown;
    private readonly visibilityDropdownOptions = [BoardVisibility.Private, BoardVisibility.Workspace, BoardVisibility.Public];
    private readonly closedBoardsDialog: Locator;

    constructor(page: Page) {
        super(page);
        this.visibilityDropdown = new Dropdown(page, this.page.getByTestId('create-board-select-visibility'), this.visibilityDropdownOptions);
        this.closedBoardsDialog = this.page.locator('#overlay-contents').getByRole('heading', { name: 'Closed boards' });
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

    /*async selectBoardVisibility(visibility: 'Private Only board members' | 'Workspace All members' | 'Public Anyone' = 'Workspace All members'): Promise<void> {
        await this.page.getByTestId('create-board-select-visibility').click();
        await this.page.getByRole('option', { name: visibility }).click();
    }

    async selectBoardVisibilityUsingHelper(visibility: 'Private Only board members' | 'Workspace All members' | 'Public Anyone' = 'Workspace All members'): Promise<void> {
        await selectFromDropdown(this.page.getByTestId('create-board-select-visibility'), visibility);
    }*/

    async clickCreateBoardSubmitButton(): Promise<void> {
        await this.page.getByTestId('create-board-submit-button').click();
    }

    async expectBoardIsVisibleInTheWorkspacesSection(boardName: string): Promise<void> {
        await this.waitForNetworkIdle();
        const workspaceSection = this.page.getByRole('heading', { name: 'YOUR WORKSPACES', exact: true }).locator('..');
        await expect(workspaceSection.getByRole('link', { name: boardName, exact: true })).toBeVisible();
    }

    async expectBoardIsNotVisibleInTheWorkspacesSection(boardName: string): Promise<void> {
        await this.waitForNetworkIdle();
        const workspaceSection = this.page.getByRole('heading', { name: 'YOUR WORKSPACES', exact: true }).locator('..');
        await expect(workspaceSection.getByRole('link', { name: boardName, exact: true })).not.toBeVisible();
    }

    private async waitForNetworkIdle(timeout: number = 10_000): Promise<void> {
        await this.page.waitForLoadState('networkidle', { timeout });
    }

    async navigateToBoardFromWorkspacesSection(boardName: string): Promise<void> {
        const workspaceSection = this.page.getByRole('heading', { name: 'YOUR WORKSPACES', exact: true }).locator('..');
        await workspaceSection.getByRole('link', { name: boardName, exact: true }).click();
    }

    async clickViewAllClosedBoardsButton(): Promise<void> {
        await this.page.getByRole('button', { name: 'View all closed boards' }).click();
        await expect(this.closedBoardsDialog).toBeVisible();
    }

    async expectBoardIsVisibleInClosedBoards(boardName: string): Promise<void> {
        await expect(this.closedBoardsDialog).toBeVisible();
        await expect(this.page.getByRole('listitem').getByRole('link', {name: boardName})).toBeVisible();
    }

    async expectBoardIsNotVisibleInClosedBoards(boardName: string): Promise<void> {
        await expect(this.closedBoardsDialog).toBeVisible();
        await expect(this.page.getByRole('listitem').getByRole('link', {name: boardName})).not.toBeVisible();
    }

    async clickReopenBoardButtonInClosedBoardsDialog(boardName: string): Promise<void> {
        await expect(this.closedBoardsDialog).toBeVisible();
        await this.page.getByRole('listitem').filter({ hasText: boardName }).getByTestId('workspace-chooser-trigger-button').click();
    }

    async expectReopenBoardConfirmationBannerInClosedBoardsDialog(): Promise<void> {
        await expect(this.page.locator('section').getByRole('banner').filter({ hasText: 'Select a Workspace' })).toBeVisible();
    }

    async confirmReopenBoardInClosedBoardsDialog(): Promise<void> {
        await this.page.getByTestId('workspace-chooser-reopen-button').click();
    }

    async closeClosedBoardsDialog(): Promise<void> {
        await this.page.locator('#overlay-contents').getByTestId('CloseIcon').click();
        await expect(this.closedBoardsDialog).not.toBeVisible();
    }

    async navigateToBoardFromClosedBoardsDialog(boardName: string): Promise<void> {
        await expect(this.closedBoardsDialog).toBeVisible();
        await this.page.getByRole('listitem').getByRole('link', {name: boardName}).click();
    }
}