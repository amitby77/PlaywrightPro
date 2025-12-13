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