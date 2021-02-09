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
    private id?;
    private className?;
    private element;
    constructor(data?: IBaseTemplate);
    returnElement(): Element;
}
export {};
