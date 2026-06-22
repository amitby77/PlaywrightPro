export class LoginPage{

    constructor(page){
        this.page = page;


        //locators
        this.loginLink = page.getByRole('link', { name: 'Log in' });
        this.userNameInput = page.locator('#loginusername');
        this.passwordInput = page.locator('#loginpassword');
        this.loginButton = page.getByRole('button',{name: 'Log in'});
    
    }

    async navigate(){

        await this.page.goto('https://www.demoblaze.com/')
    }

    async login(username,password){
        await this.loginLink.click()
        await this.userNameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.loginButton.click()
       
    }

    async getErrorMessage() {
    const dialog = await this.page.waitForEvent('dialog');
    const message = dialog.message();
    await dialog.accept();
    return message;

    }
}


//example1123
//user123

