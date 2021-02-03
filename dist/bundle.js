var AceCustomizer =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Scripts/ButtonSetup.js":
/*!********************************!*\
  !*** ./Scripts/ButtonSetup.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * Takes a configuration (array of objects),\n * Assigns click event listeners to the button, to toggle the modal element\n * buttonListenerConfigs:\n * [\n\t\t{\n\t\t\tbuttonId: \"uniqueElementId\",\n\t\t\tmodalId: \"uniqueElementId\",\n\t\t},\n\t]\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = ((function () {\n  function ButtonSetup(buttonListenerConfigs) {\n    // TODO: Introduce better error handling on config argument type checking\n    if (!Array.isArray(buttonListenerConfigs)) {\n      throw new Error(\"buttonListenerConfigs must be of type: Array \");\n    }\n\n    var _this = this;\n\n    _this.buttonListenerConfigs = buttonListenerConfigs;\n    methods.addListeners(_this.buttonListenerConfigs); //   _this.sayHello = () => {\n    //     console.log(\"Hello World\");\n    //   };\n  }\n\n  var methods = {\n    addListeners: function addListeners(buttonListenerConfigs) {\n      buttonListenerConfigs.forEach(function (config) {\n        var button = document.getElementById(config.buttonId);\n        var modal = document.getElementById(config.modalId);\n        button.addEventListener(\"click\", function () {\n          if (modal.style.display == \"block\") {\n            modal.style.display = \"none\";\n          } else {\n            modal.style.display = \"block\";\n          }\n        });\n      });\n    }\n  };\n  return ButtonSetup;\n})());\n\n//# sourceURL=webpack://AceCustomizer/./Scripts/ButtonSetup.js?");

/***/ }),

/***/ "./areas/modal-initiator/ModalInitiater.js":
/*!*************************************************!*\
  !*** ./areas/modal-initiator/ModalInitiater.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ((function () {\n  // Contructor\n  function ModalInitiater(configuration) {\n    var _this = this;\n\n    _this.guideHtml = configuration.guideHtml;\n    _this.callback = configuration.callback;\n    _this.guideContentSectionId = configuration.guideContentSectionId;\n    _this.modalCloseButtonId = configuration.modalCloseButtonId;\n    _this.modalElementId = configuration.modalElementId;\n\n    if (_this.modalCloseButtonId && _this.modalElementId) {\n      methods.addHtmlToElement(_this.guideHtml, _this.guideContentSectionId);\n      methods.addCloseBtnListener(_this.modalCloseButtonId, _this.modalElementId);\n\n      if (_this.callback) {\n        _this.callback();\n      }\n    } else {\n      throw new Error(\"Configuration is not correct!\");\n    }\n  } // Private func/vars\n\n\n  var methods = {\n    addCloseBtnListener: function addCloseBtnListener(modalCloseButtonId, modalElementId) {\n      if (modalCloseButtonId && modalElementId) {\n        document.querySelector(\"#\".concat(modalCloseButtonId)).addEventListener(\"click\", function () {\n          var modal = document.querySelector(\"#\".concat(modalElementId));\n          modal.style.display = \"none\";\n        });\n      } else {\n        throw new Error(\"modalCloseButtonId or modalElementId not present in configuration\");\n      }\n    },\n    addHtmlToElement: function addHtmlToElement(guideHtml, guideContentSectionId) {\n      if (guideContentSectionId && guideHtml) {\n        var div = document.createElement(\"DIV\");\n        div.innerHTML = guideHtml;\n        var section = document.querySelector(\"#\".concat(guideContentSectionId));\n        section.appendChild(div);\n      } else {\n        throw new Error(\"GuideContentSectionId or guideHtml is not present in configuration\");\n      }\n    }\n  };\n  return ModalInitiater;\n})()); // module.exports = {\n//   ModalInitiater\n// };\n\n//# sourceURL=webpack://AceCustomizer/./areas/modal-initiator/ModalInitiater.js?");

/***/ }),

/***/ "./areas/newspage/Constants/ErrorMessages.ts":
/*!***************************************************!*\
  !*** ./areas/newspage/Constants/ErrorMessages.ts ***!
  \***************************************************/
/*! exports provided: ErrorMessages */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ErrorMessages\", function() { return ErrorMessages; });\nvar ErrorMessages = /** @class */ (function () {\n    function ErrorMessages() {\n    }\n    ErrorMessages.developerModeIsOn = \"Developer mode is ON. Remember to turn off developer mode before deploying to production!\";\n    ErrorMessages.missingConfigurationFile = \"There is no configuration\";\n    ErrorMessages.couldNotFindTableId = \"No table with the provided id exists\";\n    ErrorMessages.NOT_ARRAY_OR_EMPTY = \"The argument is either not an Array or does not contain any data\";\n    ErrorMessages.COULD_NOT_UPDATE_DOM = \"Target element with the provided id does not exist\";\n    return ErrorMessages;\n}());\n\n\n\n//# sourceURL=webpack://AceCustomizer/./areas/newspage/Constants/ErrorMessages.ts?");

/***/ }),

/***/ "./areas/newspage/Constants/NewsItemClassNames.ts":
/*!********************************************************!*\
  !*** ./areas/newspage/Constants/NewsItemClassNames.ts ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar NewsItemClassNames = /** @class */ (function () {\n    function NewsItemClassNames() {\n    }\n    NewsItemClassNames.wrapper = \"newsblock-01-wrapper\";\n    NewsItemClassNames.header = \"newsblock-01-header\";\n    NewsItemClassNames.logoWrapper = \"newsblock-01-logo\";\n    NewsItemClassNames.svg = \"newsblock-01-svg\";\n    NewsItemClassNames.authorAndDateWrapper = \"newsblock-01-infos\";\n    NewsItemClassNames.author = \"newsblock-01-headline news-headline pebble-purple\";\n    NewsItemClassNames.date = \"newsblock-01-date\";\n    NewsItemClassNames.newsContentWrapper = \"newsblock-01-content\";\n    NewsItemClassNames.newsContentHeadline = \"newsblock-content-headline\";\n    NewsItemClassNames.newsContentBody = \"newsblock-content-p\";\n    NewsItemClassNames.newsContentLinks = \"newsblock-01-refs\";\n    NewsItemClassNames.newsContentPhotos = \"newsblock-01-photos\";\n    return NewsItemClassNames;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (NewsItemClassNames);\n\n\n//# sourceURL=webpack://AceCustomizer/./areas/newspage/Constants/NewsItemClassNames.ts?");

/***/ }),

/***/ "./areas/newspage/Constants/Strings.ts":
/*!*********************************************!*\
  !*** ./areas/newspage/Constants/Strings.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar Strings = /** @class */ (function () {\n    function Strings() {\n    }\n    Strings.NEWS_FROM_TODAY_TEXT = \"Nyhed fra i dag\";\n    Strings.DEFAULT_AUTHOR = \"SU Teamet\";\n    return Strings;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (Strings);\n\n\n//# sourceURL=webpack://AceCustomizer/./areas/newspage/Constants/Strings.ts?");

/***/ }),

/***/ "./areas/newspage/Constants/TableKeys.ts":
/*!***********************************************!*\
  !*** ./areas/newspage/Constants/TableKeys.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar TableKeys = /** @class */ (function () {\n    function TableKeys() {\n    }\n    TableKeys.DAY = \"dag\";\n    TableKeys.MONTH = \"måned\";\n    TableKeys.YEAR = \"år\";\n    TableKeys.DATE_STRING = \"danishDateText\";\n    TableKeys.AUTHOR = \"afsender\";\n    TableKeys.HEADLINE = \"overskrift\";\n    TableKeys.CONTENT_TEXT = \"tekst\";\n    TableKeys.IMG = \"billede\";\n    TableKeys.HREF = \"link\";\n    TableKeys.ID = \"id\";\n    return TableKeys;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (TableKeys);\n\n\n//# sourceURL=webpack://AceCustomizer/./areas/newspage/Constants/TableKeys.ts?");

/***/ }),

/***/ "./areas/newspage/TemplateEngine/BaseTemplateElement.ts":
/*!**************************************************************!*\
  !*** ./areas/newspage/TemplateEngine/BaseTemplateElement.ts ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar BaseTemplateElement = /** @class */ (function () {\n    function BaseTemplateElement(template, data) {\n        this.template = template;\n        data.id ? (this.id = data.id) : null;\n    }\n    BaseTemplateElement.prototype.returnElement = function () {\n        var element = document.createElement(\"DIV\");\n        this.id ? (element.id = this.id) : null;\n        element.innerHTML = this.template;\n        return element;\n    };\n    return BaseTemplateElement;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (BaseTemplateElement);\n\n\n//# sourceURL=webpack://AceCustomizer/./areas/newspage/TemplateEngine/BaseTemplateElement.ts?");

/***/ }),

/***/ "./areas/newspage/TemplateEngine/createNewsItemTemplate.ts":
/*!*****************************************************************!*\
  !*** ./areas/newspage/TemplateEngine/createNewsItemTemplate.ts ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return createNewsItemTemplate; });\n/* harmony import */ var _Constants_NewsItemClassNames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Constants/NewsItemClassNames */ \"./areas/newspage/Constants/NewsItemClassNames.ts\");\n\n// TODO: Refractor how photos are handled to become conditionally\n// TODO: Refractor how links are handled to become conditionally,\n// ..and links should be rendered as buttons\n/**\n *\n * @param data data object for merging into template queryString\n * @returns a queryString template that can set to an Element's innerHTML.\n */\nfunction createNewsItemTemplate(data) {\n    var template = \"\\n    <div class=\\\"\" + _Constants_NewsItemClassNames__WEBPACK_IMPORTED_MODULE_0__[\"default\"].wrapper + \"\\\">\\n        <section class=\\\"\" + _Constants_NewsItemClassNames__WEBPACK_IMPORTED_MODULE_0__[\"default\"].header + \"\\\">\\n            <div class=\\\"\" + _Constants_NewsItemClassNames__WEBPACK_IMPORTED_MODULE_0__[\"default\"].logoWrapper + \"\\\">\\n                <svg class=\\\"\" + _Constants_NewsItemClassNames__WEBPACK_IMPORTED_MODULE_0__[\"default\"].svg + \"\\\">\\n                    <use href=\\\"#_teliaPebbleIcon26\\\"></use>\\n                </svg>\\n            </div>\\n            <div class=\\\"\" + _Constants_NewsItemClassNames__WEBPACK_IMPORTED_MODULE_0__[\"default\"].authorAndDateWrapper + \"\\\">\\n                <h2 class=\\\"\" + _Constants_NewsItemClassNames__WEBPACK_IMPORTED_MODULE_0__[\"default\"].author + \"\\\">\" + data.author + \"</h2>\\n                <h3 class=\\\"\" + _Constants_NewsItemClassNames__WEBPACK_IMPORTED_MODULE_0__[\"default\"].date + \"\\\">\" + data.date + \"</h3>\\n            </div>\\n        </section>\\n        <section class=\\\"\" + _Constants_NewsItemClassNames__WEBPACK_IMPORTED_MODULE_0__[\"default\"].newsContentWrapper + \"\\\">\\n            <h3 class=\\\"\" + _Constants_NewsItemClassNames__WEBPACK_IMPORTED_MODULE_0__[\"default\"].newsContentHeadline + \"\\\">\" + data.headline + \"</h3>\\n            <section class=\\\"\" + _Constants_NewsItemClassNames__WEBPACK_IMPORTED_MODULE_0__[\"default\"].newsContentBody + \"\\\">\" + data.body + \"</section>\\n        </section>\\n        <section class=\\\"\" + _Constants_NewsItemClassNames__WEBPACK_IMPORTED_MODULE_0__[\"default\"].newsContentPhotos + \"\\\">\\n            \" + data.photos + \"\\n        </section>\\n        <section class=\\\"\" + _Constants_NewsItemClassNames__WEBPACK_IMPORTED_MODULE_0__[\"default\"].newsContentLinks + \"\\\">\\n            \" + data.links + \"\\n        </section>\\n    </div>\\n    \";\n    return template;\n}\n\n\n//# sourceURL=webpack://AceCustomizer/./areas/newspage/TemplateEngine/createNewsItemTemplate.ts?");

/***/ }),

/***/ "./areas/newspage/functions/emptyValueRemover.ts":
/*!*******************************************************!*\
  !*** ./areas/newspage/functions/emptyValueRemover.ts ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return removeEmptyValues; });\n/**\n * REMOVE SPECIAL CHARS WHICH MEANS NOTHING IN HUMANY\n * @param {string} value The value which shall be checked for special Humany chars\n */\nfunction removeEmptyValues(value, keyName) {\n    if (value.includes(\"&nbsp;\")) {\n        // Replace rubbish\n        value = value.replace(/&nbsp;/g, \"\");\n    }\n    if (keyName == \"tekst\") {\n        return value;\n    }\n    if (value.includes(\"<p>\")) {\n        var replacement = value.replace(/<p>/g, \"\");\n        value = replacement.replace(/<\\/p>/g, \"\");\n    }\n    if (value.includes(\"<div>\")) {\n        var replacement = value.replace(/<div>/g, \"\");\n        value = replacement.replace(/<\\/div>/g, \"\");\n    }\n    if (value.includes(\"<br>\")) {\n        var replacement = value.replace(/<br>/g, \" \");\n        value = replacement.replace(/<\\/br>/g, \" \");\n    }\n    // Remove 0 if its the first char\n    if (value.slice(0, 1) == \"0\") {\n        var replacement = value.replace(/^0+/, \"\");\n        value = replacement;\n    }\n    return value;\n}\n\n\n//# sourceURL=webpack://AceCustomizer/./areas/newspage/functions/emptyValueRemover.ts?");

/***/ }),

/***/ "./areas/newspage/functions/isDateSame.ts":
/*!************************************************!*\
  !*** ./areas/newspage/functions/isDateSame.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return isDateSame; });\n/**\n *\n * @param {object} first First date object\n * @param {object} second Second date object\n * @returns {boolean} true if the first and second DATE are matching\n */\nfunction isDateSame(first, second) {\n    if (first.getFullYear() === second.getFullYear() &&\n        first.getMonth() === second.getMonth() &&\n        first.getDate() === second.getDate()) {\n        return true;\n    }\n    else {\n        return false;\n    }\n}\n\n\n//# sourceURL=webpack://AceCustomizer/./areas/newspage/functions/isDateSame.ts?");

/***/ }),

/***/ "./areas/newspage/functions/monthStringCleaner.ts":
/*!********************************************************!*\
  !*** ./areas/newspage/functions/monthStringCleaner.ts ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return cleanUpMonth; });\n// @ts-nocheck\n/**\n * MAKES SURE DATESTRING IS WRITTEN IN CORRECT DANISH TO THE USER\n * @param {string} month month which shall be translated to danish\n */\nfunction cleanUpMonth(month) {\n    var translatedMonth;\n    var danishMonthsNumbers = {\n        1: \"Januar\",\n        2: \"Februar\",\n        3: \"Marts\",\n        4: \"April\",\n        5: \"Maj\",\n        6: \"Juni\",\n        7: \"Juli\",\n        8: \"August\",\n        9: \"September\",\n        10: \"Oktober\",\n        11: \"November\",\n        12: \"December\",\n    };\n    var correctSpelledMonths = {\n        jan: \"Januar\",\n        feb: \"Februar\",\n        mar: \"Marts\",\n        apr: \"April\",\n        maj: \"Maj\",\n        may: \"Maj\",\n        jun: \"Juni\",\n        jul: \"Juli\",\n        aug: \"August\",\n        sept: \"September\",\n        okt: \"Oktober\",\n        oct: \"Oktober\",\n        nov: \"November\",\n        dec: \"December\",\n    };\n    Object.keys(correctSpelledMonths).forEach(function (key) {\n        if (month.toLowerCase().includes(key)) {\n            translatedMonth = correctSpelledMonths[key];\n        }\n    });\n    if (translatedMonth) {\n        return translatedMonth;\n    }\n    else {\n        return month;\n    }\n}\n\n\n//# sourceURL=webpack://AceCustomizer/./areas/newspage/functions/monthStringCleaner.ts?");

/***/ }),

/***/ "./areas/newspage/functions/monthTranslater.ts":
/*!*****************************************************!*\
  !*** ./areas/newspage/functions/monthTranslater.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return translateMonth; });\n// @ts-nocheck\n/**\n * TURNS DANISH DATE NAMES INTO ENGLISH\n * @param {string} month Danish month will shall be translated to english\n */\nfunction translateMonth(month) {\n    var monthInEnglish;\n    var months = {\n        jan: \"january\",\n        feb: \"february\",\n        mar: \"march\",\n        apr: \"april\",\n        maj: \"may\",\n        jun: \"june\",\n        jul: \"july\",\n        aug: \"august\",\n        sept: \"september\",\n        okt: \"october\",\n        nov: \"november\",\n        dec: \"december\",\n    };\n    var monthInNumbers = {\n        1: \"january\",\n        2: \"february\",\n        3: \"march\",\n        4: \"april\",\n        5: \"may\",\n        6: \"june\",\n        7: \"july\",\n        8: \"august\",\n        9: \"september\",\n        10: \"october\",\n        11: \"november\",\n        12: \"december\",\n    };\n    if (isNaN(month) == true) {\n        Object.keys(months).forEach(function (key) {\n            if (month.toLowerCase().includes(key)) {\n                monthInEnglish = months[key];\n            }\n            else if (month.toLowerCase().includes(months[key])) {\n                monthInEnglish = months[key];\n            }\n        });\n    }\n    if (!monthInEnglish) {\n        month = parseInt(month, 10);\n        Object.keys(monthInNumbers).forEach(function (key) {\n            if (month == key) {\n                monthInEnglish = monthInNumbers[key];\n            }\n        });\n    }\n    if (monthInEnglish) {\n        return monthInEnglish;\n    }\n    else {\n        return month;\n    }\n}\n;\n\n\n//# sourceURL=webpack://AceCustomizer/./areas/newspage/functions/monthTranslater.ts?");

/***/ }),

/***/ "./areas/newspage/functions/newsItemFragmentGenerator.ts":
/*!***************************************************************!*\
  !*** ./areas/newspage/functions/newsItemFragmentGenerator.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return newsItemFragmentGenerator; });\n/* harmony import */ var _newspage_TemplateEngine_createNewsItemTemplate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../newspage/TemplateEngine/createNewsItemTemplate */ \"./areas/newspage/TemplateEngine/createNewsItemTemplate.ts\");\n/* harmony import */ var _newspage_TemplateEngine_BaseTemplateElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../newspage/TemplateEngine/BaseTemplateElement */ \"./areas/newspage/TemplateEngine/BaseTemplateElement.ts\");\n/* harmony import */ var _Constants_TableKeys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Constants/TableKeys */ \"./areas/newspage/Constants/TableKeys.ts\");\n\n\n\nfunction newsItemFragmentGenerator(data) {\n    var fragment = document.createDocumentFragment();\n    // TODO: Get element id prefix from constant\n    data.forEach(function (object) {\n        var dataForTemplate = {\n            // TODO: Write a test for this, when id does not exist\n            author: object[_Constants_TableKeys__WEBPACK_IMPORTED_MODULE_2__[\"default\"].AUTHOR],\n            date: object[_Constants_TableKeys__WEBPACK_IMPORTED_MODULE_2__[\"default\"].DATE_STRING],\n            headline: object[_Constants_TableKeys__WEBPACK_IMPORTED_MODULE_2__[\"default\"].HEADLINE],\n            body: object[_Constants_TableKeys__WEBPACK_IMPORTED_MODULE_2__[\"default\"].CONTENT_TEXT],\n            photos: object[_Constants_TableKeys__WEBPACK_IMPORTED_MODULE_2__[\"default\"].IMG],\n            links: object[_Constants_TableKeys__WEBPACK_IMPORTED_MODULE_2__[\"default\"].HREF],\n            id: object[_Constants_TableKeys__WEBPACK_IMPORTED_MODULE_2__[\"default\"].ID],\n        };\n        var queryStringTemplate = Object(_newspage_TemplateEngine_createNewsItemTemplate__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(dataForTemplate);\n        var element = new _newspage_TemplateEngine_BaseTemplateElement__WEBPACK_IMPORTED_MODULE_1__[\"default\"](queryStringTemplate, dataForTemplate).returnElement();\n        fragment.appendChild(element);\n    });\n    return fragment;\n}\n\n\n//# sourceURL=webpack://AceCustomizer/./areas/newspage/functions/newsItemFragmentGenerator.ts?");

/***/ }),

/***/ "./areas/newspage/functions/provideIds.ts":
/*!************************************************!*\
  !*** ./areas/newspage/functions/provideIds.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return enrichWithIds; });\nfunction enrichWithIds(data) {\n    // TODO: Get prefix from constant\n    var prefix = \"newsArticle_\";\n    var number = 15931;\n    data.forEach(function (element) {\n        element.id = \"\" + prefix + number;\n        number++;\n    });\n    return data;\n}\n\n\n//# sourceURL=webpack://AceCustomizer/./areas/newspage/functions/provideIds.ts?");

/***/ }),

/***/ "./areas/newspage/functions/returnTableInBody.ts":
/*!*******************************************************!*\
  !*** ./areas/newspage/functions/returnTableInBody.ts ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return returnTableInBody; });\n// TODO: Make generic\nfunction returnTableInBody(htmlBody, tableElementId) {\n    var tableElement;\n    var div = document.createElement(\"DIV\");\n    div.innerHTML = htmlBody;\n    try {\n        tableElement = div.querySelector(\"#\" + tableElementId);\n    }\n    catch (err) {\n        console.log(err);\n    }\n    if (!tableElement) {\n        // TODO: Use error message from constants\n        console.warn(\"A table element with id: \" + tableElementId + \" could not be found. First found table element will be used instead.\");\n        tableElement = div.querySelector(\"table\");\n    }\n    return tableElement ? tableElement : null;\n}\n\n\n//# sourceURL=webpack://AceCustomizer/./areas/newspage/functions/returnTableInBody.ts?");

/***/ }),

/***/ "./areas/newspage/functions/tableDataTrimmer.ts":
/*!******************************************************!*\
  !*** ./areas/newspage/functions/tableDataTrimmer.ts ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return trimTableData; });\n/* harmony import */ var _monthTranslater__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./monthTranslater */ \"./areas/newspage/functions/monthTranslater.ts\");\n/* harmony import */ var _monthStringCleaner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./monthStringCleaner */ \"./areas/newspage/functions/monthStringCleaner.ts\");\n/* harmony import */ var _emptyValueRemover__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./emptyValueRemover */ \"./areas/newspage/functions/emptyValueRemover.ts\");\n/* harmony import */ var _Constants_TableKeys__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Constants/TableKeys */ \"./areas/newspage/Constants/TableKeys.ts\");\n/* harmony import */ var _isDateSame__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./isDateSame */ \"./areas/newspage/functions/isDateSame.ts\");\n/* harmony import */ var _Constants_Strings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Constants/Strings */ \"./areas/newspage/Constants/Strings.ts\");\n/* harmony import */ var _Constants_ErrorMessages__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Constants/ErrorMessages */ \"./areas/newspage/Constants/ErrorMessages.ts\");\n\n\n\n\n\n\n\n// TODO: Refractor this to not know about the data\nfunction trimTableData(tableData) {\n    if (!Array.isArray(tableData) || !tableData.length) {\n        throw new Error(_Constants_ErrorMessages__WEBPACK_IMPORTED_MODULE_6__[\"ErrorMessages\"].NOT_ARRAY_OR_EMPTY);\n    }\n    var _day = _Constants_TableKeys__WEBPACK_IMPORTED_MODULE_3__[\"default\"].DAY, _month = _Constants_TableKeys__WEBPACK_IMPORTED_MODULE_3__[\"default\"].MONTH, _year = _Constants_TableKeys__WEBPACK_IMPORTED_MODULE_3__[\"default\"].YEAR, _author = _Constants_TableKeys__WEBPACK_IMPORTED_MODULE_3__[\"default\"].AUTHOR;\n    // TODO: Introduce error handling when values are undefined\n    tableData.forEach(function (newsItem) {\n        // TODO: Should not trim id\n        // Clean all data and assign to itself\n        Object.entries(newsItem).forEach(function (entry) {\n            newsItem[entry[0]] = Object(_emptyValueRemover__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(entry[1], entry[0]).trim();\n        });\n        var day = newsItem[_day];\n        var monthInEnglish = Object(_monthTranslater__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(newsItem[_month]);\n        var year = newsItem[_year];\n        newsItem.date = new Date(monthInEnglish + \" \" + day + \", \" + year + \" 00:00:00\");\n        var today = new Date();\n        var todaysMonthString = Object(_monthTranslater__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(today.getMonth() + 1);\n        var todaysDate = new Date(todaysMonthString + \", \" + today.getDate() + \", \" + today.getFullYear() + \" 00:00:00\");\n        var monthInDanish = Object(_monthStringCleaner__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(monthInEnglish);\n        Object(_isDateSame__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(newsItem.date, todaysDate)\n            ? (newsItem.danishDateText = _Constants_Strings__WEBPACK_IMPORTED_MODULE_5__[\"default\"].NEWS_FROM_TODAY_TEXT)\n            : (newsItem.danishDateText = day + \". \" + monthInDanish + \" \" + year);\n        // TODO: Use constants for default author\n        if (!newsItem[_author]) {\n            newsItem[_author] = _Constants_Strings__WEBPACK_IMPORTED_MODULE_5__[\"default\"].NEWS_FROM_TODAY_TEXT;\n        }\n    });\n    return tableData;\n}\n\n\n//# sourceURL=webpack://AceCustomizer/./areas/newspage/functions/tableDataTrimmer.ts?");

/***/ }),

/***/ "./areas/newspage/index.ts":
/*!*********************************!*\
  !*** ./areas/newspage/index.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _services_GuideFetcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/GuideFetcher */ \"./services/GuideFetcher.ts\");\n/* harmony import */ var _services_HtmlTableParser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/HtmlTableParser */ \"./services/HtmlTableParser.ts\");\n/* harmony import */ var _newspage_functions_newsItemFragmentGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../newspage/functions/newsItemFragmentGenerator */ \"./areas/newspage/functions/newsItemFragmentGenerator.ts\");\n/* harmony import */ var _newspage_functions_returnTableInBody__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../newspage/functions/returnTableInBody */ \"./areas/newspage/functions/returnTableInBody.ts\");\n/* harmony import */ var _newspage_functions_tableDataTrimmer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../newspage/functions/tableDataTrimmer */ \"./areas/newspage/functions/tableDataTrimmer.ts\");\n/* harmony import */ var _Constants_ErrorMessages__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Constants/ErrorMessages */ \"./areas/newspage/Constants/ErrorMessages.ts\");\n/* harmony import */ var _functions_provideIds__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./functions/provideIds */ \"./areas/newspage/functions/provideIds.ts\");\n\n\n\n\n\n\n\nvar NewsPage = /** @class */ (function () {\n    /**\n     *\n     * @param newsPageConfig See the INewsPageConfig interface\n     * { segment: \"tjekit-all-brand\", guideIds: [32323, 23232, 1232131], tableElementId: \"_someId\" }\n     */\n    function NewsPage(newsPageConfig) {\n        if (!newsPageConfig) {\n            throw new Error(\"Configuration missing.\");\n        }\n        this.guideIds = newsPageConfig.guideIds;\n        this.tableElementId = newsPageConfig.tableElementId;\n        this.segment = newsPageConfig.segment;\n        this.handler = this.handler.bind(this);\n    }\n    NewsPage.prototype.init = function () {\n        var _this = this;\n        // Get the table data by using the fetcher module to fetch each guide\n        this.guideIds.forEach(function (id) {\n            var configuration = {\n                segment: _this.segment,\n                tableElementId: _this.tableElementId,\n                id: id,\n                callback: _this.handler,\n                mockRequestUrl: \"http://127.0.0.1:5500/\",\n            };\n            new _services_GuideFetcher__WEBPACK_IMPORTED_MODULE_0__[\"default\"](configuration).get();\n        });\n    };\n    NewsPage.prototype.handler = function (htmlBody) {\n        var table = Object(_newspage_functions_returnTableInBody__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(htmlBody, this.tableElementId);\n        // TODO: Use error message from constants\n        if (!table) {\n            throw new Error(\"Table of news was not found. Make sure the id of the element is correct.\");\n        }\n        var tableDataList = new _services_HtmlTableParser__WEBPACK_IMPORTED_MODULE_1__[\"default\"](table).tableDataToList();\n        var trimmedData = Object(_newspage_functions_tableDataTrimmer__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(tableDataList);\n        this.tableData = Object(_functions_provideIds__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(trimmedData);\n        console.log(this.tableData);\n        var newsFragment = Object(_newspage_functions_newsItemFragmentGenerator__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this.tableData);\n        this.updateDOM(newsFragment, \"body\");\n        // Need to display latest 10 results in the side nav\n        // Need to display all news in a container defined in the config, unless that a modal\n    };\n    NewsPage.prototype.updateDOM = function (fragment, targetId) {\n        var target = document.querySelector(\"#\" + targetId);\n        target\n            ? target.appendChild(fragment)\n            : console.error(\"updateDOM: \" + _Constants_ErrorMessages__WEBPACK_IMPORTED_MODULE_5__[\"ErrorMessages\"].COULD_NOT_UPDATE_DOM);\n    };\n    return NewsPage;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (NewsPage);\n\n\n//# sourceURL=webpack://AceCustomizer/./areas/newspage/index.ts?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./areas/newspage/scss/main.css":
/*!****************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./areas/newspage/scss/main.css ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_other_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./other.css */ \"./node_modules/css-loader/dist/cjs.js!./areas/newspage/scss/other.css\");\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_other_css__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n// Module\n___CSS_LOADER_EXPORT___.push([module.i, \"/* TODO: Use SASS */\\n\\n#HumanyCustom-latest-news {\\n    height: fit-content;\\n    margin: -4px -18px -4px -18px;\\n    border-width: 1px;\\n    padding: 6px 15px 7px;\\n}\\n\\n.custom-newspage-modal-content {\\n    position: relative;\\n    background-color: #fff;\\n    border: 1px solid #999;\\n    border: 1px solid rgba(0, 0, 0, .2);\\n    border-radius: 6px;\\n    -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, .5);\\n    box-shadow: 0 3px 9px rgba(0, 0, 0, .5);\\n    background-clip: padding-box;\\n    outline: 0;\\n    margin: 30px;\\n}\\n\\n.tsPebble {\\n    font-family: pebble, arial;\\n}\\n\\n.arial {\\n    font-family: arial;\\n}\\n\\n.tsPurple {\\n    color: #990ae3;\\n}\\n\\n.cmRed {\\n    color: #db1b35;\\n}\\n\\n.black {\\n    color: black;\\n}\\n\\n.black:hover {\\n    color: #990ae3;\\n}\\n\\n.spanBeforeIcon {\\n    margin-left: 3px;\\n}\\n\\n.newsCountBadge {\\n    position: relative;\\n    padding: 4px 8.5px;\\n    border-radius: 50%;\\n    background-color: #d31c34;\\n    /* background-image: linear-gradient(#db1b35, #b83a4b); */\\n    color: white;\\n    font-size: 14px;\\n}\\n\\n.iconToTextGap {\\n    margin-right: 8px;\\n    font-size: 18px;\\n}\\n\\n.custom-newspage-modal-header {\\n    padding: 15px;\\n    border-bottom: 1px solid #990AE2;\\n    min-height: 16.42857143px;\\n    background: #990AE2;\\n    color: white;\\n}\\n\\n.custom-newspage-modal-body {\\n    min-height: 200px;\\n    height: calc(100vh - 120px);\\n}\\n\\n.custom-newspage-modal-footer {\\n    margin-top: 15px;\\n    padding: 19px 20px 20px;\\n    text-align: right;\\n    border-top: 1px solid #e5e5e5;\\n}\\n\\n.custom-newspage-modal-wrapper {\\n    display: none;\\n    overflow: auto;\\n    overflow-y: scroll;\\n    position: fixed;\\n    top: 0;\\n    right: 0;\\n    bottom: 0;\\n    left: 0;\\n    z-index: 1050;\\n    -webkit-overflow-scrolling: touch;\\n    outline: 0;\\n}\\n\\n.custom-newspage-modal-backdrop {\\n    position: fixed;\\n    top: 0;\\n    right: 0;\\n    bottom: 0;\\n    left: 0;\\n    z-index: 1040;\\n    background-color: #000;\\n}\\n\\n.latestNewsItem {\\n    height: fit-content;\\n    display: flex;\\n    cursor: pointer;\\n    padding: 6px 0px 7px;\\n}\\n\\n.HumanyCustom-latest-news-header {\\n    margin-top: 14px;\\n}\\n\\n.HumanyCustom-latest-news-headline {\\n    margin: 0px 0px 8px 0px;\\n    font-size: 18px;\\n    font-weight: bold;\\n    font-family: pebble, arial;\\n}\\n\\n.humany-latest-news-counter {\\n    text-align: left;\\n    font-size: 14px;\\n    margin: 0px 0px 10px 0px;\\n    font-weight: 700;\\n}\\n\\n.latestNewsItem:hover {\\n    color: #990ae3;\\n}\\n\\n.latestNewsHeadline {\\n    width: 100%;\\n}\\n\\n.latestNewsDate {\\n    width: fit-content;\\n    white-space: nowrap;\\n    margin-left: 10px;\\n    font-size: 12px;\\n    font-weight: 700;\\n}\\n\\n.newsPage-wrapper {\\n    width: 100%;\\n    height: calc(100vh - 120px);\\n    border-bottom-left-radius: 6px;\\n    border-bottom-right-radius: 6px;\\n    overflow: hidden;\\n    background-position: center;\\n    background-size: cover;\\n}\\n\\n.newsSection-wrapper {\\n    width: calc(100% - 380px);\\n    float: left;\\n    height: calc(100vh - 120px);\\n    overflow: scroll;\\n    -ms-overflow-style: none;\\n}\\n\\n.news-selection-panel {\\n    margin: 18px 12px 0px 18px;\\n    width: 344px;\\n    height: 282px;\\n    float: left;\\n    border-style: solid;\\n    border-color: #E3E3E3;\\n    border-width: 0px;\\n    border-radius: 8px;\\n    background: #f2f2f2;\\n    box-shadow: 0px 2px 3px 1px rgba(0, 0, 0, 0.17);\\n}\\n\\n.news-selection-header {\\n    height: fit-content;\\n    margin: 16px 0px 16px 20px;\\n}\\n\\n.news-selection-subheader {\\n    height: fit-content;\\n    margin: 30px 0px 8px 20px;\\n}\\n\\n.news-selection-search {\\n    text-align: center;\\n    margin: 10px 0px 26px 0px;\\n}\\n\\n.news-selection-searchfield {\\n    width: calc(100% - 32px);\\n    font-size: 14px;\\n    border-width: thin;\\n    text-indent: 20px;\\n    padding-right: 45px;\\n}\\n\\n.news-search-dropdown {\\n    display: block;\\n    background-color: #f4f4f4;\\n    width: calc(344px - 32px);\\n    box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.274);\\n    z-index: 9999;\\n    font-size: 14px;\\n    margin: 5px 16px 0px 16px;\\n    border-radius: 20px;\\n    text-align: left;\\n    padding-left: 20px;\\n    font-family: arial;\\n    position: relative;\\n    top: -17px;\\n    max-height: 435px;\\n    overflow: scroll;\\n    -ms-overflow-style: -ms-autohiding-scrollbar;\\n}\\n\\n.news-search-result {\\n    border-radius: 20px;\\n    height: fit-content;\\n    font-size: 14px;\\n    padding: 5px 0px 5px 0px;\\n}\\n\\n.news-search-noresult {\\n    border-radius: 20px;\\n    height: fit-content;\\n    font-size: 14px;\\n    padding: 5px 0px 5px 0px;\\n    cursor: default;\\n}\\n\\n.news-search-result-date {\\n    margin: 0px;\\n    font-size: 12px;\\n    color: grey;\\n}\\n\\n.news-search-result:hover {\\n    color: #990ae3;\\n    cursor: pointer;\\n}\\n\\n/* General humany search field styling */\\n.humany-search-style {\\n    height: 35px;\\n    border-style: none;\\n    color: #555;\\n    outline: none;\\n    border-radius: 20px;\\n    border-color: #f4f4f4;\\n    box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.274);\\n}\\n\\n.humany-search-ts-icon {\\n    height: 17px;\\n    margin-left: 280px;\\n    /* position: absolute; */\\n    position: relative;\\n    /* top: 294px; */\\n    top: -26px;\\n    pointer-events: all;\\n    fill: #797777;\\n}\\n\\n.humany-delete-ts-icon {\\n    height: 14px;\\n    margin-left: 280px;\\n    /* position: absolute; */\\n    position: relative;\\n    /* top: 296px; */\\n    top: -24px;\\n    pointer-events: all;\\n    cursor: pointer;\\n    fill: #797777;\\n    -webkit-transition-duration: 0.2s;\\n    transition-duration: 0.2s;\\n}\\n\\n.humany-delete-ts-icon:hover {\\n    fill: black;\\n}\\n\\n.news-selection-selectors {\\n    text-align: center;\\n}\\n\\n.news-month-selector {\\n    width: calc(100% - 32px);\\n    height: 30px;\\n    outline: none;\\n    background: white;\\n}\\n\\n/* Block wrapper */\\n.newsblock-01-wrapper {\\n    max-width: 850px;\\n    min-width: 450px;\\n    padding: 12px 20px 12px 20px;\\n    margin: 20px auto 26px;\\n    height: fit-content;\\n    min-height: 100px;\\n    border-style: solid;\\n    border-color: #E3E3E3;\\n    border-width: 0px;\\n    border-radius: 8px;\\n    font-family: Arial;\\n    background: white;\\n    box-shadow: 0px 2px 3px 2px rgba(0, 0, 0, 0.17);\\n}\\n\\n.newsblock-01-wrapper p {\\n    margin-bottom: 12px;\\n    font-size: 16px;\\n}\\n\\n/* Header area in block */\\n.newsblock-01-header {\\n    width: auto;\\n    height: 70px;\\n    display: flex;\\n    border-top-right-radius: 12px;\\n    border-bottom-right-radius: 12px;\\n    border-bottom-left-radius: 34px;\\n    border-top-left-radius: 34px;\\n}\\n\\n.newsblock-01-logo {\\n    background: white;\\n    width: 70px;\\n    height: 70px;\\n    border-radius: 100%;\\n    text-align: center;\\n}\\n\\n.newsblock-01-svg {\\n    width: 100%;\\n    height: 100%;\\n    padding: 7px;\\n}\\n\\n.newsblock-01-logo img {\\n    margin: 10px auto;\\n    max-width: 50px;\\n    max-height: 50px;\\n}\\n\\n.newsblock-01-infos {\\n    position: relative;\\n    left: 18px;\\n    top: 12px;\\n    height: fit-content;\\n    max-width: 500px;\\n}\\n\\n.newsblock-01-headline {\\n    font-size: 18px;\\n    display: inline-block;\\n    white-space: nowrap;\\n}\\n\\n.news-headline {\\n    margin: 0px;\\n    height: fit-content;\\n    font-family: pebble, arial;\\n    margin-bottom: 4px;\\n}\\n\\n.pebble-purple {\\n    color: #990AE2;\\n}\\n\\n.newsblock-01-date {\\n    margin: 0px;\\n    height: fit-content;\\n    font-size: 16px;\\n    color: grey;\\n    font-weight: lighter;\\n}\\n\\n.newsblock-01-content img {\\n    cursor: pointer;\\n    width: auto !important;\\n    max-height: 400px;\\n}\\n\\n.newsblock-content-headline {\\n    font-family: pebble, arial;\\n    margin-top: 18px;\\n    margin-bottom: 14px;\\n}\\n\\n.newsblock-01-photos {\\n    max-height: 270px;\\n    overflow: hidden;\\n    /* display: flex; */\\n}\\n\\n.newsblock-01-photos img {\\n    width: 100%;\\n    position: relative;\\n    height: 100%;\\n    overflow: hidden;\\n    cursor: pointer;\\n}\\n\\n.modal_preview {\\n    display: none;\\n    /* Hidden by default */\\n    position: fixed;\\n    /* Stay in place */\\n    z-index: 9999;\\n    /* Sit on top */\\n    padding-top: 100px;\\n    /* Location of the box */\\n    text-align: center;\\n    left: 0;\\n    top: 0;\\n    width: 100%;\\n    /* Full width */\\n    height: 100%;\\n    /* Full height */\\n    overflow: auto;\\n    /* Enable scroll if needed */\\n    background-color: rgb(0, 0, 0);\\n    /* Fallback color */\\n    background-color: rgba(0, 0, 0, 0.9);\\n    /* Black w/ opacity */\\n}\\n\\n/* Modal Content (image) */\\n.newsModal_content {\\n    max-width: 90%;\\n    max-height: 90%;\\n    position: fixed;\\n    top: 50%;\\n    left: 50%;\\n    transform: translate(-50%, -50%);\\n}\\n\\n@-webkit-keyframes zoom {\\n    from {\\n        -webkit-transform: scale(0)\\n    }\\n\\n    to {\\n        -webkit-transform: scale(1)\\n    }\\n}\\n\\n@keyframes zoom {\\n    from {\\n        transform: scale(0)\\n    }\\n\\n    to {\\n        transform: scale(1)\\n    }\\n}\\n\\n/* The Close Button */\\n.newsModal_close {\\n    position: absolute;\\n    top: 15px;\\n    right: 35px;\\n    color: #f1f1f1;\\n    font-size: 40px;\\n    font-weight: bold;\\n    transition: 0.3s;\\n    cursor: pointer;\\n}\\n\\n.newsModal_close:hover {\\n    color: #cdcdcd;\\n}\\n\\n.newsblock-01-refs {\\n    height: auto;\\n    margin-top: 24px;\\n    margin-bottom: 8px;\\n}\\n\\n.newsblock-01-refs>a,\\n.newsblock-01-refs>p>a {\\n    background-color: #990ae3;\\n    color: white !important;\\n    outline: none !important;\\n    text-decoration: none !important;\\n    border: none;\\n    color: #f4f4f4;\\n    text-decoration: none;\\n    padding: 6px 14px;\\n    font-size: 16px;\\n    font-family: sans-serif;\\n    border-radius: 4px;\\n    -webkit-transition-duration: 0.7s;\\n    transition-duration: 0.7s;\\n    cursor: pointer;\\n    white-space: nowrap;\\n    color: white;\\n    box-shadow: 0px 1px 2px 0px rgb(194, 194, 194);\\n    outline: 0;\\n    /* width: 160px; */\\n    margin-right: 4px;\\n    margin-bottom: 5px;\\n    background-color: #990ae3;\\n    color: white !important;\\n    outline: none !important;\\n    text-decoration: none !important;\\n}\\n\\n.newsblock-01-refs a {\\n    display: inline-table;\\n    width: fit-content;\\n}\\n\\n.newsblock-01-refs h4 {\\n    margin: 0px;\\n}\\n\\n.error-button {\\n    border: none;\\n    color: #f4f4f4;\\n    text-decoration: none;\\n    padding: 6px 14px;\\n    font-size: 16px;\\n    font-family: sans-serif;\\n    border-radius: 4px;\\n    -webkit-transition-duration: 0.7s;\\n    transition-duration: 0.7s;\\n    cursor: pointer;\\n    white-space: nowrap;\\n    color: white;\\n    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.274);\\n    outline: 0;\\n    /*width: 160px;*/\\n    margin-right: 4px;\\n    margin-bottom: 5px;\\n}\\n\\n.telia-btn {\\n    background-color: #990ae3;\\n    color: white !important;\\n    outline: none !important;\\n    text-decoration: none !important;\\n}\\n\\n.telia-btn:hover {\\n    background-color: rgba(107, 7, 156);\\n    color: white;\\n    text-decoration: none;\\n    outline: 0;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://AceCustomizer/./areas/newspage/scss/main.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./areas/newspage/scss/other.css":
/*!*****************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./areas/newspage/scss/other.css ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n// Module\n___CSS_LOADER_EXPORT___.push([module.i, \"body {\\n    background-color: aliceblue;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://AceCustomizer/./areas/newspage/scss/other.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_areas_newspage_scss_main_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js!../areas/newspage/scss/main.css */ \"./node_modules/css-loader/dist/cjs.js!./areas/newspage/scss/main.css\");\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_areas_newspage_scss_main_css__WEBPACK_IMPORTED_MODULE_1__[\"default\"]);\n// Module\n___CSS_LOADER_EXPORT___.push([module.i, \"\\n\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://AceCustomizer/./src/style.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://AceCustomizer/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && typeof btoa !== 'undefined') {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://AceCustomizer/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./services/GuideFetcher.ts":
/*!**********************************!*\
  !*** ./services/GuideFetcher.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * Parses the response from the GET to JSON, and calls the callback function with JSON.Body as argument.\n */\nvar GuideFetcher = /** @class */ (function () {\n    function GuideFetcher(config) {\n        this.segment = config.segment;\n        this.id = config.id;\n        this.callback = config.callback;\n        this.requestUrl = \"https://telia-dk.humany.net/\" + config.segment + \"/guides/\" + config.id + \"?language=da&credentials=true\";\n        if (config.mockRequestUrl) {\n            this.mockRequestUrl = config.mockRequestUrl;\n        }\n    }\n    GuideFetcher.prototype.get = function () {\n        var callback = this.callback;\n        var json; // TODO: Define expected interface for JSON response\n        var body;\n        var requestUrl = this.mockRequestUrl\n            ? this.mockRequestUrl\n            : this.requestUrl;\n        // TODO: Use fetch\n        var request = new XMLHttpRequest();\n        request.onreadystatechange = function () {\n            if (this.readyState == 4 && this.status == 200) {\n                // Parse response to JSON\n                try {\n                    json = JSON.parse(request.responseText);\n                    // Get the guide BODY from the JSON\n                    body = json.Body;\n                }\n                catch (_a) {\n                    body = request.responseText;\n                }\n                // Create placeholder html element with the body\n                if (callback) {\n                    callback(body);\n                }\n            }\n        };\n        request.open(\"GET\", requestUrl, false);\n        request.send();\n    };\n    return GuideFetcher;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (GuideFetcher);\n\n\n//# sourceURL=webpack://AceCustomizer/./services/GuideFetcher.ts?");

/***/ }),

/***/ "./services/HtmlTableParser.ts":
/*!*************************************!*\
  !*** ./services/HtmlTableParser.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// Take in a html table element\nvar HtmlTableParser = /** @class */ (function () {\n    function HtmlTableParser(table) {\n        this.parsedData = this.parse(table);\n    }\n    HtmlTableParser.prototype.parse = function (table) {\n        // TODO: Define interface for table element\n        var data = [];\n        var headers = [];\n        // ---- GET THE INNER HTML FROM THE HEADER ROWS ----\n        // And remove all whitespaces\n        for (var i = 0; i < table.rows[0].cells.length; i++) {\n            //headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi, '');\n            headers[i] = table.rows[0].cells[i].id.toLowerCase().replace(/ /gi, \"\");\n        }\n        // ---- GET INNER HTML FROM ALL ROWS, EXCLUDING THE TOP ROW (HEADERS) ----\n        // Index starts at 1, since we already has the headers\n        for (var i = 1; i < table.rows.length; i++) {\n            var tableRow = table.rows[i];\n            var rowData = {};\n            for (var j = 0; j < tableRow.cells.length; j++) {\n                rowData[headers[j]] = tableRow.cells[j].innerHTML;\n            }\n            data.push(rowData);\n        }\n        return data;\n    };\n    /**\n     * @returns a list of data parsed from the html table\n     */\n    HtmlTableParser.prototype.tableDataToList = function () {\n        return this.parsedData;\n    };\n    return HtmlTableParser;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (HtmlTableParser);\n\n\n//# sourceURL=webpack://AceCustomizer/./services/HtmlTableParser.ts?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: ModalInitiater, ButtonSetup, NewsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _areas_modal_initiator_ModalInitiater_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../areas/modal-initiator/ModalInitiater.js */ \"./areas/modal-initiator/ModalInitiater.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ModalInitiater\", function() { return _areas_modal_initiator_ModalInitiater_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _Scripts_ButtonSetup_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Scripts/ButtonSetup.js */ \"./Scripts/ButtonSetup.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ButtonSetup\", function() { return _Scripts_ButtonSetup_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _areas_newspage_index_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../areas/newspage/index.ts */ \"./areas/newspage/index.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"NewsPage\", function() { return _areas_newspage_index_ts__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\n\n\n\n\n\n\n//# sourceURL=webpack://AceCustomizer/./src/index.js?");

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./style.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss\");\n\n            \n\nvar options = {\"injectType\":\"singletonStyleTag\"};\n\noptions.insert = \"head\";\noptions.singleton = true;\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__[\"default\"], options);\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__[\"default\"].locals || {});\n\n//# sourceURL=webpack://AceCustomizer/./src/style.scss?");

/***/ })

/******/ });