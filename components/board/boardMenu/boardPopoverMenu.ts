import { expect, Locator, Page } from "@playwright/test";
import { ArchivedItems } from "./archivedItems";
import { ConfirmationDialog } from "../../confirmationDialog";
import { AboutThisBoard } from "./aboutThisBoard";
import { ChangeVisibility } from "./changeVisibility";
import { BoardMenuLabelsDialog } from "./boardMenuLabelsDialog";
import { CreateNewLabelDialog } from "./createNewLabelDialog";
import { ComponentBase } from "../../componentBase";

export class BoardPopoverMenu extends ComponentBase {
    private readonly popoverMenu: Locator;
    readonly aboutThisBoard: AboutThisBoard;
    readonly changeVisibilityPopover: ChangeVisibility;
    readonly boardMenuLabelsDialog: BoardMenuLabelsDialog;
    readonly createNewLabelDialog: CreateNewLabelDialog;
    readonly archivedItems: ArchivedItems;
    readonly closeBoardConfirmationDialog: ConfirmationDialog;
    readonly reopenBoardConfirmationDialog: ConfirmationDialog;
    readonly deleteBoardConfirmationDialog: ConfirmationDialog;

    constructor(page: Page, rootLocator: Locator = page.getByTestId('board-menu-popover').filter({has: page.getByRole('heading', {name: 'Menu', exact: true})})) {
        super(rootLocator);
        this.popoverMenu = rootLocator;
        this.aboutThisBoard = new AboutThisBoard(page);
        this.changeVisibilityPopover = new ChangeVisibility(page);
        this.boardMenuLabelsDialog = new BoardMenuLabelsDialog(page);
        this.createNewLabelDialog = new CreateNewLabelDialog(page);
        this.archivedItems = new ArchivedItems(page);
        this.closeBoardConfirmationDialog = new ConfirmationDialog(page, 'Close board?', 'Close');
        this.reopenBoardConfirmationDialog = new ConfirmationDialog(page, 'Select a Workspace', 'Reopen board');
        this.deleteBoardConfirmationDialog = new ConfirmationDialog(page, 'Delete board?', 'Delete');
    }

    async clickOption(option: BoardMenuOption): Promise<void> {
        await this.popoverMenu.getByRole('button', { name: option }).click();
    }

    async expectVisibilitySelected(visibility: BoardMenuVisibilityStatus): Promise<void> {
        await expect(this.popoverMenu.getByRole('button', { name: `Visibility: ${visibility}` })).toBeVisible();
    }
}

export enum BoardMenuOption {
    AboutThisBoard = 'About this board',
    Visibility = 'Visibility',
    Labels = 'Labels',
    ArchivedItems = 'Archived items',
    CloseBoard = 'Close board',
    ReopenBoard = 'Reopen board',
    DeleteBoard = 'Delete board'
}

export enum BoardMenuVisibilityStatus {
    Private = 'Private',
    Workspace = 'Workspace',
    Public = 'Public',
}

