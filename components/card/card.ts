import { expect, Locator, Page } from "@playwright/test";
import { QuickCardEditor } from "./quickCardEditor/quickCardEditor";

export class Card {
    private readonly page: Page;
    private readonly card: Locator;
    readonly quickCardEditor: QuickCardEditor;

    constructor(page: Page) {
        this.page = page;
        this.card = page.getByTestId('list-card');
        this.quickCardEditor = new QuickCardEditor(page);
    }

    async clickCard(cardTitle: string): Promise<void> {
        await this.card.filter({hasText: cardTitle}).click();
    }

    private getList(listName: string): Locator {
        const list = this.page.getByTestId('list').filter({has: this.page.getByRole('heading', {name: listName, exact: true})});
        return list;
    }

    async expectVisible(cardTitle: string, listName: string): Promise<void> {
        const list = this.getList(listName);
        await expect(list.getByTestId('list-card').filter({hasText: cardTitle, hasNot: this.page.getByTestId('badge-card-template')})).toBeVisible();
    }

    async expectNotVisible(cardTitle: string, listName: string): Promise<void> {
        const list = this.getList(listName);
        await expect(list.getByTestId('list-card').filter({hasText: cardTitle})).not.toBeVisible();
    }

    async clickEditCardButton(cardTitle: string): Promise<void> {
        await this.card.filter({hasText: cardTitle}).hover();
        await this.card.filter({hasText: cardTitle}).getByTestId('quick-card-editor-button').click();
    }

    async expectCardHasDueDate(cardTitle: string, listName: string) {
        const list = this.getList(listName);
        await expect(list.getByTestId('list-card').filter({hasText: cardTitle}).getByTestId('badge-due-date-not-completed')).toBeVisible();
    }

    async expectCardHasDescription(cardTitle: string, listName: string) {
        const list = this.getList(listName);
        await expect(list.getByTestId('list-card').filter({hasText: cardTitle}).getByTestId('DescriptionIcon')).toBeVisible();
    }

    async expectCardHasChecklist(cardTitle: string, listName: string) {
        const list = this.getList(listName);
        await expect(list.getByTestId('list-card').filter({hasText: cardTitle}).getByTestId('checklist-badge')).toBeVisible();
    }

    async expectChecklistBadgeProgress(cardTitle: string, listName: string, expectedProgress: string) {
        const list = this.getList(listName);
        await expect(list.getByTestId('list-card').filter({hasText: cardTitle}).getByTestId('checklist-badge')).toHaveText(expectedProgress);
    }

    async clickChecklistBadge(cardTitle: string, listName: string) {
        const list = this.getList(listName);
        await list.getByTestId('list-card').filter({hasText: cardTitle}).getByTestId('checklist-badge').click();
    }

    async expectChecklistSectionVisible(cardTitle: string, listName: string) {
        const list = this.getList(listName);
        await expect(list.getByTestId('list-card').filter({hasText: cardTitle}).getByRole('region', { name: 'Checklists' })).toBeVisible();
    }

    async expectChecklistItemVisible(cardTitle: string, listName: string, itemTitle: string) {
        const list = this.getList(listName);
        await expect(list.getByTestId('list-card').filter({hasText: cardTitle}).getByRole('region', { name: 'Checklists' }).getByRole('listitem').filter({hasText: itemTitle})).toBeVisible();
    }
}