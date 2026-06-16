import { expect, Locator, Page } from "@playwright/test";
import { ConfirmationDialog } from "../confirmationDialog";
import { ComponentBase } from "../componentBase";

export class ClosedBoardsDialog extends ComponentBase {
    private readonly dialog: Locator;
    readonly reopenBoardConfirmationDialog: ConfirmationDialog;

    constructor(page: Page, rootLocator: Locator = page.locator('#overlay-contents').filter({ has: page.getByRole('heading', { name: 'Closed boards' }) })) {
        super(rootLocator);
        this.dialog = rootLocator;
        this.reopenBoardConfirmationDialog = new ConfirmationDialog(page, 'Select a Workspace', 'Reopen board');
    }

    async clickReopenBoardButton(boardName: string): Promise<void> {
        await this.dialog.getByRole('listitem').filter({ hasText: boardName }).getByTestId('workspace-chooser-trigger-button').click();
    }

    async expectBoardVisibleInClosedBoards(boardName: string): Promise<void> {
        await expect(this.dialog.getByRole('listitem').getByRole('link', {name: boardName})).toBeVisible();
    }

    async expectBoardNotVisibleInClosedBoards(boardName: string): Promise<void> {
        await expect(this.dialog.getByRole('listitem').getByRole('link', {name: boardName})).not.toBeVisible();
    }

    async navigateToBoard(boardName: string): Promise<void> {
        await expect(this.dialog).toBeVisible();
        await this.dialog.getByRole('listitem').getByRole('link', {name: boardName}).click();
    }

    async close(): Promise<void> {
        await this.dialog.getByTestId('CloseIcon').click();
        await expect(this.dialog).not.toBeVisible();
    }
}