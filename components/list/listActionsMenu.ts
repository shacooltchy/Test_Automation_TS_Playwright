import { Locator, Page } from "@playwright/test";
import { ListAction } from "../../enums/listAction";
import { ComponentBase } from "../componentBase";

export class ListActionsMenu extends ComponentBase {
    private readonly listActionsMenu: Locator;

    constructor(page: Page, rootLocator: Locator = page.getByTestId('list-actions-popover')) {
        super(rootLocator);
        this.listActionsMenu = rootLocator;
    }

    async clickAction(action: ListAction) {
        await this.listActionsMenu.getByRole('button', {name: action}).click();
    }
}