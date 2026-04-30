import { expect, Locator, Page } from "@playwright/test";
import { AccountMenu } from "./accountMenu";

export class AuthenticatedHeader {
    private readonly header : Locator;
    readonly accountMenu: AccountMenu;

    constructor(page: Page) {
        this.header = page.getByTestId('authenticated-header');
        this.accountMenu = new AccountMenu(page);
    }

    async clickMemberButton() {
        await this.header.getByTestId('header-member-menu-button').click();
    }

    async clickBackToHomeButton() {
        await this.header.getByRole('link', { name: 'Back to home' }).click();
    }
}