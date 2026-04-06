import { expect, Locator, Page } from "@playwright/test";

export class Alert {
    private readonly alert: Locator;

    constructor(page: Page, alertTitle: string) {
        this.alert = page.getByRole('alert').filter({has: page.getByRole('heading', { name: alertTitle })});
    }

    async expectAlertIsVisible() {
        await expect(this.alert).toBeVisible();
    }
}