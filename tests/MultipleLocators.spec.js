import {test,expect} from '@playwright/test'

test('validate the login fucntionality',async({page})=>{

await page.goto('https://www.demoblaze.com/')
await page.click('#login2')
await page.fill('#loginusername','test')
await page.fill('#loginpassword','test')
await page.click("button:has-text('Log in')")
const logOutText = await page.locator('#logout2').textContent()
expect(logOutText).toContain('Log out')
console.log("Login successful") 

const Products = await page.$$('//div[@id="tbodyid"]//div/h4')

for (const product of Products)
{
    const productName = await product.textContent()
    console.log(productName)
}


})