const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

for (let idx = 0; idx < 4; idx++) {
    const chromeDriver = new webdriver.Builder().forBrowser('chrome')
        .setChromeOptions(new chrome.Options().addArguments('--headless'))
        .build();
    navigateToBuiltURL(chromeDriver);
}

function navigateToBuiltURL(driver) {
    driver.get('https://pkrisko.github.io/flappy-bird/build/index.html');
    driver.sleep(2000).then(() => {
        driver.getTitle().then(title => {
            if(title === 'Flappy Bird')
                console.log('Test passed');
            else
                console.log('Test failed');
        });
    });
}
