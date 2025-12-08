import{test,expect} from "@playwright/test"

test('validate new tab page',async({page})=>{

    await page.goto('https://rahulshettyacademy.com/')

    //click on the link which opens in new tab 
    const [newTab]=await Promise.all([
        page.waitForEvent('popup'),
        page.getByText('Meet ups').nth(0).click()
    ]) 
    console.log(await newTab.title())
    expect(await newTab.title()).toBe('Software Testing Meetup 2025')
})