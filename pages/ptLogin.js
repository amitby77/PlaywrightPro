export class ptlogin{
    constructor(page){
        this.page = page

        this.usernameInput = page.locator('#username'),
        this.passwordInput = page.locator('#password')
        this.loginButton = page.getByRole('button',{name:'Submit'})
    }

    async navigate(){
        await this.page.goto('https://practicetestautomation.com/practice-test-login/')

    }

    async loginPage(){
         await this.page.locator('#username').fill('student')
         await this.page.locator('#password').fill('Password123')
         await this.page.getByRole('button',{name:'Submit'}).click()
    }

    async messages(){
         this.successfulMessage = page.locator('.post-content p strong')
    }
}