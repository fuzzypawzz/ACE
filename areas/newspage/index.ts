import GuideFetcher from "../../services/GuideFetcher";
import { IGuideFetcherConfig } from "../../services/GuideFetcher";
import HtmlTableParser from "../../services/HtmlTableParser";
import newsItemFragmentGenerator from "../newspage/functions/newsItemFragmentGenerator";
import returnTableInBody from "../newspage/functions/returnTableInBody";
import tableDataTrimmer from "../newspage/functions/tableDataTrimmer";

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
    this.handler = this.handler.bind(this);
  }

  public init() {
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
    const table: Element | void = returnTableInBody(
      htmlBody,
      this.tableElementId
    );
    // TODO: Use error message from constants
    if (!table) {
      throw new Error(
        "Table of news was not found. Make sure the id of the element is correct."
      );
    }
    console.log(table)
    const tableData: Array<any> = new HtmlTableParser(table).tableDataToList();
    console.log(tableData);
    const cleanData: Array<any> = tableDataTrimmer(tableData);
    console.log(cleanData)
    
    const fragment: DocumentFragment = newsItemFragmentGenerator(tableData);
    document.querySelector("body").appendChild(fragment);
  }
}
