import { test } from '../src/fixtures/basefixture'

test.describe("Products functionality",{tag:["@products", "@regression"]},()=>{
    test.beforeEach('Login to the application',async({Base,Login})=>{
        await Base.navigate("/")
        await Login.click_on_sigin();
        await Login.login_with_valid_cred("vedulajagadeesh1994@gmail.com","Yuvraj@12")
    })

    test("Add product to the cart",async({Products})=>{
        await Products.select_product_and_Add_to_cart(["Stylish Dress","Winter Top"])
    })
})