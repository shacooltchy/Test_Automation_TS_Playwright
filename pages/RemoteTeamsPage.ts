import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Header } from "../components/header";

export class RemoteTeamsPage extends BasePage {
    readonly header: Header;

    constructor(page: Page) {
        super(page, /teams\/remote-team-management/, 'Trello for Remote Teams | Trello');
        this.header = new Header(page)
    }
}