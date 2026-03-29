import { expect, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { AuthenticatedHeader } from "../components/AuthenticatedHeader";

export class BoardDetailsPage extends BasePage {
    readonly authenticatedHeader: AuthenticatedHeader;

    constructor(page: Page) {
        super(page);
        this.authenticatedHeader = new AuthenticatedHeader(page);        
    };

    async expectPageIsVisible(boardName: string): Promise<void> {
        await expect(this.page).toHaveTitle(boardName + ' | Trello');
        await expect(this.page.getByTestId('board-name-container')).toHaveText(boardName);
        await this.minimizeAdContainer();
    }

    async minimizeAdContainer(): Promise<void> {
        try {
            await this.page.getByTestId('ad-container').getByRole('button', { name: 'Minimize' }).click({ timeout: 5000 });
        } catch (error) {
            //Ad container not found, skipping minimize step.
        }
    } 
}
