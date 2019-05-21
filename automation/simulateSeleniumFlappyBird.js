const webdriver = require('selenium-webdriver');

const chromeDriver1 = new webdriver.Builder().forBrowser('chrome').build();
const chromeDriver2 = new webdriver.Builder().forBrowser('chrome').build();

searchTest(chromeDriver1);
searchTest(chromeDriver2);

function searchTest(driver) {
  driver.get('https://pkrisko.github.io/flappy-bird/build/index.html');
  driver.sleep(2000).then(() => {
    driver.getTitle().then(title => {
      if(title === 'Flappy Bird')
        console.log('Test passed');
      else
        console.log('Test failed');
    }).catch(err => {
      console.err('Error initializing the browser.');
    });
  });
}
