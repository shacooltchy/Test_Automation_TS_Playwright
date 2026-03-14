import { expect, Locator, Page } from "@playwright/test";

// miejsce na metody wykorzystywane na roznych stronach i ktore potrzebuje dostęp do page, nie dodawac locatorow - to tylko na page'ach i w komponentach
export abstract class BasePage {
    protected readonly page: Page
    protected readonly urlPart: string | RegExp;
    protected readonly pageTitle: string;

    protected constructor(page: Page, url: string | RegExp, pageTitle: string) {
        this.page = page;
        this.urlPart = url;
        this.pageTitle = pageTitle;
    }

    async expectPageIsVisible() {
        await expect(this.page).toHaveURL(this.urlPart);
        await expect(this.page).toHaveTitle(this.pageTitle);
    }

    async goTo() {
        await this.page.goto(`https://trello.com${this.urlPart}`);
    }

    async waitForUrl(urlPart: string | RegExp) {
        await expect(this.page).toHaveURL(urlPart);
    }

    async waitForTitle(pageTitle: string) {
        await expect(this.page).toHaveTitle(pageTitle);
    }

    async waitForVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }

    async screenShot(name: string) {
        await this.page.screenshot({path: `screenshots/${name}.png`})
    }
}