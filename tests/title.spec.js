import {test,expect} from '@playwright/test'

test('validate the page title and description',async({page})=>{

    await page.goto('https://rahulshettyacademy.com')
    await expect(page).toHaveTitle('Rahul Shetty Academy | QA Automation, Playwright, AI Testing & Online Training')
    console.log(await page.title())
    // console.log(await page.getByText('World-class tutorials on Playwright, AI Testing, Selenium, ISTQB, API Testing, Postman, Cypress, Appium, Cucumber, SoapUI, JMeter, Jira, and many more. Join our courses now to get the best job opportunity.').textContent())
    const description =await page.locator('.md\\:text-xl').first()

    console.log(await description.textContent())
})