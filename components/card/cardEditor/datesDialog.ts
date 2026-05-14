import { expect, Locator, Page } from "@playwright/test";
import { Dropdown } from "../../dropdown";
import { Calendar } from "../../calendar";

export class DatesDialog {
    private readonly dialog: Locator;
    readonly calendar: Calendar;
    private readonly startDateInput: Locator;
    private readonly dueDateInput: Locator;
    private readonly startDateFieldset: Locator;
    private readonly dueDateFieldset: Locator;
    readonly recurringDropdown: Dropdown;
    readonly dueDateReminderDropdown: Dropdown;
    readonly saveButton: Locator;
    readonly removeButton: Locator;

    constructor(page: Page) {
        this.dialog = page.getByRole('dialog').filter({ has: page.getByRole('heading', { name: 'Dates', exact: true }) });
        this.calendar = new Calendar(page);
        this.startDateInput = this.dialog.getByTestId('start-date-field');
        this.dueDateInput = this.dialog.getByTestId('due-date-field');
        this.startDateFieldset = this.dialog.locator('fieldset').filter({ has: page.locator('legend').filter({ hasText: 'Start date' }) });
        this.dueDateFieldset = this.dialog.locator('fieldset').filter({ has: page.locator('legend').filter({ hasText: 'Due date' }) });
        this.recurringDropdown = new Dropdown(page, this.dialog.getByTestId('recurrence-select'));
        this.dueDateReminderDropdown = new Dropdown(page, this.dialog.getByTestId('due-date-reminder-select'));
        this.saveButton = this.dialog.getByRole('button', { name: 'Save' });
        this.removeButton = this.dialog.getByRole('button', { name: 'Remove' });
    }

    async expectVisible(): Promise<void> {
        await expect(this.dialog).toBeVisible();
    }

    async expectNotVisible(): Promise<void> {
        await expect(this.dialog).not.toBeVisible();
    }

    async selectStartDateCheckbox(): Promise<void> {
        const checkboxState = await this.startDateFieldset.getByRole('checkbox').getAttribute('aria-checked');
        if(checkboxState === 'false') {
            await this.startDateFieldset.getByRole('checkbox').click();
        }
    }

    async unselectStartDateCheckbox(): Promise<void> {
        const checkboxState = await this.startDateFieldset.getByRole('checkbox').getAttribute('aria-checked');
        if(checkboxState === 'true') {
            await this.startDateFieldset.getByRole('checkbox').click();
        }
    }

    async selectDueDateCheckbox(): Promise<void> {
        const checkboxState = await this.dueDateFieldset.getByRole('checkbox').getAttribute('aria-checked');
        if(checkboxState === 'false') {
            await this.dueDateFieldset.getByRole('checkbox').click();
        }
    }

    async unselectDueDateCheckbox(): Promise<void> {
        const checkboxState = await this.dueDateFieldset.getByRole('checkbox').getAttribute('aria-checked');
        if(checkboxState === 'true') {
            await this.dueDateFieldset.getByRole('checkbox').click();
        }
    }

    async enterStartDate(date: string ): Promise<void> {
        await this.startDateInput.fill(date);
    }

    async enterDueDate(date: string): Promise<void> {
        await this.dueDateInput.fill(date);
    }

    async enterDueHour(hour: string): Promise<void> {
        await this.dueDateInput.fill(hour);
    }
}