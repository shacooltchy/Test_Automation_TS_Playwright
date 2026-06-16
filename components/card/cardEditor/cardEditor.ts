import { expect, Locator, Page } from "@playwright/test";
import { CardEditorAction } from "../../../enums/cardEditorAction";
import { AddToCardDialog } from "./addToCardDialog";
import { LabelsDialog } from "./labelsDialog";
import { DatesDialog } from "./datesDialog";
import { AddChecklistDialog } from "./checklist/addChecklistDialog";
import { Checklist } from "./checklist/checklist";
import { DescriptionTextEditor } from "../../descriptionTextEditor";
import { ComponentBase } from "../../componentBase";

export class CardEditor extends ComponentBase {
    private readonly page: Page;
    private readonly editor: Locator;
    readonly addButton: Locator;
    readonly descriptionButton: Locator;
    readonly actionsButton: Locator;
    readonly closeButton: Locator;
    readonly addToCardDialog: AddToCardDialog;
    readonly labelsDialog: LabelsDialog;
    readonly datesDialog: DatesDialog;
    readonly addChecklistDialog: AddChecklistDialog;
    readonly checklist: Checklist;
    readonly descriptionTextEditor: DescriptionTextEditor;

    constructor(page: Page, rootLocator: Locator = page.getByTestId('card-back-name')) {
        super(rootLocator);
        this.page = page;
        this.editor = rootLocator;
        this.addButton = this.editor.getByRole('button', { name: 'Add to card' });
        this.closeButton = this.editor.getByRole('button', {name: 'Close'});
        this.actionsButton = this.editor.getByRole('button', {name: 'Actions'});
        this.descriptionButton = this.editor.getByRole('button', {name: 'Add a more detailed description…'});
        this.addToCardDialog = new AddToCardDialog(page);
        this.labelsDialog = new LabelsDialog(page);
        this.datesDialog = new DatesDialog(page);
        this.addChecklistDialog = new AddChecklistDialog(page);
        this.checklist = new Checklist(page);
        this.descriptionTextEditor = new DescriptionTextEditor(page);
    }

    async close() {
        await this.closeButton.click();
        await this.expectNotVisible();
    }

    async clickAction(action: CardEditorAction) {
        await this.page.getByRole('button', {name: action}).click();
    }

    async expectCardArchived(): Promise<void> {
        await expect((this.editor.getByText('This card was archived on'))).toBeVisible();
    }

    async expectCardNotArchived(): Promise<void> {
        await expect((this.editor.getByText('This card was archived on'))).not.toBeVisible();
    }

    async expectLabel(labelColor?: string, labelTitle?: string): Promise<void> {
        if (!labelColor && !labelTitle) {
            throw new Error('Either labelColor or labelTitle must be provided');
        }

        const labels = this.editor.getByTestId('card-label');
        const count = await labels.count();

        for (let i = 0; i < count; i++) {
            const el = labels.nth(i);

            const color = await el.getAttribute('data-color'); // can be null
            const title = (await el.innerText()).trim();       // can be ""

            const colorMatches = labelColor ? color === labelColor : true;
            const titleMatches = labelTitle ? title === labelTitle : true;

            if (colorMatches && titleMatches) {
                await expect(el).toBeVisible();
                return;
            }
        }

        throw new Error(
            `Label not found for color="${labelColor}" title="${labelTitle}"`
        );
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

    async expectDescription(description: string): Promise<void> {
        await expect(this.editor.getByTestId('description-content-area').getByText(description, { exact: true })).toBeVisible();
    }
}