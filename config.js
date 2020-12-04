var config = {};

config.emailFrom = 'noreply@sender.com';
config.emailTo = 'your@email.com';
config.scanInterval = 5000;
config.seleniumServer = 'http://localhost:4444/wd/hub';
config.seleniumDriverWaitInterval = 4000;
config.browser = 'chrome';

module.exports = config;