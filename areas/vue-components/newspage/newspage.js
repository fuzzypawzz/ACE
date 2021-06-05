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
      },
      latestNewsBlock: undefined,
      tableContainsHeaders: true,
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
    };
  },

  created() {
    this.getGuideBodyContent(this.guides[1]);
  },

  mounted() {
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
        );
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
          console.log(row.children[i]);
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
      return string.replace(/&nbsp;/g, "");
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
  },

  template: `
  <div>
    <div v-for="(guide, i) in guides" :key="i">{{ guide }}</div>
    <div>{{ state.newsData }}</div>
  </div>
    `,
});
