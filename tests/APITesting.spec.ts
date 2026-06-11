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
test.describe("API Testing",{tag:["@API", "@regression"]}, ()=>{
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

    test('post data to API',async()=>{
        const API = new APICalls()
        const postData = {'search_product': 'MEN T SHIRT'};
        const response = await API.Post_Data_To_API("searchProduct", postData);
        console.log(response);
    })

})