import { Locator, Page } from "@playwright/test";

export class DashboardPage{
    readonly page: Page;
    readonly dashboardTiteText: Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.dashboardTiteText=page.getByRole('heading',{name:'Dashboard'});
    }
}