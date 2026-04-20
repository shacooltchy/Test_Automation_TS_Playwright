import { Page } from "@playwright/test";
import { BasePage } from "./basePage1";

export class SignUpPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async expectPageIsVisible() {
        await super.expectPageIsVisible(/signup/, 'Sign up - Log in with Atlassian account', 'Sign up');
    }
}