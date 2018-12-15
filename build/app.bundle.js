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
/******/ 	return __webpack_require__(__webpack_require__.s = "./signup-io.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./signup-io.js":
/*!**********************!*\
  !*** ./signup-io.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

var LETS_GO_BTN = ".modal--container .button--content";
var TUT_MSG_SKIP = ".tutorial--message-skip";
var CONFIRM_BUTTON = "div=Confirm";
var NEW_CODER_USER = new Date().getTime() + "@example.com";
var SIGNUP_BUTTON = ".button--content.-layout-h.-center-center.-space-h-4";
var TUTORIAL_MSG = ".tutorial--message";
var ARCADE_CARD = ".-arcade";
var ARCADE_UNIVERSE_CARD = ".arcades-universe--map .card";
/** Functions */

function checkSignupPageRedir() {
  browser.waitUntil(function () {
    return browser.getUrl().match(/signup$/i);
  }, undefined, "Expected to be redirected to signup page after button signupClickAndGrowl");
}

function signupClickAndGrowl(growl_text) {
  browser.leftClick(".coder-signup--button");
  browser.waitUntil(function () {
    browser.pause(1000);
    var growl = browser.getText(".growl-notification--content-title");
    return growl.indexOf(growl_text) !== -1;
  });
}

function logOut() {
  browser.waitForExist(".avatar--image");
  browser.leftClick(".avatar--image");
  browser.pause(1000);
  browser.waitForExist("span.logout");
  browser.leftClick("span.logout");
  browser.waitUntil(function () {
    return browser.getUrl().indexOf("https://codesignalonstagingci.codesignal.com/login") !== -1;
  }, undefined, "Expected to be redirected to login after logging out");
}

function successfullSignup() {
  clearAndAddValue("[name = 'email']", NEW_CODER_USER);
  clearAndAddValue("[name = 'fullName']", "Ogta Ter2");
  clearAndAddValue("[name = 'password']", "something");
  browser.leftClick(".coder-signup--button");
  browser.waitUntil(function () {
    return browser.getUrl().match("https://codesignalonstagingci.codesignal.com");
  });
}

function clearAndAddValue(selector, value) {
  browser.clearElement(selector);
  browser.addValue(selector, value);
}

function waitAndClick(selector) {
  browser.waitForExist(selector);
  browser.leftClick(selector);
}
/** Opening login page */


browser.url("/");
describe("Go to signup page", function () {
  it("should redirect to signup page", function () {
    browser.waitForExist(SIGNUP_BUTTON);
    browser.leftClick(SIGNUP_BUTTON);
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
    browser.waitUntil(function () {
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
  it("should ", function () {});
});

/***/ })

/******/ });
//# sourceMappingURL=app.bundle.js.map