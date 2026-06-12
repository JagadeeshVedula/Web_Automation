import fs from 'fs'
import path from 'path'
import {test,expect} from '../src/fixtures/basefixture'
// import { expect } from 'playwright/test'
const contactUsData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'Data', 'ContactUsForm.json'), 'utf-8'))

test.use({ storageState: 'playwright/.auth/admin.json' });
test.describe("Contact Us testing",{tag:["@contact", "@regression"]},()=>{
    test.beforeEach("Login to the application with valid credentials",async({Base,Login})=>{
        await Base.navigate('/')
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