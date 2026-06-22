import {test, expect} from '@playwright/test'
import { generateEmail } from './utils/generateRandomEmail.spec'

test ('generate email',async({page})=>{

    const email = generateEmail()

    console.log(email)

})