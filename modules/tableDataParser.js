import {
  DEFAULTS,
  classNames,
  allNewsContent,
  elements,
  blocks,
  newsCreatedToday,
  guideIDSToFetch,
} from "./defaults.js";

import { fetchTables } from "./fetchTables.js";

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
    dateString;

  // Clear global variables, since the eefe is only loaded once in humany
  // And values in the variable will be dublicated everytime user loads the humany news page
  allNewsContent.splice(0, allNewsContent.length);
  elements.splice(0, elements.length);
  blocks.splice(0, blocks.length);

  // ---- QUERY THE NOTIFCATION TABLES ----
  // Get all available tables in the page
  tableNodeList = fetchTables(guideIDSToFetch);

  // ---- HIDE ALL TABLES INSIDE THE HUMANY GUIDE ----
  // The table is only applicable in the editor interface
  // .humany-notify-table
  tableNodeListLenght = tableNodeList.length;
  for (let i = 0; i < tableNodeListLenght; i++) {
    tableNodeList[i].style.display = "none";
  }

  // ---- RETRY CALLS IF TABLES IS NOT LOADED YET ----
  if (tableNodeListLenght === 0) {
    if (retryAttempt < DEFAULTS.timesToRetryFetchingTableData) {
      setTimeout(function () {
        newsPage.fetchNotificationTables();
      }, 1000);
      retryAttempt++;
    }
  } else {
    // ---- QUERY THE BLOCK TO DISPLAY LATEST NEWS ----
    // Get the target block by ID to place latest news inside
    newsSectionWrapper = document.querySelector(
      `#${DEFAULTS.latestNewsWrapperID}`
    );
    newsSectionWrapper.style.display = "block";

    // Place it inside the elements object for later reference
    elements.latestNewsBlock = newsSectionWrapper;
  }

  // ---- PARSE TABLES DATA TO JSON ----
  for (let i = 0; i < tableNodeListLenght; i++) {
    tableJSON = newsPage.tableToJson(tableNodeList[i]);
    this.trimTableData(tableJSON);
  }

  // ---- SORT JSON TABLEDATA BY DATE DESC ----
  allNewsContent.sort(function (a, b) {
    return b.date - a.date;
  });

  // ---- CREATE NEWS ELEMENTS IN THE TOP-10 BLOCK ----
  allNewsContentLenght = allNewsContent.length;
  let maxNumberOfItemsForSidePanel = 10;

  // Check if news items is less than the max number of items allowed in the sidepanel
  if (allNewsContentLenght < maxNumberOfItemsForSidePanel) {
    maxNumberOfItemsForSidePanel = allNewsContentLenght;
  }
  for (let i = 0; i < maxNumberOfItemsForSidePanel; i++) {
    let newsItem, newsHeadline, newsHeadlineIcon, newsDate, iconClass;

    // ---- CONTAINER FOR HEADLINE AND DATE ----
    // If data tables in humany is not loaded yet, dont show ugly errors in console
    try {
      newsItem = new this.Template({
        tag: "DIV",
        class: classNames.latestNews.newsItem,
        id: allNewsContent[i].uniqueID,
      }).create();
    } catch (error) {
      console.log("Tables not loaded yet. Retrying to fetch data.");
      // There is a another function retrying to fetch tabledata
      return;
    }
    // Open modal and scroll to clicked element
    newsItem.addEventListener("click", function (event) {
      triggers.toggleNewsModal();
      newsPage.scrollToBlock(this.id);
    });
    // Place element inside news block in Humany's front page
    elements.latestNewsBlock.appendChild(newsItem);

    // ---- HEADLINE INSIDE THE ELEMENT ----
    newsHeadline = new this.Template({
      tag: "DIV",
      class: classNames.latestNews.newsHeadline,
    }).create();
    newsItem.appendChild(newsHeadline);

    // ---- ICON FOR THE HEADLINE ----
    // Logic for which icon to display
    if (allNewsContent[i].tag == DEFAULTS.newsTagOptions.ifBOQsetTag) {
      iconClass = `${classNames.icons.heart} iconToTextGap ${classNames.icons.colorClassForBOQicon}`;
    } else {
      iconClass = `${classNames.icons.info} iconToTextGap ${classNames.icons.colorClassForSUicon}`;
    }
    newsHeadlineIcon = new this.Template({
      tag: "I",
      class: iconClass,
      //innerHTML: `<span class="spanBeforeIcon black arial"> ${allNewsContent[i].headline}</span>`
    }).create();
    newsHeadline.appendChild(newsHeadlineIcon);
    newsHeadline.innerHTML += allNewsContent[i].headline;

    // ---- DATE INSIDE THE ELEMENT ----
    newsDate = new this.Template({
      tag: "DIV",
      class: classNames.latestNews.date,
      innerHTML: allNewsContent[i].dateString,
    }).create();
    newsItem.appendChild(newsDate);
  }

  // ---- GENERATE NEWS COUNTER MESSAGE IF THERE IS ANY NEWS MATCHING TODAYS DATE ----
  if (newsCreatedToday > 0) {
    var todaysNewsCounter, correctExpression;

    if (newsCreatedToday > 1) {
      correctExpression = "nyheder";
    } else {
      correctExpression = "nyhed";
    }

    todaysNewsCounter = new this.Template({
      tag: "P",
      class: classNames.latestNews.latestNewsCounter,
      innerHTML: `Der er <span class="newsCountBadge">${newsCreatedToday}</span> ${correctExpression} fra i dag`,
    }).create();
    var target = document.querySelector(
      `.${classNames.latestNews.blockHeader}`
    );
    target.appendChild(todaysNewsCounter);
  }

  // ---- REMOVE BLANK DIV IN THE LEFT PANEL ELEMENT ----
  // It is there because humany has an error where css border is not fully applied on load
  let blankHackDiv = document.querySelector(`#_humany-blank-hack-1`);
  blankHackDiv.style.display = "none";
  // ---- CALL INITIATE TO SETUP HTML ELEMENTS AND PAGES ----
  this.initiate();
}

//export default fetchNotificationTables;

export {
  fetchNotificationTables,
  DEFAULTS,
  allNewsContent,
  elements,
  blocks,
  newsCreatedToday,
  guideIDSToFetch,
};
