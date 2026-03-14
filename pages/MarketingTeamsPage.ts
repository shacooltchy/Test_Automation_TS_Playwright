import { Page } from "@playwright/test";
import { Header } from "../components/header";
import { BasePage } from "./BasePage";

export class MarketingTeamsPage extends BasePage{
    readonly header: Header;

    constructor(page: Page) {
        super(page, /marketing/, 'Trello for Marketing Teams | Trello');
        this.header = new Header(page);
    }

    /*async expectMarketingTeamsPageVisible() {
        await this.waitForUrl(/marketing/);
        await this.waitForTitle('Trello for Marketing Teams | Trello');
    }*/
}