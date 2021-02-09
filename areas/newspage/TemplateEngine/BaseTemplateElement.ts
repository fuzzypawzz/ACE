// TODO: Move this interface to another place
export interface ITemplateContent {
  author: string;
  date: string;
  headline: string;
  body: any;
  photos?: any;
  links?: any;
  id?: string;
}

interface IBaseTemplate {
  id?: string;
  className?: string;
}

/**
 * Should take in option id and classname for the base element
 * And return the element, then other functions can append children to that element
 */

export default class BaseTemplateElement {
  private id?: string;
  private className?: string;
  private element: Element;

  constructor(data?: IBaseTemplate) {
    data && data.id ? (this.id = data.id) : null;
    data && data.className ? (this.className = data.className) : null;

    const element = document.createElement("DIV");
    this.id ? (element.id = this.id) : null;
    this.className ? (element.className = this.className) : null;
    this.element = element;
  }

  public returnElement(): Element {
    return this.element;
  }
}
