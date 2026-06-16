import { expect, Locator } from "@playwright/test";

export abstract class ComponentBase {
    private readonly componentRoot: Locator;
    constructor(componentRoot: Locator) {
        this.componentRoot = componentRoot;
    }

    async expectVisible(): Promise<void> {
        await expect(this.componentRoot).toBeVisible();
    }

    async expectNotVisible(): Promise<void> {
        await expect(this.componentRoot).not.toBeVisible();
    }
}