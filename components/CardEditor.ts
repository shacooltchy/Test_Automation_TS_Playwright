import { expect, Locator, Page } from "@playwright/test";
import { CardEditorAction } from "../enums/CardEditorAction";

export class CardEditor {
    private readonly page: Page;
    private readonly editor: Locator;

    constructor(page: Page) {
        this.page = page;
        this.editor = page.getByTestId('card-back-name');
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
        expect((this.editor.getByText('This card was archived on'))).toBeVisible();
    }
}