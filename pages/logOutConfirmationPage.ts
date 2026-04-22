import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class LogOutConfirmationPage extends BasePage {
private readonly logOutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.logOutButton = page.getByTestId('logout-button');
    }

    async expectPageVisible() {
        await super.expectPageVisible(/\/logout/, 'Log out of your Atlassian account - Log in with Atlassian account');
    }

    async clickLogOutButton() {
        await this.logOutButton.click();
    }
}
