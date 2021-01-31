import { ITemplateContent } from "./BaseTemplateElement";
import ClassNames from "../Constants/NewsItemClassNames";

/**
 * 
 * @param data data object for merging into template queryString
 * @returns a queryString template that can set to an Element's innerHTML.
 */
export default function createNewsItemTemplate(data: ITemplateContent): string {
  const template: string = `
    <div class="${ClassNames.wrapper}">
        <section class="${ClassNames.header}">
            <div class="${ClassNames.logoWrapper}">
                <svg class="${ClassNames.svg}">
                    <use href="#_teliaPebbleIcon26"></use>
                </svg>
            </div>
            <div class="${ClassNames.authorAndDateWrapper}">
                <h2 class="${ClassNames.author}">${data.author}</h2>
                <h3 class="${ClassNames.date}">${data.date}</h3>
            </div>
        </section>
        <section class="${ClassNames.newsContentWrapper}">
            <h3 class="${ClassNames.newsContentHeadline}">${data.headline}</h3>
            <section class="${ClassNames.newsContentBody}">${data.body}</section>
        </section>
    </div>
    `;
  return template;
}