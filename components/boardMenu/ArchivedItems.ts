import { expect, Locator, Page } from "@playwright/test";
import { ConfirmationDialog } from "../ConfirmationDialog";

export class ArchivedItems {
    private readonly page: Page;
    private readonly archivedItemsPopover: Locator;
    readonly deleteItemConfirmationDialog: ConfirmationDialog;

    constructor(page: Page) {
        this.page = page;
        this.archivedItemsPopover = page.getByTestId('board-menu-popover').filter({has: page.getByRole('heading', {name: 'Archived items', exact: true})});
        this.deleteItemConfirmationDialog = new ConfirmationDialog(page, 'Delete list?', 'Delete');
    }

    async expectPopoverIsVisible(): Promise<void> {
        await expect(this.archivedItemsPopover).toBeVisible();
    }

    async expectPopoverIsNotVisible(): Promise<void> {
        await expect(this.archivedItemsPopover).not.toBeVisible();
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

    async expectItemIsNotArchived(itemName: string) {
        await expect(this.archivedItemsPopover.getByTestId('board-menu-container').locator('div').getByText(itemName, {exact: true})).not.toBeVisible();
    }

    async restoreItem(itemName: string) {
        await this.archivedItemsPopover.getByTestId('board-menu-container').locator('div').filter({has: this.page.getByText(itemName, {exact: true})}).getByRole('button', {name: 'Restore'}).click();
    }

    async deleteItem(itemName: string) {
        await this.archivedItemsPopover.getByTestId('board-menu-container').locator('div').filter({has: this.page.getByText(itemName, {exact: true})}).getByRole('button').filter({has: this.page.getByTestId('TrashIcon')}).click();
    }

    async close(): Promise<void> {
        await this.archivedItemsPopover.getByRole('button', { name: 'Close popover' }).click();
    }
}