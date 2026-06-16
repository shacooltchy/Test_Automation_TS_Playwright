import { expect, Locator, Page } from "@playwright/test";
import { ComponentBase } from "../../componentBase";

export class CreateNewLabelDialog extends ComponentBase {
    private readonly dialog: Locator;
    readonly labelTitle: Locator;
    readonly colorPalette: Locator;
    readonly createButton: Locator;

    constructor(page: Page, rootLocator: Locator = page.getByRole('dialog').filter({ has: page.getByRole('heading', { name: 'Create a new label' }) })) {
        super(rootLocator);
        this.dialog = rootLocator;
        this.labelTitle = this.dialog.getByLabel('Title');
        this.colorPalette = this.dialog.getByTestId('color-palette');
        this.createButton = this.dialog.getByRole('button', { name: 'Create' });
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