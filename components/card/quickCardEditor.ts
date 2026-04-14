import { expect, Locator, Page } from "@playwright/test";
import { QuickCardEditorOption } from "../../enums/QuickCardEditorOption";

export class QuickCardEditor {
    private readonly editor: Locator;

    constructor(page: Page) {
        this.editor = page.getByTestId('quick-card-editor-buttons');
    }

    async expectQuickCardEditorIsVisible(): Promise<void> {
        await expect(this.editor).toBeVisible();
    }

    async clickOption(option: QuickCardEditorOption): Promise<void> {
        await this.editor.getByTestId(option).click();
    }
}