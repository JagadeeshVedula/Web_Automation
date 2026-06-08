import {APICalls} from '../src/Utilties/APICalls'
import {test,expect} from '@playwright/test'

interface Product {
    id: number;
    name: string;
    price: string;
    brand: string;
}
interface ProductsResponse {
    responseCode: number;
    products: Product[];
}
test('get all products using API GET request',async()=>{
    const API = new APICalls()
    const data= await API.Get_Data_From_API<ProductsResponse>("productsList")
    console.log(data)
    expect(data.responseCode).toBe(200);
    expect(data.products.length).toBeGreaterThan(0);

    // TypeScript strictly validates these properties now
    const firstProduct = data.products[0];
    expect(firstProduct).toHaveProperty('id');
    expect(firstProduct).toHaveProperty('name');
    console.log(`First product found: ${firstProduct.name}`);
})