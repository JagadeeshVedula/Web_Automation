import { Page,Locator, expect, errors } from "@playwright/test";
import path from 'path'
import {logger} from "../Utilties/Logger";
export class basepage {
    private readonly page: Page;

    constructor(page:Page){
        this.page=page
    }

    async fetch_element(loc:string){
        return this.page.locator(loc)
    }
    async navigate(url:string){
        logger.info(`session created successfully and navigating to ${url}`)
        await this.page.goto(url, {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            });
        logger.info(`successfully navigated to ${url}`)
    }
    async click_element(ele:Locator, retries=3,delay=500){
        for (let attempt=1;attempt<=retries;attempt++){
            try{
                logger.info(`trying to click element using locator - ${ele}`)
                await ele.click()
                logger.info(`clicked successfully using locator ${ele}`)
                return
            }
            catch(e){
                logger.info(`clicking element failed in attempt - ${attempt}`)
                if (attempt===retries){
                    logger.error(`failed to click after ${retries} retries`)
                    throw new Error(`failed to click after ${retries} retries`)
                }
                await this.page.waitForTimeout(delay)
                logger.info(`performing click after ${delay} milli seconds`)
            }
        }
        
            
    }
    async fill_element(ele:Locator,text:any,retries=2,delay=500){
        for (let attempt=1;attempt<=retries;attempt++){
            try{
                    logger.info(`trying to fill text-${text} in element using locator - ${ele}`)
                    await ele.fill(text)
                    logger.info(`entered text-${text} successfully using locator ${ele}`)
                }
                catch(e){
                    logger.info(`entering text into element failed in attempt - ${attempt}`)
                    if (attempt===retries){
                        logger.error(`failed to enter text after ${retries} retries`)
                        throw new Error(`failed to enter text after ${retries} retries`)
                    }
                    await this.page.waitForTimeout(delay)
                }
            }    
    }

    async is_element_found(ele:Locator){
        try{
            logger.info(`waiting for element using locator - ${ele}`)
            await ele.waitFor({state:'visible'})
            logger.info(`element found with locator - ${ele}`)
        }
        catch(e){
            logger.error(`element not found with exception - ${e}`)
            throw new Error(`element not found with exception - ${e}`)
        }
    }

    async select_value_from_dropdown(ele:Locator,value:string){
        try{
            logger.info(`selecting drop down option using value option from element using locator - ${ele}`)
            await ele.selectOption(value)
            logger.info(`selected dropdown value using locator - ${ele}`)
        }
        catch(e){
            logger.error(`failed to select option from dropdown due to exception -${e}`)
            throw new Error(`failed to select option from dropdown due to exception -${e}`)
        }

    }

    async pause_execution(){
        await this.page.pause()
    }

    async hover_element(ele:Locator){
        try{
            logger.info(`hovering on element using locator - ${ele}`)
            await ele.hover()
            logger.info(`successfully hovered on element using locator - ${ele}`)
        }
        catch(e){
            logger.error(`unable to hover on the element due to exception- ${e}`)
            throw new Error(`unable to hover on the element due to exception- ${e}`)
        }
        

    }

    async get_text(ele:Locator){
        try {
            logger.info(`getting all inner texts from all the elements found from locator - ${ele}`)
            let text_list = ele.allInnerTexts()
            logger.debug(`retrived all text from element - ${text_list}`)
            return text_list
        }
        catch(e){
            logger.error(`unable to get text due to exception - ${e}`)
            throw new Error(`unable to get text due to exception - ${e}`)
        }

    }

    async upload_file(ele:Locator,fileName:string | string[]){
        try{
            logger.info(`uploading file - ${fileName}`)
            if (Array.isArray(fileName)) {
                const paths = fileName.map(file=>path.join(process.cwd(), file));
                await ele.setInputFiles(paths);
            } else {
                await ele.setInputFiles(path.join(process.cwd(), fileName));
            }
            logger.info(`${fileName} uploaded successfully`)
        }
        catch(e){
            logger.error(`file upload failed due to exception - ${e}`)
            throw new Error(`file upload failed due to exception - ${e}`)
        }
    }

    async press_key(key:string){
        try{
            logger.info(`pressing ${key} from keyboard`)
            await this.page.keyboard.press(key)
            logger.info(`${key} pressed successfully`)
        }
        catch(e){
            logger.error(`failed pressing ${key} due to exception-${e}`)
        }
    }
    
}