import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class SignUpPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async expectPageVisible() {
        await super.expectPageVisible(/signup/, 'Sign up - Log in with Atlassian account', 'Sign up');
    }
}