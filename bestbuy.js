const chrome = require('selenium-webdriver/chrome');
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;
var options = new chrome.Options();
options.addArguments("--headless");
const scanPeriod = 259000000; //time in milliseconds to scan for changes (3 days default)
//var t = setInterval(scanner, 10000);
// function scanner() {
var driver = new webdriver.Builder()
    .forBrowser('chrome')
    //.usingServer('http://localhost:4444/wd/hub')
    .withCapabilities(options)
    .build();


driver.get('http://127.0.0.1:8080').then(function() {
    driver.navigate().refresh();
    let inProgressPromise = driver.wait(() => {
        return driver.findElement(By.id('hw')).getText().then((text) => {
        return text != 'Out Of Stock.';
        });
    }, 259000000);

    return inProgressPromise.then(() => {
        console.log("In stock! Do stuff!");
        //clearInterval(t);
    });
}).catch(e => { console.log("Text match not found") })
.finally(e => { driver.close() });
//}
