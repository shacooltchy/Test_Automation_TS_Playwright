import { Page } from "@playwright/test";
import { Header } from "../components/Header";

export class PowerUpsPage {
    private readonly page: Page;
    readonly header: Header;

    constructor(page: Page) {
        this.page = page;
        this.header = new Header(page);
    }
}