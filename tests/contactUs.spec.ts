import {test,expect} from '@playwright/test'
import { loginPage } from '../src/pages/login_page'
import { basepage } from '../src/pages/base_page'
import { contactus } from '../src/pages/contact_us'
import contactUsData from '../Data/ContactUsForm.json'

test.beforeEach("Login to the application with valid credentials",async({page})=>{
    const comm = new basepage(page)
    const login = new loginPage(page)
    await comm.navigate('/')
    await login.click_on_sigin()
    await login.login_with_valid_cred("vedulajagadeesh1994@gmail.com","Yuvraj@12")
})

test("submit contact form with all details",async({page})=>{
    const contact = new contactus(page)
    await contact.fill_contact_form(contactUsData)
    await contact.attach_reference_file('package.json')
    page.on('dialog',async dialog =>{
        expect(dialog.message()).toContain('Press OK to proceed!');
        await dialog.accept()
    })
    await contact.submit_form()
    await contact.is_submitted()
})