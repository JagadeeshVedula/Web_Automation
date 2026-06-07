import { Page,Locator } from "@playwright/test"
import { basepage } from "./base_page"

export class loginPage extends basepage {
    private readonly loginHomepageButton;
    private readonly usernamefield;
    private readonly passwordfield;
    private readonly submitbutton;
    private readonly logoutbutton;

    constructor(page:Page){
        super(page)
        this.usernamefield = page.locator('xpath=//input[@data-qa="login-email"]');
        this.passwordfield = page.locator('//input[@type="password"]');
        this.submitbutton = page.locator('//button[@data-qa="login-button"]');
        this.loginHomepageButton=page.locator('//*[text()=" Signup / Login"]');
        this.logoutbutton = page.locator('//a[@href="/logout"]')
    }
    async click_on_sigin(){
        await this.click_element(this.loginHomepageButton)
    }

    async login_with_valid_cred(username:string,password:string){
        await this.fill_element(this.usernamefield,username);
        await this.fill_element(this.passwordfield,password)
        await this.click_element(this.submitbutton)
        await this.is_element_found(this.logoutbutton)

    }


}