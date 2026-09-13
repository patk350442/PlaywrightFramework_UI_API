import { expect } from '@playwright/test';
import {test} from '../fixtures/hooks-fixture';
import pimModuleData from '../testdata/pim-module-data.json';

test('verify that a new employee can be successfully created under the PIM module',{tag:['@UI','@PIM','@UAT','@Smoke']}, async ({goToURL,leftNavigationPage, pimPage})=>{
   await test.step('Open PIM module',async ()=>{
    await leftNavigationPage.openPIMModule();
   })
    
   await test.step('Adding new employee in PIM Module', async()=>{
    await pimPage.addEmployee(pimModuleData.first_name,pimModuleData.middle_name,pimModuleData.last_name);
   })
    
   await test.step('Verifying the added new employee', async()=>{
    await expect(pimPage.newEmployeeNameHeading).toHaveText(`${pimModuleData.first_name} `);
   })
    

})