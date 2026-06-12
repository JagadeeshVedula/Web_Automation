import {test} from '../src/fixtures/basefixture'
import testdata from '../Data/CreateAccount.json'

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