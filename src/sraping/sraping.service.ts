import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer'

@Injectable()
export class SrapingService {
    async getDate(){
        const browser = await puppeteer.launch({
            headless:false,
            ignoreHTTPSErrors:true,
        })
        let url = "https://pe.ingrammicro.com/site/productdetail?id=A001-000000000005859753"

        const page =await browser.newPage()
        await page.goto("https://pe.ingrammicro.com/Site/Login/IdpWidget?returnurl=https%3A%2F%2Fpe.ingrammicro.com%2Fsite%2Fproductdetail%3Fid%3DA001-000000000005859753")
        //await page.screenshot({path:'example.png'});
     //   await page.click(`button[id="login"]`)
      // await page.click(`#loginBtn`)
   /*      await new Promise(r=>setTimeout(r,3000))
       let inputuser = await page.waitForSelector('input[id="okta-signin-username"]')
       let inputpassword = await page.waitForSelector( 'input[id="#okta-signin-password"]')

       inputuser.type("wiellatas@outlook.com")
       inputpassword.type("Glklll") */
       await new Promise(r=>setTimeout(r,3000))
    let res=   await page.evaluate(()=>{
       let res= document.querySelector("#searchBox_Global_v2")
        return res
       })
       console.log(res)
       //await page.goto(url)

       
     await browser.close()
        return "ok scrapper"
    }
}
