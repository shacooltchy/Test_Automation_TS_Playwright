import { Page } from "@playwright/test";
import { Header } from "../components/header";

export class AutomationPage {
    private readonly page: Page;
    readonly header: Header;

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(page);
    }
}