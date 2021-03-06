import Ids from "./constants/Ids";
import getUrlParameterByName from "./functions/getUrlParameterByName";
import { searchResultInfoBox } from "./templates/searchResultInfoBox";
import { superWomanSvg } from "./templates/superWomanSvg";

interface IConfiguration {
  targetListElement?: NodeList;
  stringToQuery: string;
  // callback?: Function;
  infoText?: string;
  buttonText?: string;
  onClickRedirectUrl?: string;
  searchKey: string;
}

export default class SearchResultExtender {
  private targetListElement: NodeList;
  private stringToQuery: string = "Ingen resultater";
  // private callback: Function;
  private infoText: string;
  private buttonText: string;
  private onClickRedirectUrl: string;
  private searchKey: string = "searchkey";

  constructor(config: IConfiguration) {
    config.targetListElement
      ? (this.targetListElement = config.targetListElement)
      : (this.targetListElement = document.querySelectorAll(".h-portal-list"));
    this.stringToQuery = config.stringToQuery;
    // this.callback = config.callback;
    this.infoText = config.infoText;
    this.buttonText = config.buttonText;
    this.onClickRedirectUrl = config.onClickRedirectUrl;
    config.searchKey ? (this.searchKey = config.searchKey) : null;
  }

  private getTargetElement(): Element | undefined {
    let targetElement = undefined;

    // TODO: Refactor this
    // if list then loop through
    // If element then return element
    // If className or ID, then query element and return element
    this.targetListElement.forEach((node) => {
      const targets = (node.parentNode as HTMLElement).querySelectorAll("em");
      targets.forEach((element: any) => {
        if (element.innerText == this.stringToQuery) {
          targetElement = element;
        }
      });
    });

    return targetElement;
  }

  public createInfoBox() {
    const targetElement = this.getTargetElement();
    if (targetElement) {
      const template = searchResultInfoBox({
        svg: superWomanSvg(),
        infoText: this.infoText,
        buttonText: this.buttonText,
      });
      const element: Element = document.createElement("DIV");
      element.innerHTML = template;
      const redirectUrl = this.onClickRedirectUrl;
      const searchKey = this.searchKey;
      if (redirectUrl) {
        this.addButtonClickListener(
          element.querySelector("button"),
          function () {
            location.href = `${redirectUrl}&${searchKey}=${getUrlParameterByName(
              "phrase"
            )}`;
          }
        );
      }
      this.appendInfoBox(element, targetElement);
    } else {
      return;
    }
  }

  public infoBoxExistsAlready(): boolean {
    if (document.querySelector(`#${Ids.searchResultInfoBoxId}`)) {
      return true;
    } else {
      return false;
    }
  }

  private addButtonClickListener(button: Element, action: Function): void {
    button.addEventListener("click", () => {
      action();
    });
  }

  private appendInfoBox(element: Element, targetElement: Element): void {
    targetElement.appendChild(element);
  }
}
