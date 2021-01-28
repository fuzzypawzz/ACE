// TODO: Make generic

export default function returnTableInBody(htmlBody: any, tableElementId: string): Element | void {
  let tableElement: Element;
  const div: Element = document.createElement("DIV");
  div.innerHTML = htmlBody;
  try {
    tableElement = div.querySelector(`#${tableElementId}`);
  } catch (err) {
    console.log(err);
  }
  if (!tableElement) {
    // TODO: Use error message from constants
    console.warn(
      `A table element with id: ${tableElementId} could not be found. First found table element will be used instead.`
    );
    tableElement = div.querySelector("table");
  }
  return tableElement ? tableElement : null;
}
