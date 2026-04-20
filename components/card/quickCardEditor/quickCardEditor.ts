import { expect, Locator, Page } from "@playwright/test";
import { QuickCardEditorOption } from "../../../enums/QuickCardEditorOption";
import { MoveCardActionDialog } from "./moveCardActionDialog";

export class QuickCardEditor {
    private readonly editor: Locator;
    readonly moveCardActionDialog: MoveCardActionDialog;

    constructor(page: Page) {
        this.editor = page.getByTestId('quick-card-editor-buttons');
        this.moveCardActionDialog = new MoveCardActionDialog(page);
    }

    async expectQuickCardEditorVisible(): Promise<void> {
        await expect(this.editor).toBeVisible();
    }

    async expectQuickCardEditorNotVisible(): Promise<void> {
        await expect(this.editor).not.toBeVisible();
    }

    async clickOption(option: QuickCardEditorOption): Promise<void> {
        await this.editor.getByTestId(option).click();
    }
}