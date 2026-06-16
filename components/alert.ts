import { Locator, Page } from "@playwright/test";
import { ComponentBase } from "./componentBase";

export class Alert extends ComponentBase {
    private readonly alert: Locator;

    constructor(page: Page, alertTitle: string | RegExp, rootLocator: Locator = page.getByRole('alert').filter({has: page.getByRole('heading', { name: alertTitle })})) {
        super(rootLocator);
        this.alert = rootLocator;
    }

    async clickButton(buttonName:string): Promise<void> {
        await this.alert.getByRole('button', {name: buttonName}).click();
    }
}