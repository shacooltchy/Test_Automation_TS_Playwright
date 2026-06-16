import { expect, Locator, Page } from "@playwright/test";
import { ComponentBase } from "../../componentBase";

export class ChangeVisibility extends ComponentBase {
    private readonly popover: Locator;
    readonly closeButton: Locator;

    constructor(page: Page, rootLocator: Locator = page.getByRole('dialog').filter({has: page.getByRole('heading', { name: 'Change visibility', exact: true })})) {
        super(rootLocator);
        this.popover = rootLocator;
        this.closeButton = this.popover.getByRole('button', { name: 'Close popover' });
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