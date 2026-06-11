import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { ENV } from "../config/env";

export class LoginPage extends BasePage {
    readonly continueLogInButton: Locator;

    constructor(page: Page) {
        super(page);
        this.continueLogInButton = page.getByTestId('login-submit-idf-testid');
    }

    async expectPageVisible() {
        await expect(this.page).toHaveURL(/login/);
        await expect(this.page).toHaveTitle('Log in to continue');
    }

    async logIn()
    {
        await this.enterEmail();
        await this.continueLogInButton.click();
        await this.enterPassword();
        await this.continueLogInButton.click();

        await this.handleMFA();
    }

    async enterEmail(email: string = ENV.email) {
        await this.page.getByTestId('username').fill(email, {timeout: 15_000});
    }

    async enterPassword(password: string = ENV.password) {
        await this.page.getByTestId('password').fill(password);
    }

    async handleMFA() {
        try {
            await expect(this.page.getByRole('heading', { name: 'Security review' })).toBeVisible({ timeout: 1000 });
            await this.page.getByTestId('mfa-promote-dismiss-idf-testid').click();
        }
        catch (error) {
            // MFA review not visible, skipping
        }
    }
}