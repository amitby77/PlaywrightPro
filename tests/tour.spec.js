import {test,expect} from "@playwright/test"

test("Validate tour website", async({page}) =>{

await page.goto('https://nichethyself.com/tourism/')



const [newPage] = await Promise.all([
page.waitForEvent('popup'),
page.locator('.secondarynav a').nth(2).click()
])
await newPage.waitForLoadState()
await newPage.locator('#days').selectOption({label:'Home Stay'})

})