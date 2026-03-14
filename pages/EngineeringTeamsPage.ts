import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Header } from "../components/header";

export class EngineeringTeamsPage extends BasePage {
    readonly header: Header;

    constructor(page: Page) {
        super(page, /teams\/engineering/, 'Trello for Engineering Teams | Trello');
        this.header = new Header(page);
    }
}