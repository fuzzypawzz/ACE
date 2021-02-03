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
    constructor(template: string, data?: ITemplateContent);
    returnElement(): Element;
}
