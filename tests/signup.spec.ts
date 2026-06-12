import fs from 'fs'
import path from 'path'
import {test} from '../src/fixtures/basefixture'
const testdata = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'Data', 'CreateAccount.json'), 'utf-8'))

test.describe("register",{tag:["@signup", "@regression"]},()=>{
    test.beforeEach("Open Browser and Navigate to signup page",async({Base,Login})=>
    {
        await Base.navigate("/")
        await Login.click_on_sigin()
    })


    test("create user account",async({SignUp})=>
    {
        await SignUp.create_Account(testdata)
    })

})