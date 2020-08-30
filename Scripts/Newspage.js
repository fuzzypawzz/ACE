var newsPage = (function() {
    "use strict";

    // ---------------------- TO DO's ----------------------
    // If link in tabel does not contain http or https in front, then insert it (make it a href if its not)
    // The img modal in the html, shall either be there and reused when modal is clicked, or new modal shall be created every time
    // "https://telia-dk.humany.net/test-miljo/"; change this in the code to be a default (allbrands) or parse after last things in url, to make it work for all tjekit's

    // Trimmed data from the tables
    var allNewsContent = [];

    // Filtered data from the tables
    var filteredTableData = [];

    // Unique ID tracker to give elements ID's
    var uniqueNumber = 496373;

    // Carries the overall wrapper element
    // Should refractor if not used for anything else
    var elements = [];

    // All news blocks in the page
    var blocks = [];

    // How many times the initiate function is retried
    // If function cant fetch humany data tables, then function is retried after 2 seconds up to 3 times
    var retryAttempt = 0;

    // Keeps track of todays news
    var newsCreatedToday = 0;

    // ---- TRANSLATIONS OF KEYS ----
    // Change here, if changed in the table by user
    const tableKeyNames = {
        day: "dag", // Creation DAY of the article
        month: "måned", // Same as above, but MONTH
        year: "år", // Same as above, but YEAR
        author: "afsender", // The writers name, next to the pebble icon
        icon: "logo", // The pebble icon, or any other icon is specified
        headline: "overskrift", // Headline in the content section
        contentText: "tekst", // The actual text in the content section
        img: "billede", // Image if applicable, click to expand
        href: "link", // Href, humany guide or link to website
        linkText: "linktekst" // Label on the button which directs to the link
    };

    const DEFAULTS = {
        developerMode: false, // Turn on for developer mode (local env)
        humanyInterfaceName: "test-miljo",
        guideIDSToFetch: ["11747", "12076"],
        timesToRetryFetchingTableData: 10, // Humany tables loads slow, set the retry amount before timing out
        pebble: "https://humany.blob.core.windows.net/telia-dk/guides/pebble2.png", // Default pebble icon file path
        humanyGuideTarget: "h-portal-main", // Target table inside this element
        notificationTableClass: "humany-notify-table", // Notification tables where SU and PAIN news is located
        latestNewsWrapperID: "HumanyCustom-latest-news", // Wrapper for the "10 latest news" block in the humany frontpage
        newsFromTodayText: "Nyhed fra i dag",
        overAllPageWrapper: "_newsPage-wrapper", // The overall wrapper of the news page
        newsSectionWrapperID: "_newsSection-wrapper", // The wrapper which blocks shall be placed inside
        resultsContainerID: "_news-search-dropdown", // The unique ID of the search results element
        searchContainer: "_news-selection-search", // The element where searchfield sits inside
        searchFieldID: "_news-selection-searchfield", // ID of the search field
        searchIconID: "_humany-search-ts-icon", // ID of the modal search field delete svg
        searchDeleteIconID: "_humany-delete-ts-icon", // ID of the modal search field search svg
        searchNothingFoundText: "Der blev ikke fundet noget!",
        selectorFieldID: "_news-month-selector",
        author: "BUSINESS QUALITY AND OPTIMIZATION", // Default author name, if not specified
        noTableFoundMsg: "Fejl: Der blev ikke fundet en tabel med data",
        moreThanOneTableMsg: "Fejl: Der er fundet mere end 1 tabel med data. Der må kun være 1 tabel på siden",
        ifNoLinkText: "Åben link", // Will be used if editor didnt give a link button a text/name
        humanyNothing: "&nbsp;", // Means nothing in Humany editor language
        isAllowedToContainHTMLtags: "contentText", // One paramter which is allowed to have paragraphs/divs inside
        SelectorOptions: { // Options for the selector field in the modal
            showAll: "Se alle nyheder",
            onlyNewsFromSU: "Kun udmeldinger fra SU",
            onlyNewsFromBOQ: "Kun nyheder om kunde pains"
        },
        newsTagOptions: {
            isSU: ["SU", "S U", "S.U", "S. U", "SUPERUSER", "SUPER", "USER", "BRUGER"], // Determines that it is SU, if any of these is matching
            isBusinessQuality: ["BOQ", "QUALITY", "BUSINESS", "OPTIMI", "ZATION", "PAIN", "LØST"], // Determines that it is BOQ, if any of these is mathing
            ifSUsetTag: "SU", // Sets this as tag if article is made by SU
            ifBOQsetTag: "BUSINESS QUALITY AND OPTIMIZATION" // Sets this as tag if article is made by BOQ
        }
    };

    // ---- CSS CLASSES ----
    const classNames = {
        mainBlockWrapper: "newsblock-01-wrapper",
        headerSectionInBlock: "newsblock-01-header",
        elementForTheLogo: "newsblock-01-logo",
        logoImg: "newsblock-01-logoImg",
        authorAndDateInfos: "newsblock-01-infos",
        author: "newsblock-01-headline news-headline pebble-purple",
        date: "newsblock-01-date",
        contentSection: "newsblock-01-content",
        contentHeadline: "newsblock-content-headline",
        textInContent: "newsblock-content-p",
        imageContainer: "newsblock-01-photos",
        image: "modalImage",
        linksAndButtonsSection: "newsblock-01-refs",
        linkButton: "error-button telia-btn",
        modal: {
            mainClass: "modal_preview",
            closeButton: "newsModal_close",
            modalContent: "newsModal_content"
        },
        search: {
            resultsContainer: "news-search-dropdown",
            searchResult: "news-search-result",
            noResult: "news-search-noresult",
            resultDate: "news-search-result-date"
        },
        icons: {
            heart: "fa fa-heart", // FontAwesome class - Used for articles by business quality
            info: "fa fa-info-circle", // FontAwesome class - Used for articles by SU
            colorClassForBOQicon: "cmRed",
            colorClassForSUicon: "tsPurple"
        },
        latestNews: {
            blockHeader: "HumanyCustom-latest-news-header",
            newsItem: "latestNewsItem",
            newsHeadline: "latestNewsHeadline",
            date: "latestNewsDate",
            latestNewsCounter: "humany-latest-news-counter"
        }
    };

    // ---- DECLARE REMOVE-METHOD IN PROTOTYPE FOR IE ----
    if (!('remove' in Element.prototype)) {
        Element.prototype.remove = function() {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        };
    }

    // ---- .includes() POLYFILL for Internet Explorer and Opera ----
    if (!String.prototype.includes) {
        String.prototype.includes = function(search, start) {
            'use strict';

            if (search instanceof RegExp) {
                throw TypeError('first argument must not be a RegExp');
            }
            if (start === undefined) {
                start = 0;
            }
            return this.indexOf(search, start) !== -1;
        };
    }

    // ---- DISPLAY MESSAGE IN DEVELOPER MODE ----
    if (DEFAULTS.developerMode) {
        console.log("Developer mode is ON, turn off before implementing in Humany");
    }

    return {
        /**
         * INITIATER - THE START OF THE SCRIPT
         */
        initiate: function() {
            console.log("FUNCTION LOG: initate() invoked");
            var modalImgs, imgCount, tableNodeList, overAllPageWrapper, deleteIcon,
                tableJSON, newsSectionWrapper, allNewsContentLenght, searchField, tableNodeListLenght;

            // ---- QUERY NEWS SECTION WRAPPER ----
            // Get the news section wrapper by ID to place blocks inside
            newsSectionWrapper = document.querySelector(`#${DEFAULTS.newsSectionWrapperID}`);
            // Place it inside the elements object for later reference
            elements.newsSectionWrapper = newsSectionWrapper;

            // ---- SETUP AND PREPARE SEARCH FIELD ----
            searchField = document.querySelector(`#${DEFAULTS.searchFieldID}`);
            // Add click event listener
            searchField.addEventListener("input", function(event) {
                // Remove all results
                newsPage.removeSearchResults();

                // Don't continue if there is no value
                if (!this.value) {
                    // Switch the icons
                    document.querySelector(`#${DEFAULTS.searchIconID}`).style.display = "block";
                    document.querySelector(`#${DEFAULTS.searchDeleteIconID}`).style.display = "none";
                    return;
                }

                // Call the search function
                newsPage.search(this.value);
            });

            // ---- ADD EVENT LISTENERS TO THE SEARCH DELETE ICON ----
            deleteIcon = document.querySelector(`#${DEFAULTS.searchDeleteIconID}`);
            deleteIcon.addEventListener("click", function(event) {
                newsPage.clearSearch();
            });

            // ---- SETUP SELECTOR FIELDS ----
            this.setupSelector();

            // ---- CREATE THE HTML BLOCKS ----
            // Loop through all news objects and create blocks for each
            allNewsContentLenght = allNewsContent.length;
            for (let i = 0; i < allNewsContentLenght; i++) {
                let dataObject = allNewsContent[i];
                this.createHTMLBlock(dataObject);
            }

            console.log("FUNCTION LOG: initiate() is done");
        },

        /**
         * WILL FETCH THE DATA IN THE NOTIFICATION TABLES
         * Includes a call to initiate() when done
         */
        fetchNotificationTables: function() {
            console.log("FUNCTION LOG: fetchNotificationTables() invoked");
            var modalImgs, imgCount, tableNodeList = [], tableNodeListLenght, overAllPageWrapper,
                tableJSON, newsSectionWrapper, allNewsContentLenght, searchField, dateString;

            // Clear global variables, since the eefe is only loaded once in humany
            // And values in the variable will be dublicated everytime user loads the humany news page
            allNewsContent = [];
            elements = [];
            blocks = [];

            // ---- QUERY THE NOTIFCATION TABLES ----
            // Get all available tables in the page
            if (DEFAULTS.developerMode == true) {
                tableNodeList = document.querySelectorAll("table");
            } else {
                DEFAULTS.guideIDSToFetch.forEach(guideID => {
                    let fetchedJSON, bodyOfGuide, htmlContainer, table;
                    var requestURL = `https://telia-dk.humany.net/test-miljo/guides/${guideID}?language=da&credentials=true`;
                    let request = new XMLHttpRequest();
                    request.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            // Parse response to JSON
                            fetchedJSON = JSON.parse(request.responseText);
                            // Get the guide BODY from the JSON
                            bodyOfGuide = fetchedJSON.Body;
                            // Create placeholder html element with the body
                            htmlContainer = document.createElement("DIV");
                            htmlContainer.innerHTML = bodyOfGuide;
                            // Get the table only
                            table = htmlContainer.querySelector(".humany-notify-table");
                            // Push table to the array
                            tableNodeList.push(table);
                        }
                    };
                    request.open("GET", requestURL, false);
                    request.send();
                });
            }

            // ---- HIDE ALL TABLES INSIDE THE HUMANY GUIDE ----
            // The table is only applicable in the editor interface
            tableNodeListLenght = tableNodeList.length;
            for (let i = 0; i < tableNodeListLenght; i++) {
                tableNodeList[i].style.display = "none";
            }

            // ---- RETRY CALLS IF TABLES IS NOT LOADED YET ----
            if (tableNodeListLenght === 0) {
                if (retryAttempt < DEFAULTS.timesToRetryFetchingTableData) {
                    setTimeout(function() {
                        console.log("FUNCTION LOG: fetchnotificationTables attempt: ", retryAttempt);
                        newsPage.fetchNotificationTables();
                    }, 1000);
                    retryAttempt++;
                }
            } else {
                // ---- QUERY THE BLOCK TO DISPLAY LATEST NEWS ----
                // Get the target block by ID to place latest news inside
                newsSectionWrapper = document.querySelector(`#${DEFAULTS.latestNewsWrapperID}`);
                newsSectionWrapper.style.display = "block";
                console.log("EVENT: Toggled on news block in panel");
                // Place it inside the elements object for later reference
                elements.latestNewsBlock = newsSectionWrapper;
            }

            // ---- PARSE TABLES DATA TO JSON ----
            for (let i = 0; i < tableNodeListLenght; i++) {
                tableJSON = newsPage.tableToJson(tableNodeList[i]);
                this.trimTableData(tableJSON);
            }

            // ---- SORT JSON TABLEDATA BY DATE DESC ----
            allNewsContent.sort(
                function(a, b) {
                    return b.date - a.date;
                }
            );

            // ---- CREATE NEWS ELEMENTS IN THE TOP-10 BLOCK ----
            allNewsContentLenght = allNewsContent.length;
            for (let i = 0; i < 9; i++) {
                let newsItem, newsHeadline, newsHeadlineIcon, newsDate, iconClass;

                // ---- CONTAINER FOR HEADLINE AND DATE ----
                // If data tables in humany is not loaded yet, dont show ugly errors in console
                try {
                    newsItem = new this.Template({
                        tag: "DIV",
                        class: classNames.latestNews.newsItem,
                        id: allNewsContent[i].uniqueID
                    }).create();
                } catch (error) {
                    console.log("Tables not loaded yet. Retrying to fetch data.")
                    // There is a another function retrying to fetch tabledata
                    return;
                }
                // Open modal and scroll to clicked element
                newsItem.addEventListener("click", function(event) {
                    triggers.toggleNewsModal();
                    newsPage.scrollToBlock(this.id);
                });
                // Place element inside news block in Humany's front page
                elements.latestNewsBlock.appendChild(newsItem);

                // ---- HEADLINE INSIDE THE ELEMENT ----
                newsHeadline = new this.Template({
                    tag: "DIV",
                    class: classNames.latestNews.newsHeadline
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
                    innerHTML: allNewsContent[i].dateString
                }).create();
                newsItem.appendChild(newsDate);
            }

            // ---- GENERATE NEWS COUNTER MESSAGE IF THERE IS ANY NEWS MATCHING TODAYS DATE ----
            if (newsCreatedToday > 0) {
                var todaysNewsCounter, correctExpression;

                if (newsCreatedToday > 1) {
                    correctExpression = "nyheder"
                } else {
                    correctExpression = "nyhed"
                }

                todaysNewsCounter = new this.Template({
                    tag: "P",
                    class: classNames.latestNews.latestNewsCounter,
                    innerHTML: `Der er <span class="newsCountBadge">${newsCreatedToday}</span> ${correctExpression} fra i dag`
                }).create();
                var target = document.querySelector(`.${classNames.latestNews.blockHeader}`);
                target.appendChild(todaysNewsCounter);
            }

            // ---- REMOVE BLANK DIV IN THE LEFT PANEL ELEMENT ----
            // It is there because humany has an error where css border is not fully applied on load
            let blankHackDiv = document.querySelector(`#_humany-blank-hack-1`);
            blankHackDiv.style.display = "none";

            // ---- CALL INITIATE TO SETUP HTML ELEMENTS AND PAGES ----
            this.initiate();
            console.log("FUNCTION LOG: fetchNotifcationTables() is done");
        },

        /**
         * TURNS THE TABLES DATA INTO JSON
         * First row needs to be headers!
         * @param {Object} table Object containing the table data (rows/columns) queried in the page
         */
        tableToJson: function(table) {
            var data = [];
            var headers = [];

            // ---- GET THE INNER HTML FROM THE HEADER ROWS ----
            // And remove all whitespaces
            for (let i = 0; i < table.rows[0].cells.length; i++) {
                headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi, '');
            }

            // ---- GET INNER HTML FROM ALL ROWS, EXCLUDING THE TOP ROW (HEADERS) ----
            // Index starts at 1, since we already has the headers
            for (let i = 1; i < table.rows.length; i++) {
                var tableRow = table.rows[i];
                var rowData = {};
                for (var j = 0; j < tableRow.cells.length; j++) {
                    rowData[headers[j]] = tableRow.cells[j].innerHTML;
                }
                data.push(rowData);
            }
            return data;
        },

        /**
         * TRIM AND CLEAN THE DATA, AND PARSE DATES FROM THE DATA OBJECT
         * Will update allNewsContent with the "clean" data
         * @param {Object} data The JSON data object, the "tableJSON"
         */
        trimTableData: function(data) {
            let objLenght, i;

            objLenght = data.length;

            /**
             * REMOVE SPECIAL CHARS WHICH MEANS NOTHING IN HUMANY
             * @param {string} value The value which shall be checked for special Humany chars
             */
            let removeEmptyValues = function(value, key) {
                // ---- CHECK IF STRING VALUE MEANS EMPTY ----

                try {

                    if (value.includes(DEFAULTS.humanyNothing)) {
                        // Replace rubbish
                        value = value.replace(/&nbsp;/g, "");
                    }

                } catch (err) {
                    console.log(err);
                }

                // Check if its not the field "contentText", which is allowed to contain
                // html tags and such, since it is the text area in the article
                try {
                    if (key == DEFAULTS.isAllowedToContainHTMLtags == false) {
                        // Remove paragraphs
                        if (value.includes("<p>")) {
                            let replacement = value.replace(/<p>/g, "");
                            replacement = replacement.replace(/<\/p>/g, "");
                            value = replacement;
                        }
                        // Remove div tags
                        if (value.includes("<div>")) {
                            let replacement = value.replace(/<div>/g, "");
                            replacement = replacement.replace(/<\/div>/g, "");
                            value = replacement;
                        }
                        // Remove linebreaks
                        if (value.includes("<br>")) {
                            let replacement = value.replace(/<br>/g, " ");
                            replacement = replacement.replace(/<\/br>/g, " ");
                            value = replacement;
                        }
                        // Remove links and only keep the URL
                        // if (value.includes("<a href")) {
                        //     let replacement = value.replace(/<a\b[^>]*>/i, "").replace(/<\/a>/i, "");
                        //     value = replacement;
                        // }
                        // Remove 0 if its the first char
                        if (value.slice(0, 1) == "0") {
                            let replacement = value.replace(/^0+/, '');
                            value = replacement;
                        }
                    }
                } catch (err) {
                    console.log(err);
                }


                return value;
            };

            /**
             * MAKES SURE DATESTRING IS WRITTEN IN CORRECT DANISH TO THE USER
             * @param {string} month month which shall be translated to danish
             */
            let cleanUpMonth = function(month) {
                let translatedMonth;

                const danishMonthsNumbers = {
                    1: "Januar",
                    2: "Februar",
                    3: "Marts",
                    4: "April",
                    5: "Maj",
                    6: "Juni",
                    7: "Juli",
                    8: "August",
                    9: "September",
                    10: "Oktober",
                    11: "November",
                    12: "December"
                };

                const correctSpelledMonths = {
                    jan: "Januar",
                    feb: "Februar",
                    mar: "Marts",
                    apr: "April",
                    maj: "Maj",
                    may: "Maj",
                    jun: "Juni",
                    jul: "Juli",
                    aug: "August",
                    sept: "September",
                    okt: "Oktober",
                    oct: "Oktober",
                    nov: "November",
                    dec: "December"
                };

                //if (!translatedMonth) {
                Object.keys(correctSpelledMonths).forEach(function(key) {
                    if (month.toLowerCase().includes(key)) {
                        translatedMonth = correctSpelledMonths[key];
                    }
                });

                if (translatedMonth) {
                    return translatedMonth;
                } else {
                    return month;
                }
            };

            /**
             * TURNS DANISH DATE NAMES INTO ENGLISH
             * @param {string} month Danish month will shall be translated to english
             */
            let getEnglishMonth = function(month) {
                let monthInEnglish;

                const months = {
                    jan: "january",
                    feb: "february",
                    mar: "march",
                    apr: "april",
                    maj: "may",
                    jun: "june",
                    jul: "july",
                    aug: "august",
                    sept: "september",
                    okt: "october",
                    nov: "november",
                    dec: "december"
                };

                const monthInNumbers = {
                    1: "january",
                    2: "february",
                    3: "march",
                    4: "april",
                    5: "may",
                    6: "june",
                    7: "july",
                    8: "august",
                    9: "september",
                    10: "october",
                    11: "november",
                    12: "december"
                };

                if (isNaN(month) == true) {
                    Object.keys(months).forEach(function(key) {
                        if (month.toLowerCase().includes(key)) {
                            monthInEnglish = months[key];
                        } else if (month.toLowerCase().includes(months[key])) {
                            monthInEnglish = months[key];
                        }
                    });
                }

                if (!monthInEnglish) {
                    month = parseInt(month, 10);
                    Object.keys(monthInNumbers).forEach(function(key) {
                        if (month == key) {
                            monthInEnglish = monthInNumbers[key];
                        }
                    });
                }

                if (monthInEnglish) {
                    return monthInEnglish;
                } else {
                    return month;
                }
            };

            /**
             * GETS THE DEFAULT KEY TO QUERY THE VALUES INSIDE THE DATA-OBJECT
             * @param {int} index index of the data object which is queried
             * @param {string} propName Name of the tableKeyNames object key
             */
            let getData = function(index, key) {
                // ---- GET VALUES WITH KEYS FROM THE JSON OBJECT ----
                // JSON object[index number] with the correct key from tableKeyNames object
                let value = data[index][tableKeyNames[key]];
                value = removeEmptyValues(value, key);
                // if value is undefined, then we need to get a default value, cause there always needs to be something for most things
                // or simply just hardcode if statements on all hmtl block creations, so there will always be linked a default value
                return value;
            };

            /**
             * CHECK IF 2 DATES ARE THE SAME
             * @param {object} first First date object
             * @param {object} second Second date object to compare
             */
            const checkIfDateIsSame = (first, second) =>
                first.getFullYear() === second.getFullYear() &&
                first.getMonth() === second.getMonth() &&
                first.getDate() === second.getDate();

            // ---- GET AND TRIM DATA FROM THE OBJECT ----
            for (i = 0; i < objLenght; i++) {
                let newsData = {};
                let day, month, rawMonth, monthInEnglish, monthInDanish, year, author, icon;
                let headline, innerHTML, image, link;
                let isTagged = false;

                // ---- TRIM AND CREATE DATES ----
                day = getData(i, "day").trim();
                rawMonth = getData(i, "month").trim();
                // Make sure the month is in english for creating the date object (for sorting)
                monthInEnglish = getEnglishMonth(rawMonth);
                // And write it correctly in danish for showing to the users
                monthInDanish = cleanUpMonth(monthInEnglish);
                year = getData(i, "year").trim();

                // ---- ASSIGN THE DATES TO THE OBJECT ----
                // Get todays date for comparing
                var today = new Date();
                // Add 1, since the translation index starts at: 1 = January
                var todaysMonthString = getEnglishMonth(today.getMonth() + 1);
                // Get the month translated from number to text
                //var todaysMonthString = getEnglishMonth(datePlusOne);
                var todaysDate = new Date(`${todaysMonthString}, ${today.getDate()}, ${today.getFullYear()} 00:00:00`);

                newsData.date = new Date(`${monthInEnglish} ${day}, ${year} 00:00:00`); // Date object for sorting
                if (checkIfDateIsSame(newsData.date, todaysDate)) {
                    newsData.dateString = DEFAULTS.newsFromTodayText;
                    // Update to keep a counter showing how many news is from today
                    newsCreatedToday++;
                } else {
                    newsData.dateString = `${day}. ${monthInDanish} ${year}`; // Date as string for showing in page
                }

                // ---- CLEAN AUTHOR NAME STRING AND TURN TO UPPER CASE ----
                newsData.author = getData(i, "author").trim().toUpperCase();
                // Give author default value if nothing is specified by user
                if (!newsData.author) {
                    newsData.author = DEFAULTS.author;
                }

                // ---- TRY TO TAG AS SUPER USER (SU) ARTICLE ----
                DEFAULTS.newsTagOptions.isSU.forEach(tag => {
                    if (newsData.author.includes(tag)) {
                        newsData.tag = DEFAULTS.newsTagOptions.ifSUsetTag;
                        isTagged = true;
                    }
                });

                // ---- TRY TO TAG AS AN BUSINESS QUALITY ARTICLE ----
                if (!isTagged) {
                    DEFAULTS.newsTagOptions.isBusinessQuality.forEach(tag => {
                        if (newsData.author.includes(tag)) {
                            newsData.tag = DEFAULTS.newsTagOptions.ifBOQsetTag;
                            isTagged = true;
                        }
                    });
                }

                if (!isTagged) {
                    newsData.tag = "DEFAULT";
                    isTagged = true;
                }

                // ---- DETERMINE WHICH ICON TO USE ----
                newsData.icon = DEFAULTS.pebble;
                // Use this if you want user to be able to define icons
                // icon = getData(i, "icon").trim(); if (icon.toLowerCase() === "pebble") { newsData.icon = DEFAULTS.pebble; } else { newsData.icon = icon; }

                // ---- TRIM (REMOVE WHITESPACES) THE REST OF THE VALUES ----
                newsData.headline = getData(i, "headline").trim();
                newsData.innerHTML = getData(i, "contentText").trim();
                newsData.image = getData(i, "img").trim();
                newsData.link = getData(i, "href").trim();

                // ---- ASSIGN UNIQUE ID ----
                newsData.uniqueID = `news_${uniqueNumber}`;
                uniqueNumber++;

                // ---- PUSH EVERY OBJECT INTO THE ARRAYS ----
                allNewsContent.push(newsData);
                filteredTableData.push(newsData);
            }
            console.log("FETCHED DATA IN TABLE: all news content", allNewsContent);
            console.log("FETCHED DATA IN TABLE: filteredTableData", filteredTableData);
        },

        /**
         * CREATE HTML ELEMENTS BASED ON THE DATA OBJECT AS PARAMETER
         * @param {Object} props Object containing all data needed for creating the news block
         */
        createHTMLBlock: function(props) {
            let newsBlockWrapper, newsBlockHeader, newsBlockLogo,
                logoImage, newsBlockInfos, newsBlockAuthor, newsBlockDate,
                newsBlockContent, contentHeadline, contentParagraph,
                photosElement, photo, referenceElement, linkButton, allLinks, linkContainerContent, option;

            // ---- WRAPPER FOR EACH BLOCK IN THE PAGE ----
            newsBlockWrapper = new this.Template({
                tag: "DIV",
                class: classNames.mainBlockWrapper,
                id: props.uniqueID
            }).create();
            // Append inside the wrapper for the news section
            elements.newsSectionWrapper.appendChild(newsBlockWrapper);

            // ---- HEADER SECTION ----
            newsBlockHeader = new this.Template({
                tag: "DIV",
                class: classNames.headerSectionInBlock
            }).create();
            newsBlockWrapper.appendChild(newsBlockHeader);

            // ---- ELEMENT TO HOLD THE ICON/LOGO ----
            newsBlockLogo = new this.Template({
                tag: "DIV",
                class: classNames.elementForTheLogo
            }).create();
            newsBlockHeader.appendChild(newsBlockLogo);

            // ---- THE ICON/LOGO IMAGE ----
            if (!props.icon) {
                props.icon = DEFAULTS.pebble;
            }
            logoImage = new this.Template({
                tag: "IMG",
                class: classNames.logoImg,
                imageSrc: props.icon
            }).create();
            newsBlockLogo.appendChild(logoImage);

            // ---- THE INFORMATION ELEMENT (for author name and date) ----
            newsBlockInfos = new this.Template({
                tag: "DIV",
                class: classNames.authorAndDateInfos
            }).create();
            newsBlockHeader.appendChild(newsBlockInfos);

            // ---- AUTHOR NAME HEADLINE TAG ----
            if (!props.author) {
                props.author = DEFAULTS.author;
            }
            newsBlockAuthor = new this.Template({
                tag: "H2",
                class: classNames.author,
                innerHTML: props.author
            }).create();
            newsBlockInfos.appendChild(newsBlockAuthor);

            // ---- CREATION DATE HEADLINE TAG ----
            newsBlockDate = new this.Template({
                tag: "H3",
                class: classNames.date,
                innerHTML: props.dateString
            }).create();
            newsBlockInfos.appendChild(newsBlockDate);

            // ---- ELEMENT TO HOLD THE CONTENT ----
            newsBlockContent = new this.Template({
                tag: "DIV",
                class: classNames.contentSection
            }).create();
            newsBlockWrapper.appendChild(newsBlockContent);

            // ---- HEADLINE OF THE CONTENT (text/images) SECTION ----
            contentHeadline = new this.Template({
                tag: "H3",
                class: classNames.contentHeadline,
                innerHTML: props.headline
            }).create();
            newsBlockContent.appendChild(contentHeadline);

            // ---- THE TEXT IN THE CONTENT ----
            contentParagraph = new this.Template({
                tag: "p",
                class: classNames.textInContent,
                innerHTML: props.innerHTML
            }).create();
            newsBlockContent.appendChild(contentParagraph);

            // ---- QUERY ALL LINKS IN THE CONTENT ----
            var linksInText = contentParagraph.querySelectorAll("a");
            linksInText.forEach(function(link) {
                // Make sure links open in new tab or window
                link.target = "_blank";
            });

            // ---- IMAGES IN THE CONTENT SECTION ----
            // If there is no image starting with http, then the value shall be undefined
            // And therefore the image element will not be created
            if (props.image) {
                if (!props.image.includes("http")) {
                    props.image = undefined;
                }
                photosElement = new this.Template({
                    tag: "DIV",
                    class: classNames.imageContainer
                }).create();

                newsBlockWrapper.appendChild(photosElement);

                // ---- THE IMAGE TAG ----
                photo = new this.Template({
                    tag: "IMG",
                    class: classNames.image,
                    imageSrc: props.image
                }).create();

                // Add click event listener to the image,
                // To display modal with image when user clicks
                photo.addEventListener("click", function(event) {
                    newsPage.openNewsModal(this.src);
                });

                photosElement.appendChild(photo);
            }

            // ---- REFERENCES SECTION (for links/buttons) ----
            if (props.link) {
                referenceElement = new this.Template({
                    tag: "DIV",
                    class: classNames.linksAndButtonsSection
                }).create();

                newsBlockWrapper.appendChild(referenceElement);

                var linkElement = new this.Template({
                    tag: "div",
                    innerHTML: props.link
                }).create();

                // Get all links and place them inside the section
                //linkContainerContent = props.link.innerHTML;
                allLinks = linkElement.querySelectorAll("a");
                allLinks.forEach(function(link) {
                    // Give it the class for link buttons
                    link.className = classNames.linkButton;

                    if (link.href.toLowerCase().includes("http") == false) {
                        // If it does not contain http, its most likely a link to a humany guide
                        link.addEventListener("click", function(event) {
                            // Close and reset modal
                            triggers.toggleNewsModal();
                            newsPage.resetModalFilter();
                        });
                    } else {
                        // Make sure it opens in a new tab or window
                        link.target = "_blank";
                    }

                    // Place it inside the reference section in the block
                    referenceElement.appendChild(link);

                });

                // ---- THE BUTTON WITH A CLICK LISTENER TO URL ----
                // Create button with default textlabel, if nothing is defined
                // if (!props.linkText) { props.linkText = DEFAULTS.ifNoLinkText; }
                // linkButton = new this.Template(
                //     {
                //         tag: "A",
                //         class: classNames.linkButton,
                //         innerHTML: props.linkText
                //     }
                // ).create();

                // Add /[interfaceName]/ to the link, only if it does not contain http
                // if (props.link.toLowerCase().includes("http") == false) {
                //     // And then, if user already included the interfaceName in the link
                //     if (props.link.toLowerCase().includes(DEFAULTS.humanyInterfaceName)) {
                //         // Dont include interface name
                //         linkButton.href = `/${props.link}`;
                //     } else {
                //         // Include interfacename if not specified in the link
                //         linkButton.href = `/${DEFAULTS.humanyInterfaceName}/${props.link}`;
                //     }
                //     // These are not opening in new tabs, so add listener to close modal on click
                //     linkButton.addEventListener("click", function (event) {
                //         // Close the modal when directing to guide inside humany
                //         triggers.toggleNewsModal();
                //         // Reset modal search and filter, since modal is closing
                //         newsPage.resetModalFilter();
                //     });
                // } else {
                //     linkButton.href = props.link;
                //     // The target should be new tab or window (depending on browser preference)
                //     linkButton.target = "_blank";
                // }
                // // Close modal when a button link is clicked
                // // linkButton.addEventListener("click", function (event) {
                // //     // Close the modal when directing to guide inside humany
                // //     triggers.toggleNewsModal();
                // //     // Reset modal search and filter, since modal is closing
                // //     newsPage.resetModalFilter();
                // // });

                // referenceElement.appendChild(linkButton);
            }

            blocks.push(newsBlockWrapper);
        },

        /**
         * WILL SETUP THE SELECTOR FIELD IN THE MODAL
         */
        setupSelector: function() {
            let option, selector, objectLength;
            selector = document.querySelector(`#${DEFAULTS.selectorFieldID}`);

            Object.keys(DEFAULTS.SelectorOptions).forEach(key => {
                option = new this.Template({
                    tag: "OPTION",
                    class: "",
                    id: "",
                    innerHTML: DEFAULTS.SelectorOptions[key]
                }).create();
                selector.appendChild(option);
            });

            // ---- WHEN SELECTOR CHANGES, CALL APPLY FILTER FUNCTION ----
            selector.addEventListener("change", function(event) {
                newsPage.applyFilter(this.value);
            });
        },

        /**
         * SEARCH FUNCTION FOR THE INPUT FIELD
         * Will search through all news, and find matches on headline and dates
         * Function is called from event listener on the input field
         * @param {string} input What the user has typed in the search field
         */
        search: function(input) {
            let parentContainer, resultsContainer, arrayLenght, noResultMsg,
                //arrayToQuery = allNewsContent;
                arrayToQuery = filteredTableData;

            arrayLenght = arrayToQuery.length;

            // ---- QUERY THE PARENT TARGET ----
            parentContainer = document.querySelector(`#${DEFAULTS.searchContainer}`);

            // ---- CREATE SEARCH RESULT CONTAINER ----
            resultsContainer = new this.Template({
                tag: "DIV",
                class: classNames.search.resultsContainer,
                id: DEFAULTS.resultsContainerID
            }).create();
            parentContainer.appendChild(resultsContainer);

            // Switch the icons
            document.querySelector(`#${DEFAULTS.searchIconID}`).style.display = "none";
            document.querySelector(`#${DEFAULTS.searchDeleteIconID}`).style.display = "block";

            // ---- CREATE NOTHING-FOUND MESSAGE ELEMENT ----
            noResultMsg = new this.Template({
                tag: "DIV",
                class: classNames.search.noResult,
                innerHTML: DEFAULTS.searchNothingFoundText
            }).create();
            resultsContainer.appendChild(noResultMsg);

            // ---- LOOP THROUGH AND SEARCH FOR MATCH ON HEADLINE ----
            for (let i = 0; i < arrayLenght; i++) {
                let headline, headlineLenght, author, date, queryString, queryStringLenght,
                    resultAuthorElement, resultDateElement;

                // ---- GET THE HEADLINE STRING ----
                headline = arrayToQuery[i].headline;
                // Remove special characters except these
                headline = headline.replace(/[^a-zA-Z0-9.æøåÆØÅ!#%& ]/g, "");
                headlineLenght = headline.length;

                // ---- GET AUTHOR STRING ----
                author = arrayToQuery[i].author;

                // ---- GET THE DATE STRING ----
                date = arrayToQuery[i].dateString;
                // Remove characters
                date = date.replace('.', '');

                // ---- COMBINE HEADLINE AND DATE INTO ONE STRING TO SEARCH ----
                queryString = `${headline} ${date}`;
                queryStringLenght = queryString.length;

                // ---- CREATE ELEMENT DISPLAYING THE AUTHOR ----
                resultAuthorElement = new this.Template({
                    tag: "P",
                    class: classNames.search.resultDate,
                    innerHTML: author
                }).create();

                // ---- CREATE ELEMENT DISPLAYING THE DATE ----
                resultDateElement = new this.Template({
                    tag: "P",
                    class: classNames.search.resultDate,
                    innerHTML: date
                }).create();

                // ---- SEARCH HEADLINE STRING ----
                for (let j = 0; j < queryStringLenght; j++) {
                    let result, uniqueID;

                    // If first [input.lenght] letters of headline matches the input value
                    //if (headline.substr(j, input.length).toUpperCase() == input.toUpperCase()) {
                    if (queryString.substr(j, input.length).toUpperCase() == input.toUpperCase()) {

                        // Remove the message saying 'nothing was found'
                        noResultMsg.remove();

                        // ---- CREATE SEARCH RESULT ----
                        result = new this.Template({
                            tag: "DIV",
                            class: classNames.search.searchResult,
                            innerHTML: headline.substr(0, j)
                        }).create();
                        resultsContainer.appendChild(result);

                        // ---- HIGHLIGHT MATCHING LETTERS ----
                        result.innerHTML += `<strong>${headline.substr(j, input.length)}</strong>`;
                        result.innerHTML += headline.substr(j + input.length);
                        // Make the string a hidden value of the element
                        result.innerHTML += `<input type="hidden" value="${headline}">`;

                        // Place the author and date inside the result
                        result.appendChild(resultAuthorElement);
                        result.appendChild(resultDateElement);

                        // ---- GET UNIQUE ID NUMBER FOR THIS SPECIFIC TARGET ----
                        uniqueID = arrayToQuery[i].uniqueID;

                        // ---- ADD CLICK EVENT LISTENER TO THE RESULT ----
                        result.addEventListener("click", function(event) {

                            // Set the hidden value as the value in the inputfield
                            let searchField = document.querySelector(`#${DEFAULTS.searchFieldID}`);
                            searchField.value = this.getElementsByTagName("input")[0].value;

                            // Scroll to the block with the ID
                            newsPage.scrollToBlock(uniqueID);

                            // Close the list of results after this
                            newsPage.removeSearchResults();
                        });

                        // Break when match is found
                        break;
                    }
                }
            }
        },

        /**
         * CLEAR SEARCH FIELD
         */
        clearSearch: function() {
            document.querySelector(`#${DEFAULTS.searchFieldID}`).value = "";
            // remove the dropdown
            // Switch the icons
            document.querySelector(`#${DEFAULTS.searchIconID}`).style.display = "block";
            document.querySelector(`#${DEFAULTS.searchDeleteIconID}`).style.display = "none";
            this.removeSearchResults();
        },

        /**
         * RESET THE SELECTOR FIELD TO DEFAULT STATE
         */
        resetModalFilter: function() {
            let selector;
            selector = document.querySelector(`#${DEFAULTS.selectorFieldID}`);

            // Set the selected option as the first option
            selector.selectedIndex = 0;

            // Clear the search field
            newsPage.clearSearch();

            // Call the apply filter function, since selection is changed
            newsPage.applyFilter(selector.value);
        },

        /**
         * APPLIES FILTER BASED ON SELECTION IN THE SELECTOR ELEMENT IN MODAL
         */
        applyFilter: function(criteria) {
            let tag, // Keyword is what is searched for among all table data
                allNewsContentLenght,
                filteredTableDataLenght,
                reset = false, // Determines whether filtered array should be reset to default
                searchField;

            // Reset array of filtered table data
            filteredTableData = [];

            if (criteria.toUpperCase().includes(DEFAULTS.SelectorOptions.onlyNewsFromSU.toUpperCase())) {
                tag = DEFAULTS.newsTagOptions.ifSUsetTag;
            } else if (criteria.toUpperCase().includes(DEFAULTS.SelectorOptions.onlyNewsFromBOQ.toUpperCase())) {
                tag = DEFAULTS.newsTagOptions.ifBOQsetTag;
            } else {
                // Reset filtered array data, if no criteria is matching
                filteredTableData = allNewsContent;
                reset = true;
            }

            // ---- APPLY THE FILTER, IF CRITERIA IS UPDATED ----
            if (!reset) {
                allNewsContentLenght = allNewsContent.length;
                for (let i = 0; i < allNewsContentLenght; i++) {
                    // Check if author of news includes the keyword
                    // Refractor - should check the tag
                    if (allNewsContent[i].tag.includes(`${tag}`)) {
                        // Push it to the array of filtered data 
                        filteredTableData.push(allNewsContent[i]);
                    }
                }
            }

            // ---- REMOVE ELEMENTS BEFORE APPLYING FILTER ----
            this.clearPage();

            filteredTableDataLenght = filteredTableData.length;
            for (let i = 0; i < filteredTableDataLenght; i++) {
                let dataObject = filteredTableData[i];
                this.createHTMLBlock(dataObject);
            }

            // ---- CHECK FOR VALUE IN SEARCH FIELD ----
            // And search again if there was a value
            searchField = document.querySelector(`#${DEFAULTS.searchFieldID}`);
            if (searchField.value) {
                // Save the value
                let value = searchField.value;
                // Clear the searchfield to remove dropdown element
                this.clearSearch();
                // Set the value in the input field again
                searchField.value = value;
                // Call the search function with the value
                this.search(value);
            }

            // Loop igennem alle elementer og finde de ting som matcher
            // Lave en ny array af viste elementer (som søgefeltet skal bruge)
        },

        /**
         * REMOVE ALL NEWS ELEMENTS IN THE WRAPPER IN MODAL
         */
        clearPage: function() {
            let page;

            page = elements.newsSectionWrapper;
            while (page.firstChild) {
                page.removeChild(page.firstChild)
            }
        },

        /**
         * SCROLL TO ELEMENT IN THE PAGE
         * @param {string} uniqueID Element ID for which the page shall scroll to view
         */
        scrollToBlock: function(uniqueID) {
            let target;

            // ---- TARGET THE ELEMENT WITH THE ID ----
            target = document.querySelector(`#${uniqueID}`);

            // ---- TRY SMOOTH SCROLLING, OR USE OTHER METHOD FOR EDGE/IE ----
            try {
                //target.scrollIntoView({ behavior: "smooth" });
                // Gone with this one instead, since for edge scrollIntoView options in not supported
                target.parentNode.scrollTop = target.offsetTop - 70;
            } catch (error) {
                console.log(error);
                //target.parentNode.scrollTop = target.offsetTop - 70;
            }

            // ---- HIGHLIGHT OR ANIMATE ELEMENT ----
            // setTimeout(function () {
            //     target.style.borderColor = "red";
            // }, 600);
            // setTimeout(function () {
            //     target.style.borderColor = null;
            // }, 1200);
        },

        /**
         * REMOVE SEARCH RESULTS CONTAINER
         */
        removeSearchResults: function() {
            if (document.querySelector(`#${DEFAULTS.resultsContainerID}`)) {
                var target;
                target = document.querySelector(`#${DEFAULTS.resultsContainerID}`);
                target.remove();
            }
        },

        /**
         * WILL GENERATE A NEW MODAL ELEMENT AND DISPLAY IT
         * @param {string} imgSrc file source of image which was clicked
         */
        openNewsModal: function(imgSrc) {
            var modal;

            // ---- MAKE NEW MODAL ELEMENT ----
            modal = new this.Modal(
                classNames.modal.mainClass, // modal classname
                classNames.modal.closeButton, // close button classname
                classNames.modal.modalContent, // img classname
                imgSrc // img src (comes as parameter)
            ).createModal();
            // Place it inside the body
            document.body.appendChild(modal);

            // ---- DISPLAY MODAL AS BLOCK ----
            // (element is styled default as "hidden")
            modal.style.display = "block";
        },

        /**
         * CLOSE MODAL BY REMOVING ELEMENT
         * @param {element} target The element which should be removed
         */
        closeNewsModal: function(target) {
            target.remove();
        },

        /**
         * CREATE MODAL TO DISPLAY
         * @constructor
         * @param {string} modalClass ClassName of element
         * @param {string} closeBtnClass ClassName of the closing button inside modal
         * @param {string} modalImgClass ClassName of the image (content inside modal)
         * @param {string} modalImgSrc Src to the image displaying inside the modal
         */
        Modal: function(modalClass, closeBtnClass, modalImgClass, modalImgSrc) {
            this.modalClass = modalClass;
            this.closeBtnClass = closeBtnClass;
            this.modalImgClass = modalImgClass;
            this.modalImgSrc = modalImgSrc;

            this.createModal = function() {
                var modal = document.createElement("DIV");
                modal.className = modalClass;

                // ---- BUTTON TO CLOSE THE MODAL ----
                var close = document.createElement("span");
                close.className = closeBtnClass;
                close.innerHTML = "&times;";
                // On click event closing the modal
                close.addEventListener("click", function() {
                    newsPage.closeNewsModal(modal);
                });

                // ---- IMAGE INSIDE THE MODAL ----
                var modalImg = document.createElement("img");
                modalImg.className = modalImgClass;
                modalImg.src = modalImgSrc;
                modal.appendChild(close);
                modal.appendChild(modalImg);

                return modal;
            };
        },

        /**
         * CREATES HTML ELEMENTS BASED ON THE PARAMETERS OBJECT
         * @constructor
         * @param {Object} params Property object for the HTML element: tag, class, id, imageSrc, innerHTML
         */
        Template: function(params) {
            this.elementTag = params.tag;
            this.elementClass = params.class;
            this.elementId = params.id;
            this.imageSrc = params.imageSrc;
            this.innerHTML = params.innerHTML;

            this.create = function() {
                let htmlElement;
                if (this.elementTag) {
                    htmlElement = document.createElement(this.elementTag);
                } else {
                    htmlElement = document.createElement("DIV");
                }
                if (this.elementClass) {
                    htmlElement.className = this.elementClass;
                }
                if (this.elementId) {
                    htmlElement.id = this.elementId;
                }
                if (this.imageSrc) {
                    htmlElement.src = this.imageSrc;
                }
                if (this.innerHTML) {
                    htmlElement.innerHTML = this.innerHTML;
                }
                return htmlElement;
            };
        }
    };
}());

var triggers = function() {
        var e, n = "tjekit-all-brands",
            a = {
                newsLoadError: "Nyhederne blev ikke indlæst. Genindlæser siden."
            },
            r = {
                customNewsModal: "#_custom-newspage-modal",
                customNewsModalClose: "#_custom-newspage-modal-closebtn",
                panelSearchButton: "#_panel-btn-search",
                newsSectionWrapper: "#_newsSection-wrapper"
            };
        try {
            e = document.querySelector(r.customNewsModal)
        } catch (e) {
            console
                .error("News modal element could not be found", e), console.log("Check that the ID of the modal has not changed"), console.log("Check that the ID of the close button in the modal has not changed")
        }
        return document.querySelector(r.panelSearchButton).addEventListener("click", function() {
            var e = document.querySelector(r.newsSectionWrapper);
            if (e.firstChild) triggers.toggleNewsModal();
            else {
                var t = document.createElement("H3");
                t.innerHTML = a.newsLoadError, e.appendChild(t), triggers.toggleNewsModal(), setTimeout(function() {
                    window.location.href = "https://telia-dk.humany.net/".concat(n, "/")
                }, 1e3)
            }
        }), document.querySelector(r.customNewsModalClose).addEventListener("click", function() {
            triggers.toggleNewsModal(), newsPage.resetModalFilter()
        }), {
            toggleNewsModal: function() {
                "none" == e.style.display ? e.style.display = "block" : "block" == e.style.display && (e.style.display = "none")
            }
        }
    }();

setTimeout(function(){newsPage.fetchNotificationTables()},50);