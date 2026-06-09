import { expect, Locator, Page } from "@playwright/test";
import { BoardMenuOption } from "../../../enums/boardMenuOption";
import { ArchivedItems } from "./archivedItems";
import { ConfirmationDialog } from "../../confirmationDialog";
import { AboutThisBoard } from "./aboutThisBoard";
import { ChangeVisibility } from "./changeVisibility";

export class BoardPopoverMenu {
    private readonly popoverMenu: Locator;
    readonly aboutThisBoard: AboutThisBoard;
    readonly changeVisibilityPopover: ChangeVisibility;
    readonly archivedItems: ArchivedItems;
    readonly closeBoardConfirmationDialog: ConfirmationDialog;
    readonly reopenBoardConfirmationDialog: ConfirmationDialog;
    readonly deleteBoardConfirmationDialog: ConfirmationDialog;

    constructor(page: Page) {
        this.popoverMenu = page.getByTestId('board-menu-popover').filter({has: page.getByRole('heading', {name: 'Menu', exact: true})});
        this.aboutThisBoard = new AboutThisBoard(page);
        this.changeVisibilityPopover = new ChangeVisibility(page);
        this.archivedItems = new ArchivedItems(page);
        this.closeBoardConfirmationDialog = new ConfirmationDialog(page, 'Close board?', 'Close');
        this.reopenBoardConfirmationDialog = new ConfirmationDialog(page, 'Select a Workspace', 'Reopen board');
        this.deleteBoardConfirmationDialog = new ConfirmationDialog(page, 'Delete board?', 'Delete');
    }

    async expectMenuToBeVisible(): Promise<void> {
        await expect(this.popoverMenu).toBeVisible();
    }

    async clickOption(option: BoardMenuOption): Promise<void> {
        await this.popoverMenu.getByRole('button', { name: option }).click();
    }

    async expectVisibilitySelected(visibility: BoardMenuVisibilityStatus): Promise<void> {
        await expect(this.popoverMenu.getByRole('button', { name: `Visibility: ${visibility}` })).toBeVisible();
    }
}

export enum BoardMenuVisibilityStatus {
    Private = 'Private',
    Workspace = 'Workspace',
    Public = 'Public',
}