interface IConfiguration {
  targetListElement?: NodeList;
  stringToQuery: string;
  callback? : Function;
}

export default class searchResultExtender {
  private targetListElement: NodeList;
  private stringToQuery: string = "Ingen resultater";
  private callback: Function;

  constructor(config: IConfiguration) {
    config.targetListElement
      ? (this.targetListElement = config.targetListElement)
      : document.querySelectorAll(".h-portal-list");
    this.stringToQuery = config.stringToQuery;
    this.callback = config.callback;
  }

  private findTargetNode(): void {
    this.targetListElement.forEach((node) => {
      const targets = (node.parentNode as HTMLElement).querySelectorAll("em");
      targets.forEach(element => {
        if (element.innerText == this.stringToQuery) {
          // Get super woman 
          // query the button on super woman
          // Add event listener to button
          // append woman to target via method
          // break;
        }
      });
    });
  }

  private addButtonAction(): void {
    
  }

  public appendInfoBox(node: Node, targetNode: Node): void {
    targetNode.appendChild(node);
  }
}
