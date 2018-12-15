// @flow

const LETS_GO_BTN: string = ".modal--container .button--content";
const TUT_MSG_SKIP: string = ".tutorial--message-skip";
const CONFIRM_BUTTON: string = "div=Confirm";
const NEW_CODER_USER: string = new Date().getTime() + "@example.com";
const SIGNUP_BUTTON: string = ".button--content.-layout-h.-center-center.-space-h-4";
const TUTORIAL_MSG: string = ".tutorial--message";
const ARCADE_CARD: string = ".-arcade";
const ARCADE_UNIVERSE_CARD: string = ".arcades-universe--map .card";

/** Functions */

function checkSignupPageRedir() {
    browser.waitUntil(function (): boolean {
            return browser.getUrl().match(/signup$/i);
        },
        undefined,
        "Expected to be redirected to signup page after button signupClickAndGrowl");
}

function signupClickAndGrowl(growl_text: string) {
    browser.leftClick(".coder-signup--button");
    browser.waitUntil(function (): boolean {
        browser.pause(1000);
        let growl = browser.getText(".growl-notification--content-title");
        return growl.indexOf(growl_text) !== -1;
    });
}

function logOut() {
    browser.waitForExist(".avatar--image");
    browser.leftClick(".avatar--image");
    browser.pause(1000);
    browser.waitForExist("span.logout");
    browser.leftClick("span.logout");
    browser.waitUntil(function (): boolean {
            return browser.getUrl().indexOf("https://codesignalonstagingci.codesignal.com/login") !== -1;
        },
        undefined,
        "Expected to be redirected to login after logging out");
}

function successfullSignup() {
    clearAndAddValue("[name = 'email']", NEW_CODER_USER);
    clearAndAddValue("[name = 'fullName']", "Ogta Ter2");
    clearAndAddValue("[name = 'password']", "something");
    browser.leftClick(".coder-signup--button");
    browser.waitUntil(function (): Array<string> | null {
        return browser.getUrl().match("https://codesignalonstagingci.codesignal.com");
    });
}

function clearAndAddValue(selector: string, value: string) {
    browser.clearElement(selector);
    browser.addValue(selector, value);
}

function waitAndClick(selector: string) {
    browser.waitForExist(selector);
    browser.leftClick(selector);
}

/** Opening login page */
browser.url("/");

describe("Go to signup page", function () {
    it("should redirect to signup page", function () {
        waitAndClick(SIGNUP_BUTTON);
        checkSignupPageRedir();
    });
});

describe("Check validation", function () {
    it("should click for the first time", function () {
        signupClickAndGrowl("Email can't be empty");
    });
    it("should fill email field and click", function () {
        browser.addValue("[name = 'email']", "something");
        signupClickAndGrowl("Full name can't be empty");
    });
    it("should fill fullName field and click", function () {
        browser.addValue("[name = 'fullName']", "something");
        signupClickAndGrowl("Password can't be empty");
    });
    it("should fill password field and click", function () {
        browser.addValue("[name = 'password']", "something");
        signupClickAndGrowl("You must accept the Privacy Policy and Terms of Use to complete signup");
    });
    it("should click on checkbox and click", function () {
        browser.leftClick(".privacy-and-terms--checkbox");
        signupClickAndGrowl("Invalid email address");
    });
    it("should delete previous data and not allow signup with existing email", function () {
        browser.clearElement("[name = 'email']");
        browser.addValue("[name = 'email']", "kant@example.com");
        signupClickAndGrowl("Sign in with your password, or click \"Forgot Password\" if you don't remember it.");
    });
    it("should signup successfully", function () {
        successfullSignup();
    });
    afterEach(function () {
        browser.pause(2000);
    });
});

describe("Skip tutorial after signup", function () {
    it("should skip tutorial", function () {
        waitAndClick(LETS_GO_BTN);
        browser.pause(3000);
        waitAndClick(TUT_MSG_SKIP);
        browser.pause(2000);
        waitAndClick(CONFIRM_BUTTON);
        browser.pause(2000);
        browser.waitUntil(function (): boolean {
            return !browser.isVisible(TUT_MSG_SKIP);
        });
    });
    it("should logout from site", function () {
        logOut();
    });
    afterEach(function () {
        browser.pause(2000);
    });
});

describe("Signup with tutorial", function () {
    it("should successfully signup", function () {
        successfullSignup();
    });
    it("should ", function () {

    });
});