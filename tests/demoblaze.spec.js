const {test,expect} = require('@playwright/test')

test('validate the demoblaze homepage', async ({page}) => {
    await page.goto('https://demoblaze.com/')     
    expect(await page.title()).toBe('STORE')
    expect(page.url()).toBe('https://demoblaze.com/')
    const pageTitle = await page.locator('.navbar-brand').textContent()
    expect(pageTitle).toContain('PRODUCT STORE')
    console.log("Demoblaze homepage validated successfully")
    await page.pause
})
