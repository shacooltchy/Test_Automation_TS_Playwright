import { expect, Locator, Page } from "@playwright/test";
import { AuthenticatedHeader } from "../components/authHeader/authenticatedHeader";
import { HeaderMenu } from "../components/header-menu/headerMenu";

// miejsce na metody wykorzystywane na roznych stronach i ktore potrzebuje dostęp do page, nie dodawac locatorow - to tylko na page'ach i w komponentach
export abstract class BasePage {
    protected readonly page: Page
    readonly headerMenu: HeaderMenu;
    readonly authenticatedHeader: AuthenticatedHeader;

    protected constructor(page: Page) {
        this.page = page;
        this.headerMenu = new HeaderMenu(page);
        this.authenticatedHeader = new AuthenticatedHeader(page);
    }

    async expectPageIsVisible(urlPart: string | RegExp, pageTitle: string | RegExp, timeout: number = 10_000) {
        await this.waitForUrl(urlPart, timeout);
        await this.waitForTitle(pageTitle);
    }

    async waitForUrl(urlPart: string | RegExp, timeout: number = 10_000 ) {
        await expect(this.page).toHaveURL(urlPart, {timeout: timeout});
    }

    async waitForTitle(pageTitle: string | RegExp) {
        await expect(this.page).toHaveTitle(pageTitle);
    }

    async waitForVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }

    async screenShot(name: string) {
        await this.page.screenshot({path: `screenshots/${name}.png`})
    }
}