var newsPage = (function () {
    "use strict";

    // ---------------------- TO DO's ----------------------
    // Make all content visible in the search field - use search field from store finder
    // If link in tabel does not contain http or https in front, then insert it (make it a href if its not)
    // Insert newsPage.initiate(); in the humany guide and not in this script
    // Set developer mode to false when testing in humany
    // Search field should query all news content
    // The modal in the html, shall either be there and reused when modal is clicked, or new modal shall be created every time
    // In the initiate module, call a function with the inputfield and array as parameter
    // Inside the new function - Add event listener to the input field
    // On input, call function to search, parameter is the value from the searchfield this.value
    // add event listener to //searchField = document.querySelector(`#${DEFAULTS.searchFieldID}`);

    // Trimmed data from the tables
    var allNewsContent = [];

    // Unique ID tracker to give elements ID's
    var uniqueNumber = 496373;

    // Carries the overall wrapper element
    // Should refractor if not used for anything else
    var elements = [];

    // All news blocks in the page
    var blocks = [];

    // ---- TRANSLATIONS OF KEYS ----
    // Change here, if changed in the table by user
    const tableKeys = {
        day: "dag",                 // Creation DAY of the article
        month: "måned",             // Same as above, but MONTH
        year: "år",                 // Same as above, but YEAR
        author: "afsender",         // The writers name, next to the pebble icon
        icon: "logo",               // The pebble icon, or any other icon is specified
        headline: "overskrift",     // Headline in the content section
        contentText: "tekst",       // The actual text in the content section
        img: "billede",             // Image if applicable, click to expand
        href: "link",               // Href, humany guide or link to website
        linkText: "linktekst"       // Label on the button which directs to the link
    };

    const DEFAULTS = {
        developerMode: false,                            // Turn on for developer mode (local env)
        pebble: "https://humany.blob.core.windows.net/telia-dk/guides/pebble2.png",  // Default pebble icon file path
        humanyGuideTarget: "h-portal-main",             // Target table inside this element
        notificationTableClass: "humany-notify-table",  // Notification tables where SU and PAIN news is located
        overAllPageWrapper: "_newsPage-wrapper",        // The overall wrapper of the news page
        newsSectionWrapperID: "_newsSection-wrapper",   // The wrapper which blocks shall be placed inside
        resultsContainerID: "_news-search-dropdown",    // The unique ID of the search results element
        searchContainer: "_news-selection-search",      // The element where searchfield sits inside
        searchFieldID: "_news-selection-searchfield",   // ID of the search field
        author: "BUSINESS QUALITY AND OPTIMIZATION",    // Default author name, if not specified
        noTableFoundMsg: "Fejl: Der blev ikke fundet en tabel med data",
        moreThanOneTableMsg: "Fejl: Der er fundet mere end 1 tabel med data. Der må kun være 1 tabel på siden",
        humanyNothing: "&nbsp;",                        // Means nothing in Humany editor language
        valueCanContainTags: "contentText"              // One paramter which is allowed to have paragraphs/divs inside
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
        }
    };

    // ---- DECLARE REMOVE-METHOD IN PROTOTYPE FOR IE ----
    if (!('remove' in Element.prototype)) {
        Element.prototype.remove = function () {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        };
    }

    // ---- DISPLAY MESSAGE IN DEVELOPER MODE ----
    if (DEFAULTS.developerMode) {
        console.log("Developer mode is ON, turn off before implementing in Humany");
    }

    return {
        /**
         * INITIATER - THE START OF THE SCRIPT,
         * this function is called from the humany guide after HTML is loaded
         */
        initiate: function () {
            var modalImgs, imgCount, tableNodeList, overAllPageWrapper,
                tableJSON, newsSectionWrapper, allNewsContentLenght, searchField, tableNodeListLenght;

            // Clear global variables, since the eefe is only loaded once in humany
            // And values in the variable will be dublicated everytime user loads the humany news page
            allNewsContent = [];
            elements = [];
            blocks = [];

            // ---- QUERY THE TABLE ----
            // Get all available tables in the page
            // if (DEFAULTS.developerMode == true) {
            //     tableNodeList = document.querySelectorAll("table");
            // } else {
            //     tableNodeList = document.querySelector(`.${DEFAULTS.humanyGuideTarget}`)
            //         .querySelectorAll("table");
            // }

            if (DEFAULTS.developerMode == true) {
                tableNodeList = document.querySelectorAll("table");
            } else {
                tableNodeList = document.querySelectorAll(`.${DEFAULTS.notificationTableClass}`);

                if (tableNodeList.length == 0) {
                    console.log("News has not been loaded. Will redirect to homepage");
                }

            }

            // ---- HIDE ALL TABLES INSIDE THE HUMANY GUIDE ----
            // The table is only applicable in the editor interface
            tableNodeListLenght = tableNodeList.length;
            for (let i = 0; i < tableNodeList.length; i++) {
                tableNodeList[i].style.display = "none";
            }

            // ---- DISPLAY THE PAGE INSIDE THE WRAPPER ----
            // Wrapper content is not displayed inside the editor interface
            // Is hidden with CSS as default, since scripts is not loaded in the humany editor
            //overAllPageWrapper = document.querySelector(`#${DEFAULTS.overAllPageWrapper}`);
            //overAllPageWrapper.style.display = "block";

            // ---- QUERY NEWS SECTION WRAPPER ----
            // Get the news section wrapper by ID to place blocks inside
            newsSectionWrapper = document.querySelector(`#${DEFAULTS.newsSectionWrapperID}`);
            // Place it inside the elements object for later reference
            elements.newsSectionWrapper = newsSectionWrapper;

            // ---- PARSE TABLE TO JSON ONLY IF 1 TABLE IS FOUND ----
            for (let i = 0; i < tableNodeListLenght; i++) {
                tableJSON = newsPage.tableToJson(tableNodeList[i]);
                console.log("tableJSON is: ", tableJSON);
                this.trimTableData(tableJSON);
            }

            // if (tableNodeList.length === 1) {
            //     tableJSON = newsPage.tableToJson(tableNodeList[0]);
            //     //console.log("tableJSON", tableJSON);
            //     // TrimTableData will push objects to allNewsContent
            //     this.trimTableData(tableJSON);
            //     // Else write out the errors in the console
            // } else if (tableNodeList.length == 0) {
            //     console.error(DEFAULTS.noTableFoundMsg);
            // } else {
            //     console.error(DEFAULTS.moreThanOneTableMsg);
            // }

            // ---- SORT JSON TABLEDATA BY DATE DESC ----
            allNewsContent.sort(
                function (a, b) {
                    return b.date - a.date;
                }
            );

            // ---- SETUP AND PREPARE SEARCH FIELD ----
            searchField = document.querySelector(`#${DEFAULTS.searchFieldID}`);
            // Add click event listener
            searchField.addEventListener("input", function (event) {
                // Remove all results
                newsPage.removeSearchResults();

                // Don't continue if there is no value
                if (!this.value) { return; }

                // Call the search function
                newsPage.search(this.value);
            });

            // ---- CREATE THE HTML BLOCKS ----
            // Loop through all news objects and create blocks for each
            allNewsContentLenght = allNewsContent.length;
            for (let i = 0; i < allNewsContentLenght; i++) {
                let dataObject = allNewsContent[i];
                this.createHTMLBlock(dataObject);
            }

            // ---- HOW TO QUERY THE DATE ----
            // console.log(blocks[0]
            //     .querySelector(`.${classNames.headerSectionInBlock}`)
            //     .querySelector(`.${classNames.authorAndDateInfos}`)
            //     .querySelector(`.${classNames.date}`).innerHTML);
            //elements.newsSectionWrapper.appendChild(blocks[0]);
            //console.log(blocks);

            // ---- ADD 'CLICK' EVENT LISTENERS TO IMAGES IN THE BLOCKS ----
            // Get all images in the page
            modalImgs = document.querySelectorAll(`.${classNames.image}`);
            imgCount = modalImgs.length;
            // Add event listeners to all images in the page
            for (var i = 0; i < imgCount; i++) {
                modalImgs[i].addEventListener("click", function () {
                    // On click on image, open modal
                    // Use image source as parameter
                    newsPage.openNewsModal(this.src);
                });
            }
        },

        fetchNotificationTables: function () {
            var modalImgs, imgCount, tableNodeList, tableNodeListLenght, overAllPageWrapper,
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
                console.log(DEFAULTS.notificationTableClass);
                tableNodeList = document.querySelectorAll(`.${DEFAULTS.notificationTableClass}`);
            }

            console.log("tableNodeList", tableNodeList);

            // ---- HIDE ALL TABLES INSIDE THE HUMANY GUIDE ----
            // The table is only applicable in the editor interface
            tableNodeListLenght = tableNodeList.length;
            for (let i = 0; i < tableNodeListLenght; i++) {
                tableNodeList[i].style.display = "none";
            }

            // ---- QUERY THE BLOCK TO DISPLAY LATEST NEWS ----
            // Get the target block by ID to place latest news inside
            newsSectionWrapper = document.querySelector(`#HumanyCustom-latest-news`);
            // Place it inside the elements object for later reference
            elements.latestNewsBlock = newsSectionWrapper;

            // ---- PARSE TABLES DATA TO JSON ----
            for (let i = 0; i < tableNodeListLenght; i++) {
                tableJSON = newsPage.tableToJson(tableNodeList[i]);
                console.log("tableJSON", tableJSON);
                this.trimTableData(tableJSON);
            }

            // ---- SORT JSON TABLEDATA BY DATE DESC ----
            allNewsContent.sort(
                function (a, b) {
                    return b.date - a.date;
                }
            );

            // ---- CREATE NEWS ELEMENTS IN THE TOP-10 BLOCK ----
            allNewsContentLenght = allNewsContent.length;
            for (let i = 0; i < allNewsContentLenght; i++) {
                let newsItem, newsHeadline, newsDate;

                newsItem = new this.Template(
                    {
                        tag: "DIV",
                        class: "latestNewsItem",
                        id: allNewsContent[i].uniqueID
                    }
                ).create();
                newsItem.addEventListener("click", function (event) {
                    console.log(this.id);
                });
                elements.latestNewsBlock.appendChild(newsItem);

                newsHeadline = new this.Template(
                    {
                        tag: "P",
                        class: "latestNewsHeadline",
                        innerHTML: allNewsContent[i].headline
                    }
                ).create();
                newsItem.appendChild(newsHeadline);

                    newsDate = new this.Template(
                        {
                            tag: "P",
                            class: "latestNewsDate",
                            innerHTML: allNewsContent[i].dateString
                        }
                    ).create();
                newsItem.appendChild(newsDate);
            }
        },

        /**
         * TURNS THE TABLES DATA INTO JSON
         * First row needs to be headers!
         * @param {Object} table Object containing the table data (rows/columns) queried in the page
         */
        tableToJson: function (table) {
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
                } data.push(rowData);
            }
            return data;
        },

        /**
         * TRIM AND CLEAN THE DATA, AND PARSE DATES FROM THE DATA OBJECT
         * Will update allNewsContent with the "clean" data
         * @param {Object} data The JSON data object, the "tableJSON"
         */
        trimTableData: function (data) {
            let objLenght, i;
            objLenght = data.length;

            /**
             * GETS THE DEFAULT KEY TO QUERY THE VALUES INSIDE THE DATA-OBJECT
             * @param {int} index index of the data object which is queried
             * @param {string} propName Name of the tableKeys object key
             */
            let getData = function (index, key) {
                // ---- GET VALUES WITH KEYS FROM THE JSON OBJECT ----
                // JSON object[index number] with the correct key from tableKeys object
                let value = data[index][tableKeys[key]];
                value = removeEmptyValues(value, key);
                // if value is undefined, then we need to get a default value, cause there always needs to be something for most things
                // or simply just hardcode if statements on all hmtl block creations, so there will always be linked a default value
                return value;
            };

            /**
             * REMOVE SPECIAL CHARS WHICH MEANS NOTHING IN HUMANY
             * @param {string} value The value which shall be checked for special Humany chars
             */
            let removeEmptyValues = function (value, key) {
                console.log(key);
                // ---- CHECK IF STRING VALUE MEANS EMPTY ----
                if (value.includes(DEFAULTS.humanyNothing)) {
                    // Replace rubbish
                    value = value.replace(/&nbsp;/g, "");
                }

                if (key == DEFAULTS.valueCanContainTags == false) {

                    if ( value.includes("<p>") ) {
                        let replacement = value.replace(/<p>/g, "");
                        replacement = replacement.replace(/<\/p>/g, "");
                        value = replacement;
                    }

                    if ( value.includes("<div>") ) {
                        let replacement = value.replace(/<div>/g, "");
                        replacement = replacement.replace(/<\/div>/g, "");
                        value = replacement;
                    }

                    if ( value.includes("<br>") ) {
                        let replacement = value.replace(/<br>/g, " ");
                        replacement = replacement.replace(/<\/br>/g, " ");
                        value = replacement;
                    }

                    if ( value.includes("<a href") ) {
                        let replacement = value.replace(/<a\b[^>]*>/i,"").replace(/<\/a>/i, "");
                        value = replacement;
                    }
                }

                return value;
            };

            for (i = 0; i < objLenght; i++) {
                let newsData = {};
                let day, month, year, author, icon;
                let headline, innerHTML, image, link, linkText;

                // ---- TRIM AND CREATE DATES ----
                day = getData(i, "day").trim();
                month = getData(i, "month").trim();
                year = getData(i, "year").trim();

                // ---- ASSIGN THE DATES TO THE OBJECT ----
                newsData.dateString = `${day}. ${month} ${year}`;   // Date as string for showing in page
                newsData.date = new Date(`${month} ${day}, ${year} 00:00:00`);  // Date object for sorting

                // ---- CLEAN AUTHOR NAME STRING AND TURN TO UPPER CASE ----
                newsData.author = getData(i, "author").trim().toUpperCase();

                // ---- DETERMINE WHICH ICON TO USE ----
                icon = getData(i, "icon").trim();
                if (icon.toLowerCase() === "pebble") {
                    newsData.icon = DEFAULTS.pebble;
                } else {
                    newsData.icon = icon;
                }

                // ---- TRIM (REMOVE WHITESPACES) THE REST OF THE VALUES ----
                newsData.headline = getData(i, "headline").trim();
                newsData.innerHTML = getData(i, "contentText").trim();
                newsData.image = getData(i, "img").trim();
                newsData.link = getData(i, "href").trim();
                newsData.linkText = getData(i, "linkText").trim();

                // ---- ASSIGN UNIQUE ID ----
                newsData.uniqueID = `news_${uniqueNumber}`;
                uniqueNumber++;

                // ---- PUSH EVERY OBJECT INTO THE ARRAY ----
                allNewsContent.push(newsData);
            }

            console.log("allNewsContent", allNewsContent);
        },

        /**
         * CREATE HTML ELEMENTS BASED ON THE DATA OBJECT AS PARAMETER
         * @param {Object} props Object containing all data needed for creating the news block
         */
        createHTMLBlock: function (props) {
            let newsBlockWrapper, newsBlockHeader, newsBlockLogo,
                logoImage, newsBlockInfos, newsBlockAuthor, newsBlockDate,
                newsBlockContent, contentHeadline, contentParagraph,
                photosElement, photo, referenceElement, linkButton;

            // ---- WRAPPER FOR EACH BLOCK IN THE PAGE ----
            newsBlockWrapper = new this.Template(
                { tag: "DIV", class: classNames.mainBlockWrapper, id: props.uniqueID }
            ).create();
            // Append inside the wrapper for the news section
            elements.newsSectionWrapper.appendChild(newsBlockWrapper);

            // ---- HEADER SECTION ----
            newsBlockHeader = new this.Template(
                { tag: "DIV", class: classNames.headerSectionInBlock }
            ).create();
            newsBlockWrapper.appendChild(newsBlockHeader);

            // ---- ELEMENT TO HOLD THE ICON/LOGO ----
            newsBlockLogo = new this.Template(
                { tag: "DIV", class: classNames.elementForTheLogo }
            ).create();
            newsBlockHeader.appendChild(newsBlockLogo);

            // ---- THE ICON/LOGO IMAGE ----
            if (!props.icon) {
                props.icon = DEFAULTS.pebble;
            }
            logoImage = new this.Template(
                { tag: "IMG", class: classNames.logoImg, imageSrc: props.icon }
            ).create();
            newsBlockLogo.appendChild(logoImage);

            // ---- THE INFORMATION ELEMENT (for author name and date) ----
            newsBlockInfos = new this.Template(
                { tag: "DIV", class: classNames.authorAndDateInfos }
            ).create();
            newsBlockHeader.appendChild(newsBlockInfos);

            // ---- AUTHOR NAME HEADLINE TAG ----
            if (!props.author) { props.author = DEFAULTS.author; }
            newsBlockAuthor = new this.Template(
                {
                    tag: "H2",
                    class: classNames.author,
                    innerHTML: props.author
                }
            ).create();
            newsBlockInfos.appendChild(newsBlockAuthor);

            // ---- CREATION DATE HEADLINE TAG ----
            newsBlockDate = new this.Template(
                { tag: "H3", class: classNames.date, innerHTML: props.dateString }
            ).create();
            newsBlockInfos.appendChild(newsBlockDate);

            // ---- ELEMENT TO HOLD THE CONTENT ----
            newsBlockContent = new this.Template(
                { tag: "DIV", class: classNames.contentSection }
            ).create();
            newsBlockWrapper.appendChild(newsBlockContent);

            // ---- HEADLINE OF THE CONTENT (text/images) SECTION ----
            contentHeadline = new this.Template(
                { tag: "H3", class: classNames.contentHeadline, innerHTML: props.headline }
            ).create();
            newsBlockContent.appendChild(contentHeadline);

            // ---- THE TEXT IN THE CONTENT ----
            contentParagraph = new this.Template(
                { tag: "p", class: classNames.textInContent, innerHTML: props.innerHTML }
            ).create();
            newsBlockContent.appendChild(contentParagraph);

            // ---- IMAGES IN THE CONTENT SECTION ----
            // If there is no image starting with http, then the value shall be undefined
            // And therefore the image element will not be created
            if (!props.image.includes("http")) { props.image = undefined; }
            if (props.image) {
                photosElement = new this.Template(
                    { tag: "DIV", class: classNames.imageContainer }
                ).create();
                newsBlockWrapper.appendChild(photosElement);

                // ---- THE IMAGE TAG ----
                photo = new this.Template(
                    { tag: "IMG", class: classNames.image, imageSrc: props.image }
                ).create();
                photosElement.appendChild(photo);
            }

            // ---- REFERENCES SECTION (for links/buttons) ----
            if (props.linkText) {
                referenceElement = new this.Template(
                    { tag: "DIV", class: classNames.linksAndButtonsSection }
                ).create();
                newsBlockWrapper.appendChild(referenceElement);

                // ---- THE BUTTON WITH A CLICK LISTENER TO URL ----
                linkButton = new this.Template(
                    { tag: "BUTTON", class: classNames.linkButton, innerHTML: props.linkText }
                ).create();
                linkButton.addEventListener("click", function (event) {
                    window.location = props.link;
                });
                referenceElement.appendChild(linkButton);
            }
            blocks.push(newsBlockWrapper);
        },

        /**
         * SEARCH FUNCTION FOR THE INPUT FIELD
         * Will search through all news, and find matches on headline and dates
         * Function is called from event listener on the input field
         * @param {string} input What the user has typed in the search field
         */
        search: function (input) {
            let parentContainer, resultsContainer, arrayLenght, noResultMsg;
            arrayLenght = allNewsContent.length;

            // ---- QUERY THE PARENT TARGET ----
            parentContainer = document.querySelector(`#${DEFAULTS.searchContainer}`);

            // ---- CREATE SEARCH RESULT CONTAINER ----
            resultsContainer = new this.Template(
                {
                    tag: "DIV",
                    class: classNames.search.resultsContainer,
                    id: DEFAULTS.resultsContainerID
                }
            ).create();

            // Append in parent, below the searchfield
            parentContainer.appendChild(resultsContainer);

            // ---- CREATE NOTHING-FOUND MESSAGE ELEMENT ----
            noResultMsg = new this.Template(
                {
                    tag: "DIV",
                    class: classNames.search.noResult,
                    innerHTML: "Der blev ikke fundet noget!"
                }
            ).create();
            resultsContainer.appendChild(noResultMsg);

            // ---- LOOP THROUGH AND SEARCH FOR MATCH ON HEADLINE ----
            for (let i = 0; i < arrayLenght; i++) {
                let headline, headlineLenght, author, date, queryString, queryStringLenght,
                    resultAuthorElement, resultDateElement;

                // ---- GET THE HEADLINE STRING ----
                headline = allNewsContent[i].headline;
                // Remove special characters except these
                headline = headline.replace(/[^a-zA-Z0-9.æøå!#%& ]/g, "");
                headlineLenght = headline.length;

                // ---- GET AUTHOR STRING ----
                author = allNewsContent[i].author;

                // ---- GET THE DATE STRING ----
                date = allNewsContent[i].dateString;
                // Remove characters
                date = date.replace('.', '');

                // ---- COMBINE HEADLINE AND DATE INTO ONE STRING TO SEARCH ----
                queryString = `${headline} ${date}`;
                queryStringLenght = queryString.length;

                // ---- CREATE ELEMENT DISPLAYING THE AUTHOR ----
                resultAuthorElement = new this.Template(
                    {
                        tag: "P",
                        class: classNames.search.resultDate,
                        innerHTML: author
                    }
                ).create();

                // ---- CREATE ELEMENT DISPLAYING THE DATE ----
                resultDateElement = new this.Template(
                    {
                        tag: "P",
                        class: classNames.search.resultDate,
                        innerHTML: date
                    }
                ).create();

                // ---- SEARCH HEADLINE STRING ----
                for (let j = 0; j < queryStringLenght; j++) {
                    let result, uniqueID;

                    // If first [input.lenght] letters of headline matches the input value
                    //if (headline.substr(j, input.length).toUpperCase() == input.toUpperCase()) {
                    if (queryString.substr(j, input.length).toUpperCase() == input.toUpperCase()) {

                        // Remove the message saying 'nothing was found'
                        noResultMsg.remove();

                        // ---- CREATE SEARCH RESULT ----
                        result = new this.Template(
                            {
                                tag: "DIV",
                                class: classNames.search.searchResult,
                                innerHTML: headline.substr(0, j)
                            }
                        ).create();
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
                        uniqueID = allNewsContent[i].uniqueID;

                        // ---- ADD CLICK EVENT LISTENER TO THE RESULT ----
                        result.addEventListener("click", function (event) {

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
         * SCROLL TO ELEMENT IN THE PAGE
         * @param {string} uniqueID Element ID for which the page shall scroll to view
         */
        scrollToBlock: function (uniqueID) {
            let target;

            // ---- TARGET THE ELEMENT WITH THE ID ----
            target = document.querySelector(`#${uniqueID}`);

            // ---- TRY SMOOTH SCROLLING, OR USE OTHER METHOD FOR EDGE/IE ----
            try {
                target.scrollIntoView({ behavior: "smooth" });
            }
            catch (error) {
                console.log(error);
                target.parentNode.scrollTop = target.offsetTop - 30;
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
        removeSearchResults: function () {
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
        openNewsModal: function (imgSrc) {
            var modal;

            // ---- MAKE NEW MODAL ELEMENT ----
            modal = new this.Modal(
                classNames.modal.mainClass,     // modal classname
                classNames.modal.closeButton,   // close button classname
                classNames.modal.modalContent,  // img classname
                imgSrc                          // img src (comes as parameter)
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
        closeNewsModal: function (target) {
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
        Modal: function (modalClass, closeBtnClass, modalImgClass, modalImgSrc) {
            this.modalClass = modalClass;
            this.closeBtnClass = closeBtnClass;
            this.modalImgClass = modalImgClass;
            this.modalImgSrc = modalImgSrc;

            this.createModal = function () {
                var modal = document.createElement("DIV");
                modal.className = modalClass;

                // ---- BUTTON TO CLOSE THE MODAL ----
                var close = document.createElement("span");
                close.className = closeBtnClass;
                close.innerHTML = "&times;";
                // On click event closing the modal
                close.addEventListener("click", function () {
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
        Template: function (params) {
            this.elementTag = params.tag;
            this.elementClass = params.class;
            this.elementId = params.id;
            this.imageSrc = params.imageSrc;
            this.innerHTML = params.innerHTML;

            this.create = function () {
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

// Allow time for all tables to load before calling first function
setTimeout(function(){newsPage.fetchNotificationTables()},50);