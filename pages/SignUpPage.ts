import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SignUpPage extends BasePage {
    constructor(page: Page) {
        super(page, /signup/, 'Sign up - Log in with Atlassian account')
    }
}