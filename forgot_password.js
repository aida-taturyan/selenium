describe("Forgot password", function () {
    const FORGOT_BUTTON = ".modal-auth--forgot-password";
    const SEND = ".button.-type-green-fresh.-size-40.-font-size-20";
    const SIGNIN = ".modal--footer .button";
    it('should click on "forgot password button"', function () {
        browser.url("/login");
        browser.waitForExist(FORGOT_BUTTON);
        browser.leftClick(FORGOT_BUTTON);
        browser.waitForExist(".modal--body");
        browser.waitForExist(SEND);
        browser.leftClick(SEND);

        browser.waitUntil(function () {

            let growl = browser.getText(".growl-notification--content-title");
            return growl.indexOf("Please specify your email address") !== -1;

        });

    });

    it('should send incorrect email', function () {

        browser.addValue("[name = 'email']", "notexistingemail@example.com");
        browser.leftClick(SEND);
        browser.waitUntil(function () {

            let growl = browser.getText(".growl-notification--content-title");
            return growl.indexOf("User not found") !== -1;

        });

    });

    it('should send correct email', function () {
        browser.clearElement("[name = 'email']");
        browser.addValue("[name = 'email']", "adia.tatu@gmail.com");
        browser.waitForExist(SEND);
        browser.leftClick(SEND);
        browser.waitUntil(function () {

            let growl = browser.getText(".growl-notification--content-title");
            return growl.indexOf("Password reset link has been sent to") !== -1;

        });

    });

    it('should click on signin button and quit the modal', function () {

        browser.waitForExist(FORGOT_BUTTON);
        browser.leftClick(FORGOT_BUTTON);
        browser.waitForExist(".modal--body");
        browser.waitForExist(SIGNIN);
        browser.pause(3000);
        browser.leftClick(SIGNIN);
        browser.pause(3000);

    });

    afterEach(function () {
        browser.pause(3000);
    })

});