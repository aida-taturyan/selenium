/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./Row_Tests/ROW_login_coder_page_new.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Row_Tests/ROW_login_coder_page_new.js":
/*!***********************************************!*\
  !*** ./Row_Tests/ROW_login_coder_page_new.js ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../credentials */ "./credentials.js");

var coder = {
  loginBtn: ".coder-login--button",
  logoutBtn: ".logout.-clickable",
  settingsIcon: ".block.header-nav--settings-icon",
  homepage: /^https:\/\/codesignalonstagingci\.codesignal\.com\/?$/,
  values: {
    valid: {
      username: Object(_credentials__WEBPACK_IMPORTED_MODULE_0__["getEmail"])("adia"),
      password: Object(_credentials__WEBPACK_IMPORTED_MODULE_0__["getPassword"])("adia")
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
      username: Object(_credentials__WEBPACK_IMPORTED_MODULE_0__["getEmail"])("client123"),
      password: Object(_credentials__WEBPACK_IMPORTED_MODULE_0__["getPassword"])("client123")
    }
  }
};
/** TODO create object for actions */

var USERNAME_INPUT = "[name = 'username']";
var PASSWORD_INPUT = "[name = 'password']";
/**
 * checkGrowlMessage
 *
 * @param {string} growl_message : message to be checked in growl popup box
 * @return {void}*/

function checkGrowlMessage(growl_message) {
  /** TODO replace leftClick to waitForButtonAndClick*/
  browser.leftClick(coder.loginBtn);
  browser.pause(1000); // waiting for animation

  browser.waitUntil(function () {
    var growl = browser.getText(".growl-notification--content-title");
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


function clearAndAddValue(inputSelector, value) {
  browser.clearElement(inputSelector);
  browser.addValue(inputSelector, value);
}
/**
 * waitForButtonAndClick
 * Waits for button to be visible and left-clicks on it
 * @param {string} buttonSelector : css selector for button
 * @return {void}
 * */


function waitForButtonAndClick(buttonSelector) {
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

/***/ }),

/***/ "./credentials.js":
/*!************************!*\
  !*** ./credentials.js ***!
  \************************/
/*! exports provided: getEmail, getPassword */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEmail", function() { return getEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPassword", function() { return getPassword; });
var USER_CREDENTIALS = {
  armistice: {
    email: "armistice.peacemaker@codesignal.com",
    password: "food=love"
  },
  gimli: {
    email: "gimli.gloinovich@erebor.gov",
    password: "n3v3r.trust.4n.3lf"
  },
  adia: {
    email: "adia",
    password: "tatutatu1"
  },
  client123: {
    email: "client123",
    password: "123456"
  }
};
function getEmail(username) {
  return USER_CREDENTIALS[username] && USER_CREDENTIALS[username].email || "";
}
function getPassword(username) {
  return USER_CREDENTIALS[username] && USER_CREDENTIALS[username].password || "";
}

/***/ })

/******/ });
//# sourceMappingURL=login_coder_page.js.map