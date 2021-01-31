import createNewsItemTemplate from "../../newspage/TemplateEngine/createNewsItemTemplate";
import BaseTemplateElement, {
  ITemplateContent,
} from "../../newspage/TemplateEngine/BaseTemplateElement";

export default function newsItemFragmentGenerator(
  data: Array<any>
): DocumentFragment {
  const fragment: DocumentFragment = document.createDocumentFragment();
  // TODO: Get element id prefix from constant
  data.forEach((object) => {
    const dataForTemplate: ITemplateContent = {
      // TODO: Write a test for this, when id does not exist
      author: object.afsender,
      date: object.dag,
      headline: object.overskrift,
      body: object.tekst,
      id: object.id,
    };

    const queryStringTemplate = createNewsItemTemplate(dataForTemplate);
    const element: Element = new BaseTemplateElement(
      queryStringTemplate,
      dataForTemplate
    ).returnElement();
    fragment.appendChild(element);
  });

  return fragment;
}
