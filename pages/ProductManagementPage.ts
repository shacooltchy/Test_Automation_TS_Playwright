import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Header } from "../components/Header";

export class ProductManagementPage extends BasePage{
    readonly header: Header;

    constructor(page: Page) {
        super(page);
        this.header = new Header(page);
    }

    async expectPageIsVisible(): Promise<void> {
        await super.expectPageIsVisible(/teams\/product/, 'Trello For Product Management Teams | Trello');
    }
}