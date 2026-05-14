import { test as setup } from "../fixtures/pages";
import path from "path";

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async({ page, homePage, loginPage, boardsPage }) => {
    await homePage.navigate();
    await homePage.expectPageVisible();
    await homePage.headerMenu.loginButton.click();
    await loginPage.logIn();
    await boardsPage.expectPageVisible();
    await boardsPage.newFeaturesBanner.closeIfVisible();

    await page.context().storageState( {path: authFile});
});