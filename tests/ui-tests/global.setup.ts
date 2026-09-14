import {test} from '../../fixtures/common-fixture'
import { expect} from '@playwright/test';

test('Global Setup for Auto Login', async ({page, loginPage, dashboardPage, commonUtils})=>{
    
    const descryptedUserName= commonUtils.decryptData(process.env.USER_NAME!);
    const decryptedPassword=commonUtils.decryptData(process.env.PASSWORD!);
 
    await loginPage.navigateToOrangeHRM();
    await loginPage.loginToOrangeHRM(descryptedUserName, decryptedPassword);
    await page.waitForURL(`${process.env.BASE_URL}/web/index.php/dashboard/index`);
    await expect(dashboardPage.dashboardTiteText).toHaveText('Dashboard');
    await page.context().storageState({path:'./playwright/.auth/state.json'});
    
})