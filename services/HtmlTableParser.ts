// Take in a html table element

export default class HtmlTableParser {
  private parsedData: Array<any>;

  constructor(table: Element) {
    this.parsedData = this.parse(table);
  }

  private parse(table: any): Array<any> {
    // TODO: Define interface for table element
    let data: Array<any> = [];
    let headers: Array<any> = [];

    // ---- GET THE INNER HTML FROM THE HEADER ROWS ----
    // And remove all whitespaces
    for (let i = 0; i < table.rows[0].cells.length; i++) {
      //headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi, '');
      headers[i] = table.rows[0].cells[i].id.toLowerCase().replace(/ /gi, "");
    }

    // ---- GET INNER HTML FROM ALL ROWS, EXCLUDING THE TOP ROW (HEADERS) ----
    // Index starts at 1, since we already has the headers
    for (let i = 1; i < table.rows.length; i++) {
      let tableRow: any = table.rows[i];
      let rowData: any = {};
      for (let j = 0; j < tableRow.cells.length; j++) {
        rowData[headers[j]] = tableRow.cells[j].innerHTML;
      }
      data.push(rowData);
    }
    return data;
  }

  /**
   * @returns a list of data parsed from the html table
   */
  public tableDataToList() {
    return this.parsedData;
  }
}
