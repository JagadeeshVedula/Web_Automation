import { test } from '../src/fixtures/basefixture'
test.use({ storageState: 'playwright/.auth/admin.json' });
test.describe("Products functionality",{tag:["@products", "@regression"]},()=>{
    test.beforeEach('Login to the application',async({Base,Login})=>{
        await Base.navigate("/")
    })

    test("Add product to the cart",async({Products})=>{
        await Products.select_product_and_Add_to_cart(["Stylish Dress","Winter Top"])
    })
})