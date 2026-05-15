import { expect, Locator, Page } from "@playwright/test";
import { ActionDialog } from "../../../actionDialog";

export class Checklist {
    private readonly checkList: Locator;
    readonly itemTitleTextBox: Locator;
    readonly addButton: Locator;
    readonly cancelButton: Locator;
    readonly deleteChecklistConfirmationDialog: ActionDialog; 

    constructor(page: Page) {
        this.checkList = page.getByTestId('checklist-container');
        this.itemTitleTextBox = this.checkList.getByRole('textbox', {name: 'Add an item', exact: true});
        this.addButton = this.checkList.getByRole('button', {name: 'Add', exact: true});
        this.cancelButton = this.checkList.getByRole('button', {name: 'Cancel', exact: true});
        this.deleteChecklistConfirmationDialog = new ActionDialog(page, 'Delete', 'Delete checklist', false);
    }

    private getChecklist(checklistTitle: string): Locator {
        const checklist = this.checkList.filter({hasText: checklistTitle});
        return checklist;
    }

    async expectVisible(checklistTitle: string) {
        await expect(this.getChecklist(checklistTitle)).toBeVisible();
    }

    async expectNotVisible(checklistTitle: string) {
        await expect(this.getChecklist(checklistTitle)).not.toBeVisible();
    }

    async clickDeleteButton(checklistTitle: string) {
        const checklist = this.getChecklist(checklistTitle);
        await checklist.getByTestId("checklist-delete-button").click();
    }

    async clickAddAnItemButton(checklistTitle: string) {
        const checklist = this.getChecklist(checklistTitle);
        await checklist.getByRole('button', {name: 'Add an item'}).click();
    }

    async expectItem(checklistTitle: string, itemTitle: string) {
        const checklist = this.getChecklist(checklistTitle);
        await expect(checklist.getByTestId('check-item-name').filter({hasText: itemTitle})).toBeVisible();
    }

    async checkItem(checklistTitle: string, itemTitle: string) {
        const checklist = this.getChecklist(checklistTitle);
        const item = checklist.getByRole('listitem').filter({hasText: itemTitle});
        await item.getByTestId('clickable-checkbox').click();
        await expect(item.getByRole('checkbox')).toBeChecked();
    }

    async uncheckItem(checklistTitle: string, itemTitle: string) {
        const checklist = this.getChecklist(checklistTitle);
        const item = checklist.getByRole('listitem').filter({hasText: itemTitle});
        await item.getByTestId('clickable-checkbox').click();
        await expect(item.getByRole('checkbox')).not.toBeChecked();
    }

    async expectChecklistProgress(checklistTitle: string, expectedProgress: string) {
        const checklist = this.getChecklist(checklistTitle);
        const progressBar = checklist.getByTestId('progress-bar');
        await expect(progressBar.getAttribute('aria-valuenow')).resolves.toBe(expectedProgress);
    }
}