import { expect, Locator, Page } from "@playwright/test";
import { DescriptionTextEditor } from "../../descriptionTextEditor";

export class AboutThisBoard {
    private readonly root: Locator;
    private readonly descriptionButton: Locator;
    private readonly descriptionText: Locator;
    readonly descriptionEditor: DescriptionTextEditor;

    constructor(page: Page) {
        this.root = page.getByTestId('board-menu-popover').filter({has: page.getByRole('heading', {name: 'About this board', exact: true})});
        this.descriptionButton = this.root.getByRole('button', { name: 'Add a description to let your teammates know what this board is used for. You’ll get bonus points if you add instructions for how to collaborate!' });
        this.descriptionText = this.root.getByTestId('description-content-area');
        this.descriptionEditor = new DescriptionTextEditor(page);
    }

    async expectVisible(): Promise<void> {
        await expect(this.root).toBeVisible();
    }

    async clickDescriptionButton(): Promise<void> {
        await this.descriptionButton.click();
    }

    async expectDescription(description: string): Promise<void> {
        await expect(this.descriptionText).toHaveText(description);
    }
}