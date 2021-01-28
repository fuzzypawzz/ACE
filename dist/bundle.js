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

/***/ "./Scripts/ModalInitiater.js":
/*!***********************************!*\
  !*** ./Scripts/ModalInitiater.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ((function () {\n  // Contructor\n  function ModalInitiater(configuration) {\n    var _this = this;\n\n    _this.guideHtml = configuration.guideHtml;\n    _this.callback = configuration.callback;\n    _this.guideContentSectionId = configuration.guideContentSectionId;\n    _this.modalCloseButtonId = configuration.modalCloseButtonId;\n    _this.modalElementId = configuration.modalElementId;\n\n    if (_this.modalCloseButtonId && _this.modalElementId) {\n      methods.addHtmlToElement(_this.guideHtml, _this.guideContentSectionId);\n      methods.addCloseBtnListener(_this.modalCloseButtonId, _this.modalElementId);\n\n      if (_this.callback) {\n        _this.callback();\n      }\n    } else {\n      throw new Error(\"Configuration is not correct!\");\n    }\n  } // Private func/vars\n\n\n  var methods = {\n    addCloseBtnListener: function addCloseBtnListener(modalCloseButtonId, modalElementId) {\n      if (modalCloseButtonId && modalElementId) {\n        document.querySelector(\"#\".concat(modalCloseButtonId)).addEventListener(\"click\", function () {\n          var modal = document.querySelector(\"#\".concat(modalElementId));\n          modal.style.display = \"none\";\n        });\n      } else {\n        throw new Error(\"modalCloseButtonId or modalElementId not present in configuration\");\n      }\n    },\n    addHtmlToElement: function addHtmlToElement(guideHtml, guideContentSectionId) {\n      if (guideContentSectionId && guideHtml) {\n        var div = document.createElement(\"DIV\");\n        div.innerHTML = guideHtml;\n        var section = document.querySelector(\"#\".concat(guideContentSectionId));\n        section.appendChild(div);\n      } else {\n        throw new Error(\"GuideContentSectionId or guideHtml is not present in configuration\");\n      }\n    }\n  };\n  return ModalInitiater;\n})()); // module.exports = {\n//   ModalInitiater\n// };\n\n//# sourceURL=webpack://AceCustomizer/./Scripts/ModalInitiater.js?");

/***/ }),

/***/ "./areas/newspage/index.ts":
/*!*********************************!*\
  !*** ./areas/newspage/index.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _services_GuideFetcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/GuideFetcher */ \"./services/GuideFetcher.ts\");\n/* harmony import */ var _services_HtmlTableParser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/HtmlTableParser */ \"./services/HtmlTableParser.ts\");\n\n\nvar NewsPage = /** @class */ (function () {\n    /**\n     *\n     * @param newsPageConfig See the INewsPageConfig interface\n     * { segment: \"tjekit-all-brand\", guideIds: [32323, 23232, 1232131], tableElementId: \"_someId\" }\n     */\n    function NewsPage(newsPageConfig) {\n        if (!newsPageConfig) {\n            throw new Error(\"Configuration missing.\");\n        }\n        this.guideIds = newsPageConfig.guideIds;\n        this.tableElementId = newsPageConfig.tableElementId;\n        this.segment = newsPageConfig.segment;\n        this.init();\n    }\n    NewsPage.prototype.init = function () {\n        var _this = this;\n        // Get the table data by using the fetcher module to fetch each guide\n        this.guideIds.forEach(function (id) {\n            var configuration = {\n                segment: _this.segment,\n                tableElementId: _this.tableElementId,\n                id: id,\n                callback: _this.handler,\n                mockRequestUrl: \"http://127.0.0.1:5500/\",\n            };\n            new _services_GuideFetcher__WEBPACK_IMPORTED_MODULE_0__[\"default\"](configuration).get();\n        });\n    };\n    NewsPage.prototype.handler = function (htmlBody) {\n        debugger;\n        var tableElementId = this.tableElementId;\n        console.log(tableElementId);\n        function returnTableElement(htmlBody) {\n            var tableElement;\n            var div = document.createElement(\"DIV\");\n            div.innerHTML = htmlBody;\n            try {\n                var tableElement_1 = div.querySelector(\"#\" + this.tableElementId);\n            }\n            catch (err) {\n                console.log(err);\n            }\n            if (!tableElement) {\n                // TODO: Use error message from constants\n                console.warn(\"A table element with id: \" + this.tableElementId + \" could not be found.\");\n                tableElement = div.querySelector(\"table\");\n            }\n            return tableElement ? tableElement : new Error(\"Table not found\");\n        }\n        // Do something with the html body returned from the parser function\n        var table = returnTableElement(htmlBody);\n        var tableData = new _services_HtmlTableParser__WEBPACK_IMPORTED_MODULE_1__[\"default\"](table).returnJson();\n        console.log(tableData);\n    };\n    return NewsPage;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (NewsPage);\n\n\n//# sourceURL=webpack://AceCustomizer/./areas/newspage/index.ts?");

/***/ }),

/***/ "./services/GuideFetcher.ts":
/*!**********************************!*\
  !*** ./services/GuideFetcher.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * Parses the response from the GET to JSON, and calls the callback function with JSON.Body as argument.\n */\nvar GuideFetcher = /** @class */ (function () {\n    function GuideFetcher(config) {\n        this.segment = config.segment;\n        this.id = config.id;\n        this.callback = config.callback;\n        this.requestUrl = \"https://telia-dk.humany.net/\" + config.segment + \"/guides/\" + config.id + \"?language=da&credentials=true\";\n        if (config.mockRequestUrl) {\n            this.mockRequestUrl = config.mockRequestUrl;\n        }\n        this.get();\n    }\n    GuideFetcher.prototype.get = function () {\n        var callback = this.callback;\n        var json; // TODO: Define expected interface for JSON response\n        var body;\n        var requestUrl = this.mockRequestUrl\n            ? this.mockRequestUrl\n            : this.requestUrl;\n        // TODO: Use fetch\n        var request = new XMLHttpRequest();\n        request.onreadystatechange = function () {\n            if (this.readyState == 4 && this.status == 200) {\n                // Parse response to JSON\n                try {\n                    json = JSON.parse(request.responseText);\n                    // Get the guide BODY from the JSON\n                    body = json.Body;\n                }\n                catch (_a) {\n                    body = request.responseText;\n                }\n                // Create placeholder html element with the body\n                if (callback) {\n                    callback(body);\n                }\n            }\n        };\n        request.open(\"GET\", requestUrl, false);\n        request.send();\n    };\n    return GuideFetcher;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (GuideFetcher);\n\n\n//# sourceURL=webpack://AceCustomizer/./services/GuideFetcher.ts?");

/***/ }),

/***/ "./services/HtmlTableParser.ts":
/*!*************************************!*\
  !*** ./services/HtmlTableParser.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// Take in a html table element\nvar HtmlTableParser = /** @class */ (function () {\n    function HtmlTableParser(table) {\n        this.parsedData = this.parse(table);\n    }\n    HtmlTableParser.prototype.parse = function (table) {\n        // TODO: Define interface for table element\n        var data = [];\n        var headers = [];\n        // ---- GET THE INNER HTML FROM THE HEADER ROWS ----\n        // And remove all whitespaces\n        for (var i = 0; i < table.rows[0].cells.length; i++) {\n            //headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi, '');\n            headers[i] = table.rows[0].cells[i].id.toLowerCase().replace(/ /gi, \"\");\n        }\n        // ---- GET INNER HTML FROM ALL ROWS, EXCLUDING THE TOP ROW (HEADERS) ----\n        // Index starts at 1, since we already has the headers\n        for (var i = 1; i < table.rows.length; i++) {\n            var tableRow = table.rows[i];\n            var rowData = {};\n            for (var j = 0; j < tableRow.cells.length; j++) {\n                rowData[headers[j]] = tableRow.cells[j].innerHTML;\n            }\n            data.push(rowData);\n        }\n        return data;\n    };\n    HtmlTableParser.prototype.returnJson = function () {\n        return this.parsedData;\n    };\n    return HtmlTableParser;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (HtmlTableParser);\n\n\n//# sourceURL=webpack://AceCustomizer/./services/HtmlTableParser.ts?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: ModalInitiater, ButtonSetup, NewsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Scripts_ModalInitiater_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Scripts/ModalInitiater.js */ \"./Scripts/ModalInitiater.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ModalInitiater\", function() { return _Scripts_ModalInitiater_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _Scripts_ButtonSetup_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Scripts/ButtonSetup.js */ \"./Scripts/ButtonSetup.js\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ButtonSetup\", function() { return _Scripts_ButtonSetup_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var _areas_newspage_index_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../areas/newspage/index.ts */ \"./areas/newspage/index.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"NewsPage\", function() { return _areas_newspage_index_ts__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; });\n\n\n // NewsPage module\n\n\n\n\n//# sourceURL=webpack://AceCustomizer/./src/index.js?");

/***/ })

/******/ });