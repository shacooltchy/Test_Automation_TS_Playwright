import { expect, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { ClosedBoardsDialog } from "../components/board/closedBoardsDialog";
import { CreateBoardDialog } from "../components/board/createBoardDialog";

export class BoardsPage extends BasePage {
    readonly createBoardDialog: CreateBoardDialog;
    readonly closedBoardsDialog: ClosedBoardsDialog;

    constructor(page: Page) {
        super(page);
        this.createBoardDialog = new CreateBoardDialog(page);
        this.closedBoardsDialog = new ClosedBoardsDialog(page);
    }

    async navigate(): Promise<void> {
        await this.page.goto('/u/athletelonely2g/boards');
    }

    async expectPageVisible(): Promise<void> {
        await super.expectPageVisible(/\/boards/, 'Boards | Trello');
    }

    async clickCreateNewBoardTile(): Promise<void> {
        await this.page.getByTestId('create-board-tile').click();
    }

    async expectBoardVisibleInTheWorkspacesSection(boardName: string): Promise<void> {
        await this.waitForNetworkIdle();
        const workspaceSection = this.page.getByRole('heading', { name: 'YOUR WORKSPACES', exact: true }).locator('..');
        await expect(workspaceSection.getByRole('link', { name: boardName, exact: true })).toBeVisible();
    }

    async expectBoardNotVisibleInTheWorkspacesSection(boardName: string): Promise<void> {
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