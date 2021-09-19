const {Builder,Buy,Key,Util, By, logging} = require('selenium-webdriver')


let driver = new Builder().forBrowser('chrome').build()

// --------

async function loginFunction(stg,name,username,password){
    await driver.get(stg)
    await driver.findElement(By.id('aa')).sendKeys(name)
    await driver.findElement(By.id('hert')).click()
    let alert = await driver.switchTo().alert()
    await alert.authenticateAs(username,password)
}

async function another(){
    await loginFunction('assaas').then()
}
// another().then()

// --------

async function urlCatch(stglink){
    let pageLink = []
    
    await driver.get(stglink)
    const pageElementList = await driver.findElements(By.css('a'))
    for(let i=0;i<pageElementList.length;i++){
        let tempPage = await pageElementList[i].getAttribute('href')
        if(typeof tempPage === 'string' && tempPage.startsWith(stglink)){
            pageLink.push(tempPage)
        }
    }
    let s = new Set(pageLink)
    let tempArray = s.values()
    pageLink = Array.from(tempArray)
    return pageLink
}

async function findError(subUrl){
    await driver.get(subUrl)
    let errorObjectList = await driver.manage().logs().get(logging.Type.BROWSER)
        errorObjectList.forEach(element => {
        if(element.level.name==='SEVERE' || element.level.name==='FATAL'){
            console.log(subUrl+'---'+element.message)
        }
    });
}

async function checkmate(){
    let pageLinksList = await urlCatch('https://www.wipro.com/')
    for (let m = 0; m < pageLinksList.length; m++) {
        const elementa = pageLinksList[m];
        await findError(elementa)
    }
}
checkmate().then(
)