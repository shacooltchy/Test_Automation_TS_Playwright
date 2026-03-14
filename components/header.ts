import { expect, Page } from "@playwright/test";

//w komponentach powtarzalne UI np. modale, wlasne locatory i metody, komponenty wykorzystywane w page'ach
export class Header {
    private readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async expectHeaderTitleIsVisible(headerTitle: string): Promise<void> {
        await expect(this.page.getByRole('heading', { name: headerTitle, exact: true })).toBeVisible({timeout: 10_000});
    }
}