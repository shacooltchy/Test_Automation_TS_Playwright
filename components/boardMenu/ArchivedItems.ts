import { expect, Locator, Page } from "@playwright/test";

export class ArchivedItems {
    private readonly page: Page;
    private readonly archivedItemsPopover: Locator;
    constructor(page: Page) {
        this.page = page;
        this.archivedItemsPopover = page.getByTestId('board-menu-popover').filter({has: page.getByRole('heading', {name: 'Archived items', exact: true})});
    }

    async expectPopoverIsVisible(): Promise<void> {
        await expect(this.archivedItemsPopover).toBeVisible();
    }

    async viewArchivedItems(option: 'Lists' | 'Cards'): Promise<void> {
        await expect(this.archivedItemsPopover.getByTestId('board-menu-container').getByRole('button', {name: 'Lists'}).or(this.archivedItemsPopover.getByTestId('board-menu-container').getByRole('button', {name: 'Cards'}))).toBeVisible();
        const switchListsCardsButton = this.archivedItemsPopover.getByTestId('board-menu-container').getByRole('button', {name: option});
        const buttonVisible = await switchListsCardsButton.isVisible();
        if(buttonVisible) {
            await switchListsCardsButton.click();
        }
    }

    async expectItemIsArchived(itemName: string) {
        await expect(this.archivedItemsPopover.getByTestId('board-menu-container').locator('div').getByText(itemName, {exact: true})).toBeVisible();
    }

    async restoreItem(itemName: string) {
        await this.archivedItemsPopover.getByTestId('board-menu-container').locator('div').filter({has: this.page.getByText(itemName, {exact: true})}).getByRole('button', {name: 'Restore'}).click();
    }

    async deleteItem(itemName: string) {
        await this.archivedItemsPopover.getByTestId('board-menu-container').locator('div').filter({has: this.page.getByText(itemName, {exact: true})}).getByRole('button').filter({has: this.page.getByTestId('TrashIcon')}).click();
    }
}