import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Header } from "../components/Header";

export class RemoteTeamsPage extends BasePage {
    readonly header: Header;

    constructor(page: Page) {
        super(page);
        this.header = new Header(page)
    }
    
    async expectPageIsVisible(): Promise<void> {
        await super.expectPageIsVisible(/teams\/remote-team-management/, 'Trello for Remote Teams | Trello');
    }
}