import { expect, Locator, Page } from "@playwright/test";

export class AccountMenu {
    private readonly page: Page;
    private readonly accountMenuRoot: Locator;
    private readonly logOutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountMenuRoot = page.getByTestId('account-menu');
        this.logOutButton = this.accountMenuRoot.getByTestId('account-menu-logout-section').getByTestId('account-menu-logout');
    }

    async expectAccountMenuIsVisible() {
        await expect(this.accountMenuRoot).toBeVisible();
    }

    async clickLogOut() {
        await this.logOutButton.click();
    }
}