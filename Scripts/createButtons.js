var createButtons = (function () {

    const classAndIds = {
        favoritesDropdown: {
            id: "_dropdown-bookmarks",
            class: "dropdown-bookmarks"
        },
        favoritesBtn: {
            id: "favoritestoggle1",
            class: ""
        },
        linksDropdown: {
            id: "dropdownBtnLinks",
            class: "dropdown-content-1"
        },
        systemLinksBtn: {
            id: "btnDropdown",
            class: ""
        },
        searchField: {
            id: "_dropdown-search",
            class: "dropdown-search"
        },
        noBookmarksMessage: {
            id: "_noBookmarksMsg",
            class: "noBookmarksMsg"
        }
    };

    const DEFAULTS = {
        humanyInterfaceName: "tjekit-all-brands",
        bookmarkCookies: [],
        bookmarkElements: [],
        buttonsArray: [],
        hasNoBookmarks: false,
        noBookmarksText: "Du har ingen favoritter"
    };

    return {
        initiate: function () {
            var favoritesBtn, favoriteDropdown, systemDropdown, dropdownBtns,
                btn,
                targetButton,
                dropdown,
                searchfield,
                searchIcon;

            function arrSorter(a, b) {
                if (a.name < b.name) { return -1; }
                if (a.name > b.name) { return 1; }
                return 0;
            }

            // ---- FOR THE FAVORITES BUTTON ----
            favoriteDropdown = new this.Dropdown(
                {
                    tag: "DIV",
                    className: classAndIds.favoritesDropdown.class,
                    id: classAndIds.favoritesDropdown.id
                }
            ).create();

            // Append below favorites button
            favoritesBtn = document.querySelector(`#${classAndIds.favoritesBtn.id}`);
            favoritesBtn.appendChild(favoriteDropdown);

            // Add bookmark favorites to the element
            // if there is no bookmarks, nothing will be added
            //this.addGuideFavorites();

            // Check if bookmarks has been updated
            updatedBookmarks = this.isCookiesUpdated();
            if (updatedBookmarks) {
                this.addGuideFavorites(updatedBookmarks);
            } else {
                this.addGuideFavorites();
            }

            // ---- FOR THE SYSTEM LINKS ----
            linksDropdown = new this.Dropdown(
                {
                    tag: "DIV",
                    className: classAndIds.linksDropdown.class,
                    id: classAndIds.linksDropdown.id
                }
            ).create();
            // Apend below links button
            systemLinksBtn = document.querySelector(`#${classAndIds.systemLinksBtn.id}`);
            systemLinksBtn.appendChild(linksDropdown);

            // ---- SEARCH FIELD FOR SYSTEM LINKS ----
            searchfield = new this.Dropdown(
                {
                    tag: "INPUT",
                    className: classAndIds.searchField.class,
                    id: classAndIds.searchField.id,
                }
            ).create();
            searchfield.placeholder = "Søg..";
            searchfield.setAttribute(
                "onkeyup",
                "createButtons.searchSystemBtns()"
            );
            linksDropdown.appendChild(searchfield);
            searchfield.addEventListener("focus", function () {
                linksDropdown.style.display = "block";
            });
            searchfield.addEventListener("focusout", function () {
                // Remove display inline style, cross browser friendly
                if (linksDropdown.style.removeProperty) {
                    linksDropdown.style.removeProperty("display");
                } else {
                    linksDropdown.style.removeAttribute("display");
                }
            });
            // Create search icon
            searchIcon = document.createElement("i");
            searchIcon.className = "fa fa-search dropdown-search-icon";
            linksDropdown.appendChild(searchIcon);

            dropdownBtns = new this.Dropdown(
                {
                    tag: "DIV",
                    className: "dropdown-contents",
                    id: "_dropdown-contents"
                }
            ).create();
            linksDropdown.appendChild(dropdownBtns);

            // Only get links, if they have not been fetched before (and stored globally)
            if (DEFAULTS.buttonsArray.length === 0) {
                // Fetch all links and push to buttonsArray
                this.addSystemLinks();
            }

            DEFAULTS.buttonsArray.sort(arrSorter);
            DEFAULTS.buttonsArray.forEach(function (obj) {
                // Only create elements if URL is present
                if (obj.url !== "") {
                    var btn;
                    btn = new createButtons.CreateBtn(
                        {
                            descr: obj.name,
                            icon: obj.icon,
                            url: obj.url,
                            tag: "A",
                            openInNewTab: obj.target
                            // may need to be refractored, so target is true/false based on if its _blank
                        }
                    ).create();
                    dropdownBtns.appendChild(btn);
                }
            });

            // Add event listener to favorites button
            favoritesBtn.addEventListener("mouseenter", function () {
                // REFRACTOR - DOING THIS FUNCTION MULTIPLE TIMES, IS THAT REALLY NEEDED
                var updatedBookmarks = createButtons.isCookiesUpdated();
                if (updatedBookmarks) {
                    createButtons.addGuideFavorites(updatedBookmarks);
                }
            });
        },

        /**
         * CREATE BUTTON ELEMENTS
         * @param descr Description for the button
         * @param icon FontAwesome icon id
         * @param url URL for the a href
         * @param tag HTML element tag for the button, div, a, btn..
         * @param openInNewTab Boolean to define whether clicking the btn should open as "_blank" 
         */
        CreateBtn: function (params) {
            var openStyle;
            this.descr = params.descr;
            this.icon = params.icon;
            this.url = params.url;
            this.tag = params.tag;
            this.openInNewTab = params.openInNewTab;
            if (this.openInNewTab == false) {
                openStyle = "";
            } else if (this.openInNewTab == true) {
                openStyle = "_blank";
            }
            this.create = function () {
                // Create main element
                var linkElement = document.createElement(this.tag);
                if (this.url) { linkElement.setAttribute("href", this.url); }
                linkElement.setAttribute("target", openStyle);
                // Create the icon element
                var iconElement = document.createElement("i");
                iconElement.className = this.icon; // Create span element
                var spanElement = document.createElement("span");
                spanElement.className = "buttonspan";
                spanElement.innerHTML = " " + this.descr;
                // Append elements
                linkElement.appendChild(iconElement);
                iconElement.appendChild(spanElement);
                return linkElement;
            };
        },

        /**
         * CREATES A DROPDOWN MENU
         */
        Dropdown: function (params) {
            this.tag = params.tag;
            this.className = params.className;
            this.id = params.id;
            // this.targetId = params.targetId;
            this.create = function () {
                var dropdown = document.createElement(this.tag);
                if (params.className) { dropdown.className = this.className; }
                if (params.id) { dropdown.id = this.id; }
                return dropdown;
            };
        },

        /**
         * READS THE GUIDE COOKIES AND RETURNS ARRAY OF GUIDE ID'S
         */
        getGuideCookies: function () {
            function getAll(key) {
                var val = getCookie(key);
                return val ? JSON.parse(val) : [];
            };
            var getCookie = function getCookie(cookieName) {
                var documentCookie = document.cookie;
                if (documentCookie.length > 0) {
                    var start = documentCookie.indexOf(cookieName + "=");
                    if (start != -1) {
                        start = start + cookieName.length + 1;
                        var end = documentCookie.indexOf(";", start);
                        if (end == -1) {
                            end = documentCookie.length;
                        }
                        return unescape(documentCookie.substring(start, end));
                    }
                }
                return null;
            };
            var bookmarks = getAll('bookmarks');
            return bookmarks;
        },

        /**
         * CHECKS IF ARRAY OF GUIDE-BOOKMARK COOKIES HAS BEEN CHANGED
         * Returns an array of new cookies, if TRUE, else returns FALSE
         */
        isCookiesUpdated: function () {
            var bookmarks, bookmarksIsEqual;

            function equalArrays(arr1, arr2) {
                var sortedArr1, sortedArr2;
                if (arr1.length !== arr2.length) {
                    return false;
                }
                sortedArr1 = arr1.sort(function (a, b) { return b - a; });
                sortedArr2 = arr2.sort(function (a, b) { return b - a; });
                for (var i = 0; i < arr1.length; i++) {
                    if (sortedArr1[i] !== sortedArr2[i]) {
                        return false;
                    }
                }
                return true;
            }

            // ---- GET ARRAY OF BOOKMARKED ID'S ----
            bookmarks = this.getGuideCookies();

            // Set bool to tell that user has no bookmarks
            if (bookmarks.length === 0) {
                DEFAULTS.hasNoBookmarks = true;
                return bookmarks;
            } else {
                DEFAULTS.hasNoBookmarks = false;
            }

            // ---- UPDATE ELEMENTS IF BOOKMARKS HAS UPDATED ----
            bookmarksIsEqual = equalArrays(bookmarks, DEFAULTS.bookmarkCookies);

            // Return false if bookmarks are the same (not updated)
            // If bookmarks are not updated since last, then bookmarks should not be returned
            // Bookmarks is only returned when its needed to delete current elements and update with new ones
            if (bookmarksIsEqual) {
                return false;
            } else {
                return bookmarks;
            }
        },

        addGuideFavorites: function (updatedBookmarks) {
            var bookmarks, dropdown, favoriteDropdown, loadingMsg;
            favoriteDropdown = document.querySelector(`#${classAndIds.favoritesDropdown.id}`);

            if (updatedBookmarks) {
                // Reset bookmarks compare array
                DEFAULTS.bookmarkCookies = [];
                // Reset array of elements to avoid appending dublicates
                DEFAULTS.bookmarkElements = [];

                // Remove elements before creating the new ones
                while (favoriteDropdown.firstChild) {
                    favoriteDropdown.removeChild(favoriteDropdown.firstChild);
                }

                // Display message "there is no bookmarks" in case there is none
                if (DEFAULTS.hasNoBookmarks) {
                    this.displayDropdownMessage(DEFAULTS.noBookmarksText);
                    return;
                }

                loadingMsg = new this.CreateBtn({
                    descr: "Henter dine bogmærker..",
                    icon: "fa fa-info-circle",
                    tag: "A",
                    openInNewTab: false
                }).create();
                favoriteDropdown.appendChild(loadingMsg);

                // Sort the bookmarks, so it fits always in the same order
                bookmarks = updatedBookmarks.sort(function (a, b) { return b - a; });

                bookmarks.forEach(id => {
                    var link, guide, guideName, getGuide, getGuideURL;
                    // Push bookmarks to compare array
                    DEFAULTS.bookmarkCookies.push(id);
                    getGuideURL = `https://telia-dk.humany.net/${DEFAULTS.humanyInterfaceName}/guides/${id}?language=da&credentials=true`;
                    getGuide = new XMLHttpRequest();
                    getGuide.onreadystatechange = function () {
                        if (this.readyState == 4 && this.status == 200) {
                            fetchedJSON = JSON.parse(getGuide.responseText);
                            guideName = fetchedJSON.Title;

                            link = new createButtons.CreateBtn({
                                descr: guideName,
                                icon: "fa fa-star",
                                url: `https://telia-dk.humany.net/${DEFAULTS.humanyInterfaceName}/${guideName}/${id}`,
                                tag: "A",
                                openInNewTab: false
                            }).create();
                            DEFAULTS.bookmarkElements.push(link);
                        }
                    };
                    try {
                        getGuide.open("GET", getGuideURL, false);
                        getGuide.send();
                    } catch (err) {
                        console.log(err);
                    }
                });
                loadingMsg.remove();
            }

            DEFAULTS.bookmarkElements.forEach(link => {
                favoriteDropdown.appendChild(link);
            });

            // loadingMsg.remove();
        },

        displayDropdownMessage: function (messageText) {
            var favoriteDropdown, message;
            favoriteDropdown = document.querySelector(`#${classAndIds.favoritesDropdown.id}`);

            message = new this.CreateBtn({
                descr: messageText,
                icon: "fa fa-info-circle",
                tag: "A",
                openInNewTab: false
            }).create();

            message.id = classAndIds.noBookmarksMessage.id;
            favoriteDropdown.appendChild(message);
        },

        /**
         * ADDS SYSTEM LINKS FROM JSON TO THE ARRAY
         */
        addSystemLinks: function () {
            try {
                // Each feature in the JSON
                createSystemBtnsJSON.buttons.forEach(function (button) {
                    var name = "",
                        url = "",
                        icon = "",
                        target; // Assign props to variables

                    name = button.properties.name;
                    url = button.properties.url;
                    icon = button.properties.icon;
                    target = button.properties.openInNewTab; // If the url is empty, dont create the button

                    DEFAULTS.buttonsArray.push({
                        name: name,
                        url: url,
                        icon: icon,
                        target: target
                    });
                });
            } catch (error) {
                console.log(
                    "%cCreation of links/button failed, make sure the JSON structure is correct.",
                    "color: red; font-size: 14px"
                );
                console.log(error);
            }
        },

        searchSystemBtns: function () {
            var input, filter, elements, links, span, i, txtValue;
            input = document.getElementById("_dropdown-search");
            filter = input.value.toUpperCase();
            elements = document.getElementById("_dropdown-contents");
            links = elements.getElementsByTagName("a");

            for (i = 0; i < links.length; i++) {
                span = links[i].getElementsByTagName("span")[0];
                txtValue = span.textContent || span.innerText;

                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    links[i].style.display = "";
                } else {
                    links[i].style.display = "none";
                }
            }
        }

    };
})(); // This script is initiated from the notifications