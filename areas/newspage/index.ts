import GuideFetcher from "../../services/GuideFetcher";
import { IGuideFetcherConfig } from "../../services/GuideFetcher";
import HtmlTableParser from "../../services/HtmlTableParser";
import returnTableInBody from "../newspage/functions/returnTableInBody";
import trimTableData from "../newspage/functions/tableDataTrimmer";
import { ErrorMessages } from "./Constants/ErrorMessages";
import enrichWithIds from "./functions/provideIds";
import BaseTemplateElement from "./TemplateEngine/BaseTemplateElement";
import { newsBlockTemplate } from "./TemplateEngine/createNewsItemTemplate";
import {
  latestNewsContainer as latestNewsContainerTemplate,
} from "./templates/latestNewsContainer";

interface INewsPageConfig {
  guideIds: Number[];
  tableElementId: string;
  segment: string;
}

export default class NewsPage {
  private guideIds: Array<Number>;
  private segment: string;
  private tableElementId: string;
  public tableData: Array<any>;

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

    if (!table) {
      throw new Error(ErrorMessages.couldNotFindTableId);
    }
    const tableDataList: Array<any> = new HtmlTableParser(
      table
    ).tableDataToList();

    const trimmedData = trimTableData(tableDataList);
    this.tableData = enrichWithIds(trimmedData);

    this.updateDOM(
      newsBlockTemplate({
        entries: this.tableData,
        logo: "logo",
      }),
      "body"
    );

    // Container for showing the 10 latest entries in simplified format
    this.updateDOM(
      latestNewsContainerTemplate({
        entries: this.tableData,
        newsFromTodayCounter: 1,
        latestNewsHeadline: "Seneste nyheder"
      }),
      "body"
    );

    // Need to display latest 10 results in the side nav
    // Need to display all news in a container defined in the config, unless that a modal
  }

  private updateDOM(html: string, targetId: string): void {
    // TODO: Refactor this
    const target: any = document.querySelector(`#${targetId}`);
    const element: Element = new BaseTemplateElement().returnElement();
    element.innerHTML = html;
    target
      ? target.appendChild(element)
      : console.error(`updateDOM: ${ErrorMessages.COULD_NOT_UPDATE_DOM}`);
  }
}
