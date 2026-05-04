import { expect, Locator, Page } from "@playwright/test";

export class Calendar {
    private readonly calendar: Locator;
    private readonly nextMonthButton: Locator;
    private readonly previousMonthButton: Locator;
    private readonly nextYearButton: Locator;
    private readonly previousYearButton: Locator;
    private readonly monthYearHeader: Locator;


    constructor(page: Page) {
        this.calendar = page.getByLabel('Calendar');
        this.nextMonthButton = this.calendar.getByRole('button', { name: 'Next month' });
        this.previousMonthButton = this.calendar.getByRole('button', { name: 'Previous month' });
        this.nextYearButton = this.calendar.getByRole('button', { name: 'Next year' });
        this.previousYearButton = this.calendar.getByRole('button', { name: 'Previous year' });
        this.monthYearHeader = this.calendar.getByRole('heading', { name: /\w+ \d{4}/ }); // Matches headers like "January 2024", "February 2024", etc.
    }

    async expectVisible(): Promise<void> {
        await expect(this.calendar).toBeVisible();
    }

    async expectNotVisible(): Promise<void> {
        await expect(this.calendar).not.toBeVisible();
    }

    async selectDate(dateString: string /* format: M/D/YYYY */): Promise<void> {
        const [monthStr, dayStr, yearStr] = dateString.split('/');
        const targetDay = dayStr;
        const targetMonthIndex = parseInt(monthStr) - 1; // Convert to 0-based index
        const targetYear = parseInt(yearStr);

        const targetDate = new Date(targetYear, targetMonthIndex, parseInt(targetDay));
        const targetMonthName = targetDate.toLocaleString('en-US', { month: 'long' });

        //set year
        while (true) {
            const headerText = await this.monthYearHeader.textContent();
            if (!headerText) {
                throw new Error('Month and year header not found');
            }

            const [currentMonthName, currentYearStr] = headerText.split(' ');
            const currentYear = parseInt(currentYearStr);

            if (currentYear === targetYear) {
                break;
            }

            if (currentYear < targetYear) {
                await this.nextYearButton.click();
            } else {
                await this.previousYearButton.click();
            }
        }

        //set month
        while (true) {
            const headerText = await this.monthYearHeader.textContent();
            if (!headerText) {
                throw new Error('Month and year header not found');
            }

            const [currentMonthName, currentYearStr] = headerText.split(' ');
            const currentYear = parseInt(currentYearStr);

            if (currentMonthName === targetMonthName && currentYear === targetYear) {
                break;
            }

            const currentDate = new Date(`${currentMonthName} 1, ${targetYear}`);
            const desiredDate = new Date(`${targetMonthName} 1, ${targetYear}`);

            if (desiredDate > currentDate) {
                await this.nextMonthButton.click();
            } else {
                await this.previousMonthButton.click();
            }
        }

        //select day
        const dayLocator = this.calendar.getByRole('button', { name: targetDay });
        await dayLocator.click();
    }
}