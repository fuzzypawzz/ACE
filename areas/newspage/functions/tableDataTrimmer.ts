// @ts-nocheck

import translateMonth from "./monthTranslater";
import cleanUpMonth from "./monthStringCleaner";
import removeEmptyValues from "./emptyValueRemover";
import TableKeys from "../Constants/TableKeys";
import isDateSame from "./isDateSame";

export default function trimTableData(tableData: any): Array<any> {
  if (!Array.isArray(tableData)) {
    throw new Error("Arguments must be an array!");
  }

  let uniqueNumber = 38492;
  const list: Array<any> = [];

  for (let i = 0; i < tableData.length; i++) {
    const newsData: Object<any> = {};

    let day = removeEmptyValues(tableData[i][`${TableKeys.DAY}`]).trim();
    if (!day) {
      continue;
    }

    let monthText = tableData[i][`${TableKeys.MONTH}`].trim();
    if (!monthText) {
      continue;
    }

    const monthInEnglish = translateMonth(monthText);
    const monthInDanish = cleanUpMonth(monthInEnglish);

    let year = tableData[i][`${TableKeys.YEAR}`].trim();

    let today = new Date();
    // Translation index starts at: 1 (January)
    let todaysMonthString = translateMonth(today.getMonth() + 1);
    // Get the month translated from number to text
    let todaysDate = new Date(
      `${todaysMonthString}, ${today.getDate()}, ${today.getFullYear()} 00:00:00`
    );

    newsData.date = new Date(`${monthInEnglish} ${day}, ${year} 00:00:00`); // Date object for sorting
    if (isDateSame(newsData.date, todaysDate)) {
      debugger;
      newsData.dateString = "Nyhed fra i dag";

      // Update to keep a counter showing how many news is from today
      // TODO: Handle this somehow
      let newsCreatedToday = 0;
      newsCreatedToday++;
    } else {
      newsData.dateString = `${day}. ${monthInDanish} ${year}`; // Date as string for showing in page
    }

    // ---- CLEAN AUTHOR NAME STRING ----
    newsData.author = removeEmptyValues(tableData[i][`${TableKeys.AUTHOR}`])
      .trim()
      .toUpperCase();
    // Give author default value if nothing is specified by user
    if (!newsData.author) {
      newsData.author = "SU Teamet";
    }

    // ---- DETERMINE WHICH ICON TO USE ----
    // TODO: This should be SVG and not a pebble from some url, take way too long to load
    newsData.icon =
      "https://humany.blob.core.windows.net/telia-dk/guides/pebble2.png";

    newsData.headline = removeEmptyValues(
      tableData[i][`${TableKeys.HEADLINE}`]
    ).trim();
    newsData.innerHTML = removeEmptyValues(
      tableData[i][`${TableKeys.CONTENT_TEXT}`]
    ).trim();
    newsData.image = removeEmptyValues(tableData[i][`${TableKeys.IMG}`]).trim();
    newsData.link = removeEmptyValues(tableData[i][`${TableKeys.HREF}`]).trim();

    // ---- ASSIGN UNIQUE ID ----
    newsData.uniqueID = `news_${uniqueNumber}`;
    uniqueNumber++;

    list.push(newsData);
  }

  return list;
}
