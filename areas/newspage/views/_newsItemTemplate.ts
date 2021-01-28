import ClassNames from "../Constants/NewsItemClassNames";

interface ITemplateContent {
  author: string;
  date: string;
  headline: string;
  body: any;
}

/**
 * 
 * @param data Data that should be merged into values in the markup
 * Sample of argument
 * { 
        author: "Jannik Maag",
        date: "28 Januar 2021",
        headline: "My awesome template!",
        body: "<p><span>Some nested body stuff!</span></p>"
    }
 */
export default function newsItemTemplate(data: ITemplateContent): string {
  const element: any = document.createElement("DIV");
  const template = `
    <div class="${ClassNames.wrapper}">
        <div class="${ClassNames.header}">
            <div class="${ClassNames.logoWrapper}">
                <svg class="${ClassNames.svg}">
                    <use href="#_teliaPebbleIcon26"></use>
                </svg>
            </div>
            <div class="${ClassNames.authorAndDateWrapper}">
                <h2 class="${ClassNames.author}">${data.author}</h2>
                <h3 class="${ClassNames.date}">${data.date}</h3>
            </div>
        </div>
        <div class="${ClassNames.newsContentWrapper}">
            <h3 class="${ClassNames.newsContentHeadline}">${data.headline}</h3>
            <p class="${ClassNames.newsContentBody}">${data.body}</p>
        </div>
    </div>
    `;
  element.innerHTML = template;
  return element;
}
