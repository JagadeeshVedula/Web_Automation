import {Page,Locator,expect} from "@playwright/test";
import { basepage } from "./base_page";


export class Add_Products extends basepage{
    private readonly productstab;
    private readonly continueShoppingbutton;
    private readonly carttab;
    private readonly cartproductlist;
    private readonly proceedtocheckout;
    private readonly placeorderbutton;
    private readonly PaymentHeader;

    constructor(page:Page){
        super(page)
        this.productstab = page.locator('//a[@href="/products"]')
        this.carttab = page.locator('(//a[@href="/view_cart"])[1]')
        this.continueShoppingbutton = page.locator('//button[text()="Continue Shopping"]')
        this.cartproductlist = page.locator('//table//tbody/tr/td[@class="cart_description"]//a')
        this.proceedtocheckout = page.locator('//a[text()="Proceed To Checkout"]')
        this.placeorderbutton = page.locator('//a[text()="Place Order"]')
        this.PaymentHeader = page.locator('//h2[text()="Payment"]') 
    }


    async select_product_and_Add_to_cart(products:string[]){
        await this.is_element_found(this.productstab)
        await this.click_element(this.productstab)
        for (let i=0;i<products.length;i++){
            const product = products[i]
            let addToCart = await this.fetch_element(`(//p[text()="${product}"]/parent::div)[1]/a`)
            await this.hover_element(addToCart)
            await this.click_element(addToCart)
            await this.click_element(this.continueShoppingbutton)
            
        }
        await this.click_element(this.carttab)
        let productsAdded:string[] = await this.get_text(this.cartproductlist)
        expect(productsAdded).toEqual(products);
        await this.click_element(this.proceedtocheckout)
        await this.click_element(this.placeorderbutton)
        await this.is_element_found(this.PaymentHeader)
    }
}

