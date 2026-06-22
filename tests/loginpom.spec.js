import {test,expect} from '@playwright/test'
//import { LoginPage } from '../pages/loginPage'



test('validate the login using POM',async({page})=>{


//const loginPage =new LoginPage(page)

await loginPage.navigate()
await loginPage.login('example1123','user123')
await expect (page.locator('#nameofuser')).toBeVisible()
await expect (page.locator('#nameofuser')).toHaveText('Welcome example1123')
await expect (page.getByText('Log out')).toBeVisible()

const titles = await page.locator('.card-title').allTextContents()
const count = titles.length
expect(count).toBe(9)

for (let title of titles){
    console.log(title)
}
})