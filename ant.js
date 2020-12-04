const config = require('./config');
const chrome = require('selenium-webdriver/chrome');
const sendmail = require('sendmail')();
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

const productUrl = 'https://www.antonline.com/Sony/Electronics/Gaming_Devices/Gaming_Consoles/1413479';
const chromeDriverPath = '/opt/selenium/chromedriver-87.0.4280.20';

//chrome.setDefaultService(new chrome.ServiceBuilder(chromeDriverPath).build());
var options = new chrome.Options();
options.addArguments("--headless");
console.log("Ant Scanner\nStarted @ : " + Date.now());
var t = setInterval(scanner, config.scanInterval);

function scanner() {
    var driver = new webdriver.Builder()
        .forBrowser('chrome')
        //.usingServer(config.seleniumServer)
        .withCapabilities(options)
        .build();

    driver.get(productUrl).then(function() {
        driver.navigate().refresh();
        let inProgressPromise = driver.wait(() => {
            return driver.findElement(By.xpath('/html/body/div[6]/div[2]/span[1]')).getText().then((text) => {
                return text != 'Sold Out';
            });
        }, (config.scanInterval - 2000));

        return inProgressPromise.then(() => {
            sendmail({
                from: config.emailFrom,
                to: config.emailTo,
                subject: 'AntOnline Stock seems to be available, please login to check',
                html: 'Stock seems to be available, please login to check'
              }, function (err, reply) {
                console.log(err && err.stack)
                console.dir(reply)
              })
            clearInterval(t);
        });
    }).catch(e => { console.log(e) })
    .finally(e => { driver.close() });
}