"use strict";

/**
 *
 * @name Ace newspage
 * @author Jannik Maag - Github@Fuzzypawzz
 * @license MIT, open source
 * @language Vue.js (JavaScript)
 * @version 4.0
 * @description Custom newspage application, made as a Vue Component
 */
Vue.component("news-page", {
  props: {
    guides: {
      required: true
    },
    interfaceName: {
      type: String,
      required: true
    },
    latestNewsBlockId: {
      type: String,
      required: true
    }
  },
  data: function data() {
    return {
      state: {
        newsData: [],
        newsFromTodayCount: 0
      },
      latestNewsBlock: undefined,
      tableContainsHeaders: true,
      todaysDate: Object,
      columns: {
        day: "day",
        month: "month",
        year: "year",
        author: "author",
        headline: "headline",
        description: "description",
        images: "images",
        links: "links"
      },
      fieldsToBeGenerated: ["icon", "dateText", "tag", "publishedDate"],
      tableId: ".humany-notify-table",
      fallbackDay: "1",
      fallbackMonth: "January",
      fallbackYear: "2050",
      fallbackAuthor: "Redaktøren",
      months: {
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
      },
      monthsInDanish: {
        jan: "Januar",
        feb: "Februar",
        mar: "Marts",
        apr: "April",
        maj: "Maj",
        jun: "Juni",
        jul: "Juli",
        aug: "August",
        sept: "September",
        okt: "Oktober",
        nov: "November",
        dec: "December"
      },
      newsTagOptions: {
        isSU: ["SU", "S U", "S.U", "S. U", "SUPERUSER", "SUPER", "USER", "BRUGER"],
        // Determines that it is SU, if any of these is matching
        isBusinessQuality: ["BOQ", "PAINTEAMET", "PAINTEAM", "PAIN TEAMET", "PAIN TEAM", "QUALITY", "BUSINESS", "OPTIMI", "ZATION", "PAIN", "LØST", "PCES", "PCS", "PCE"],
        // Determines that it is BOQ, if any of these is mathing
        isVIP: ["VIP", "ENTERPRISE", "VIP TEAM"],
        SU_TAG: "SU",
        // Sets this as tag if article is made by SU
        BOQ_TAG: "BUSINESS QUALITY AND OPTIMIZATION",
        // Sets this as tag if article is made by BOQ
        VIP_TAG: "VIP" // Sets this as tag if article is made by VIP TEAM

      },
      constants: {
        newsFromTodayText: "Nyhed fra i dag",
        pebble: "https://humany.blob.core.windows.net/telia-dk/guides/pebble2.png",
        heartIcon: "fa fa-heart cmRed",
        infoIcon: "fa fa-info-circle tsPurple"
      }
    };
  },
  created: function created() {
    var _this = this;

    this.guides.forEach(function (guide) {
      return _this.getGuideBodyContent(guide);
    });
    setTimeout(function () {
      _this.state.newsData.sort(function (a, b) {
        return b.publishedDate - a.publishedDate;
      });
    }, 2000);
  },
  mounted: function mounted() {
    this.todaysDate = this.getTodaysDate();
    this.setLatestNewsBlockElement(); // this.changeInlineDisplayStyle({
    //   element: this.latestNewsBlock,
    //   display: true,
    // });
  },
  computed: {
    sorter: function sorter() {}
  },
  methods: {
    getGuideBodyContent: function getGuideBodyContent(guideId) {
      var _this2 = this;

      axios.get("https://telia-dk.humany.net/".concat(this.interfaceName, "/guides/").concat(guideId, "?language=da&credentials=true")).then(function (response) {
        _this2.parseDataInTableElement(_this2.queryTableElement({
          html: response.data.Body,
          id: _this2.tableId
        }));
      }).then(function () {
        _this2.washNewsData(); // TODO: Find another way to sort data, maybe computed property
        // Check find store application for the shop-sorting


        _this2.state.newsData.sort(function (a, b) {
          return b.publishedDate - a.publishedDate;
        });
      });
    },
    queryTableElement: function queryTableElement(_ref) {
      var html = _ref.html,
          id = _ref.id;
      var htmlContainer = document.createElement("DIV");
      htmlContainer.innerHTML = html;
      if (this.id) return htmlContainer.querySelector("#".concat(id));else return htmlContainer.querySelector("table");
    },
    parseDataInTableElement: function parseDataInTableElement(table) {
      var _this3 = this;

      var rows = this.createArrayFrom(table.rows);

      if (this.tableContainsHeaders) {
        rows = this.removeFirstRow(rows);
      }

      rows.forEach(function (row) {
        var entry = {};
        var columnKeys = Object.keys(_this3.columns);

        for (i = 0; i < columnKeys.length; i++) {
          entry[columnKeys[i]] = row.children[i] ? row.children[i].innerHTML : null;
        } // Initialise new keys in data, else the Vue Template won't work properly


        _this3.fieldsToBeGenerated.forEach(function (field) {
          entry[field] = "";
        });

        _this3.state.newsData.push(entry);
      });
    },
    tableToArray: function tableToArray(table) {
      var data = [];
      var headers = []; // GET THE INNER HTML FROM THE HEADER ROWS

      for (var _i = 0; _i < table.rows[0].cells.length; _i++) {
        headers[_i] = table.rows[0].cells[_i].id.toLowerCase().replace(/ /gi, "");
      } // GET INNER HTML FROM ALL ROWS, EXCLUDING THE TOP ROW (HEADERS)
      // Index starts at 1, since we already has the headers


      for (var _i2 = 1; _i2 < table.rows.length; _i2++) {
        var tableRow = table.rows[_i2];
        var rowData = {};

        for (var j = 0; j < tableRow.cells.length; j++) {
          rowData[headers[j]] = tableRow.cells[j].innerHTML;
        }

        data.push(rowData);
      }

      this.state.data = data;
    },
    removeEmptyValue: function removeEmptyValue(string) {
      // Except content text (description in my data)
      string = string.replace(/&nbsp;/g, "");
      return string;
    },
    removeTagsInString: function removeTagsInString(string) {
      if (string.includes("<p>")) {
        string = string.replace(/<p>/g, "");
        string = string.replace(/<\/p>/g, "");
      }

      if (string.includes("<div>")) {
        string = string.replace(/<div>/g, "");
        string = string.replace(/<\/div>/g, "");
      }

      if (string.includes("<br>")) {
        string = string.replace(/<br>/g, " ");
        string = string.replace(/<\/br>/g, " ");
      }

      return string;
    },
    removeFirstZero: function removeFirstZero(string) {
      if (string.slice(0, 1) === "0") string = string.replace(/^0+/, "");
      return string;
    },
    removeFirstRow: function removeFirstRow(array) {
      array.shift();
      return array;
    },
    createArrayFrom: function createArrayFrom(dataCollection) {
      return Array.from(dataCollection);
    },
    trimString: function trimString(string) {
      return string.trim();
    },
    translateToEnglishMonth: function translateToEnglishMonth(string) {
      var _this4 = this;

      var match = this.fallbackMonth;

      if (isNaN(string)) {
        Object.keys(this.months).forEach(function (monthAbbrivation) {
          if ( // if the large string includes one of the abbr.
          string.toLowerCase().includes(monthAbbrivation.toLowerCase()) || // if the keys (not abbrivation) but rather full months like "january" includes string..
          _this4.months[monthAbbrivation].toString().toLowerCase().includes(string.toLowerCase())) {
            match = _this4.months[monthAbbrivation];
          }
        });
        return match;
      }

      var number = parseInt(string, 10);
      Object.keys(this.months).forEach(function (monthAbbrivation, index) {
        index++;
        if (number === index) match = _this4.months[monthAbbrivation];
      });
      return match;
    },
    correctMonthSpelling: function correctMonthSpelling(string) {
      var _this5 = this;

      var match = string;

      if (isNaN(string)) {
        Object.keys(this.monthsInDanish).forEach(function (monthAbbrivation) {
          if (string.toLowerCase().includes(monthAbbrivation) || _this5.monthsInDanish[monthAbbrivation].toString().toLowerCase().includes(string)) {
            match = _this5.monthsInDanish[monthAbbrivation];
          }
        });
        return match;
      }

      var number = parseInt(string, 10);
      Object.keys(this.monthsInDanish).forEach(function (monthAbbrivation, index) {
        index++;
        console.log(index);

        if (number === index) {
          match = _this5.monthsInDanish[monthAbbrivation];
        }
      });
      return match;
    },

    /**
     *
     * @param {string} string
     * @description returns true if the string only contains spaces and nothing else
     * @returns Boolean
     */
    containsOnlySpaces: function containsOnlySpaces(string) {
      if (!string.trim()) return true;
    },
    setLatestNewsBlockElement: function setLatestNewsBlockElement() {
      this.latestNewsBlock = document.querySelector("#".concat(this.latestNewsBlockId));
    },
    changeInlineDisplayStyle: function changeInlineDisplayStyle(_ref2) {
      var element = _ref2.element,
          display = _ref2.display;
      if (!element) return new Error("no element was given..");
      if (display === undefined) return new Error("You must specify an action");
      if (display) element.style.display = "block";else element.style.display = "none";
    },

    /**
     *
     * @name scrollToElement
     * @param {string} elementId
     * @description Scrolls to the selected element in the document
     * @returns void
     */
    scrollToElement: function scrollToElement(elementId) {
      var target = document.querySelector("#".concat(elementId));
      if (!target) return new Error("Could not locate element to scroll to."); // TODO: Find out why -70 ??

      target.parentNode.scrollTop = target.offsetTop - 70;
    },

    /**
     *
     * @param {Date} firstDate Date object
     * @param {Date} secondDate Date object
     * @description Returns true if the objects has the same date
     */
    isDateTheSame: function isDateTheSame(firstDate, secondDate) {
      return firstDate.getFullYear() === secondDate.getFullYear() && firstDate.getMonth() === secondDate.getMonth() && firstDate.getDate() === secondDate.getDate();
    },

    /**
     *
     * @name getTodaysDate
     * @returns a Date object with todays date in Danish writing
     */
    getTodaysDate: function getTodaysDate() {
      var date = new Date(); // Add 1, since the translation index starts at: 1 = January

      var translatedMonth = this.translateToEnglishMonth(date.getMonth() + 1);
      return new Date("".concat(translatedMonth, ", ").concat(date.getDate(), ", ").concat(date.getFullYear(), " 00:00:00"));
    },

    /**
     *
     * @name washNewsData
     * @description Cleans up all news data for empty spaces and spelling mistakes to some extend
     * @returns void
     */
    washNewsData: function washNewsData() {
      var _this6 = this;

      this.state.newsData.forEach(function (newsArticle) {
        // Perform default things for all values in article
        Object.keys(_this6.columns).forEach(function (columnKey) {
          var value = newsArticle[columnKey];
          value = _this6.removeEmptyValue(value).trim(); // To keep the app from crashing if day or month or year does not exist,
          // set a default value

          if (!value && columnKey === _this6.columns["day"]) {
            value = _this6.fallbackDay;
          }

          if (columnKey === _this6.columns["month"]) {
            if (!value) {
              value = _this6.fallbackMonth;
            } else {
              value = _this6.correctMonthSpelling(value);
            }
          }

          if (columnKey === _this6.columns["year"]) {
            if (!value) {
              value = _this6.fallbackYear;
            }
          }

          if (!value && columnKey === _this6.columns["author"]) {
            value = _this6.fallbackAuthor;
          }

          newsArticle[columnKey] = value;
        });
        var articleDay = newsArticle[_this6.columns["day"]];
        var articleMonth = newsArticle[_this6.columns["month"]];

        var articleMonthInEnglish = _this6.translateToEnglishMonth(newsArticle[_this6.columns["month"]]);

        var articleYear = newsArticle[_this6.columns["year"]];
        var author = newsArticle[_this6.columns["author"]];
        newsArticle.publishedDate = new Date("".concat(articleMonthInEnglish, " ").concat(articleDay, ", ").concat(articleYear, " 00:00:00"));

        if (_this6.isDateTheSame(newsArticle.publishedDate, _this6.todaysDate)) {
          _this6.newsFromTodayCount++;
          newsArticle.dateText = _this6.constants.newsFromTodayText;
        } else {
          newsArticle.dateText = "".concat(articleDay, " ").concat(articleMonth, " ").concat(articleYear);
        }

        newsArticle.tag = _this6.getNewsTag(author);
        newsArticle.icon = _this6.getIconClassName(author); // INFO: IF ADDING MORE NEW FIELDS HERE, REMEMBER TO ADD THE FIELD TO list: fieldsToBeGenerated
      });
    },
    getNewsTag: function getNewsTag(authorName) {
      var options = this.newsTagOptions;
      var foundTag = "DEFAULT";
      options.isSU.forEach(function (tag) {
        if (authorName.includes(tag)) {
          foundTag = options.SU_TAG;
        }
      });
      options.isBusinessQuality.forEach(function (tag) {
        if (authorName.includes(tag)) {
          foundTag = options.BOQ_TAG;
        }
      });
      options.isVIP.forEach(function (tag) {
        if (authorName.includes(tag)) {
          foundTag = options.VIP_TAG;
        }
      });
      return foundTag;
    },
    getIconClassName: function getIconClassName(authorName) {
      var _this7 = this;

      var iconClass = this.constants.infoIcon;
      this.newsTagOptions.isBusinessQuality.forEach(function (tag) {
        if (authorName.includes(tag)) {
          iconClass = _this7.constants.heartIcon;
        }
      });
      return iconClass;
    }
  },
  template: "\n  <div>\n    <section class=\"news-selection-panel\">\n      <div class=\"news-selection-header\">\n        <h2 class=\"news-headline\">Filtrer nyneder</h2>\n        <p>V\xE6lg din nyhedskilde</p>\n      </div>\n\n      <div class=\"news-selection-selectors\">\n        <select\n          class=\"news-month-selector\"\n          disabled=\"disabled\"\n          style=\"cursor: not-allowed\"\n          id=\"_news-month-selector\"\n        >\n          <option>Se alle nyheder</option>\n          <option>Kun nyheder om kunde pains</option>\n          <option>Kun udmeldinger fra SU</option>\n        </select>\n      </div>\n\n      <div class=\"news-selection-subheader\">\n        <h3 class=\"news-headline\">S\xF8g i arkivet</h3>\n        <p>S\xF8g p\xE5 overskrift, m\xE5ned, \xE5r</p>\n      </div>\n      <div class=\"news-selection-search\" id=\"_news-selection-search\">\n        <input\n          class=\"news-selection-searchfield humany-search-style\"\n          id=\"_news-selection-searchfield\"\n          placeholder=\"S\xF8g..\"\n        />\n        <svg\n          class=\"humany-search-ts-icon\"\n          id=\"_humany-search-ts-icon\"\n          style=\"width: 40px; display: block\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n          viewBox=\"0 0 30 30\"\n        >\n          <path\n            d=\"M29.2 29.2a2.72 2.72 0 0 1-3.86 0L21.16 25A13.64 13.64 0 1 1 25 21.16l4.19 4.18a2.72 2.72 0 0 1 .01 3.86zM13.64 3.41a10.23 10.23 0 1 0 0 20.45 10.16 10.16 0 0 0 7.23-3 10.26 10.26 0 0 0 0-14.47 10.16 10.16 0 0 0-7.23-3\"\n          ></path>\n        </svg>\n        <svg\n          class=\"humany-delete-ts-icon\"\n          id=\"_humany-delete-ts-icon\"\n          style=\"display: none; width: 40px\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n          viewBox=\"0 0 30 30\"\n        >\n          <title>delete-ts-icon</title>\n          <g id=\"Layer_2\" data-name=\"Layer 2\">\n            <g id=\"Layer_1-2\" data-name=\"Layer 1\">\n              <path\n                d=\"M21.63,15l7-7A4.69,4.69,0,0,0,22,1.37l-7,7-7-7A4.69,4.69,0,0,0,1.37,8l7,7-7,7A4.69,4.69,0,0,0,8,28.63l7-7,7,7A4.69,4.69,0,0,0,28.63,22Z\"\n              ></path>\n            </g>\n          </g>\n        </svg>\n      </div>\n      <div\n        style=\"\n          height: 40px;\n          width: 344px;\n          background-repeat: no-repeat;\n          background-size: contain;\n          background-image: url(/Interfaces/Portal/Customer/Ace/logo.png);\n          position: absolute;\n          bottom: 30px;\n          left: 30px;\n        \"\n      ></div>\n    </section>\n\n    <div class=\"newsSection-wrapper\">\n\n      <div v-cloak v-for=\"(article, i) in state.newsData\" :key=\"i\" class=\"newsblock-01-wrapper\">\n        <section class=\"newsblock-01-header\">\n          <div class=\"newsblock-01-logo\">\n            <i v-if=\"article.icon && article.icon !== '&nbsp;'\"\n              :class=\"article.icon\"\n              class=\"ace-np-header__fa-icon\"></i>\n          </div>\n\n          <div class=\"newsblock-01-infos\">\n            <h2 class=\"newsblock-01-headline news-headline pebble-purple\">{{ article.author }}</h2>\n            <h3 class=\"newsblock-01-date\"> {{ article.dateText }} </h3>\n          </div>\n        </section>\n\n        <section class=\"newsblock-01-content\">\n          <h3 class=\"newsblock-content-headline\" v-html=\"article.headline\"></h3>\n          <section class=\"newsblock-content-p\" v-html=\"article.description\"></section>\n        </section>\n\n        <section v-if=\"article.images && article.images !== '&nbsp;'\"\n          v-html=\"article.images\"\n          class=\"newsblock-01-photos\">\n        </section>\n\n        <section v-if=\"article.links && article.links !== '&nbsp;'\" class=\"newsblock-01-refs\"\n          v-html=\"article.links\">\n        </section>\n      </div>\n    </div>\n  </div>\n  "
});