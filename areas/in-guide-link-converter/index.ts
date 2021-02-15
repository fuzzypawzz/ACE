interface IConfiguration {
  guideToQuery: string;
  guideContentArea: string;
  specialLinkIdentifiers: Array<Object>;
}

export default class InGuideLinkConverter {
  private guideToQuery: string;
  private guideContentArea: string;
  private specialLinkIdentifiers: Array<Object>;
  private guideNode: Node;

  constructor(config: IConfiguration) {
    this.guideToQuery = config.guideToQuery;
    this.guideContentArea = config.guideContentArea;
    this.specialLinkIdentifiers = config.specialLinkIdentifiers;
  }

  /**
   * Consumer can use this to check if the guide is available..
   * and only execute convertGuideToLinks() once guide is available
   */
  public isGuideAvailable(): boolean {
    const guideNode = this.getGuideNode(`.${this.guideToQuery}`);
    if (!guideNode) {
      return false;
    } else {
      // Save the guideNode when found for later use
      this.guideNode = guideNode;
      return true;
    }
  }

  public convertGuideLinks() {
    // TODO: FIx bug - Throws error when links has already been converted
    const guideNode = this.guideNode
      ? this.guideNode
      : this.getGuideNode(`.${this.guideToQuery}`);

    if (!guideNode) {
      throw new Error("Guide converter could not finish - no guide was found!");
    } else {
      const contentArea = this.getGuideNode(`#${this.guideContentArea}`);
      const nodes = contentArea.childNodes;
      if (nodes.length == 0) {
        return;
      }
      // TODO: only make container when the relecant links has been found
      const container = document.createElement("div");
      // TODO: Use contants
      container.className = "guide-special-options";
      contentArea.appendChild(container);
      nodes.forEach((node) => {
        try {
          // TODO: Use contants, and take the special texts in config
          // Use specialLinkIdentifiers Array<Object>
          if ((node.parentNode as HTMLElement).innerText.includes("%eINFO%")) {
            container.appendChild(
              this.createIconWithLink("fa fa-at", node, "e-INFO")
            );
          }
          if ((node.parentNode as HTMLElement).innerText.includes("%camera%")) {
            container.appendChild(
              this.createIconWithLink(
                "fa fa-camera",
                node,
                "Gå til billede-guide"
              )
            );
          }
        } catch (err) {
          console.log(err);
        }
      });
    }
  }

  private createIconWithLink(
    iconClass: string,
    node: any,
    title: string
  ): Node {
    var icon = document.createElement("i");
    icon.className = iconClass;
    node.title = title;

    var spanChild = node.querySelector("span");
    if (spanChild) {
      spanChild.innerText = "";
      spanChild.appendChild(icon);
    } else {
      //node.innerText = "";
      node.querySelector("a").innerText = "";
      node.querySelector("a").appendChild(icon);
    }
    return node;
  }

  private getGuideNode(selector: string): Element {
    const node = document.querySelector(selector);
    if (node) {
      return node;
    } else {
      return undefined;
    }
  }
}
