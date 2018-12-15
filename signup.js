var webdriver = require("selenium-webdriver");
var by = webdriver.By;
until = webdriver.until;
var driver = new webdriver.Builder().forBrowser("chrome").build();

describe("LOGIN page", function () {
    before(async function () {
        await driver.get("https://app.codesignal.com/login");
    });
    it('should fill username', async function () {
        var username = await driver.wait(until.elementLocated(by.name("username")), 5000);
        username.sendKeys("miban");
    });
    it('should fill password', async function () {
        var password = await driver.wait(until.elementLocated(by.name("password")), 5000);
        password.sendKeys("miban");
    });
    it('should click button', function () {
        driver.findElement(by.className("coder-login--button")).click();
    });
});

after(function f() {
    //driver.quit();
});