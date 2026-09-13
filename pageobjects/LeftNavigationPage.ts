import { Locator, Page } from "@playwright/test";

export class LeftNavigationPage{
    readonly page : Page;
    readonly PIMLink : Locator;
    readonly orangeHRMLogo: Locator;
    readonly leftNavigationPanel: Locator;

    constructor(page: Page)
    {
        this.page=page;
        this.PIMLink=page.getByRole('link',{name:'PIM'});
        this.orangeHRMLogo=page.getByRole('link',{name:'client brand banner'});
        this.leftNavigationPanel=page.locator('div.oxd-sidepanel-body');
    }

    async openPIMModule()
    {
        this.PIMLink.click();
    }
}