import { Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { Header } from "../components/header";

export class EngineeringTeamsPage extends BasePage {
    readonly header: Header;

    constructor(page: Page) {
        super(page);
        this.header = new Header(page);
    }

    async expectPageVisible(): Promise<void> {
        await super.expectPageVisible(/teams\/engineering/, 'Trello for Engineering Teams | Trello');
    }
}