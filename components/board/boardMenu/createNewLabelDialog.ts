import { expect, Locator, Page } from "@playwright/test";

export class CreateNewLabelDialog {
    private readonly dialog: Locator;
    readonly labelTitle: Locator;
    readonly colorPalette: Locator;
    readonly createButton: Locator;

    constructor(page: Page) {
        this.dialog = page.getByRole('dialog').filter({ has: page.getByRole('heading', { name: 'Create a new label' }) });
        this.labelTitle = this.dialog.getByLabel('Title');
        this.colorPalette = this.dialog.getByTestId('color-palette');
        this.createButton = this.dialog.getByRole('button', { name: 'Create' });
    }

    async expectVisible(): Promise<void> {
        await expect(this.dialog).toBeVisible();
    }

    async expectNotVisible(): Promise<void> {
        await expect(this.dialog).not.toBeVisible();
    }

    async selectColor(color: string): Promise<void> {
        const colorOption = this.colorPalette.getByLabel(color);
        await expect(colorOption).toBeVisible();
        await colorOption.click();
        await expect(colorOption).toHaveAttribute('aria-checked', 'true');
    }
}

export enum NewLabelColor {
    subtle_green = 'subtle green'
}