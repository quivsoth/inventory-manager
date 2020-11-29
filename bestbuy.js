var webdriver = require('selenium-webdriver');
var message = "gm";

//var driver = new RemoteWebDriver(new Uri(<RemoteUrl>), options);

console.log('my node js in a docker stuff stuff stuff0');
var driver = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.chrome())
    .usingServer('http://chrome:4444/wd/hub')
    .build();

    async function Run(){
        try{
            driver.get('http://www.google.com/');
            // await driver.wait(webdriver.until.elementLocated(webdriver.By.id("identifierId")), 10000);
            // // User Name
            // await driver.findElement(webdriver.By.id("identifierId")).sendKeys("TODO");
            // await driver.findElement(webdriver.By.id("identifierId")).sendKeys(webdriver.Key.ENTER);
            // await driver.sleep(1000);
        }
        catch(err){
            handleFailure(err, driver)
        }
    }

    Run();

    function handleFailure(err, driver) {
        console.error('Something went wrong!\n', err.stack, '\n');
        driver.quit();
    }