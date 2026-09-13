import { Locator, Page } from "@playwright/test";

export class LoginPage
{
    readonly page:Page;
    readonly userNameInput:Locator;
    readonly passwordInput:Locator;
    readonly signInbtn:Locator;
    readonly invalidCredentialsErrorPopup: Locator;
    constructor(page:Page)
    {
        this.page=page;
        this.userNameInput=page.getByRole('textbox',{name:'Username'});
        this.passwordInput=page.getByRole('textbox',{name:'Password'});
        this.signInbtn=page.getByRole('button',{name:'Login'});
        this.invalidCredentialsErrorPopup=page.getByRole('alert');
    }

    async navigateToOrangeHRM()
    {
        await this.page.goto(`${process.env.BASE_URL}/web/index.php/auth/login`);
    }

    async loginToOrangeHRM(userName:string,password:string)
    {
        await this.userNameInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.signInbtn.click();
    }
}