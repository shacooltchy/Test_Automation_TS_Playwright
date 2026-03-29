//for demonstration purposes only
import { Locator } from "@playwright/test";

export async function selectFromDropdown(dropdownLocator: Locator, optionText: string): Promise<void> {
    await dropdownLocator.click();
    await dropdownLocator.page().getByRole('option', { name: optionText }).click();
}