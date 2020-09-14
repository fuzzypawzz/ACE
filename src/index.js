import { polys } from "../modules/Polyfills.js";
import {
  tableKeyNames,
  classNames,
  filteredTableData,
  uniqueNumber,
} from "../modules/defaults.js";
import segmentProvider from "../modules/segmentProvider.js";
import {
  fetchNotificationTables as tableDataParser,
  DEFAULTS,
  allNewsContent,
  elements,
  blocks,
  newsCreatedToday,
  guideIDSToFetch,
} from "../modules/tableDataParser.js";
import htmlGenerator from "../modules/htmlGenerator.js";
import { Template } from "../modules/contructors.js";
import { accordions } from "../modules/accordions.js";

// Could call fetch notification tables first, with the delay of 50 miliseconds
// when tables has been fetched, the initiate function should be called

const searchIcon = document.querySelector(`#${DEFAULTS.searchIconID}`);
const clearSearchIcon = document.querySelector(
  `#${DEFAULTS.searchDeleteIconID}`
);
const thisSegment = segmentProvider();

switch (thisSegment) {
  // CO
  case 1:
    guideIDSToFetch.push("11747", "12076");
    break;
  // VIP
  case 2:
    guideIDSToFetch.push("13654");
    break;
  default:
    // Fetch all, if no segment is set
    guideIDSToFetch.push("11747", "12076", "13654");
    break;
}

// Get the news section wrapper by ID to place blocks inside
// Place it inside the elements object for later reference
elements.newsSectionWrapper = document.querySelector(
  `#${DEFAULTS.newsSectionWrapperID}`
);

try {
  // ---- SETUP AND PREPARE SEARCH FIELD ----
  document
    .querySelector(`#${DEFAULTS.searchFieldID}`)
    .addEventListener("input", function (event) {
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
    });

  // ---- ADD EVENT LISTENERS TO THE SEARCH DELETE ICON ----
  document
    .querySelector(`#${DEFAULTS.searchDeleteIconID}`)
    .addEventListener("click", function (event) {
      newsPage.clearSearch();
    });
} catch (err) {}

(function setupSelectOptions() {
  let options = [],
    option,
    selector,
    objectLength;
  selector = document.querySelector(`#${DEFAULTS.selectorFieldID}`);

  // Only display the options which is relevant for the segment
  // TODO: Refractor this (august 2020)
  switch (thisSegment) {
    // VIP
    case 2:
      options.push(DEFAULTS.SelectorOptions.onlyNewsFromVIP);
      break;
    // Currently anything else = CO
    default:
      options.push(
        DEFAULTS.SelectorOptions.showAll,
        DEFAULTS.SelectorOptions.onlyNewsFromBOQ,
        DEFAULTS.SelectorOptions.onlyNewsFromSU
      );
      break;
  }

  try {
    // TODO: WILL NOT WORK - REFRACTOR
    options.forEach((item) => {
      option = new Template({
        tag: "OPTION",
        class: "",
        id: "",
        innerHTML: item,
      }).create();
      selector.appendChild(option);
    });
  } catch (err) {}
})();

let retryAttempt = 0;
let wasSuccessful = tableDataParser(retryAttempt);

// this can only be called after fetchNotificationTables is done parsing
const allNewsContentLenght = allNewsContent.length;
for (let i = 0; i < allNewsContentLenght; i++) {
  this.htmlGenerator(allNewsContent[i]);
}

// Fetch tables
