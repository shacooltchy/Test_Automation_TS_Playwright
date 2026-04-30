import { expect, Locator, Page } from "@playwright/test";
import { ActionDialog } from "../../../actionDialog";

export class Checklist {
    private readonly checkList: Locator;
    readonly deleteChecklistConfirmationDialog: ActionDialog;

    constructor(page: Page) {
        this.checkList = page.getByTestId('checklist-container');
        this.deleteChecklistConfirmationDialog = new ActionDialog(page, 'Delete', 'Delete checklist', false);
    }

    async expectVisible(title: string) {
        await expect(this.checkList.filter({hasText: title})).toBeVisible();
    }

    async expectNotVisible(title: string) {
        await expect(this.checkList.filter({hasText: title})).not.toBeVisible();
    }

    async clickDeleteButton(checklistTitle: string) {
        const checklist: Locator = this.checkList.filter({hasText: checklistTitle});
        await checklist.getByTestId("checklist-delete-button").click();
    }
}