import { test } from "../../../fixtures/pages";

test.describe('Log in tests', () => {
    test.beforeEach(async({homePage}) => {
        await homePage.navigate();
    });

    test('Log in to Trello', {tag: '@log_in'}, async ({ homePage, loginPage, boardsPage }) => {
        await test.step('Click the Log in button in the header menu', async() => {
            await homePage.headerMenu.loginButton.click();
        });

        await test.step('Enter user email', async() => {
            await loginPage.enterEmail();
        });

        await test.step('Click the Continue button in the login form', async() => {
            await loginPage.continueLogInButton.click();
        });

        await test.step('Enter user password', async() => {
            await loginPage.enterPassword();
        });

        await test.step('Click the Log in button in the login form', async() => {
            await loginPage.continueLogInButton.click();
        });

        await test.step('Verify the user is logged in', async() => {
            await boardsPage.expectPageVisible();
        });
    });

    test('User should be redirected to sign up page if entered email is not registered', {tag: '@smoke'}, async ({ homePage, loginPage, signUpPage }) => {
        await test.step('Click the Log in button in the header menu', async() => {
            await homePage.headerMenu.loginButton.click();
        });

        await test.step('Enter not existing user email', async() => {
            await loginPage.enterEmail('not_existing_email@email.com');
        });

        await test.step('Click the Continue button in the login form', async() => {
            await loginPage.continueLogInButton.click();
        });

        await test.step('Expect user is redirected to sign up page', async() => {
            await signUpPage.expectPageVisible();
        });
    });
});

