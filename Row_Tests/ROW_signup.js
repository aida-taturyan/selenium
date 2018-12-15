// @flow

const NEW_USER = new Date().getTime() + "@example.com";
const ANOTHER_NEW_USER = new Date().getTime() + "@test.test";
const SIGNUP_BUTTON = ".button--content.-layout-h.-center-center.-space-h-4";
const LETS_GO_BUTTON = "div=Let's go!";
const SKIP_TUTORIAL = ".tutorial--message-skip .icon";
const CONFIRM_SKIP_MODAL = "div=Confirm";
const CODER_SETTINGS_ICON = ".block.header-nav--settings-icon";
const CODER_LOGOUT_BUTTON = ".logout.-clickable";
const CODER_SIGNUP_HERE = "div=Sign up here!";
const ARCADE_CARD = ".home-card.-arcade";
const TUTORIAL = ".tutorial--overlay";
const ARCADE_UNIVERSE_MAP_HEADER = ".arcades-universe--map-header";
const SELECT_LANGUAGE = ".select.-view-outline.-size-24.-value";
const LANGUAGE_DROPWDOWN = ".select-menu";
const JS = "span=JavaScript (ES6)";
const IDE = ".CodeMirror";
const RUN_TETS_BUTTON = "span=Run tests";

function checkGrowlMessage(growl_message: string) {
    browser.waitUntil(function () {
        let growl = browser.getText(".growl-notification--content-title");
        return growl.indexOf(growl_message) !== -1;
    });
}

function waitForExistAndClick(selector: string) {
    browser.waitForExist(selector);
    browser.leftClick(selector);
}

function clearElementAndAddValue(selector, value) {
    browser.clearElement(selector);
    browser.addValue(selector, value);
}

function executeScript(code) {
    browser.execute(function (IDEselector, value) {
        var elem = document.querySelector(IDEselector);
        if (elem) {
            elem.CodeMirror.setValue(value);
        }
    }, IDE, code);
    waitForExistAndClick(RUN_TETS_BUTTON);
}

describe("SIGNUP", function () {

    it("should redirect to signup page", function () {

        browser.url("/");
        waitForExistAndClick(SIGNUP_BUTTON);
        browser.waitUntil(function () {
            return browser.getUrl().match(/signup$/i);
        });
    });

    it("should click on signup button without any given data", function () {
        waitForExistAndClick(".coder-signup--button");
        checkGrowlMessage("Email can't be empty");
    });
    it("should fill in email field and click", function () {
        browser.addValue("[name = 'email']", "something");
        waitForExistAndClick(".coder-signup--button");
        checkGrowlMessage("Full name can't be empty");
    });
    it("should fill in fullName field and click", function () {
        browser.addValue("[name = 'fullName']", "something");
        waitForExistAndClick(".coder-signup--button");
        checkGrowlMessage("Password can't be empty");
    });
    it("should fill in password field and click", function () {
        browser.addValue("[name = 'password']", "something");
        waitForExistAndClick(".coder-signup--button");
        checkGrowlMessage("You must accept the Privacy Policy and Terms of Use to complete signup");
    });
    it("should click on privacy and terms checkbox and click", function () {
        waitForExistAndClick(".privacy-and-terms--checkbox");
        waitForExistAndClick(".coder-signup--button");
        checkGrowlMessage("Invalid email address");
    });
    it("should delete previous email data and not allow signup with existing email", function () {
        clearElementAndAddValue("[name = 'email']", "kant@example.com");
        waitForExistAndClick(".coder-signup--button");
        checkGrowlMessage("Sign in with your password, or click \"Forgot Password\" if you don't remember it.");
    });
    it("should signup successfully", function () {
        browser.pause(3000);
        clearElementAndAddValue("[name = 'email']", NEW_USER);
        clearElementAndAddValue("[name = 'fullName']", "New User");
        waitForExistAndClick(".coder-signup--button");
        browser.waitUntil(function () {
            return browser.getUrl().match("/");
        });

    });
    it("should see welcome modal and choose option", function () {
        waitForExistAndClick(LETS_GO_BUTTON);
    });
    it("should skip tutorial and logout", function () {
        waitForExistAndClick(SKIP_TUTORIAL);
        waitForExistAndClick(CONFIRM_SKIP_MODAL);
        waitForExistAndClick(CODER_SETTINGS_ICON);
        browser.pause(1000);
        waitForExistAndClick(CODER_LOGOUT_BUTTON);
        browser.waitUntil(function () {
            return browser.getUrl().match("/login");
        });
    });
    it("should signup with another new user and do not skip tutorial", function () {
        waitForExistAndClick(CODER_SIGNUP_HERE);
        clearElementAndAddValue("[name = 'email']", ANOTHER_NEW_USER);
        clearElementAndAddValue("[name = 'fullName']", "Another New User");
        clearElementAndAddValue("[name = 'password']", "something");
        waitForExistAndClick(".privacy-and-terms--checkbox");
        waitForExistAndClick(".coder-signup--button");
        browser.waitUntil(function () {
            return browser.getUrl().match("/");
        });
        waitForExistAndClick(LETS_GO_BUTTON);
        waitForExistAndClick(ARCADE_CARD);
        browser.waitUntil(function () {
            return browser.isVisible(TUTORIAL);
        });

        waitForExistAndClick(ARCADE_UNIVERSE_MAP_HEADER);

        browser.waitUntil(function () {
            return browser.getUrl().match("^https://codesignalonstagingci.codesignal.com/arcade/intro/level-1");
        });

        waitForExistAndClick(SELECT_LANGUAGE);
        browser.waitForExist(LANGUAGE_DROPWDOWN);
        waitForExistAndClick(JS);
        browser.pause(1000);

        waitForExistAndClick(SELECT_LANGUAGE);
        browser.waitForExist(LANGUAGE_DROPWDOWN);
        waitForExistAndClick(JS);
        browser.pause(1000);


        waitForExistAndClick(IDE);
        browser.pause(2000);


       executeScript("function add(param1, param2) {\n" +
           "return param1+param2;\n" +
           "}\n");
        browser.pause(3000);
    });

});

