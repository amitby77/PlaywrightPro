import {test,expect,chromium} from"@playwright/test"

test('validate the two pages',async()=>{
const browser = await chromium.launch()
const context = await browser.newContext()
const page1 = await context.newPage()
const page2 = await context.newPage()

await page1.goto('https://www.demoblaze.com/')
await page2.goto('https://www.google.com/')

})

// test.only('validate the multiple window functionality',async()=>{
// const browser = await chromium.launch()
// const context = await browser.newContext()
// const page1 = await context.newPage()


// await page1.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')


// const newPromise = context.waitForEvent('page')
// await page1.getByRole('link', { name: 'OrangeHRM, Inc' }).click()
// const page2 = await newPromise

// await expect(page2).toHaveTitle('Human Resources Management Software | HRMS | OrangeHRM')


test.only('validate the multiple window functionality', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page1 = await context.newPage();

  await page1.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  // Use Promise.all to avoid race conditions
  const [page2] = await Promise.all([
    context.waitForEvent('page'), // or page1.waitForEvent('popup') if popup
    page1.getByRole('link', { name: 'OrangeHRM, Inc' }).click()
  ]);

  await expect(page2).toHaveTitle('Human Resources Management Software | HRMS | OrangeHRM');
  await expect(page2.locator("div[class='page-title']")).toContainText('Streamline All Your HR Needs on One ');
  console.log(await page2.locator('h1:visible').textContent());
  console.log("Multiple window handled successfully");
  await browser.close();
});