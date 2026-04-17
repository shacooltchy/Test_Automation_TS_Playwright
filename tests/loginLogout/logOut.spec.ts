import { expect } from "@playwright/test";
import { test } from "../../fixtures/pages";
import { ENV } from "../../config/env";

test.describe('Log out tests', {tag: '@log_out'}, () => {
    test.beforeEach(async({homePage, loginPage, boardsPage}) => {
        await homePage.navigate();
        await homePage.headerMenu.clickLogIn();
        await loginPage.logIn();
        await boardsPage.expectPageIsVisible();
        await boardsPage.newFeaturesBanner.closeIfVisible();
    });

    test('Log out of Trello', async ({ page, boardsPage, logOutConfirmationPage }) => {
        await test.step('Click the member button in the header', async () => {
            await boardsPage.authenticatedHeader.clickMemberButton();
            await boardsPage.authenticatedHeader.accountMenu.expectAccountMenuIsVisible();
        });

        await test.step('Click the Log out button in the account menu', async () => {
            await boardsPage.authenticatedHeader.accountMenu.clickLogOut();
        });

        await test.step('Verify the log out page is visible', async () => {
            await logOutConfirmationPage.expectPageIsVisible();
        });

        await test.step('Click the Log out button in the log out confirmation page', async () => {
            await logOutConfirmationPage.clickLogOutButton();
        });

        await test.step('Verify the user is logged out and redirected to home page', async () => {
            await expect(page).toHaveURL(ENV.baseUrl);
            await expect(page.getByText('FeaturesSolutionsPlansPricingResourcesLog in').getByRole('link', { name: 'Log in' })).toBeVisible();
        });
    });
});
