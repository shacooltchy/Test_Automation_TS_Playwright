import { Page } from "@playwright/test";
import { Header } from "../components/header";
import { BasePage } from "./BasePage";
import { HeaderMenu } from "../components/header-menu/HeaderMenu";
import { FeaturesHeaderMenu } from "../components/header-menu/FeaturesHeaderMenu";
import { SolutionsHeaderMenu } from "../components/header-menu/SolutionsHeaderMenu";

//na page'ach metody biznesowe, komponenty i lokatory specyficzne dla strony
export class HomePage extends BasePage{
    readonly header: Header;
    readonly headerMenu: HeaderMenu;
    readonly featuresHeaderMenu: FeaturesHeaderMenu;
    readonly solutionsHeaderMenu: SolutionsHeaderMenu;

    constructor(page: Page) {
        super(page); // <-- kluczowe przy rozszerzaniu BasePage!
        this.header = new Header(page);
        this.headerMenu = new HeaderMenu(page);
        this.featuresHeaderMenu = new FeaturesHeaderMenu(page);
        this.solutionsHeaderMenu = new SolutionsHeaderMenu(page);
    }

    async navigate() {
        await this.page.goto('/home');
    }
}