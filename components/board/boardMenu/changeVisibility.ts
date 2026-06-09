import { expect, Locator, Page } from "@playwright/test";

export class ChangeVisibility {
    private readonly popover: Locator;
    readonly closeButton: Locator;

    constructor(page: Page) {
        this.popover = page.getByRole('dialog').filter({has: page.getByRole('heading', { name: 'Change visibility', exact: true })});
        this.closeButton = this.popover.getByRole('button', { name: 'Close popover' });
    }

    async expectVisible() {
        await expect(this.popover).toBeVisible();
    }

    async expectNotVisible() {
        await expect(this.popover).not.toBeVisible();
    }

    async expectVisibilitySelected(visibility: ChangeVisibilityPopoverOption) {
        const visibilityOption = this.popover.locator('label').filter({ hasText: visibility });
        await expect(visibilityOption.locator('span input')).toHaveAttribute('checked');
    }

    async expectVisibilityNotSelected(visibility: ChangeVisibilityPopoverOption) {
        const visibilityOption = this.popover.locator('label').filter({ hasText: visibility });
        await expect(visibilityOption.locator('span input')).not.toHaveAttribute('checked');
    }

    async selectVisibility(visibility: ChangeVisibilityPopoverOption) {
        await this.popover.locator('label').filter({ hasText: visibility }).click();
    }
}

export enum ChangeVisibilityPopoverOption {
    Private = 'PrivateOnly board members',
    Workspace = 'WorkspaceAll members',
}