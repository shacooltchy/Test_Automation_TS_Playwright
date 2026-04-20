import { Page } from "@playwright/test";
import { Header } from "../components/header";
import { BasePage } from "./basePage1";
import { FeaturesHeaderMenu } from "../components/headerMenu/featuresHeaderMenu";
import { SolutionsHeaderMenu } from "../components/headerMenu/solutionsHeaderMenu";

//na page'ach metody biznesowe, komponenty i lokatory specyficzne dla strony
export class HomePage extends BasePage{
    readonly header: Header;
    readonly featuresHeaderMenu: FeaturesHeaderMenu;
    readonly solutionsHeaderMenu: SolutionsHeaderMenu;

    constructor(page: Page) {
        super(page); // <-- kluczowe przy rozszerzaniu BasePage!
        this.header = new Header(page);
        this.featuresHeaderMenu = new FeaturesHeaderMenu(page);
        this.solutionsHeaderMenu = new SolutionsHeaderMenu(page);
    }

    async navigate() {
        await this.page.goto('/home');
    }

    async expectPageIsVisible(): Promise<void> {
        await this.header.expectHeaderTitleIsVisible('Capture, organize, and tackle your to-dos from anywhere.', 'Trello brings all your tasks, teammates, and tools together');
    }
}