import { Page,Locator,expect } from '@playwright/test'
import { basepage } from '../pages/base_page'

type contactdata = 
{
    name:string,
    email:string,
    subject:string,
    message:string
}
export class contactus extends basepage{
    private readonly contactustab:Locator;
    private readonly namefield:Locator;
    private readonly emailfield:Locator;
    private readonly subjectfield:Locator;
    private readonly messagefield:Locator;
    private readonly uploadbutton:Locator;
    private readonly submitbutton:Locator;
    private readonly successstatus:Locator;

    constructor(page:Page){
        super(page)
        this.contactustab = page.locator('//a[@href="/contact_us"]')
        this.namefield = page.locator('//input[@data-qa="name"]')
        this.emailfield = page.locator('//input[@data-qa="email"]')
        this.subjectfield = page.locator('//input[@data-qa="subject"]')
        this.messagefield = page.locator('//textarea[@data-qa="message"]')
        this.submitbutton = page.locator('//input[@type="submit"]')
        this.uploadbutton = page.locator('//input[@name="upload_file"]')
        this.successstatus = page.locator('(//div[text()="Success! Your details have been submitted successfully."])[1]')
        
    }

    async fill_contact_form(data:contactdata){
        await this.click_element(this.contactustab)
        await this.fill_element(this.namefield,data.name)
        await this.fill_element(this.emailfield,data.email)
        await this.fill_element(this.subjectfield,data.subject)
        await this.fill_element(this.messagefield,data.message)
    }

    async attach_reference_file(file:string | string[]){
        await this.upload_file(this.uploadbutton,file)
    }

    async submit_form(){
        await expect(this.submitbutton).toBeEnabled();
        await expect(this.submitbutton).toBeVisible();
        await this.click_element(this.submitbutton)
    
    }
    async is_submitted(){
        await this.is_element_found(this.successstatus)
    }

}