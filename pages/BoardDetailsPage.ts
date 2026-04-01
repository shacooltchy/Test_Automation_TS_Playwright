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
        await this.handlePotentialInterferingElements();
    }

    //refactor
    private async handlePotentialInterferingElements(): Promise<void> {
        try {
            await this.minimizeAdContainer();
            await this.closeNewFeaturesBannerIfVisible();
        } catch (error) {
            //If elements are not found, we can safely ignore the errors and proceed with the test.
        }

        try {
            await this.closeNewFeaturesBannerIfVisible();
            await this.minimizeAdContainer();
        } catch (error) {
            //If ad container is not found, we can safely ignore the error and proceed with the test.
        }
    }

    private async minimizeAdContainer(): Promise<void> {
        try {
            await this.page.getByTestId('ad-container').getByRole('button', { name: 'Minimize' }).click({ timeout: 5_000 });
        } catch (error) {
            //Ad container not found, skipping minimize step.
        }
    }

    private async closeNewFeaturesBannerIfVisible(): Promise<void> {
        const newFeaturesBanner = this.page.getByTestId('spotlight--dialog');
        if (await newFeaturesBanner.isVisible({ timeout: 5_000 })) {
            await newFeaturesBanner.getByRole('button', { name: 'Dismiss' }).click({ timeout: 5000 });
        }
    }

    async clickOnBoardMenuButton(): Promise<void> {
        await this.page.getByTestId('board-header').getByRole('button', { name: 'Show menu' }).click();
    }

    async expectBoardMenuToBeVisible(): Promise<void> {
        await expect(this.page.getByTestId('board-menu-popover')).toBeVisible();
    }

    async clickCloseBoardButton(): Promise<void> {
        await this.page.getByTestId('board-menu-popover').getByRole('button', { name: 'Close board' }).click();
    }

    async expectCloseBoardConfirmationDialogToBeVisible(): Promise<void> {
        await expect(this.page.getByRole('banner').filter({ hasText: 'Close board?' })).toBeVisible();
    }

    async confirmCloseBoard(): Promise<void> {
        await this.page.getByTestId('popover-close-board-confirm').click();
    }

    async expectBoardIsClosed(): Promise<void> {
        await expect(this.page.getByText('This board is closed. Reopen the board to make changes.')).toBeVisible();
    }

    async expectBoardIsNotClosed(): Promise<void> {
        await expect(this.page.getByText('This board is closed. Reopen the board to make changes.')).not.toBeVisible();
    }

    async clickDeleteBoardButton(): Promise<void> {
        await this.page.getByTestId('board-menu-popover').getByTestId('close-board-delete-board-button').click();
    }

    async expectDeleteBoardConfirmationDialogToBeVisible(): Promise<void> {
        await expect(this.page.getByRole('banner').filter({ hasText: 'Delete board?' })).toBeVisible();
    }

    async confirmDeleteBoard(): Promise<void> {
        await this.page.getByTestId('close-board-delete-board-confirm-button').click();
    }

    async clickReopenBoardButtonInTheBoardMenu(): Promise<void> {
        await this.page.getByTestId('board-menu-popover').getByRole('button', { name: 'Reopen board' }).click();
    }

    async expectReopenBoardConfirmationDialogToBeVisible(): Promise<void> {
        await expect(this.page.getByRole('banner').filter({ hasText: 'Select a Workspace' })).toBeVisible();
    }

    async confirmReopenBoard(): Promise<void> {
        await this.page.getByTestId('workspace-chooser-reopen-button').click();
    }
}
