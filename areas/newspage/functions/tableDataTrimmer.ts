import translateMonth from "./monthTranslater";
import cleanUpMonth from "./monthStringCleaner";
import removeEmptyValues from "./emptyValueRemover";
import TableKeys from "../Constants/TableKeys";
import isDateSame from "./isDateSame";
import Strings from "../Constants/Strings";

// TODO: Refractor this to not know about the data
export default function trimTableData(tableData: Array<any>): Array<any> {
  if (!Array.isArray(tableData)) {
    throw new Error("Arguments must be an array!");
  }

  // TODO: Introduce error handling when values are undefined
  tableData.forEach((newsItem) => {
    // TODO: Should not trim id
    // Clean all data and assign to itself
    Object.entries(newsItem).forEach((entry: any) => {
      newsItem[entry[0]] = removeEmptyValues(entry[1], entry[0]).trim();
    });

    const day = newsItem[`${TableKeys.DAY}`];
    const monthInEnglish = translateMonth(newsItem[`${TableKeys.MONTH}`]);
    const year = newsItem[`${TableKeys.YEAR}`];
    newsItem.date = new Date(`${monthInEnglish} ${day}, ${year} 00:00:00`);

    const today = new Date();
    const todaysMonthString: string = translateMonth(today.getMonth() + 1);

    const todaysDate = new Date(
      `${todaysMonthString}, ${today.getDate()}, ${today.getFullYear()} 00:00:00`
    );
    const monthInDanish = cleanUpMonth(monthInEnglish);
    isDateSame(newsItem.date, todaysDate)
      ? (newsItem.danishDateText = Strings.NEWS_FROM_TODAY_TEXT)
      : (newsItem.danishDateText = `${day}. ${monthInDanish} ${year}`);

    // TODO: Use constants for default author
    if (!newsItem.author) {
      newsItem[TableKeys.AUTHOR] = "SU Teamet";
    }
  });
  return tableData;
}
