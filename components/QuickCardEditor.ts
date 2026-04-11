import { expect, Locator, Page } from "@playwright/test";
import { CardEditorOption } from "../enums/CardEditorOption";

export class QuickCardEditor {
    private readonly editor: Locator;

    constructor(page: Page) {
        this.editor = page.getByTestId('quick-card-editor-buttons');
    }

    async expectQuickCardEditorIsVisible(): Promise<void> {
        await expect(this.editor).toBeVisible();
    }

    async clickOption(option: CardEditorOption): Promise<void> {
        await this.editor.getByTestId(option).click();
    }
}