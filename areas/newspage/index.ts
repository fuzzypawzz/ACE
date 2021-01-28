import GuideFetcher from "../../services/GuideFetcher";
import { IGuideFetcherConfig } from "../../services/GuideFetcher";
import HtmlTableParser from "../../services/HtmlTableParser";

interface INewsPageConfig {
  guideIds: Number[];
  tableElementId: string;
  segment: string;
}

export default class NewsPage {
  guideIds: Array<Number>;
  private segment: string;
  private tableElementId: string;

  /**
   *
   * @param newsPageConfig See the INewsPageConfig interface
   * { segment: "tjekit-all-brand", guideIds: [32323, 23232, 1232131], tableElementId: "_someId" }
   */
  constructor(newsPageConfig: INewsPageConfig) {
    if (!newsPageConfig) {
      throw new Error("Configuration missing.");
    }
    this.guideIds = newsPageConfig.guideIds;
    this.tableElementId = newsPageConfig.tableElementId;
    this.segment = newsPageConfig.segment;
    this.init();
  }

  private init() {
    // Get the table data by using the fetcher module to fetch each guide
    this.guideIds.forEach((id) => {
      const configuration: IGuideFetcherConfig = {
        segment: this.segment,
        tableElementId: this.tableElementId,
        id: id,
        callback: this.handler,
        mockRequestUrl: "http://127.0.0.1:5500/",
      };
      new GuideFetcher(configuration).get();
    });
  }

  private handler(htmlBody: any) {
      debugger;
    const tableElementId = this.tableElementId;
    console.log(tableElementId);

    function returnTableElement(htmlBody: any): any {
      let tableElement;
      const div: Element = document.createElement("DIV");
      div.innerHTML = htmlBody;
      try {
        let tableElement: Element = div.querySelector(
          `#${this.tableElementId}`
        );
      } catch (err) {
        console.log(err);
      }
      if (!tableElement) {
        // TODO: Use error message from constants
        console.warn(
          `A table element with id: ${this.tableElementId} could not be found.`
        );
        tableElement = div.querySelector("table");
      }
      return tableElement ? tableElement : new Error("Table not found");
    }

    // Do something with the html body returned from the parser function
    const table: any = returnTableElement(htmlBody);
    const tableData: Array<any> = new HtmlTableParser(table).returnJson();
    console.log(tableData);
  }
}
