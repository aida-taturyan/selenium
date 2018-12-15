// @flow

import {getPassword, getEmail} from "../credentials";


var coder = {
    loginBtn: ".coder-login--button",
    logoutBtn: ".logout.-clickable",
    settingsIcon: ".block.header-nav--settings-icon",
    homepage: /^https:\/\/codesignalonstagingci\.codesignal\.com\/?$/,
    values: {
        valid: {
            username: getEmail("adia"),
            password: getPassword("adia")
        },
        invalid: {
            username: "invalidusername",
            password: "something"
        }
    }
};
var client = {
    loginBtn: ".coder-login--button",
    logoutBtn: "a=Sign Out",
    settingsIcon: ".header-nav--settings-icon",
    values: {
        valid: {
            username: getEmail("client123"),
            password: getPassword("client123")
        }
    }
};

/** TODO create object for actions */

const USERNAME_INPUT = "[name = 'username']";
const PASSWORD_INPUT = "[name = 'password']";

/**
 * checkGrowlMessage
 *
 * @param {string} growl_message : message to be checked in growl popup box
 * @return {void}*/
function checkGrowlMessage(growl_message: string) {
    /** TODO replace leftClick to waitForButtonAndClick*/
    browser.leftClick(coder.loginBtn);
    browser.pause(1000); // waiting for animation
    browser.waitUntil(function () {
        let growl = browser.getText(".growl-notification--content-title");
        return growl.indexOf(growl_message) !== -1;
    });
}

/**
 * clearAndAddValue
 * Clears input field, and adds new value
 * @param {string} inputSelector : css selector for input
 * @param {string} value : value to be added
 * @return {void}
 * */
function clearAndAddValue(inputSelector: string, value: string) {
    browser.clearElement(inputSelector);
    browser.addValue(inputSelector, value);
}

/**
 * waitForButtonAndClick
 * Waits for button to be visible and left-clicks on it
 * @param {string} buttonSelector : css selector for button
 * @return {void}
 * */
function waitForButtonAndClick(buttonSelector: string) {
    browser.waitForExist(buttonSelector);
    browser.leftClick(buttonSelector);
}

describe("CODER LOGIN AND LOGOUT FROM CODER PAGE", function () {

    it("should open login page and click on signin button without any given data", function () {
        browser.url("login");
        browser.waitForExist(coder.loginBtn);
        checkGrowlMessage("Username/Email can't be empty");
    });

    it("should fill in only username", function () {
        browser.addValue(USERNAME_INPUT, coder.values.invalid.username);
        checkGrowlMessage("Password can't be empty");
    });

    it("should fill in invalid username and invalid password", function () {
        clearAndAddValue(USERNAME_INPUT, coder.values.invalid.username);
        clearAndAddValue(PASSWORD_INPUT, coder.values.invalid.password);
        checkGrowlMessage("Sign-in failed"); //user not found
    });

    it("should fill in valid username and invalid password", function () {
        clearAndAddValue(USERNAME_INPUT, coder.values.valid.username);
        clearAndAddValue(PASSWORD_INPUT, coder.values.invalid.password);
        checkGrowlMessage("Sign-in failed"); //incorrect password
    });

    it("should login with valid username and valid password", function () {
        clearAndAddValue(USERNAME_INPUT, coder.values.valid.username);
        clearAndAddValue(PASSWORD_INPUT, coder.values.valid.password);
        waitForButtonAndClick(coder.loginBtn);
        browser.waitUntil(function () {
            return browser.getUrl().match("/");
        });
    });

    it("should logout from the site", function () {
        waitForButtonAndClick(coder.settingsIcon);
        browser.pause(1000); // waiting for dropdown animation
        waitForButtonAndClick(coder.logoutBtn);
        browser.waitUntil(function () {
            return browser.getUrl().match("/login");
        });
    });

});

describe("CLIENT LOGIN AND LOGOUT FROM CODER PAGE", function () {
    it("should login with client credentials from coder page and redirect to client dashboard", function () {
        clearAndAddValue(USERNAME_INPUT, client.values.valid.username);
        clearAndAddValue(PASSWORD_INPUT, client.values.valid.password);
        browser.leftClick(client.loginBtn);
        browser.waitUntil(function () {
            return browser.getUrl().match("/client-dashboard");
        });
    });

    it("should logout from the client dashboard", function () {
        waitForButtonAndClick(client.settingsIcon);
        browser.pause(1000); // wait for dropdown animation
        browser.leftClick(client.logoutBtn);
        browser.waitUntil(function () {
            return browser.getUrl().match("/recruiter/login");
        });
    });
});

afterEach(function () {
    browser.pause(2000);
});
