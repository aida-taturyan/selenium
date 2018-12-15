var webdriver = require("selenium-webdriver");
var until = webdriver.until, by = webdriver.By;
var driver = new webdriver.Builder().forBrowser('chrome').build();

describe("open", function () {
    it("should redirect to codesignal", async function () {
        driver.get("https://codefights.com/");
        await driver.wait(until.urlContains('codesignal'), 3000);
    });
    it("should open codesignal page", async function () {
        // driver.get("https://codesignal.com/");
        await driver.wait(until.titleIs('Home | CodeSignal'), 5000);
    });
});

describe("login", function () {

    it("should redirect to login page", async function () {
        await driver.findElement(by.className("login_button")).click();
        await driver.wait(until.urlIs('https://app.codesignal.com/login'), 1000);
    });
    it("should open an error if inputs are empty", async function () {
        var button = await driver.wait(until.elementLocated(by.css(".coder-login--button .button--content")), 5000);
        button.click();
        var message = await driver.wait(until.elementLocated(by.className("growl-notification--image")), 1000);
        await driver.wait(until.elementIsVisible(message), 1000);
    });
    after(
        function () {
            // driver.quit();
        }
    )
});