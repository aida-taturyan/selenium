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
/******/ 	return __webpack_require__(__webpack_require__.s = "./Row_Tests/ROW_signup.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Row_Tests/ROW_signup.js":
/*!*********************************!*\
  !*** ./Row_Tests/ROW_signup.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var NEW_USER = new Date().getTime() + "@example.com";
var ANOTHER_NEW_USER = new Date().getTime() + "@test.test";
var SIGNUP_BUTTON = ".button--content.-layout-h.-center-center.-space-h-4";
var LETS_GO_BUTTON = "div=Let's go!";
var SKIP_TUTORIAL = ".tutorial--message-skip .icon";
var CONFIRM_SKIP_MODAL = "div=Confirm";
var CODER_SETTINGS_ICON = ".block.header-nav--settings-icon";
var CODER_LOGOUT_BUTTON = ".logout.-clickable";
var CODER_SIGNUP_HERE = "div=Sign up here!";
var ARCADE_CARD = ".home-card.-arcade";
var TUTORIAL = ".tutorial--overlay";
var ARCADE_UNIVERSE_MAP_HEADER = ".arcades-universe--map-header";
var SELECT_LANGUAGE = ".select.-view-outline.-size-24.-value";
var LANGUAGE_DROPWDOWN = ".select-menu";
var JS = "span=JavaScript (ES6)";
var IDE = ".CodeMirror";
var RUN_TETS_BUTTON = "span=Run tests";

function checkGrowlMessage(growl_message) {
  browser.waitUntil(function () {
    var growl = browser.getText(".growl-notification--content-title");
    return growl.indexOf(growl_message) !== -1;
  });
}

function waitForExistAndClick(selector) {
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
    executeScript("function add(param1, param2) {\n" + "return param1+param2;\n" + "}\n");
    browser.pause(3000);
  });
});

/***/ })

/******/ });
//# sourceMappingURL=signup.js.map