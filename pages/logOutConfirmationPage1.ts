import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage1";

export class LogOutConfirmationPage extends BasePage {
private readonly logOutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.logOutButton = page.getByTestId('logout-button');
    }

    async expectPageIsVisible() {
        await super.expectPageIsVisible(/\/logout/, 'Log out of your Atlassian account - Log in with Atlassian account');
    }

    async clickLogOutButton() {
        await this.logOutButton.click();
    }
}
