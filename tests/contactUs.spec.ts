import {test,Expect} from '../src/fixtures/basefixture'
import { expect } from 'playwright/test'
import contactUsData from '../Data/ContactUsForm.json'

test.describe("Contact Us testing",{tag:["@contact", "@regression"]},()=>{
    test.beforeEach("Login to the application with valid credentials",async({Base,Login})=>{
        await Base.navigate('/')
        await Login.click_on_sigin()
        await Login.login_with_valid_cred("vedulajagadeesh1994@gmail.com","Yuvraj@12")
    })

    test("submit contact form with all details",async({page,Contact})=>{
        await Contact.fill_contact_form(contactUsData)
        await Contact.attach_reference_file('package.json')
        page.on('dialog',async dialog =>{
            expect(dialog.message()).toContain('Press OK to proceed!');
            await dialog.accept()
        })
        await Contact.submit_form()
        await Contact.is_submitted()
    })

})