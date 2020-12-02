const chrome = require('selenium-webdriver/chrome');
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var options = new chrome.Options();
options.addArguments("--headless");



var myVar = setInterval(myTimer, 10000);

function myTimer() {

    var driver = new webdriver.Builder()
        .forBrowser('chrome')
        //.usingServer('http://localhost:4444/wd/hub')
        .withCapabilities(options)
        .build();


    driver.get('http://127.0.0.1:8080').then(function() {
        driver.navigate.to(driver.getCurrentURL());
        driver.navigate().refresh();
        let inProgressPromise = driver.wait(() => {
            return driver.findElement(By.id('hw')).getText().then((text) => {
            return text === 'Hello World!!';
            });
        }, 7000);

        return inProgressPromise.then(() => {
            console.log("Change detected, do stuff.");
        });
    }).catch(e => { /*console.log(e)*/ })
    .finally(e => { driver.close() });
}






// var webdriver = require('selenium-webdriver');
// const chrome = require('selenium-webdriver/chrome');
// const chromedriver = require('chromedriver');

// // chrome.setDefaultService(new chrome.ServiceBuilder("/opt/selenium/chromedriver-87.0.4280.20").build());

// var driver = new webdriver.Builder().
//     withCapabilities(webdriver.Capabilities.chrome())
//     .usingServer('http://localhost:4444/wd/hub')
//     .build();

//     async function Run() {
//         try{
//             driver.get('http://www.google.com/');
//             await driver.wait(webdriver.until.elementLocated(webdriver.By.id("identifierId")), 10000);
//             // // User Name
//             // await driver.findElement(webdriver.By.id("identifierId")).sendKeys("TODO");
//             // await driver.findElement(webdriver.By.id("identifierId")).sendKeys(webdriver.Key.ENTER);
//             await driver.sleep(1000);
//         }
//         catch(err){
//             handleFailure(err, driver)
//         }
//     }

//     Run();

//     function handleFailure(err, driver) {
//         console.error('Something went wrong!\n', err.stack, '\n');
//         driver.quit();
//     }