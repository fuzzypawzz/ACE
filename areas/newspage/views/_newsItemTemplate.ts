import ClassNames from "../Constants/NewsItemClassNames";

interface ITemplateContent {
  author: string;
  date: string;
  headline: string;
  body: any;
  id?: string;
}

/**
 * 
 * @param data Data that should be merged into values in the markup
 * Sample of argument
 * { 
        author: "Jannik",
        date: "28 Januar 2021",
        headline: "My awesome template!",
        body: "<p><span>Some nested body stuff!</span></p>"
    }
 */
export default function newsItemTemplate(data: ITemplateContent): Element {
  const element: Element = document.createElement("DIV");
  // we don't want to apply id when its null, since the id would then be "null"
  data.id ? (element.id = data.id) : null;

  const template = `
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
  element.innerHTML = template;
  return element;
}
