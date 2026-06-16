import { expect, Locator, Page } from "@playwright/test";
import { DescriptionTextEditor } from "../../descriptionTextEditor";
import { ComponentBase } from "../../componentBase";

export class AboutThisBoard extends ComponentBase {
    readonly descriptionButton: Locator;
    private readonly descriptionText: Locator;
    readonly descriptionEditor: DescriptionTextEditor;

    constructor(page: Page, rootLocator: Locator = page.getByTestId('board-menu-popover').filter({has: page.getByRole('heading', {name: 'About this board', exact: true})})) {
        super(rootLocator);
        this.descriptionButton = rootLocator.getByRole('button', { name: 'Add a description to let your teammates know what this board is used for. You’ll get bonus points if you add instructions for how to collaborate!' });
        this.descriptionText = rootLocator.getByTestId('description-content-area');
        this.descriptionEditor = new DescriptionTextEditor(page);
    }

    async expectDescription(description: string): Promise<void> {
        await expect(this.descriptionText).toHaveText(description);
    }
}