import { test, expect } from '@playwright/test';
import {loginPage} from '../src/pages/login_page';
import { basepage } from '../src/pages/base_page';
test.describe("login",{tag:["@login", "@regression"]},()=>{
  test.beforeEach("launch browser with proper url",async({page})=>{
    const base = new basepage(page);
    await base.navigate("/")
  })
  test("login scenario", async({ page })=>{
    const Login = new loginPage(page);
    await Login.click_on_sigin();
    await Login.login_with_valid_cred("vedulajagadeesh1994@gmail.com","Yuvraj@12")

  })

})