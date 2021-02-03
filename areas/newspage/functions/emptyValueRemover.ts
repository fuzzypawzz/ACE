/**
 * REMOVE SPECIAL CHARS WHICH MEANS NOTHING IN HUMANY
 * @param {string} value The value which shall be checked for special Humany chars
 */
export default function removeEmptyValues(value: string, keyName: string): string {
  if (value.includes("&nbsp;")) {
    // Replace rubbish
    value = value.replace(/&nbsp;/g, "");
  }

  if (keyName == "tekst") {
    return value;
  }

  if (value.includes("<p>")) {
    let replacement = value.replace(/<p>/g, "");
    value = replacement.replace(/<\/p>/g, "");
  }

  if (value.includes("<div>")) {
    let replacement = value.replace(/<div>/g, "");
    value = replacement.replace(/<\/div>/g, "");
  }

  if (value.includes("<br>")) {
    let replacement = value.replace(/<br>/g, " ");
    value = replacement.replace(/<\/br>/g, " ");
  }
  // Remove 0 if its the first char
  if (value.slice(0, 1) == "0") {
    let replacement = value.replace(/^0+/, "");
    value = replacement;
  }

  return value;
}
