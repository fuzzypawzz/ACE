// import BaseTemplateElement, {
//   ITemplateContent,
// } from "../../newspage/TemplateEngine/BaseTemplateElement";
// import TableKeys from "../Constants/TableKeys";

// export default function newsItemFragmentGenerator(
//   data: Array<any>,
//   handleBarsTemplate: Function
// ): DocumentFragment {
//   const fragment: DocumentFragment = document.createDocumentFragment();

//   // TODO: Get element id prefix from constant
//   data.forEach((object) => {
//     const dataForTemplate: ITemplateContent = {
//       // TODO: Write a test for this, when id does not exist
//       author: object[TableKeys.AUTHOR],
//       date: object[TableKeys.DATE_STRING],
//       headline: object[TableKeys.HEADLINE],
//       body: object[TableKeys.CONTENT_TEXT],
//       photos: object[TableKeys.IMG],
//       links: object[TableKeys.HREF],
//       id: object[TableKeys.ID],
//     };

//     const template = handleBarsTemplate(dataForTemplate);

//     const element: Element = new BaseTemplateElement().returnElement();
//     element.innerHTML = template;

//     fragment.appendChild(element);
//   });

//   return fragment;
// }
