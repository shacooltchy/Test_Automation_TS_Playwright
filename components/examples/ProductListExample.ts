import { Locator } from '@playwright/test';

//root to kontekst komponentu — nie przeszukujemy całej strony.
//items to lista elementów wewnątrz root.
//Każda metoda działa tylko w obrębie root.
export class ProductList {
    constructor(private readonly root: Locator) {}

    get items() {
        return this.root.locator('.product');
    }

    item(index: number) {
        return this.items.nth(index);
    }

    async count() {
        return await this.items.count();
    }

    async getTitle(index: number) {
        return await this.item(index).locator('.title').textContent();
    }

    async clickItem(index: number) {
        await this.item(index).click();
    }
}

//przyklad uzycia w klasie
/*export class HomePage {
  readonly products: ProductList;

  constructor(private readonly page: Page) {
    this.products = new ProductList(page.locator('.product-list'));
  }

}*/