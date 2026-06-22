import {test,expect} from '@playwright/test'

test('validate the base URL',async({page})=>{

await page.goto('/cart.html')
expect(page.url()).toContain('cart')

}  )