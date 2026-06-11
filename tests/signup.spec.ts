import {test,expect} from '@playwright/test'
import {signup} from '../src/pages/sign_up'
import {loginPage} from '../src/pages/login_page'
import {basepage} from '../src/pages/base_page'
import testdata from '../Data/CreateAccount.json'

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
    await createAccount.create_Account(testdata)
})