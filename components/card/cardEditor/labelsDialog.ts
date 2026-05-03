import { expect, Locator, Page } from "@playwright/test";

export class LabelsDialog {
    private readonly dialog: Locator;

    constructor(page: Page) {
        this.dialog = page.getByTestId('labels-popover-labels-screen');
    }

    async closeDialog(): Promise<void> {
        await this.dialog.getByRole('button', { name: 'Close popover' }).click();
    }

    async expectDialogIsVisible(): Promise<void> {
        await expect(this.dialog).toBeVisible();
    }

    async expectDialogIsNotVisible(): Promise<void> {
        await expect(this.dialog).not.toBeVisible();
    }

    async clickLabel(labelColor?: string, labelTitle?: string): Promise<void> {
        if (!labelColor && !labelTitle) {
            throw new Error('Either labelColor or labelTitle must be provided');
        }

        const labels = this.dialog.getByTestId('card-label');
        const count = await labels.count();

        for (let i = 0; i < count; i++) {
            const el = labels.nth(i);

            const color = await el.getAttribute('data-color'); // can be null
            const title = (await el.innerText()).trim();       // can be ""

            const colorMatches = labelColor ? color === labelColor : true;
            const titleMatches = labelTitle ? title === labelTitle : true;

            if (colorMatches && titleMatches) {
                await el.click();
                return;
            }
        }

        throw new Error(`Label not found for color="${labelColor}" title="${labelTitle}"`);
    } 
}