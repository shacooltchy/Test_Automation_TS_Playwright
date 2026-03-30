import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://trello.com/');
  await page.getByTestId('bignav').getByRole('link', { name: 'Log in' }).click();
  await page.getByTestId('username').fill('athlete-lonely.2g@icloud.com');
  await page.getByTestId('username').click();
  await page.getByTestId('login-submit-idf-testid').click();
  await page.getByTestId('password').click();
  await page.getByTestId('password').fill('garfoj-bumfe3-fedMyc');
  await page.locator('.css-3pdudq').click();
  await page.getByRole('link', { name: 'Board1774807214481' }).click();
  
  await page.getByRole('button', { name: 'Minimize' }).click();
  
  await page.getByRole('button', { name: 'Show menu' }).click();
  await expect(page.getByTestId('board-menu-container')).toBeVisible();
  await page.getByRole('button', { name: 'Close board' }).click();
  await expect(page.getByRole('banner').filter({ hasText: 'Close board?' })).toBeVisible();
  await page.getByTestId('popover-close-board-confirm').click();
  await page.getByRole('button', { name: 'Show menu' }).click();
  await expect(page.getByTestId('board-menu-container')).toBeVisible();
  await page.getByTestId('close-board-delete-board-button').click();
  await expect(page.getByRole('banner').filter({ hasText: 'Delete board?' })).toBeVisible();
  await page.getByTestId('close-board-delete-board-confirm-button').click();
});