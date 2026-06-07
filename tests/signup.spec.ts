import {test,expect} from '@playwright/test'
import {signup} from '../src/pages/sign_up'
import {loginPage} from '../src/pages/login_page'
import {basepage} from '../src/pages/base_page'

test.beforeEach("Open Browser and Navigate to signup page",async({page})=>
{
    const base = new basepage(page);
    await base.navigate("/")
    const login = new loginPage(page)
    await login.click_on_sigin()
})


test("create user account",async({page})=>
{
    const createAccount = new signup(page)
    await createAccount.create_Account({
        Name:"Yuvraj",
        Email:"Yuvraj54564@gmail.com",
        Title: "Mr",  //Mr or Mrs
        Password:"Yuvraj@12",
        DOB:"01-08-1994", //DD-MONTH-YEAR format
        FirstName:"Yuvi",
        LastName:"Raj",
        Address:"Narsipatnam",
        Country:"India",  // India format
        State:"Andhra Pradesh",
        City:"Visakhapatnam",
        Zipcode:"531116",
        Mobile:"118484484"
    })
})