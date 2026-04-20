import { Page } from "@playwright/test";
import { BasePage } from "./basePage1";
import { Header } from "../components/header";

export class EngineeringTeamsPage extends BasePage {
    readonly header: Header;

    constructor(page: Page) {
        super(page);
        this.header = new Header(page);
    }

    async expectPageIsVisible(): Promise<void> {
        await super.expectPageIsVisible(/teams\/engineering/, 'Trello for Engineering Teams | Trello');
    }
}