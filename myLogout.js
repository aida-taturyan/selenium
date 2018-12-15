var webdriver = require("selenium-webdriver");
var by = webdriver.By;
var until = webdriver.until;
var driver = new webdriver.Builder().forBrowser("chrome").build();

before(async function () {
    await driver.get("https://codesignalonstagingci.codesignal.com/login");
});

describe("Logout from page", function () {
    it('should login to site', async function () {

        var username = await driver.wait(until.elementLocated(by.name("username")), 5000);
        await username.sendKeys("adia");

        var password = await driver.wait(until.elementLocated(by.name("password")), 5000);
        await password.sendKeys("tatutatu1");

        var button = await driver.findElement(by.className("button--content"));
        button.click();

    });

    it('should logout from site', async function () {
        var dropdown = await driver.wait(until.elementLocated(by.className("avatar--image")),5000);
        await dropdown.click();


        var signout = await driver.wait(until.elementLocated(by.css(".logout.-clickable")), 10000);
        signout.click();

        await driver.wait(until.urlContains("https://codesignalonstagingci.codesignal.com/login"), 10000);
    });

});

after(function () {
    //driver.quit();
});

