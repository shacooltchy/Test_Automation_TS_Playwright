import { expect, Locator, Page } from "@playwright/test";
import { ListActionsPopover } from "./listActionsPopover";
import { Card } from "../card/card";

export class List {
    private readonly list: Locator;
    readonly listActions: ListActionsPopover;
    readonly card: Card;

    constructor(page: Page) {
        this.list = page.getByTestId('list');
        this.listActions = new ListActionsPopover(page);
        this.card = new Card(page);
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
}