Vue.component("phonebook-search", {
  props: {
    tableId: {
      type: String,
      required: true,
    },
  },
  data: function () {
    return {
      phoneBook: undefined,
      tableHeaders: [],
      tableData: [],
      searchValue: "",
    };
  },
  mounted() {
    try {
      // This element might not be inside the Vue app element, so we can't use 'vm.$refs'
      this.phoneBook = document.getElementById(this.tableId);
    } catch (error) {
      console.log(error);
    }
    // Might be used later
    //this.getTableHeaders();
    this.getTableData();
  },

  computed: {
    searchResults() {
      if (this.searchValue == "") {
        return [];
      }
      return this.tableData.filter((item) => {
        const searchString = `${item.name} ${item.phone} ${item.ext} ${item.mail}`;
        return searchString
          .toUpperCase()
          .includes(this.searchValue.toUpperCase());
      });
    },
  },

  methods: {
    // Might be used later
    // getTableHeaders() {
    //   const rows = Array.from(this.phoneBook.rows);
    //   this.tableHeaders = Array.from(rows[0].children);
    // },
    getTableData() {
      const rows = Array.from(this.phoneBook.rows);
      rows.forEach((row) => {
        this.tableData.push({
          name: row.children[0].innerText,
          phone: row.children[1].innerText,
          ext: row.children[2].innerText,
          mail: row.children[3].innerText,
          note: row.children[4].innerText,
        });
      });
    },
    resetSearch() {
      this.searchValue = "";
      try {
        this.$refs.input.focus();
      } catch (e) {
        console.log(e);
      }
    },
  },
  template: `
      <div class="pb-input__wrapper">
        <h4>{{ appInfo }}</h4>

        <div class="is-flex">
          <input class="pb-input"
            ref="input"
            placeholder="Søg i telefonbogen.."
            v-model="searchValue" />
          <button class="pb-button" v-on:click="resetSearch">Nulstil</button>
        </div>

        <ul class="pb-container" v-if="searchResults.length">
          <li :key="i" class="pb-list__item" v-for="(item, i) in searchResults">
            <div class="pb-list__item--underlined">{{ item.name }}</div>
            <div>Telefon: {{ item.phone }}</div>
            <div>Eksternt nummer: {{ item.ext }}</div>
            <div>Email: {{ item.mail }}</div>
            <div>Bemærkning: {{ item.note }}</div>
          </li>
        </ul>

        <span v-else-if="searchValue && searchResults.length == 0">
          Ingen resultater fundet for: {{ searchValue }}
        </span>
      </div>
    `,
});