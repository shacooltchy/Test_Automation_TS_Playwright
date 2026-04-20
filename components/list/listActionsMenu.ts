import { expect, Locator, Page } from "@playwright/test";
import { ListAction } from "../../enums/listAction";

export class ListActionsMenu {
    private readonly listActionsMenu: Locator;

    constructor(page: Page) {
        this.listActionsMenu = page.getByTestId('list-actions-popover');
    }

    async expectListActionsMenuIsVisible(): Promise<void> {
        await expect(this.listActionsMenu).toBeVisible();
    }

    async clickAction(action: ListAction) {
        await this.listActionsMenu.getByRole('button', {name: action}).click();
    }
}