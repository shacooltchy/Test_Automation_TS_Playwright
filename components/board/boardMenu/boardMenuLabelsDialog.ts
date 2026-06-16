import { expect, Locator, Page } from "@playwright/test";
import { ComponentBase } from "../../componentBase";

export class BoardMenuLabelsDialog extends ComponentBase {
    private readonly dialog: Locator;
    readonly closeButton: Locator;
    readonly createNewLabelButton: Locator;
    readonly enableColorblindFriendlyModeButton: Locator;

    constructor(page: Page, rootLocator: Locator = page.getByRole('dialog').filter({ has: page.getByRole('heading', { name: 'Labels' }) })) {
        super(rootLocator);
        this.dialog = rootLocator;
        this.closeButton = rootLocator.getByRole('button', { name: 'Close popover' });
        this.createNewLabelButton = rootLocator.getByRole('button', { name: 'Create a new label' });
        this.enableColorblindFriendlyModeButton = rootLocator.getByRole('button', { name: 'Enable colorblind friendly mode' });
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