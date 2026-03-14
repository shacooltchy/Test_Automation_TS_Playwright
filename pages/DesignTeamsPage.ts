import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Header } from "../components/header";

export class DesignTeamsPage extends BasePage {
    readonly header: Header;

    constructor(page:Page) {
        super(page, /teams\/design/, 'Trello for Design Teams | Trello');
        this.header = new Header(page);
    }
}