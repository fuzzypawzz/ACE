/**
 * Custom newspage cmponent
 * Framework: Vue.js
 * Author: Jannik Maag, Telia Company
 * Date: 05 June 2021
 * License: MIT
 */

Vue.component("news-page", {
  props: {
    guides: {
      required: true,
    },
    interfaceName: {
      type: String,
      required: true,
    },
    latestNewsBlockId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      state: {
        newsData: [],
        data: undefined,
        newsFromTodayCount: 0,
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
        links: "links",
      },
      tableId: ".humany-notify-table",
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
        dec: "december",
      },
      monthsInDanish: {
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
        dec: "December",
      },
      newsTagOptions: {
        isSU: [
          "SU",
          "S U",
          "S.U",
          "S. U",
          "SUPERUSER",
          "SUPER",
          "USER",
          "BRUGER",
        ], // Determines that it is SU, if any of these is matching
        isBusinessQuality: [
          "BOQ",
          "QUALITY",
          "BUSINESS",
          "OPTIMI",
          "ZATION",
          "PAIN",
          "LØST",
          "PCES",
          "PCS",
          "PCE",
        ], // Determines that it is BOQ, if any of these is mathing
        isVIP: ["VIP", "ENTERPRISE", "VIP TEAM"],
        SU_TAG: "SU", // Sets this as tag if article is made by SU
        BOQ_TAG: "BUSINESS QUALITY AND OPTIMIZATION", // Sets this as tag if article is made by BOQ
        VIP_TAG: "VIP", // Sets this as tag if article is made by VIP TEAM
      },
      constants: {
        newsFromTodayText: "Nyhed fra i dag",
      },
    };
  },

  created() {
    this.getGuideBodyContent(this.guides[1]);
  },

  mounted() {
    this.todaysDate = this.getTodaysDate();
    this.setLatestNewsBlockElement();
    // this.changeInlineDisplayStyle({
    //   element: this.latestNewsBlock,
    //   display: true,
    // });
    console.log(this.getNewsTag("BUSINESS"));
  },

  computed: {},

  methods: {
    getGuideBodyContent(guideId) {
      axios
        .get(
          `https://telia-dk.humany.net/${this.interfaceName}/guides/${guideId}?language=da&credentials=true`
        )
        .then((response) =>
          this.parseDataInTableElement(
            this.queryTableElement({
              html: response.data.Body,
              id: this.tableId,
            })
          )
        )
        .then(() => {
          this.washNewsData();
        });
    },

    queryTableElement({ html, id }) {
      const htmlContainer = document.createElement("DIV");
      htmlContainer.innerHTML = html;

      if (this.id) return htmlContainer.querySelector(`#${id}`);
      else return htmlContainer.querySelector("table");
    },

    parseDataInTableElement(table) {
      let rows = this.createArrayFrom(table.rows);
      if (this.tableContainsHeaders) {
        rows = this.removeFirstRow(rows);
      }

      rows.forEach((row) => {
        const entry = {};
        const columnKeys = Object.keys(this.columns);

        for (i = 0; i < columnKeys.length; i++) {
          entry[columnKeys[i]] = row.children[i]
            ? row.children[i].innerHTML
            : null;
        }
        this.state.newsData.push(entry);
      });
    },

    tableToArray(table) {
      const data = [];
      const headers = [];

      // ---- GET THE INNER HTML FROM THE HEADER ROWS ----
      // And remove all whitespaces
      for (let i = 0; i < table.rows[0].cells.length; i++) {
        //headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi, '');
        headers[i] = table.rows[0].cells[i].id.toLowerCase().replace(/ /gi, "");
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
      this.state.data = data;
    },

    removeEmptyValue(string) {
      // Except content text (description in my data)
      // console.log(string)
      // string = string.replace(/&nbsp;/g, "");
      // console.log(string);
      return string;
    },

    removeTagsInString(string) {
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

    removeFirstZero(string) {
      if (string.slice(0, 1) === "0") string = string.replace(/^0+/, "");
      return string;
    },

    removeFirstRow(array) {
      array.shift();
      return array;
    },

    createArrayFrom(dataCollection) {
      return Array.from(dataCollection);
    },

    trimString(string) {
      return string.trim();
    },

    translateToEnglishMonth(string) {
      if (isNaN(string)) {
        Object.keys(this.months).forEach((monthAbbrivation) => {
          if (
            string.toLowerCase().includes(monthAbbrivation) ||
            string.toLowerCase().includes(this.months[monthAbbrivation])
          ) {
            return this.months[monthAbbrivation];
          }
        });
      }

      const number = parseInt(string, 10);
      Object.keys(this.months).forEach((key, index) => {
        if (number === index + 1) return this.months[key];
      });

      return string;
    },

    correctMonthSpelling(string) {
      Object.keys(this.monthsInDanish).forEach((monthAbbrivation) => {
        if (string.toLowerCase().includes(monthAbbrivation))
          return this.monthsInDanish[monthAbbrivation];
      });
    },

    // required for search
    containsOnlySpaces(string) {
      if (!string.trim()) return true;
    },

    setLatestNewsBlockElement() {
      this.latestNewsBlock = document.querySelector(
        `#${this.latestNewsBlockId}`
      );
    },

    changeInlineDisplayStyle({ element, display }) {
      if (!element) return new Error("no element was given..");
      if (display === undefined) return new Error("You must specify an action");
      if (display) element.style.display = "block";
      else element.style.display = "none";
    },

    scrollToElement(elementId) {
      const target = document.querySelector(`#${elementId}`);
      if (!target) return new Error("Could not locate element to scroll to.");
      // TODO: Find out why -70 ??
      target.parentNode.scrollTop = target.offsetTop - 70;
    },

    /**
     *
     * @param {date object} firstDate
     * @param {date object} secondDate
     * @description Returns true if the objects has the same date
     */
    isDateTheSame(firstDate, secondDate) {
      return (
        firstDate.getFullYear() === secondDate.getFullYear() &&
        firstDate.getMonth() === secondDate.getMonth() &&
        firstDate.getDate() === secondDate.getDate()
      );
    },

    getTodaysDate() {
      const date = new Date();
      // Add 1, since the translation index starts at: 1 = January
      const translatedMonth = this.translateToEnglishMonth(date.getMonth() + 1);
      return new Date(
        `${translatedMonth}, ${date.getDate()}, ${date.getFullYear()} 00:00:00`
      );
    },

    washNewsData() {
      this.state.newsData.forEach((newsArticle) => {
        // Perform default things for all values in article
        Object.keys(this.columns).forEach((columnKey) => {
          let value = newsArticle[columnKey];
          //value = this.removeEmptyValue(value).trim();

          // To keep the app from crashing if day or month or year does not exist,
          // set a default value
          if (!value && columnKey === this.columns["day"]) {
            const fallbackDay = "1";
            value = fallbackDay;
          }

          if (columnKey === this.columns["month"]) {
            if (!value) {
              const fallbackMonth = "January";
              value = fallbackMonth;
            } else value = this.translateToEnglishMonth(value);
          }

          if (columnKey === this.columns["year"]) {
            if (!value) {
              const fallbackYear = "2050";
              value = fallbackYear;
            }
          }

          if (!value && columnKey === this.columns["author"]) {
            const fallbackAuthor = "Redaktøren";
            value = fallbackAuthor;
          }
        });

        const articleDay = newsArticle[this.columns["day"]];
        const articleMonth = newsArticle[this.columns["month"]];
        const articleYear = newsArticle[this.columns["year"]];

        newsArticle.publishedDate = new Date(
          `${articleMonth}, ${articleDay}, ${articleYear} 00:00:00`
        );

        if (this.isDateTheSame(newsArticle.publishedDate, this.todaysDate)) {
          this.newsFromTodayCount++;
          newsArticle.dateText = this.constants.newsFromTodayText;
        } else {
          newsArticle.dateText = `${articleDay} ${articleMonth} ${articleYear}`;
        }

        newsArticle.tag = this.getNewsTag(newsArticle[this.columns["author"]]);
      });
    },

    getNewsTag(authorName) {
      const options = this.newsTagOptions;
      let foundTag = 'DEFAULT'

      options.isSU.forEach((tag) => {
        if (authorName.includes(tag)) {
          foundTag = options.SU_TAG;
        }
      });

      options.isBusinessQuality.forEach((tag) => {
        if (authorName.includes(tag)) {
          foundTag = options.BOQ_TAG;
        }
      });

      options.isVIP.forEach((tag) => {
        if (authorName.includes(tag)) {
          foundTag = options.VIP_TAG;
        }
      });

      if (foundTag == 'DEFAULT') {
        console.log(this.authorName)
      }

      return foundTag;
    },
  },

  template: `
  <div>
    <div v-for="(guide, i) in guides" :key="i">{{ guide }}</div>
    <div>{{ state.newsData }}</div>
  </div>
    `,
});
