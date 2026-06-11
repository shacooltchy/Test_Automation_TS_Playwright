import { Locator, Page } from "@playwright/test";
import { AccountMenu } from "./accountMenu";

export class AuthenticatedHeader {
    private readonly header : Locator;
    readonly accountMenu: AccountMenu;
    readonly memberButton: Locator;
    readonly backToHomeButton: Locator;

    constructor(page: Page) {
        this.header = page.getByTestId('authenticated-header');
        this.accountMenu = new AccountMenu(page);
        this.memberButton = this.header.getByTestId('header-member-menu-button');
        this.backToHomeButton = this.header.getByRole('link', { name: 'Back to home' });
    }
}