"use strict";

var _Polyfills = require("./modules/Polyfills.js");

var _defaults = require("./modules/defaults.js");

var _segmentProvider = _interopRequireDefault(require("./modules/segmentProvider.js"));

var _tableDataParser = require("./modules/tableDataParser.js");

var _htmlGenerator = _interopRequireDefault(require("./modules/htmlGenerator.js"));

var _contructors = require("./modules/contructors.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Could call fetch notification tables first, with the delay of 50 miliseconds
// when tables has been fetched, the initiate function should be called
var searchIcon = document.querySelector("#".concat(_tableDataParser.DEFAULTS.searchIconID));
var clearSearchIcon = document.querySelector("#".concat(_tableDataParser.DEFAULTS.searchDeleteIconID));
var thisSegment = (0, _segmentProvider["default"])();

switch (thisSegment) {
  // CO
  case 1:
    _tableDataParser.guideIDSToFetch.push("11747", "12076");

    break;
  // VIP

  case 2:
    _tableDataParser.guideIDSToFetch.push("13654");

    break;

  default:
    // Fetch all, if no segment is set
    _tableDataParser.guideIDSToFetch.push("11747", "12076", "13654");

    break;
} // Get the news section wrapper by ID to place blocks inside
// Place it inside the elements object for later reference


_tableDataParser.elements.newsSectionWrapper = document.querySelector("#".concat(_tableDataParser.DEFAULTS.newsSectionWrapperID));

try {
  // ---- SETUP AND PREPARE SEARCH FIELD ----
  document.querySelector("#".concat(_tableDataParser.DEFAULTS.searchFieldID)).addEventListener("input", function (event) {
    // Remove all results
    newsPage.removeSearchResults();

    if (this.value) {
      searchIcon.style.display = "none";
      clearSearchIcon.style.display = "block";
      newsPage.search(this.value);
    } else {
      searchIcon.style.display = "block";
      clearSearchIcon.style.display = "none";
      return;
    }
  }); // ---- ADD EVENT LISTENERS TO THE SEARCH DELETE ICON ----

  document.querySelector("#".concat(_tableDataParser.DEFAULTS.searchDeleteIconID)).addEventListener("click", function (event) {
    newsPage.clearSearch();
  });
} catch (err) {}

(function setupSelectOptions() {
  var options = [],
      option,
      selector,
      objectLength;
  selector = document.querySelector("#".concat(_tableDataParser.DEFAULTS.selectorFieldID)); // Only display the options which is relevant for the segment
  // TODO: Refractor this (august 2020)

  switch (thisSegment) {
    // VIP
    case 2:
      options.push(_tableDataParser.DEFAULTS.SelectorOptions.onlyNewsFromVIP);
      break;
    // Currently anything else = CO

    default:
      options.push(_tableDataParser.DEFAULTS.SelectorOptions.showAll, _tableDataParser.DEFAULTS.SelectorOptions.onlyNewsFromBOQ, _tableDataParser.DEFAULTS.SelectorOptions.onlyNewsFromSU);
      break;
  }

  try {
    // TODO: WILL NOT WORK - REFRACTOR
    options.forEach(function (item) {
      option = new _contructors.Template({
        tag: "OPTION",
        "class": "",
        id: "",
        innerHTML: item
      }).create();
      selector.appendChild(option);
    });
  } catch (err) {}
})();

var retryAttempt = 0;
var wasSuccessful = (0, _tableDataParser.fetchNotificationTables)(retryAttempt); // this can only be called after fetchNotificationTables is done parsing

var allNewsContentLenght = _tableDataParser.allNewsContent.length;

for (var i = 0; i < allNewsContentLenght; i++) {
  (void 0).htmlGenerator(_tableDataParser.allNewsContent[i]);
} // Fetch tables