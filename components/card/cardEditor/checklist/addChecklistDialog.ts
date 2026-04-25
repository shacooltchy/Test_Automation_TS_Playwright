import { Page } from "@playwright/test";
import { ActionDialog } from "../../../actionDialog";

export class AddChecklistDialog extends ActionDialog {


    constructor(page: Page) {
        super(page, 'Add checklist', 'Add');
        
    }

    async enterTitle(title: string) {
        await this.dialog.getByLabel('Title').fill(title);
    }
}