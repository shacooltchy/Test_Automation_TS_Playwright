import { expect, Locator, Page } from "@playwright/test";
import { AuthenticatedHeader } from "../components/authHeader/authenticatedHeader";
import { HeaderMenu } from "../components/headerMenu/headerMenu";
import { cookieBanner } from "../components/banners/cookieBanner";
import { newFeaturesBanner } from "../components/banners/newFeaturesBanner";
import { adBanner } from "../components/banners/adBanner";

// only for common methods used on different pages and which need access to the page object, do not add locators - these are only for pages and components
export abstract class BasePage {
    protected readonly page: Page
    readonly headerMenu: HeaderMenu;
    readonly authenticatedHeader: AuthenticatedHeader;
    readonly cookieBanner: cookieBanner;
    readonly newFeaturesBanner: newFeaturesBanner;
    readonly adBanner: adBanner;

    protected constructor(page: Page) {
        this.page = page;
        this.headerMenu = new HeaderMenu(page);
        this.authenticatedHeader = new AuthenticatedHeader(page);
        this.cookieBanner = new cookieBanner(page);
        this.newFeaturesBanner = new newFeaturesBanner(page);
        this.adBanner = new adBanner(page);
    }

    async expectPageVisible(urlPart: string | RegExp, pageTitle: string | RegExp, alternativePageTitle?: string | RegExp) {
        await expect(this.page).toHaveURL(urlPart, {timeout: 10_000});

        if (alternativePageTitle) {
            const regex =
                pageTitle instanceof RegExp || alternativePageTitle instanceof RegExp
                    ? new RegExp(`${pageTitle}|${alternativePageTitle}`)
                    : new RegExp(`(${pageTitle})|(${alternativePageTitle})`);

            await expect(this.page).toHaveTitle(regex);
        } else {
            await expect(this.page).toHaveTitle(pageTitle);
        }
    }

    async screenShot(name: string) {
        await this.page.screenshot({path: `screenshots/${name}.png`})
    }
}