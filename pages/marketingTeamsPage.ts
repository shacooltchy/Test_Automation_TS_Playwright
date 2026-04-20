import { Page } from "@playwright/test";
import { Header } from "../components/header";
import { BasePage } from "./basePage";

export class MarketingTeamsPage extends BasePage{
    readonly header: Header;

    constructor(page: Page) {
        super(page);
        this.header = new Header(page);
    }

    async expectPageIsVisible(): Promise<void> {
        await super.expectPageIsVisible(/marketing/, 'Trello for Marketing Teams | Trello');
    }
}