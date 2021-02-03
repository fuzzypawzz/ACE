export interface ITemplateContent {
  author: string;
  date: string;
  headline: string;
  body: any;
  photos?: any;
  links?: any;
  id?: string;
}

export default class BaseTemplateElement {
  protected template: string;
  protected id?: string;

  constructor(template: string, data?: ITemplateContent) {
    this.template = template;
    data.id ? (this.id = data.id) : null;
  }

  public returnElement(): Element {
    const element: Element = document.createElement("DIV");
    this.id ? (element.id = this.id) : null;
    element.innerHTML = this.template;
    return element;
  }
}