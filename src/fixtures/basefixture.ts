import { test as base } from '@playwright/test'
import { basepage } from '../pages/base_page'
import { loginPage } from '../pages/login_page'
import { signup } from '../pages/sign_up'
import { Add_Products } from '../pages/Add_Products'
import { contactus } from '../pages/contact_us'

type MyPageObjects ={
    Base : basepage;
    Login : loginPage;
    SignUp : signup;
    Products : Add_Products;
    Contact : contactus
}

export const test = base.extend<MyPageObjects>({
    Login : async({page},use)=>{
        return use(new loginPage(page))
    },
    Base : async({page},use)=>{
        return use(new basepage(page))
    },
    SignUp: async({page},use)=>{
        return use(new signup(page))
    },
    Products: async({page},use)=>{
        return use(new Add_Products(page))
    },
    Contact: async({page},use)=>{
        return use(new contactus(page))
    }
})

export { Expect } from '@playwright/test'