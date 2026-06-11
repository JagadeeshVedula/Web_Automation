import {Page,Locator} from '@playwright/test'
import { basepage } from './base_page'
import { logger } from '../Utilties/Logger';

type AccountCreationData = {
        Name:string,
        Email:string,
        Title: string,  //Mr or Mrs
        Password:string,
        DOB:string, //D-M-YEAR format
        FirstName:string,
        LastName:string,
        Address:string,
        Country:string,  // India format
        State:string,
        City:string,
        Zipcode:string,
        Mobile:string

    }
export class signup extends basepage {
    private readonly NameTextField;
    private readonly FirstNameTextField;
    private readonly LastNameTextField;
    private readonly EmailTextField;
    private readonly StateTextField;
    private readonly SignupHeader;
    private readonly MaleGenderRadioButton;
    private readonly PasswordTextfield;
    private readonly DateDropdown;
    private readonly MonthDropdown;
    private readonly YearDropdown;
    private readonly AddressField;
    private readonly CountryDropdown;
    private readonly CityTextField;
    private readonly ZipTextField;
    private readonly MobileTextField;
    private readonly createAccountButton;
    private readonly signUpButton;
    private readonly accountCreationconfirmation;
    private readonly accountCreationcontinueButton;
    private readonly DeleteAccountbutton;
    
    constructor(page:Page){
        super(page)
        this.NameTextField = page.locator('//input[@data-qa="signup-name"]')
        this.EmailTextField = page.locator('//input[@data-qa="signup-email"]')
        this.createAccountButton = page.locator('//button[@data-qa="create-account"]')
        this.accountCreationcontinueButton = page.locator('//a[@data-qa="continue-button"]')
        this.signUpButton = page.locator('//button[@data-qa="signup-button"]')
        this.SignupHeader = page.locator('//b[text()="Enter Account Information"]')
        this.MaleGenderRadioButton = page.locator('//div[@id="uniform-id_gender1"]')
        this.PasswordTextfield = page.locator('//input[@id="password"]')
        this.StateTextField = page.locator('//input[@id="state"]')
        this.CityTextField = page.locator('//input[@id="city"]')
        this.ZipTextField = page.locator('//input[@id="zipcode"]')
        this.MobileTextField = page.locator('//input[@id="mobile_number"]')
        this.DateDropdown = page.locator('//select[@id="days"]')
        this.MonthDropdown = page.locator('//select[@id="months"]')
        this.YearDropdown = page.locator('//select[@id="years"]')
        this.FirstNameTextField = page.locator('//input[@data-qa="first_name"]')
        this.LastNameTextField = page.locator('//input[@data-qa="last_name"]')
        this.AddressField = page.locator('//input[@id="address1"]')
        this.CountryDropdown = page.locator('//select[@id="country"]')
        this.accountCreationconfirmation = page.locator('//b[text()="Account Created!"]')
        this.DeleteAccountbutton = page.locator('//a[@href="/delete_account"]')
    }

    async create_Account(userdata:AccountCreationData){
        await this.fill_element(this.NameTextField,userdata.Name)
        await this.fill_element(this.EmailTextField,userdata.Email)
        await this.click_element(this.signUpButton)
        await this.is_element_found(this.SignupHeader)
        await this.click_element(this.MaleGenderRadioButton)
        await this.fill_element(this.PasswordTextfield,userdata.Password)
        let date = userdata.DOB.split('-')[0]
        let Month = userdata.DOB.split('-')[1]
        const Year = userdata.DOB.split('-')[2]
        if (date.length ===2 && date[0] ==='0'){
            date = date[1]
        }
        if (Month.length ===2 && Month[0] ==='0'){
            Month = Month[1]
        }
        await this.select_value_from_dropdown(this.DateDropdown,date)
        await this.select_value_from_dropdown(this.MonthDropdown,Month)
        await this.select_value_from_dropdown(this.YearDropdown,Year)
        await this.fill_element(this.FirstNameTextField,userdata.FirstName)
        await this.fill_element(this.LastNameTextField,userdata.LastName)
        await this.fill_element(this.AddressField,userdata.Address)
        await this.select_value_from_dropdown(this.CountryDropdown,userdata.Country)
        await this.fill_element(this.StateTextField,userdata.State)
        await this.fill_element(this.CityTextField,userdata.City)
        await this.fill_element(this.ZipTextField,userdata.Zipcode)
        await this.fill_element(this.MobileTextField,userdata.Mobile)
        await this.click_element(this.createAccountButton)
        await this.is_element_found(this.accountCreationconfirmation)
        console.log(`Account created successfully with following details ${userdata}`)
        await this.click_element(this.accountCreationcontinueButton)
        await this.is_element_found(this.DeleteAccountbutton)
        await this.click_element(this.DeleteAccountbutton)
        logger.warn(`Account deleted successfully to use the test again for sign up testing`)
        

    }

}