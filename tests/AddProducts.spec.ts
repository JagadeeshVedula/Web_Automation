import {test,expect} from '@playwright/test'
import {Add_Products} from '../src/pages/Add_Products'
import { loginPage } from '../src/pages/login_page'
import { basepage } from '../src/pages/base_page';

test.describe("Products functionality",{tag:["@products", "@regression"]},()=>{
    test.beforeEach('Login to the application',async({page})=>{
        const base = new basepage(page);
        await base.navigate("/")
        const Login = new loginPage(page);
        await Login.click_on_sigin();
        await Login.login_with_valid_cred("vedulajagadeesh1994@gmail.com","Yuvraj@12")
    })

    test("Add product to the cart",async({page})=>{
        const products = new Add_Products(page)
        await products.select_product_and_Add_to_cart(["Stylish Dress","Winter Top"])
    })
})