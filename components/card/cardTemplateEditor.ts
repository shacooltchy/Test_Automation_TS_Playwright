import { expect, Locator, Page } from "@playwright/test";
import { CardEditor } from "./cardEditor/cardEditor";

export class CardTemplateEditor extends CardEditor {
    private readonly cardTemplateEditor: Locator;

    constructor(page: Page) {
        super(page);
        this.cardTemplateEditor = page.getByTestId('card-back-name').filter({has: page.getByRole('heading', {name: 'This is a Template card.'})});
    }

    async expectVisible(): Promise<void> {
        await expect(this.cardTemplateEditor).toBeVisible();
    }

    async expectNotVisible(): Promise<void> {
        await expect(this.cardTemplateEditor).not.toBeVisible();
    }
}