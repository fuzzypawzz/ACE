/**
 * Table search application
 * Framework: Vue.js
 * Author: Jannik Maag, Telia Company
 * Date: 30 May 2021
 * License: MIT
 */

Vue.component("table-search", {
  props: {
    tableId: {
      type: String,
      required: true,
    }
  },

  data: function () {
    return {
      table: undefined,
      tableHeaders: [],
      tableData: [],
      searchValue: "",
      firstRowIsHeaders: false,
      error: {
        message: undefined,
        show: false,
      },
      columns: {
        name: "name",
        phone: "phone",
        external: "external",
        email: "email",
        note: "note",
      },
    };
  },

  mounted() {
    // If you're table is not a nested element inside your Vue instance,
    // then don't use vm.$refs, but target the table with the id selector instead
    const table = document.getElementById(this.tableId);

    if (!table) {
      const errorMessage = `No table was found with id: ${this.tableId}`;
      this.error.message = errorMessage;
      this.error.show = true;
      throw new Error(errorMessage);
    }

    this.table = table;
    this.applyClassNameToTable();
    this.getTableData();
  },

  computed: {
    searchResults() {
      if (this.containsOnlySpaces(this.searchValue)) return [];

      return this.tableData.filter((item) => {
        const searchString = `
          ${item[this.columns.name]}
          ${item[this.columns.phone]}
          ${item[this.columns.external]}
          ${item[this.columns.email]}
        `;
        return searchString
          .toUpperCase()
          .includes(this.searchValue.toUpperCase());
      });
    },
  },

  methods: {
    getTableData() {
      const rows = this.createArrayFrom(this.table.rows);

      rows.forEach((row) => {
        const entry = {};
        const columnKeys = Object.keys(this.columns);

        for (i = 0; i < columnKeys.length; i++) {
          entry[columnKeys[i]] = row.children[i]
            ? row.children[i].innerText
            : null;
        }
        this.tableData.push(entry);
      });
    },

    resetSearch() {
      this.searchValue = "";
      this.$refs.input.focus();
    },

    createArrayFrom(dataCollection) {
      return Array.from(dataCollection);
    },

    containsOnlySpaces(string) {
      if (!string.trim()) return true;
    },

    applyClassNameToTable() {
      this.table.className += " ts-table";
    }
  },

  template: `
      <div class="ts-input__wrapper">
        <div class="is-flex">
          <input class="ts-input"
            ref="input"
            placeholder="Søg i telefonbogen.."
            v-model="searchValue" />
          <button class="ts-button" v-on:click="resetSearch">
              Nulstil
          </button>
        </div>

        <ul class="ts-container" v-if="searchResults.length">
          <li :key="i" class="ts-list__item" v-for="(result, i) in searchResults">
            <div class="ts-list__item--underlined">
              {{ result[columns.name] }}
            </div>
            <div>Telefonnr: {{ result[columns.phone] }}</div>
            <div>Ekstern: {{ result[columns.external] }}</div>
            <div>Mail: {{ result[columns.email] }}</div>
            <div>Bemærkninger: {{ result[columns.note] }}</div>
          </li>
        </ul>

        <span v-else-if="!containsOnlySpaces(searchValue) && searchResults.length == 0">
          Ingen resultater fundet for: {{ searchValue }}
        </span>

        <span v-if="error.show" class="ts-error">
          {{ error.message }}
        </span>
      </div>
    `,
});
