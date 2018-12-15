var webdriver = require("selenium-webdriver");
var until = webdriver.until, by = webdriver.By;
var driver = new webdriver.Builder().forBrowser('chrome').build();

describe("open", function () {

    it("watch video", async function () {
        driver.get("https://codesignal.com/");
        var button = driver.findElement(by.id("watch_video"));
        button.click();

        var video = driver.findElement(by.className("pum-close"));
        await driver.wait(until.elementIsVisible(video), 10000);
    });
    after(
        function () {
            driver.quit();
        }
    );
});