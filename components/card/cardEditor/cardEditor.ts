import { expect, Locator, Page } from "@playwright/test";
import { CardEditorAction } from "../../../enums/cardEditorAction";
import { AddToCardDialog } from "./addToCardDialog";
import { LabelsDialog } from "./labelsDialog";
import { DatesDialog } from "./datesDialog";
import { AddChecklistDialog } from "./checklist/addChecklistDialog";
import { Checklist } from "./checklist/checklist";

export class CardEditor {
    private readonly page: Page;
    private readonly editor: Locator;
    readonly addToCardDialog: AddToCardDialog;
    readonly labelsDialog: LabelsDialog;
    readonly datesDialog: DatesDialog;
    readonly addChecklistDialog: AddChecklistDialog;
    readonly checklist: Checklist;

    constructor(page: Page) {
        this.page = page;
        this.editor = page.getByTestId('card-back-name');
        this.addToCardDialog = new AddToCardDialog(page);
        this.labelsDialog = new LabelsDialog(page);
        this.datesDialog = new DatesDialog(page);
        this.addChecklistDialog = new AddChecklistDialog(page);
        this.checklist = new Checklist(page);
    }

    async clickAddButton(): Promise<void> {
        await this.editor.getByRole('button', { name: 'Add to card' }).click();
    }

    async expectCardEditorIsVisible(): Promise<void> {
        expect(this.editor).toBeVisible();
    }

    async expectCardEditorIsNotVisible(): Promise<void> {
        expect(this.editor).not.toBeVisible();
    }

    async clickActionsButton() {
        await this.editor.getByTestId('card-back-actions-button').click();
    }

    async clickCloseButton() {
        await this.editor.getByRole('button').filter({has: this.page.getByTestId('CloseIcon')}).click();
    }

    async clickAction(action: CardEditorAction) {
        await this.page.getByRole('button', {name: action}).click();
    }

    async expectCardIsArchived(): Promise<void> {
        await expect((this.editor.getByText('This card was archived on'))).toBeVisible();
    }

    async expectCardIsNotArchived(): Promise<void> {
        await expect((this.editor.getByText('This card was archived on'))).not.toBeVisible();
    }

    async expectLabel(labelColor?: string, labelTitle?: string): Promise<void> {
        if(!labelColor && !labelTitle) {
            throw new Error('Either labelColor or labelTitle must be provided');
        }

        if(labelColor && labelTitle) {
            await expect(this.editor.getByLabel(`Color: ${labelColor}, title: ${labelTitle}`, { exact: true })).toBeVisible();
            return;
        } else if(labelColor) {
            await expect(this.editor.getByLabel(`Color: ${labelColor}, title: none`, { exact: true })).toBeVisible();
            return;
        } else if(labelTitle) {
            await expect(this.editor.getByLabel(`Color: none, title: ${labelTitle}`, { exact: true })).toBeVisible();
            return;
        }
    }

    async expectDueDate(dateString: string /*format: Jun 18, 2027*/, overdue: boolean): Promise<void> {
        const dueDateBadge = this.editor.getByTestId('due-date-badge-checkbox');
        await expect(dueDateBadge.filter({hasText: dateString})).toBeVisible();
        if(overdue) {
            await expect(dueDateBadge.filter({hasText: "Overdue"})).toBeVisible();
        } else {
            await expect(dueDateBadge.filter({hasText: "Overdue"})).not.toBeVisible();
        }
    }
}