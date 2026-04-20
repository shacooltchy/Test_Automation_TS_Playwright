import { test as base } from '@playwright/test';
import { AutomationPage } from '../pages/automationPage';
import { MarketingTeamsPage } from '../pages/marketingTeamsPage';
import { HomePage } from '../pages/homePage';
import { ProductManagementPage } from '../pages/productManagementPage';
import { EngineeringTeamsPage } from '../pages/engineeringTeamsPage';
import { DesignTeamsPage } from '../pages/designTeamsPage';
import { StartupsPage } from '../pages/startupsPage';
import { RemoteTeamsPage } from '../pages/remoteTeamsPage';
import { LoginPage } from '../pages/loginPage';
import { BoardsPage } from '../pages/boardsPage';
import { SignUpPage } from '../pages/signUpPage';
import { BoardDetailsPage } from '../pages/boardDetailsPage';
import { LogOutConfirmationPage } from '../pages/logOutConfirmationPage';

//rozszerza domyślne fixture’y Playwrighta o nowe pola, np. homePage
export const test = base.extend<{
  homePage: HomePage;
  automationPage: AutomationPage;
  marketingTeamsPage: MarketingTeamsPage;
  productManagementPage: ProductManagementPage;
  engineeringTeamsPage: EngineeringTeamsPage;
  designTeamsPage: DesignTeamsPage;
  startupsPage: StartupsPage;
  remoteTeamsPage: RemoteTeamsPage;
  loginPage: LoginPage;
  boardsPage: BoardsPage;
  signUpPage: SignUpPage;
  boardDetailsPage: BoardDetailsPage;
  logOutConfirmationPage: LogOutConfirmationPage;
}>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  automationPage: async ({ page }, use) => {
    await use(new AutomationPage(page));
  },
  marketingTeamsPage: async ({ page }, use) => {
    await use(new MarketingTeamsPage(page));
  },
  productManagementPage: async ({ page }, use) => {
    await use(new ProductManagementPage(page));
  },
  engineeringTeamsPage: async ({ page }, use) => {
    await use(new EngineeringTeamsPage(page));
  },
  designTeamsPage: async ({ page }, use) => {
    await use(new DesignTeamsPage(page));
  },
  startupsPage: async ({ page }, use) => {
    await use(new StartupsPage(page));
  },
  remoteTeamsPage: async ({ page }, use) => {
    await use(new RemoteTeamsPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  boardsPage: async({page}, use) => {
    await use(new BoardsPage(page));
  },
  signUpPage: async({page}, use) => {
    await use(new SignUpPage(page));
  },
  boardDetailsPage: async({page}, use) => {
    await use(new BoardDetailsPage(page));
  },
  logOutConfirmationPage: async({page}, use) => {
    await use(new LogOutConfirmationPage(page));
  }
});