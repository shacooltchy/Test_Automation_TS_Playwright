import { expect, Locator, Page } from "@playwright/test";
import { ListActionsMenu } from "./listActionsMenu";
import { Card } from "../card/card";
import { ConfirmationDialog } from "../confirmationDialog";
import { MoveListActionDialog } from "./moveListActionDialog";

export class List {
    private readonly page: Page;
    private readonly list: Locator;
    readonly listActionsMenu: ListActionsMenu;
    readonly copyListConfirmationDialog: ConfirmationDialog;
    readonly moveListActionDialog: MoveListActionDialog;
    readonly card: Card;

    constructor(page: Page) {
        this.page = page;
        this.list = page.getByTestId('list');
        this.listActionsMenu = new ListActionsMenu(page);
        this.copyListConfirmationDialog = new ConfirmationDialog(page, 'Copy list', 'Create list', true);
        this.moveListActionDialog = new MoveListActionDialog(page);
        this.card = new Card(page);
    }

    async expectListIsVisible(listName: string): Promise<void> {
        await expect(this.list.filter({has: this.page.getByRole('heading', {name: listName, exact: true})})).toBeVisible();
    }

    async expectListIsNotVisible(listName: string): Promise<void> {
        await expect(this.list.filter({hasText: listName})).not.toBeVisible();
    }

    async openListActionsMenu(listName: string): Promise<void> {
        await this.list.filter({hasText: listName}).getByTestId('list-edit-menu-button').click();
    }

    async clickAddACardButton(listName: string): Promise<void> {
        await this.list.filter({hasText: listName}).getByTestId('list-add-card-button').click();
    }

    async enterATitle(title: string): Promise<void> {
        await this.list.getByTestId('list-card-composer-textarea').fill(title);
    }

    async clickAddCardButton(): Promise<void> {
        await this.list.getByTestId('list-card-composer-add-card-button').click();
    }

    async clickCloseAddCardFormButton(): Promise<void> {
        await this.list.getByTestId('CloseIcon').click();
    }

    async expectAddCardFormIsNotVisible(): Promise<void> {
        await expect(this.list.getByRole('form')).not.toBeVisible();
    }

    async expectCardPositionInList(cardTitle: string, listName: string, position: number): Promise<void> {
        const list = this.list.filter({has: this.page.getByRole('heading', {name: listName, exact: true})});
        const cards = list.getByTestId('list-card');
        await expect(cards.nth(position-1)).toHaveText(cardTitle); // Position is 1-based index, while nth() uses 0-based index
    }
}