// @flow

const USERNAME_INPUT: string = "[name = 'username']";
const PASSWORD_INPUT: string = "[name = 'password']";
const CODER_SETTINGS_ICON: string = ".block.header-nav--settings-icon";
const CODER_LOGOUT_BUTTON: string = ".logout.-clickable";
const CLIENT_LOGIN_BUTTON: string = ".recruiter-login--button";
const CLIENT_SETTINGS_ICON: string = ".header-nav--settings-icon";
const CLIENT_LOGOUT_BUTTON: string = "a=Sign Out";

function clicking(growl_message: string) {
    browser.leftClick(CLIENT_LOGIN_BUTTON);
    browser.pause(1000);
    browser.waitUntil(function () {
        let growl = browser.getText(".growl-notification--content-title");
        return growl.indexOf(growl_message) !== -1;
    });
}

describe("CODER LOGIN AND LOGOUT FROM CLIENT PAGE", function () {

    it('should open client login page and click on signin button without any given data', function () {
        browser.url("recruiter/login");
        browser.waitForExist(CLIENT_LOGIN_BUTTON);
        clicking("Username/Email can't be empty");
    });

    it('should fill in only username', function () {
        browser.addValue(USERNAME_INPUT, "kukushik");
        clicking("Password can't be empty");
    });

    it('should fill in invalid username and invalid password', function () {
        browser.clearElement(USERNAME_INPUT);
        browser.addValue(USERNAME_INPUT, "kukushik");
        browser.addValue(PASSWORD_INPUT, "something");
        clicking("Sign-in failed"); //user not found
    });

    it('should fill in valid username and invalid password', function () {
        browser.clearElement(USERNAME_INPUT);
        browser.clearElement(PASSWORD_INPUT);
        browser.addValue(USERNAME_INPUT, "adia");
        browser.addValue(PASSWORD_INPUT, "something");
        clicking("Sign-in failed"); //incorrect password
    });

    it('should login with valid coder username and valid password', function () {
        browser.addValue(USERNAME_INPUT, "adia");
        browser.addValue(PASSWORD_INPUT, "tatutatu1");
        browser.leftClick(CLIENT_LOGIN_BUTTON);
        browser.waitUntil(function () {
            return browser.getUrl().match("/");
        });

    });

    it('should logout from the site', function () {
        browser.waitForExist(CODER_SETTINGS_ICON);
        browser.leftClick(CODER_SETTINGS_ICON);
        browser.pause(1000);
        browser.leftClick(CODER_LOGOUT_BUTTON);
        browser.waitUntil(function () {
            return browser.getUrl().match("/login");
        });
    });

});

describe("CLIENT LOGIN AND LOGOUT FROM CLIENT PAGE", function () {
    it('should login with client credentials from coder page and redirect to client dashboard', function () {
        browser.url("recruiter/login");
        browser.waitForExist(CLIENT_LOGIN_BUTTON);
        browser.addValue(USERNAME_INPUT, "client123");
        browser.addValue(PASSWORD_INPUT, "123456");
        browser.leftClick(CLIENT_LOGIN_BUTTON);
        browser.waitUntil(function () {
            return browser.getUrl().match("/client-dashboard");
        });
    });

    it('should logout from the client dashboard', function () {
        browser.waitForExist(CLIENT_SETTINGS_ICON);
        browser.leftClick(CLIENT_SETTINGS_ICON);
        browser.pause(1000);
        browser.leftClick(CLIENT_LOGOUT_BUTTON);
        browser.waitUntil(function () {
            return browser.getUrl().match("/recruiter/login");
        });
    });
});

afterEach(function () {
    browser.pause(2000);
});
