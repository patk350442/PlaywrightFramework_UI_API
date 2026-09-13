import {test as base} from './common-fixture';
type HooksFixtureType={
    goToURL: void;
    logout: void;
}

export const test=base.extend<HooksFixtureType>({
    goToURL: async({loginPage}, use)=>{
       await loginPage.navigateToOrangeHRM();
       await use();

    },

    logout: async({userPage},use)=>{
       await use();
       await userPage.logout(); 
    }
})