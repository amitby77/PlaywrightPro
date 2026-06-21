import{test,expect} from '@playwright/test'

test('Validate the GET response from the API',async({request})=>{

   const response = await request.get('https://dummyjson.com/users')
    expect( response.status()).toBe(200)
    expect(response.statusText()).toBe('OK')
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8')  
    expect(response.ok()).toBeTruthy()
    expect(response.url()).toBe('https://dummyjson.com/users')
    const responseBody = await response.json()
    console.log(responseBody)
})

// @ts-check

test('validate the API resposnes', async({request})=>{
    const response = await request.get('https://reqres.in/api/users?page=2');
    // Validate the status code
    expect(response.status()).toBe(200);
    // Validate the response body
    const responseBody = await response.json();
    expect(responseBody.page).toBe(2);
    expect(responseBody.data.length).toBeGreaterThan(0);
});