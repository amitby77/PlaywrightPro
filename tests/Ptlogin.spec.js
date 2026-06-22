import{test,expect} from '@playwright/test',
import{ptlogin} from '../pages/ptLogin.js'



test('validate the successfull login',async ({page})=>{
    const login = New ptlogin()

    // await page.goto('https://practicetestautomation.com/practice-test-login/')
    // await page.locator('#username').fill('student')
    // await page.locator('#password').fill('Password123')
    // await page.getByRole('button',{name:'Submit'}).click()
    // await expect(page.locator('.post-content p strong')).toHaveText('Congratulations student. You successfully logged in!')

await login.navigate()
await login.loginPage()
await expect()


})

