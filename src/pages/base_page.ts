import { Page,Locator, expect, errors } from "@playwright/test"


export class basepage {
    private readonly page: Page;

    constructor(page:Page){
        this.page=page
    }
    async navigate(url:string){
        await this.page.goto(url, {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            });
    }
    async click_element(ele:Locator, retries=2,delay=500){
        for (let attempt=1;attempt<=retries;attempt++){
            try{
                await ele.click()
                return
            }
            catch(e){
                console.log(`clicking element failed in attempt - ${attempt}`)
                if (attempt===retries){
                    throw new Error(`failed to click after ${retries} retries`)
                }
                await this.page.waitForTimeout(delay)
            }
        }
        
            
    }
    async fill_element(ele:Locator,text:any,retries=2,delay=500){
        for (let attempt=1;attempt<=retries;attempt++){
            try{
                    await ele.fill(text)
                }
                catch(e){
                    console.log(`entering text into element failed in attempt - ${attempt}`)
                    if (attempt===retries){
                        throw new Error(`failed to enter text after ${retries} retries`)
                    }
                    await this.page.waitForTimeout(delay)
                }
            }    
    }

    async is_element_found(ele:Locator){
        await ele.waitFor({state:'visible'})
    }

}