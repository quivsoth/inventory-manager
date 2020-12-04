const chrome = require('selenium-webdriver/chrome');
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

//chrome.setDefaultService(new chrome.ServiceBuilder("/opt/selenium/chromedriver-87.0.4280.20").build());
var options = new chrome.Options();
options.addArguments("--headless");
//const scanPeriod = 259000000; //time in milliseconds to scan for changes (3 days default)

var t = setInterval(scanner, 11000);

function scanner() {

    var driver = new webdriver.Builder()
        .forBrowser('chrome')
        //.usingServer('http://localhost:4444/wd/hub')
        .withCapabilities(options)
        .build();

    driver.get('https://www.bestbuy.com/site/sony-playstation-5-console/6426149.p?skuId=6426149').then(function() {
        driver.navigate().refresh();
        console.log("scanner");
        let inProgressPromise = driver.wait(() => {
            // return driver.findElement(By.id('hw')).getText().then((text) => {
            return driver.findElement(By.xpath('*[@id="fulfillment-add-to-cart-button-635df4b7-fde9-46b3-807f-c0a8a44278fa"]/div/div/div/button')).getText().then((text) => {
                return text != 'Sold Out';
            });
        }, 10000);

        return inProgressPromise.then(() => {
            console.log("In stock! Do stuff!");
            clearInterval(t);
        });
    }).catch(e => { console.log(e) })
    .finally(e => { driver.close() });
}