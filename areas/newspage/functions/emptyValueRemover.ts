/**
 * REMOVE SPECIAL CHARS WHICH MEANS NOTHING IN HUMANY
 * @param {string} value The value which shall be checked for special Humany chars
 */
export default function removeEmptyValues(value: string, keyName: string): string {
  // ---- CHECK IF STRING VALUE MEANS EMPTY ----

  try {
    if (value.includes("&nbsp;")) {
      // Replace rubbish
      value = value.replace(/&nbsp;/g, "");
    }
  } catch (err) {
    console.log(err);
  }

  // Check if its not the field "contentText", which is allowed to contain
  // html tags and such, since it is the text area in the article
  try {
      // TODO: Get value from constants
    if (keyName != "tekst") {
      // Remove paragraphs
      if (value.includes("<p>")) {
        let replacement = value.replace(/<p>/g, "");
        replacement = replacement.replace(/<\/p>/g, "");
        value = replacement;
      }
      // Remove div tags
      if (value.includes("<div>")) {
        let replacement = value.replace(/<div>/g, "");
        replacement = replacement.replace(/<\/div>/g, "");
        value = replacement;
      }
      // Remove linebreaks
      if (value.includes("<br>")) {
        let replacement = value.replace(/<br>/g, " ");
        replacement = replacement.replace(/<\/br>/g, " ");
        value = replacement;
      }

      // Remove 0 if its the first char
      if (value.slice(0, 1) == "0") {
        let replacement = value.replace(/^0+/, "");
        value = replacement;
      }
    }
  } catch (err) {
    console.log(err);
  }

  return value;
};
