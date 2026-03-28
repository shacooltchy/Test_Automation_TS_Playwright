import { test as base } from '@playwright/test';
import { AutomationPage } from '../pages/AutomationPage';
import { MarketingTeamsPage } from '../pages/MarketingTeamsPage';
import { HomePage } from '../pages/HomePage';
import { ProductManagementPage } from '../pages/ProductManagementPage';
import { EngineeringTeamsPage } from '../pages/EngineeringTeamsPage';
import { DesignTeamsPage } from '../pages/DesignTeamsPage';
import { StartupsPage } from '../pages/StartupsPage';
import { RemoteTeamsPage } from '../pages/RemoteTeamsPage';
import { LoginPage } from '../pages/LoginPage';
import { BoardsPage } from '../pages/BoardsPage';
import { SignUpPage } from '../pages/SignUpPage';
import { BoardDetailsPage } from '../pages/BoardDetailsPage';

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
  }
});