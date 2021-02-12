import { searchResultInfoBox } from "./templates/searchResultInfoBox";
import { superWomanSvg } from "./templates/superWomanSvg";

interface IConfiguration {
  targetListElement?: NodeList;
  stringToQuery: string;
  callback?: Function;
  infoText?: string;
  buttonText?: string;
}

export default class searchResultExtender {
  private targetListElement: NodeList;
  private stringToQuery: string = "Ingen resultater";
  private callback: Function;
  private infoText: string;
  private buttonText: string;

  constructor(config: IConfiguration) {
    config.targetListElement
      ? (this.targetListElement = config.targetListElement)
      : this.targetListElement = document.querySelectorAll(".h-portal-list");
    this.stringToQuery = config.stringToQuery;
    this.callback = config.callback;
    this.infoText = config.infoText;
    this.buttonText = config.buttonText;
  }

  private getTargetElement(): Element | undefined {
    let targetElement = undefined;

    // Refactor this
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
      if (this.callback) {
        this.addButtonClickListener(
          element.querySelector("button"),
          this.callback
        );
      }
      this.appendInfoBox(element, targetElement);
    } else {
      throw new Error(`Could not retrieve target element with the text: ${this.stringToQuery}`);
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
