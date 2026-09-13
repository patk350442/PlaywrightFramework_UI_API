import { expect } from '@playwright/test';
import {test} from '../fixtures/hooks-fixture';

/* test.beforeEach('before each hook',async ({loginPage})=>{
    await loginPage.navigateToOrangeHRM();
})

test.afterEach('After each hook',async ({userPage})=>{
    await userPage.logout();
}) */


test('temp test 1', async ({page, goToURL})=>{
/*     console.log(process.env.BASE_URL);
     console.log(process.env.USER_NAME);
     console.log(process.env.PASSWORD);
    
    commonUtils.encryptData('admin123'); */
    
    await expect(page).toHaveTitle('OrangeHRM');
  


  //  await loginPage.loginToOrangeHRM(descryptedUserName, decryptedPassword);
})

test('Temp test 2', async ({page, goToURL})=>{

    await expect(page).toHaveTitle('OrangeHRM');

})


test('Temp test 3', async ({page, goToURL})=>{
await expect(page).toHaveTitle('OrangeHRM');

})