"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchNotificationTables = fetchNotificationTables;
Object.defineProperty(exports, "DEFAULTS", {
  enumerable: true,
  get: function get() {
    return _defaults.DEFAULTS;
  }
});
Object.defineProperty(exports, "allNewsContent", {
  enumerable: true,
  get: function get() {
    return _defaults.allNewsContent;
  }
});
Object.defineProperty(exports, "elements", {
  enumerable: true,
  get: function get() {
    return _defaults.elements;
  }
});
Object.defineProperty(exports, "blocks", {
  enumerable: true,
  get: function get() {
    return _defaults.blocks;
  }
});
Object.defineProperty(exports, "newsCreatedToday", {
  enumerable: true,
  get: function get() {
    return _defaults.newsCreatedToday;
  }
});
Object.defineProperty(exports, "guideIDSToFetch", {
  enumerable: true,
  get: function get() {
    return _defaults.guideIDSToFetch;
  }
});

var _defaults = require("./defaults.js");

var _fetchTables = require("./fetchTables.js");

// How many times the initiate function is retried
// If function cant fetch humany data tables, then function is retried after 2 seconds up to 3 times
function fetchNotificationTables(retryAttempt) {
  var modalImgs,
      imgCount,
      tableNodeList = [],
      tableNodeListLenght,
      overAllPageWrapper,
      tableJSON,
      newsSectionWrapper,
      allNewsContentLenght,
      searchField,
      dateString; // Clear global variables, since the eefe is only loaded once in humany
  // And values in the variable will be dublicated everytime user loads the humany news page

  _defaults.allNewsContent.splice(0, _defaults.allNewsContent.length);

  _defaults.elements.splice(0, _defaults.elements.length);

  _defaults.blocks.splice(0, _defaults.blocks.length); // ---- QUERY THE NOTIFCATION TABLES ----
  // Get all available tables in the page


  tableNodeList = (0, _fetchTables.fetchTables)(_defaults.guideIDSToFetch); // ---- HIDE ALL TABLES INSIDE THE HUMANY GUIDE ----
  // The table is only applicable in the editor interface
  // .humany-notify-table

  tableNodeListLenght = tableNodeList.length;

  for (var i = 0; i < tableNodeListLenght; i++) {
    tableNodeList[i].style.display = "none";
  } // ---- RETRY CALLS IF TABLES IS NOT LOADED YET ----


  if (tableNodeListLenght === 0) {
    if (retryAttempt < _defaults.DEFAULTS.timesToRetryFetchingTableData) {
      setTimeout(function () {
        newsPage.fetchNotificationTables();
      }, 1000);
      retryAttempt++;
    }
  } else {
    // ---- QUERY THE BLOCK TO DISPLAY LATEST NEWS ----
    // Get the target block by ID to place latest news inside
    newsSectionWrapper = document.querySelector("#".concat(_defaults.DEFAULTS.latestNewsWrapperID));
    newsSectionWrapper.style.display = "block"; // Place it inside the elements object for later reference

    _defaults.elements.latestNewsBlock = newsSectionWrapper;
  } // ---- PARSE TABLES DATA TO JSON ----


  for (var _i = 0; _i < tableNodeListLenght; _i++) {
    tableJSON = newsPage.tableToJson(tableNodeList[_i]);
    this.trimTableData(tableJSON);
  } // ---- SORT JSON TABLEDATA BY DATE DESC ----


  _defaults.allNewsContent.sort(function (a, b) {
    return b.date - a.date;
  }); // ---- CREATE NEWS ELEMENTS IN THE TOP-10 BLOCK ----


  allNewsContentLenght = _defaults.allNewsContent.length;
  var maxNumberOfItemsForSidePanel = 10; // Check if news items is less than the max number of items allowed in the sidepanel

  if (allNewsContentLenght < maxNumberOfItemsForSidePanel) {
    maxNumberOfItemsForSidePanel = allNewsContentLenght;
  }

  for (var _i2 = 0; _i2 < maxNumberOfItemsForSidePanel; _i2++) {
    var newsItem = void 0,
        newsHeadline = void 0,
        newsHeadlineIcon = void 0,
        newsDate = void 0,
        iconClass = void 0; // ---- CONTAINER FOR HEADLINE AND DATE ----
    // If data tables in humany is not loaded yet, dont show ugly errors in console

    try {
      newsItem = new this.Template({
        tag: "DIV",
        "class": _defaults.classNames.latestNews.newsItem,
        id: _defaults.allNewsContent[_i2].uniqueID
      }).create();
    } catch (error) {
      console.log("Tables not loaded yet. Retrying to fetch data."); // There is a another function retrying to fetch tabledata

      return;
    } // Open modal and scroll to clicked element


    newsItem.addEventListener("click", function (event) {
      triggers.toggleNewsModal();
      newsPage.scrollToBlock(this.id);
    }); // Place element inside news block in Humany's front page

    _defaults.elements.latestNewsBlock.appendChild(newsItem); // ---- HEADLINE INSIDE THE ELEMENT ----


    newsHeadline = new this.Template({
      tag: "DIV",
      "class": _defaults.classNames.latestNews.newsHeadline
    }).create();
    newsItem.appendChild(newsHeadline); // ---- ICON FOR THE HEADLINE ----
    // Logic for which icon to display

    if (_defaults.allNewsContent[_i2].tag == _defaults.DEFAULTS.newsTagOptions.ifBOQsetTag) {
      iconClass = "".concat(_defaults.classNames.icons.heart, " iconToTextGap ").concat(_defaults.classNames.icons.colorClassForBOQicon);
    } else {
      iconClass = "".concat(_defaults.classNames.icons.info, " iconToTextGap ").concat(_defaults.classNames.icons.colorClassForSUicon);
    }

    newsHeadlineIcon = new this.Template({
      tag: "I",
      "class": iconClass //innerHTML: `<span class="spanBeforeIcon black arial"> ${allNewsContent[i].headline}</span>`

    }).create();
    newsHeadline.appendChild(newsHeadlineIcon);
    newsHeadline.innerHTML += _defaults.allNewsContent[_i2].headline; // ---- DATE INSIDE THE ELEMENT ----

    newsDate = new this.Template({
      tag: "DIV",
      "class": _defaults.classNames.latestNews.date,
      innerHTML: _defaults.allNewsContent[_i2].dateString
    }).create();
    newsItem.appendChild(newsDate);
  } // ---- GENERATE NEWS COUNTER MESSAGE IF THERE IS ANY NEWS MATCHING TODAYS DATE ----


  if (_defaults.newsCreatedToday > 0) {
    var todaysNewsCounter, correctExpression;

    if (_defaults.newsCreatedToday > 1) {
      correctExpression = "nyheder";
    } else {
      correctExpression = "nyhed";
    }

    todaysNewsCounter = new this.Template({
      tag: "P",
      "class": _defaults.classNames.latestNews.latestNewsCounter,
      innerHTML: "Der er <span class=\"newsCountBadge\">".concat(_defaults.newsCreatedToday, "</span> ").concat(correctExpression, " fra i dag")
    }).create();
    var target = document.querySelector(".".concat(_defaults.classNames.latestNews.blockHeader));
    target.appendChild(todaysNewsCounter);
  } // ---- REMOVE BLANK DIV IN THE LEFT PANEL ELEMENT ----
  // It is there because humany has an error where css border is not fully applied on load


  var blankHackDiv = document.querySelector("#_humany-blank-hack-1");
  blankHackDiv.style.display = "none"; // ---- CALL INITIATE TO SETUP HTML ELEMENTS AND PAGES ----

  this.initiate();
} //export default fetchNotificationTables;