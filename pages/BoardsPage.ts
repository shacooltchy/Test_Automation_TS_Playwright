import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { BoardVisibility } from "../enums/BoardVisibility";
import { ClosedBoardsDialog } from "../components/board/closedBoardsDialog";
import { Dropdown } from "../components/dropdown123";

export class BoardsPage extends BasePage {
    readonly visibilityDropdown: Dropdown;
    private readonly visibilityDropdownOptions = [BoardVisibility.Private, BoardVisibility.Workspace, BoardVisibility.Public];
    readonly closedBoardsDialog: ClosedBoardsDialog;

    constructor(page: Page) {
        super(page);
        this.visibilityDropdown = new Dropdown(page, this.page.getByTestId('create-board-select-visibility'), this.visibilityDropdownOptions);
        this.closedBoardsDialog = new ClosedBoardsDialog(page);
    }

    async expectPageIsVisible(): Promise<void> {
        await super.expectPageIsVisible(/boards/, 'Boards | Trello');
    }

    // refactor
    async closeNewFeaturesBannerIfVisible(): Promise<void> {
        const newFeaturesBanner = this.page.getByTestId('spotlight--dialog');
        try {
            await newFeaturesBanner.getByRole('button', { name: 'Dismiss' }).click({ timeout: 10_000 });
        } catch (error) {
            //Ad container not found, skipping minimize step.
        }
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
    }
}