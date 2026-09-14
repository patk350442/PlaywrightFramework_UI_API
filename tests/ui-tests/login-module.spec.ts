import {test} from '../../fixtures/hooks-fixture';
import loginModuleData from '../../testdata/ui-data/login-module-data.json';
import { expect } from '@playwright/test';

test.use({storageState:{
    cookies:[], 
    origins:[]
}
})

test('Verify user cannot login with an invalid password',{
    tag:['@UI','@Login','@UAT','@Smoke'],
    annotation: {
        type:'Test Case Link',
        description:'https://portal.azure.com/#home'
    }
}, async ({loginPage,goToURL,commonUtils})=>{
    const userName=commonUtils.decryptData(process.env.USER_NAME!);
    await loginPage.loginToOrangeHRM(userName,loginModuleData.wrong_password);
    await expect(loginPage.invalidCredentialsErrorPopup).toHaveText(loginModuleData.invalid_credentials_text);
    await expect(loginPage.userNameInput).toBeVisible();
})

test.describe('Invalid login tests',{
    tag:['@InvalidLoginTests'] 
},()=>{

test('Verify user cannot login with an invalid username',{tag:['@UI','@Login','@Smoke']}, async ({loginPage,goToURL,commonUtils})=>{
    const password=commonUtils.decryptData(process.env.PASSWORD!);
    await loginPage.loginToOrangeHRM(loginModuleData.wrong_userName,password);
    await expect(loginPage.invalidCredentialsErrorPopup).toHaveText(loginModuleData.invalid_credentials_text);
    await expect(loginPage.userNameInput).toBeVisible(); 
})

test('Verify user cannot login with an invalid username and password',{tag:['@UI','@Login','@Smoke']}, async ({loginPage,goToURL,commonUtils})=>{
     await loginPage.loginToOrangeHRM(loginModuleData.wrong_userName,loginModuleData.wrong_password);
    await expect(loginPage.invalidCredentialsErrorPopup).toHaveText(loginModuleData.invalid_credentials_text);
    await expect(loginPage.userNameInput).toBeVisible();
})

})

test('Verify the OrangeHRM logo when the user logins with valid user name and password ', {
    tag: ['@VISUAL','@UAT'],
    annotation:{
        type:'Test Case Link',
        description:'https://portal.azure.com/#home'
    }
}, async ({goToURL,loginPage,commonUtils,leftNavigationPage})=>{
    const userName=commonUtils.decryptData(process.env.USER_NAME!);
    const password=commonUtils.decryptData(process.env.password!);
    await loginPage.loginToOrangeHRM(userName,password);
    await expect(leftNavigationPage.orangeHRMLogo).toHaveScreenshot('OrangeHRMBrandLogo.png');
    await expect(leftNavigationPage.leftNavigationPanel).toHaveScreenshot('LeftNavigPanel.png');
    //expect(leftNavigationPage.leftNavigationPanel.screenshot({})).toMatchSnapshot()
})