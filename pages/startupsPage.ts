import { Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { Header } from "../components/header";

export class StartupsPage extends BasePage {
    readonly header: Header;

    constructor(page: Page) {
        super(page);
        this.header = new Header(page);
    }

    async expectPageIsVisible(): Promise<void> {
        await super.expectPageIsVisible(/teams\/startups/, 'Trello for Startups | Trello');
    }
}