import { Locator, Page } from "@playwright/test";
import { ActionDialog } from "../../../actionDialog";

export class AddChecklistDialog extends ActionDialog {
    readonly titleTextbox: Locator;

    constructor(page: Page) {
        super(page, 'Add checklist', 'Add');
        this.titleTextbox = this.dialog.getByLabel('Title');
    }
}