import { expect, Locator, Page } from "@playwright/test";
import { BoardMenuOptions } from "../../enums/BoardMenuOptions";
import { ConfirmationDialog } from "../ConfirmationDialog";
import { ArchivedItems } from "./ArchivedItems";

export class BoardPopoverMenu {
    private readonly popoverMenu: Locator;
    readonly archivedItems: ArchivedItems;
    readonly closeBoardConfirmationDialog: ConfirmationDialog;
    readonly reopenBoardConfirmationDialog: ConfirmationDialog;
    readonly deleteBoardConfirmationDialog: ConfirmationDialog;

    constructor(page: Page) {
        this.popoverMenu = page.getByTestId('board-menu-popover').filter({has: page.getByRole('heading', {name: 'Menu', exact: true})});
        this.archivedItems = new ArchivedItems(page);
        this.closeBoardConfirmationDialog = new ConfirmationDialog(page, 'Close board?', 'Close');
        this.reopenBoardConfirmationDialog = new ConfirmationDialog(page, 'Select a Workspace', 'Reopen board');
        this.deleteBoardConfirmationDialog = new ConfirmationDialog(page, 'Delete board?', 'Delete');
    }

    async expectMenuToBeVisible(): Promise<void> {
        await this.popoverMenu.waitFor({ state: 'visible' });
        await expect(this.popoverMenu).toBeVisible();
    }

    async clickOption(option: BoardMenuOptions): Promise<void> {
        await this.popoverMenu.getByRole('button', { name: option }).click();
    }
}