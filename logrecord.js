const {Builder,Buy,Key,Util, By, logging} = require('selenium-webdriver')


let driver = new Builder().forBrowser('chrome').build()
let masterErrorObject = {}

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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function findError(subUrl){
    console.log(subUrl+'test')
    let subLinkErrorList = []
    await driver.get(subUrl)
    // await driver.manage().setTimeouts({ implicit: 300000, pageLoad: 300000, script: 300000 })
    await sleep(4000)
    let errorObjectList = await driver.manage().logs().get(logging.Type.BROWSER)
        errorObjectList.forEach(element => {
        if(element.level.name==='SEVERE' || element.level.name==='FATAL'){
            subLinkErrorList.push(element.message)
            console.log(subUrl+'---'+element.message)

        }
        
    });
    
    // masterErrorObject[subUrl] = subLinkErrorList
    // // return masterErrorObject
    // // console.log(masterErrorObject)
    // masterErrorObject = {}
}

// urlCatch('https://www.setmygoals.de/').then(pageList=>{
//     let new = pageList
// })
urlCatch('https://www.setmygoals.de/').then(urlArray => {
    console.log(urlArray.length)
    for(let i=0;i<urlArray.length;i++){
        
        findError(urlArray[i]).then(
            // console.log(urlArray[i]+'-----'+errorListz)
        )
    }
    // console.log(masterErrorObject)
    // driver.close()
})
// findError('https://www.lilly.co.kr').then()
// urlCatch('https://www.setmygoals.de/').then(urlArray => {
//     urlArray.forEach(element=>{
//         findError(element).then(m=>{
//             console.log(m)
//         })
//     })
//     // console.log(masterErrorObject)
//     // driver.close()
// })
// console.log(masterErrorObject)
// urlCatch('https://www.setmygoals.de/').then(p=>console.log(p))
