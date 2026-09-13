import { Locator, Page } from "@playwright/test";

export class PIMPage
{
    readonly page : Page;
    readonly addPIMButton : Locator;
    readonly firstNameTextBox : Locator;
    readonly middleNameTextBox : Locator;
    readonly lastNameTextBox : Locator;
    readonly saveButton : Locator;
    readonly newEmployeeNameHeading : Locator;


    constructor(page:Page)
    {
        this.page=page;
        this.addPIMButton=page.getByRole('button',{name:' Add '});
        this.firstNameTextBox=page.getByRole('textbox',{name:'First Name'});
        this.middleNameTextBox=page.getByRole('textbox',{name:'Middle Name'});
        this.lastNameTextBox=page.getByRole('textbox',{name:'Last Name'});
        this.saveButton=page.getByRole('button',{name:'Save'});
        this.newEmployeeNameHeading=page.locator('.orangehrm-edit-employee-name');
    }

    async addEmployee(firstName:string, middleName:string, lastName:string)
    {
        await this.addPIMButton.click();
        await this.firstNameTextBox.fill(firstName);
        await this.middleNameTextBox.fill(middleName);
        await this.lastNameTextBox.fill(lastName);
        await this.saveButton.click();
    }
}