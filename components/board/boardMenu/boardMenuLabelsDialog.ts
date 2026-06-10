import { expect, Locator, Page } from "@playwright/test";

export class BoardMenuLabelsDialog {
    private readonly dialog: Locator;
    readonly closeButton: Locator;
    readonly createNewLabelButton: Locator;
    readonly enableColorblindFriendlyModeButton: Locator;

    constructor(page: Page) {
        this.dialog = page.getByRole('dialog').filter({ has: page.getByRole('heading', { name: 'Labels' }) });
        this.closeButton = this.dialog.getByRole('button', { name: 'Close popover' });
        this.createNewLabelButton = this.dialog.getByRole('button', { name: 'Create a new label' });
        this.enableColorblindFriendlyModeButton = this.dialog.getByRole('button', { name: 'Enable colorblind friendly mode' });
    }

    async expectVisible(): Promise<void> {
        await expect(this.dialog).toBeVisible();
    }

    async expectNotVisible(): Promise<void> {
        await expect(this.dialog).not.toBeVisible();
    }

    async expectLabel(labelColor?: string, labelTitle?: string): Promise<void> {
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
                await expect(el).toBeVisible();
                return;
            }
        }

        throw new Error(`Label not found for color="${labelColor}" title="${labelTitle}"`);
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

export enum LabelColor {
    subtle_green = 'green_light'
}