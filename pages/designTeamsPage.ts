import { Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { Header } from "../components/header";

export class DesignTeamsPage extends BasePage {
    readonly header: Header;

    constructor(page:Page) {
        super(page);
        this.header = new Header(page);
    }

    async expectPageVisible(): Promise<void> {
        await super.expectPageVisible(/teams\/design/, 'Trello for Design Teams | Trello');
    }
}