import { Page,Locator, expect, errors } from "@playwright/test";
import { error } from "console";
import path from 'path'
export class basepage {
    private readonly page: Page;

    constructor(page:Page){
        this.page=page
    }

    async fetch_element(loc:string){
        return this.page.locator(loc)
    }
    async navigate(url:string){
        await this.page.goto(url, {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            });
    }
    async click_element(ele:Locator, retries=3,delay=500){
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
        try{
            await ele.waitFor({state:'visible'})
        }
        catch(e){
            throw new Error(`element not found with exception - ${e}`)
        }
    }

    async select_value_from_dropdown(ele:Locator,value:any){
        try{
            await ele.selectOption(value)
        }
        catch(e){
            console.log(`failed to select option from dropdown due to exception -${e}`)
        }

    }

    async pause_execution(){
        await this.page.pause()
    }

    async hover_element(ele:Locator){
        await ele.hover()

    }

    async get_text(ele:Locator){
        let element_list = ele.allInnerTexts()
        
        return element_list


    }

    async upload_file(ele:Locator,fileName:string | string[]){
        if (Array.isArray(fileName)) {
            const paths = fileName.map(file => path.join(process.cwd(), file));
            await ele.setInputFiles(paths);
        } else {
            await ele.setInputFiles(path.join(process.cwd(), fileName));
    }
    }

    async press_key(key:string){
        await this.page.keyboard.press(key)
    }
    
}