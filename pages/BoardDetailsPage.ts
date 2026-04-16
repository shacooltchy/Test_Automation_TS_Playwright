import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { BoardPopoverMenu } from "../components/board/boardMenu/boardPopoverMenu";
import { NewListForm } from "../components/list/newListForm";
import { List } from "../components/list/list";
import { Alert } from "../components/alert";
import { CardEditor } from "../components/card/cardEditor";

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
