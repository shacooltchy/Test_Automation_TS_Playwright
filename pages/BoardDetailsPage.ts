import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { BoardPopoverMenu } from "../components/boardMenu/BoardPopoverMenu";
import { NewListForm } from "../components/NewListForm";
import { List } from "../components/List";
import { Alert } from "../components/Alert";
import { CardEditor } from "../components/CardEditor";

export class BoardDetailsPage extends BasePage {
    readonly boardMenu: BoardPopoverMenu;
    readonly newListForm: NewListForm;
    readonly list: List;
    readonly listArchivedAlert: Alert;
    readonly unarchivedListAlert: Alert;
    readonly cardEditor: CardEditor;

    readonly addListButton: Locator;

    constructor(page: Page) {
        super(page);
        this.boardMenu = new BoardPopoverMenu(page);
        this.newListForm = new NewListForm(page);
        this.list = new List(page);
        this.listArchivedAlert = new Alert(page, 'List archived');
        this.unarchivedListAlert = new Alert(page, 'Unarchived list');
        this.cardEditor = new CardEditor(page);

        this.addListButton = page.getByTestId('list-composer-button');
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
            await this.page.getByTestId('ad-container').getByRole('button', { name: 'Minimize' }).click({ timeout: 2_500 });
        } catch (error) {
            //Ad container not found, skipping minimize step.
        }
    }

    private async closeNewFeaturesBannerIfVisible(): Promise<void> {
        const newFeaturesBanner = this.page.getByTestId('spotlight--dialog');
        try {
            await newFeaturesBanner.getByRole('button', { name: 'Dismiss' }).click({ timeout: 2_500 });
        } catch (error) {
            //Ad container not found, skipping minimize step.
        }
    }

    async clickOnBoardMenuButton(): Promise<void> {
        await this.page.getByTestId('board-header').getByRole('button', { name: 'Show menu' }).click();
    }

    async expectBoardIsClosed(): Promise<void> {
        await expect(this.page.getByText('This board is closed. Reopen the board to make changes.')).toBeVisible();
    }

    async expectBoardIsNotClosed(): Promise<void> {
        await expect(this.page.getByText('This board is closed. Reopen the board to make changes.')).not.toBeVisible();
    }

    async clickAddAListButton(): Promise<void> {
        await this.addListButton.click();
    }
}
