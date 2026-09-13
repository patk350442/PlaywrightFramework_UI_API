import { Locator, Page } from "@playwright/test";

export class UserPage{

    readonly page:Page;
    readonly userMenuButton:Locator;
    readonly userLogoutButton:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.userMenuButton=page.locator('.oxd-userdropdown-tab');
        this.userLogoutButton=page.getByRole('menuitem',{name:'Logout'});

    }

    async logout(){
        await this.userMenuButton.click();
        await this.userLogoutButton.click();
    }
}