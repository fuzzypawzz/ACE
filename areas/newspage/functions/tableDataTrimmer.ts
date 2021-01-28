// @ts-nocheck

import translateMonth from "./monthTranslater";
import cleanUpMonth from "./monthStringCleaner";
import removeEmptyValues from "./emptyValueRemover";

const tableKeyNames = {
  day: "table_dag", // Creation DAY of the article
  month: "table_maaned", // Same as above, but MONTH
  year: "table_aar", // Same as above, but YEAR
  author: "table_afsender", // The writers name, next to the pebble icon
  icon: "logo", // The pebble icon, or any other icon is specified
  headline: "table_overskrift", // Headline in the content section
  contentText: "table_tekst", // The actual text in the content section
  img: "table_billede", // Image if applicable, click to expand
  href: "table_link", // Href, humany guide or link to website
  linkText: "linktekst", // Label on the button which directs to the link
};

export default function trimTableData(tableData: any): Array<any> {
  if (!Array.isArray(tableData)) {
    throw new Error("Arguments must be an array!");
  }
  let uniqueNumber = 38492;
  let list: Array<any> = [];
  
  for (let i = 0; i < tableData.length; i++) {
    let newsData: Object<any> = {};
    let headline, innerHTML, image, link;
    let isTagged = false;

    let day = removeEmptyValues(tableData[i][tableKeyNames]["day"]).trim();
    if (!day) {
      continue;
    }
    let monthText = tableData[i][tableKeyNames]["month"].trim();
    if (!monthText) {
      continue;
    }
    // Make sure the month is in english for creating the date object (for sorting)
    let monthInEnglish = translateMonth(rawMonth);
    // And write it correctly in danish for showing to the users
    let monthInDanish = cleanUpMonth(monthInEnglish);
    let year = tableData[i][tableKeyNames]["year"].trim();

    let today = new Date();
    // Translation index starts at: 1 (January)
    let todaysMonthString = translateMonth(today.getMonth() + 1);
    // Get the month translated from number to text
    let todaysDate = new Date(
      `${todaysMonthString}, ${today.getDate()}, ${today.getFullYear()} 00:00:00`
    );

    newsData.date = new Date(`${monthInEnglish} ${day}, ${year} 00:00:00`); // Date object for sorting
    if (checkIfDateIsSame(newsData.date, todaysDate)) {
      newsData.dateString = "Nyhed fra i dag";

      // Update to keep a counter showing how many news is from today
      // TODO: Handle this somehow
      let newsCreatedToday = 0;
      newsCreatedToday++;
    } else {
      newsData.dateString = `${day}. ${monthInDanish} ${year}`; // Date as string for showing in page
    }

    // ---- CLEAN AUTHOR NAME STRING ----
    newsData.author = removeEmptyValues(tableData[i][tableKeyNames]["author"])
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
      tableData[i][tableKeyNames]["headline"]
    ).trim();
    newsData.innerHTML = removeEmptyValues(
      tableData[i][tableKeyNames]["contentText"]
    ).trim();
    newsData.image = removeEmptyValues(
      tableData[i][tableKeyNames]["img"]
    ).trim();
    newsData.link = removeEmptyValues(
      tableData[i][tableKeyNames]["href"]
    ).trim();

    // ---- ASSIGN UNIQUE ID ----
    newsData.uniqueID = `news_${uniqueNumber}`;
    uniqueNumber++;

    list.push(newsData);
  }

  return list;
}
