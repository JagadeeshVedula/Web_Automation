export class APICalls {
    private readonly base_url:string
    constructor(){
        this.base_url="https://automationexercise.com/api/"
    }
    async Get_Data_From_API<T>(endpoint:string,data?:Record<string,any>){
        let url = this.base_url+endpoint
        if (data && Object.keys(data).length > 0) {
            const params = new URLSearchParams(data).toString();
            url += `?${params}`;
        }
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        // Returns the response cast to your specified TypeScript interface
        return await response.json() as T;

    }


    async Post_Data_To_API<T>(endpoint:string,data:Record<string,any>){
        const url = this.base_url+endpoint
        const body = new URLSearchParams(data);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body.toString()
        });
        return response.json() as Promise<T>;
    }
}