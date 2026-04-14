import { expect, Locator, Page } from "@playwright/test";
import { AccountMenu } from "./accountMenu";

export class AuthenticatedHeader {
    private readonly page: Page;
    private readonly rootLocator : Locator;
    private readonly memberButton: Locator;
    private readonly backToHomeButton: Locator;
    readonly accountMenu: AccountMenu;


    constructor(page: Page) {
        this.page = page;
        this.rootLocator = this.page.getByTestId('authenticated-header');
        this.memberButton = this.rootLocator.getByTestId('header-member-menu-button');
        this.backToHomeButton = this.rootLocator.getByRole('link', { name: 'Back to home' });

        this.accountMenu = new AccountMenu(page);
    }

    async clickMemberButton() {
        await this.memberButton.click();
    }

    async clickBackToHomeButtonAndExpectBoardsPage() {
        await this.backToHomeButton.click();
        await expect(this.page).toHaveURL(/\/boards/);
    }
}