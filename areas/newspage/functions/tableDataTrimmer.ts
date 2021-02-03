import translateMonth from "./monthTranslater";
import cleanUpMonth from "./monthStringCleaner";
import removeEmptyValues from "./emptyValueRemover";
import TableKeys from "../Constants/TableKeys";
import isDateSame from "./isDateSame";
import Constants from "../Constants/Strings";
import { ErrorMessages } from "../Constants/ErrorMessages";

// TODO: Refractor this to not know about the data
export default function trimTableData(tableData: Array<any>): Array<any> {
  if (!Array.isArray(tableData) || !tableData.length) {
    throw new Error(ErrorMessages.NOT_ARRAY_OR_EMPTY);
  }

  const _day = TableKeys.DAY,
    _month = TableKeys.MONTH,
    _year = TableKeys.YEAR,
    _author = TableKeys.AUTHOR;

  // TODO: Introduce error handling when values are undefined
  tableData.forEach((newsItem) => {
    // TODO: Should not trim id
    // Clean all data and assign to itself
    Object.entries(newsItem).forEach((entry: any) => {
      newsItem[entry[0]] = removeEmptyValues(entry[1], entry[0]).trim();
    });

    const day = newsItem[_day];
    const monthInEnglish = translateMonth(newsItem[_month]);
    const year = newsItem[_year];
    newsItem.date = new Date(`${monthInEnglish} ${day}, ${year} 00:00:00`);

    const today = new Date();
    const todaysMonthString: string = translateMonth(today.getMonth() + 1);

    const todaysDate = new Date(
      `${todaysMonthString}, ${today.getDate()}, ${today.getFullYear()} 00:00:00`
    );
    const monthInDanish = cleanUpMonth(monthInEnglish);
    isDateSame(newsItem.date, todaysDate)
      ? (newsItem.danishDateText = Constants.NEWS_FROM_TODAY_TEXT)
      : (newsItem.danishDateText = `${day}. ${monthInDanish} ${year}`);

    // TODO: Use constants for default author
    if (!newsItem[_author]) {
      newsItem[_author] = Constants.NEWS_FROM_TODAY_TEXT;
    }
  });
  return tableData;
}
