import { Page } from "@playwright/test";
import { Dropdown } from "../../dropdown";
import { ActionDialog } from "../../actionDialog";

export class MoveCardActionDialog extends ActionDialog {
    readonly boardSelectDropdown: Dropdown;
    readonly listSelectDropdown: Dropdown;
    readonly positionSelectDropdown: Dropdown;

    constructor(page: Page) {
        super(page, 'Move card', 'Move');
        this.boardSelectDropdown = new Dropdown(page, this.dialog.getByTestId('move-card-popover-select-board-destination'));
        this.listSelectDropdown = new Dropdown(page, this.dialog.getByTestId('move-card-popover-select-list-destination'));
        this.positionSelectDropdown = new Dropdown(page, this.dialog.getByTestId('move-card-popover-select-position'));
    }
}