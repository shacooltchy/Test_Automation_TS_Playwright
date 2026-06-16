import { expect, Locator, Page } from "@playwright/test";
import { QuickCardEditorOption } from "../../../enums/quickCardEditorOption";
import { MoveCardActionDialog } from "./moveCardActionDialog";
import { ComponentBase } from "../../componentBase";

export class QuickCardEditor extends ComponentBase {
    private readonly editor: Locator;
    readonly moveCardActionDialog: MoveCardActionDialog;

    constructor(page: Page, rootLocator: Locator = page.getByTestId('quick-card-editor-buttons')) {
        super(rootLocator);
        this.editor = rootLocator;
        this.moveCardActionDialog = new MoveCardActionDialog(page);
    }

    async expectVisible(): Promise<void> {
        await expect(this.editor).toBeVisible();
    }

    async expectNotVisible(): Promise<void> {
        await expect(this.editor).not.toBeVisible();
    }

    async clickOption(option: QuickCardEditorOption): Promise<void> {
        await this.editor.getByTestId(option).click();
    }
}