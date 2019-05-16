var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver_fx_1 = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

var driver_chr_1 = new webdriver.Builder()
    .forBrowser('chrome')
    .build();


var driver_fx_2 = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

var driver_chr_2 = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

var driver_fx_3 = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

var driver_chr_3 = new webdriver.Builder()
    .forBrowser('chrome')
    .build();



searchTest(driver_fx_1);
searchTest(driver_chr_1);

searchTest(driver_fx_2);
searchTest(driver_chr_2);

searchTest(driver_fx_3);
searchTest(driver_chr_3);
function searchTest(driver) {
  /* Put the path name of your file here to get selenium to call your  */
  driver.get('file://~/Desktop/flappy-bird/build/index.html');
  // driver.findElement(By.name('canvas')).sendKeys('webdriver');

  driver.sleep(1000).then(function() {
    // driver.findElement(By.name('canvas')).sendKeys(webdriver.Key.TAB);
  });

  // driver.findElement(By.name('btnK')).click();

  driver.sleep(2000).then(function() {
    driver.getTitle().then(function(title) {
      if(title === 'webdriver - Google Search') {
        console.log('Test passed');
      } else {
        console.log('Test failed');
      }
    });
  });


}
