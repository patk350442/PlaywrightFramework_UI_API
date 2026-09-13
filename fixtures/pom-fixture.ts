import { test as base } from '@playwright/test'
import { LoginPage } from '../pageobjects/LoginPage';
import { DashboardPage } from '../pageobjects/DashBoardPage';
import { UserPage } from '../pageobjects/UserPage.ts';
import { LeftNavigationPage } from '../pageobjects/LeftNavigationPage.ts';
import { PIMPage } from '../pageobjects/PIMPage.ts';

type PomFixturesType = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    userPage : UserPage;
    leftNavigationPage : LeftNavigationPage;
    pimPage : PIMPage;
}

export const test = base.extend<PomFixturesType>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },
    
    userPage: async ({page},use)=>{
        await use(new UserPage(page));
    },

    leftNavigationPage: async ({page},use)=>{
        await use(new LeftNavigationPage(page));
    },

    pimPage: async({page}, use)=>{
        await use(new PIMPage(page));
    }

    
})