import { Page } from "@playwright/test";
import { Header } from "../components/header";

export class InboxPage {
    readonly header: Header;

    constructor(page: Page) {
        this.header = new Header(page);
    }
}