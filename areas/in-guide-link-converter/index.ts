import removeSpecialChars from "../../helpers/removeSpecialChars";

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
    // TODO: Fix problem - Throws error when links has already been converted
    const guideNode = this.guideNode
      ? this.guideNode
      : this.getGuideNode(`.${this.guideToQuery}`);

    const specialChar: string = "%";

    if (!guideNode) {
      throw new Error("Guide converter could not finish - no guide was found!");
    } else {
      const contentArea = this.getGuideNode(`#${this.guideContentArea}`);
      const anchorTags = contentArea.querySelectorAll("a");
      console.log(anchorTags);
      if (anchorTags.length == 0) {
        return;
      }
      // TODO: only make container when the relevant links has been found
      const container = document.createElement("div");
      // TODO: Use contants
      container.className = "guide-special-options";
      contentArea.appendChild(container);
      anchorTags.forEach((anchorTag) => {
        try {
          if (anchorTag.innerText.includes(specialChar)) {
            // Remove any special chars from string, can take an array of chars
            const cleanedText: string = removeSpecialChars(
              anchorTag.innerText,
              [specialChar]
            );
            container.appendChild(
              this.createIconWithLink(`fa fa-${cleanedText}`, anchorTag, "Ekstra information")
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
      // Remove any text inside, since only the icon should be displayed
      spanChild.innerText = "";
      spanChild.appendChild(icon);
    } else {
      node.innerText = "";
      node.appendChild(icon);
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
