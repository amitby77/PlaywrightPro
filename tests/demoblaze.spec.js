const {test,expect} = require('@playwright/test')
const { Console } = require('console')

test('validate the demoblaze homepage', async ({page}) => {
    await page.goto('https://demoblaze.com/')     
    expect(await page.title()).toBe('STORE')
    expect(page.url()).toBe('https://demoblaze.com/')
    const pageTitle = await page.locator('.navbar-brand').textContent()
    expect(pageTitle).toContain('PRODUCT STORE')
    console.log("Demoblaze homepage validated successfully")
    await page.pause
})


test('validate the all products on the homepage', async ({page}) =>{

    await page.goto('https://demoblaze.com/')
    const products = await page.locator('.card-title').allTextContents()
    console.log("All products on the homepage:")
    console.log(products)
    })


test.only('capture all product name on amazon homepage', async ({page}) => {
        await page.goto('https://www.amazon.in/')
        //wait until the product names are visible
        await page.waitForSelector('span.a-size-small.a-color-base.truncate-2line')
        const productNames = await page.locator('span.a-size-small.a-color-base.truncate-2line').allTextContents()
        console.log("All product names on the Amazon homepage:")
        console.log(productNames)
        console.log("Total number of products captured: " + productNames.length)
    })