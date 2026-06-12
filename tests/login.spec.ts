import { test } from '../src/fixtures/basefixture';

test.describe("login",{tag:["@login", "@regression"]},()=>{
  test.beforeEach("launch browser with proper url",async({Base})=>{
    await Base.navigate("/")
  })
  test("login scenario", async({ Login })=>{
    await Login.click_on_sigin();
    await Login.login_with_valid_cred("vedulajagadeesh1994@gmail.com","Yuvraj@12")

  })

})