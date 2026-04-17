import { Page } from "@playwright/test";
import { ActionDialog } from "../actionDialog";
import { Dropdown } from "../dropdown";

export class MoveListActionDialog extends ActionDialog {
    readonly boardSelectDropdown: Dropdown;
    readonly positionSelectDropdown: Dropdown;

    constructor(page: Page) {
        super(page, 'Move list', 'Move');
        this.boardSelectDropdown = new Dropdown(page, this.dialog.locator('#move-list-screen-board-options-select'));
        this.positionSelectDropdown = new Dropdown(page, this.dialog.locator('#move-list-screen-position-select'));
    }
}