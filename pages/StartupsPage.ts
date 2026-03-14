import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Header } from "../components/header";

export class StartupsPage extends BasePage {
    readonly header: Header;

    constructor(page: Page) {
        super(page, /teams\/startups/, 'Trello for Startups | Trello' )
        this.header = new Header(page);
    }
}