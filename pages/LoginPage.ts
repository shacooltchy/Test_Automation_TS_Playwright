import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { ENV } from "../config/env";

export class LoginPage extends BasePage {
    constructor(page: Page) {
        super(page, /login/, 'Log in to continue');
    }

    async LogIn()
    {
        await this.enterEmail();
        await this.clickContinueLogInButton();
        await this.enterPassword();
        await this.clickContinueLogInButton();
    }

    async enterEmail(email: string = ENV.email) {
        await this.page.getByTestId('username').fill(email);
    }

    async clickContinueLogInButton()
    {
        await this.page.getByTestId('login-submit-idf-testid').click();
    }

    async enterPassword(password: string = ENV.password) {
        await this.page.getByTestId('password').fill(password);
    }
}