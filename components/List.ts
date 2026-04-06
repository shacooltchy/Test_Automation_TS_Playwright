import { expect, Locator, Page } from "@playwright/test";
import { ListActionsPopover } from "./ListActionsPopover";

export class List {
    private readonly list: Locator;
    readonly listActions: ListActionsPopover;

    constructor(page: Page) {
        this.list = page.getByTestId('list');
        this.listActions = new ListActionsPopover(page);
    }

    async expectListIsVisible(listName: string): Promise<void> {
        await expect(this.list.filter({hasText: listName})).toBeVisible();
    }

    async expectListIsNotVisible(listName: string): Promise<void> {
        await expect(this.list.filter({hasText: listName})).not.toBeVisible();
    }

    async openListActionsPopover(listName: string): Promise<void> {
        await this.list.filter({hasText: listName}).getByTestId('list-edit-menu-button').click();
    }
}