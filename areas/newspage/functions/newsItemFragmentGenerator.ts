import newsItemTemplate from "../../newspage/views/_newsItemTemplate";

export default function newsItemFragmentGenerator(data: Array<any>): DocumentFragment {
  const fragment: DocumentFragment = document.createDocumentFragment();
  // TODO: Get element id prefix from constant
  data.forEach((object) => {
    const dataForTemplate = {
      author: object.afsender,
      date: object.dag,
      headline: object.overskrift,
      body: object.tekst,
      id: "",
    };
    const element: Element = newsItemTemplate(dataForTemplate);
    fragment.appendChild(element);
  });
  return fragment;
}
