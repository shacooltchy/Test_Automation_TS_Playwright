import { expect, Locator, Page } from "@playwright/test";

export class AccountMenu {
    private readonly accountMenuRoot: Locator;
    private readonly logOutButton: Locator;

    constructor(page: Page) {
        this.accountMenuRoot = page.getByTestId('account-menu');
        this.logOutButton = this.accountMenuRoot.getByTestId('account-menu-logout-section').getByTestId('account-menu-logout');
    }

    async expectVisible() {
        await expect(this.accountMenuRoot).toBeVisible();
    }

    async clickLogOut() {
        await this.logOutButton.click();
    }
}