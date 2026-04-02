import { expect, Locator, Page } from "@playwright/test";
import { BoardMenuOptions } from "../enums/BoardMenuOptions";
import { ConfirmationDialog } from "./ConfirmationDialog";

export class BoardPopoverMenu {
    private readonly page: Page;
    private readonly popoverMenu: Locator;
    readonly closeBoardConfirmationDialog: ConfirmationDialog;
    readonly reopenBoardConfirmationDialog: ConfirmationDialog;
    readonly deleteBoardConfirmationDialog: ConfirmationDialog;

    constructor(page: Page) {
        this.page = page;
        this.popoverMenu = this.page.getByTestId('board-menu-popover');
        this.closeBoardConfirmationDialog = new ConfirmationDialog(this.page, 'Close board?', 'Close');
        this.reopenBoardConfirmationDialog = new ConfirmationDialog(this.page, 'Select a Workspace', 'Reopen board');
        this.deleteBoardConfirmationDialog = new ConfirmationDialog(this.page, 'Delete board?', 'Delete');
    }

    async expectMenuToBeVisible(): Promise<void> {
        await this.popoverMenu.waitFor({ state: 'visible' });
        await expect(this.popoverMenu).toBeVisible();
    }

    async clickOption(option: BoardMenuOptions): Promise<void> {
        await this.popoverMenu.getByRole('button', { name: option }).click();
    }
}