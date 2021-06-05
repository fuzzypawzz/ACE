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
        pebble:
          "https://humany.blob.core.windows.net/telia-dk/guides/pebble2.png",
        heartIcon: "fa fa-heart"
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
        // Map rest of expected keys, else vue template will not work properly
        entry.icon = '';
        entry.dateText = '';
        entry.tag = '';
        entry.publishedDate = '';
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

        // TODO: Check if this is required for anything
        newsArticle.icon = this.constants.heartIcon;
      });
    },

    getNewsTag(authorName) {
      const options = this.newsTagOptions;
      let foundTag = "DEFAULT";

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

      return foundTag;
    },
  },

  template: `
  <div>
    <section class="news-selection-panel">
      <div class="news-selection-header">
        <h2 class="news-headline">Filtrer nyneder</h2>
        <p>Vælg din nyhedskilde</p>
      </div>

      <div class="news-selection-selectors">
        <select
          class="news-month-selector"
          disabled="disabled"
          style="cursor: not-allowed"
          id="_news-month-selector"
        >
          <option>Se alle nyheder</option>
          <option>Kun nyheder om kunde pains</option>
          <option>Kun udmeldinger fra SU</option>
        </select>
      </div>

      <div class="news-selection-subheader">
        <h3 class="news-headline">Søg i arkivet</h3>
        <p>Søg på overskrift, måned, år</p>
      </div>
      <div class="news-selection-search" id="_news-selection-search">
        <input
          class="news-selection-searchfield humany-search-style"
          id="_news-selection-searchfield"
          placeholder="Søg.."
        />
        <svg
          class="humany-search-ts-icon"
          id="_humany-search-ts-icon"
          style="width: 40px; display: block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 30"
        >
          <path
            d="M29.2 29.2a2.72 2.72 0 0 1-3.86 0L21.16 25A13.64 13.64 0 1 1 25 21.16l4.19 4.18a2.72 2.72 0 0 1 .01 3.86zM13.64 3.41a10.23 10.23 0 1 0 0 20.45 10.16 10.16 0 0 0 7.23-3 10.26 10.26 0 0 0 0-14.47 10.16 10.16 0 0 0-7.23-3"
          ></path>
        </svg>
        <svg
          class="humany-delete-ts-icon"
          id="_humany-delete-ts-icon"
          style="display: none; width: 40px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 30"
        >
          <title>delete-ts-icon</title>
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <path
                d="M21.63,15l7-7A4.69,4.69,0,0,0,22,1.37l-7,7-7-7A4.69,4.69,0,0,0,1.37,8l7,7-7,7A4.69,4.69,0,0,0,8,28.63l7-7,7,7A4.69,4.69,0,0,0,28.63,22Z"
              ></path>
            </g>
          </g>
        </svg>
      </div>
      <div
        style="
          height: 40px;
          width: 344px;
          background-repeat: no-repeat;
          background-size: contain;
          background-image: url(/Interfaces/Portal/Customer/Ace/logo.png);
          position: absolute;
          bottom: 30px;
          left: 30px;
        "
      ></div>
    </section>

    <div class="newsSection-wrapper">

      <div v-cloak v-for="(article, i) in state.newsData" :key="i" class="newsblock-01-wrapper">
        <section class="newsblock-01-header">
          <div class="newsblock-01-logo">
            <i v-if="article.icon && article.icon !== '&nbsp;'" :class="article.icon"></i>
          </div>

          <div class="newsblock-01-infos">
            <h2 class="newsblock-01-headline news-headline pebble-purple">{{ article.author }}</h2>
            <h3 class="newsblock-01-date"> {{ article.dateText }} </h3>
          </div>
        </section>

        <section class="newsblock-01-content">
          <h3 class="newsblock-content-headline">{{ article.headline }}</h3>
          <section class="newsblock-content-p" v-html="article.description"></section>
        </section>

        <section v-if="article.images && article.images !== '&nbsp;'"
          v-html="article.images"
          class="newsblock-01-photos">
        </section>

        <section v-if="article.links && article.links !== '&nbsp;'" class="newsblock-01-refs"
          v-html="article.links">
        </section>
      </div>
    </div>
  </div>
  `,
});
