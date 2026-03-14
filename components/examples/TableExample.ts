import { Locator } from '@playwright/test';

export class Table {
    constructor(private readonly root: Locator) {}

    get rows() {
        return this.root.locator('tr');
     }

    row(index: number) {
        return this.rows.nth(index + 1); // pomijamy header
    }

    cell(row: number, col: number) {
        return this.row(row).locator('td').nth(col);
    }

    async getCellText(row: number, col: number) {
        return await this.cell(row, col).textContent();
    }

    async rowCount() {
        return await this.rows.count() - 1;
    }
}