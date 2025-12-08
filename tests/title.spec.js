import {test,expect} from '@playwright/test'

test('validate the page title',async({page})=>{

    await page.goto('https://rahulshettyacademy.com')
    await expect(page).toHaveTitle('Rahul Shetty Academy | Master AI & Automation Testing')
    console.log(await page.title())
     console.log(await page.getByText('World-class tutorials on Playwright, AI Testing, Selenium, ISTQB, API Testing, Postman, Cypress, Appium, Cucumber, SoapUI, JMeter, Jira, and many more. Join our courses now to get the best job opportunity.').textContent())
})