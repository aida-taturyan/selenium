describe("Logout from page", function () {
    it('should login to site', async function () {
        browser.url('https://codesignalonstagingci.codesignal.com/');
        browser.waitForExist("[name='username']");
        browser.addValue("[name='username']", "adia");
        browser.waitForExist("[name='password']");
        browser.addValue("[name='password']", "tatutatu1");
        browser.leftClick(".button--content");

        browser.waitUntil(function () {
                return browser.getUrl().match("https://codesignalonstagingci.codesignal.com/");
            },
            undefined,
            'Expected to be redirected to homepage after logging in');
    });
    it('should logout from site', async function () {
        browser.waitForExist(".avatar--image");
        browser.leftClick('.avatar--image');
        browser.pause(1000);
        browser.waitForExist("span.logout");
        browser.leftClick("span.logout");
        browser.waitUntil(function () {
                return browser.getUrl().match("https://codesignalonstagingci.codesignal.com/login");
            },
            undefined,
            'Expected to be redirected to login after logging out');
    });
});