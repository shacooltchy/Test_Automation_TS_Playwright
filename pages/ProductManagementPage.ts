import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Header } from "../components/header";

export class ProductManagementPage extends BasePage{
    readonly header: Header;

    constructor(page: Page) {
        super(page, /teams\/product/, 'Trello For Product Management Teams | Trello');
        this.header = new Header(page);
    }

    /*async expectProductManagementPageIsVisible() {
        await expect(this.page).toHaveURL('https://trello.com/teams/product');
        await expect(this.page).toHaveTitle('Trello For Product Management Teams | Trello');
    }*/
}