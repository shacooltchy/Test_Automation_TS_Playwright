import { expect, Locator, Page } from "@playwright/test";
import { ListAction } from "../../enums/ListAction";

export class ListActionsPopover {
    private readonly listActionsPopover: Locator;

    constructor(page: Page) {
        this.listActionsPopover = page.getByTestId('list-actions-popover');
    }

    async expectActionsListPopoverIsVisible(): Promise<void> {
        await expect(this.listActionsPopover).toBeVisible();
    }

    async clickAction(action: ListAction) {
        await this.listActionsPopover.getByRole('button', {name: action}).click();
    }
}