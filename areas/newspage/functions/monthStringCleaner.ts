// @ts-nocheck

/**
 * MAKES SURE DATESTRING IS WRITTEN IN CORRECT DANISH TO THE USER
 * @param {string} month month which shall be translated to danish
 */
export default function cleanUpMonth(month: any): any {
  let translatedMonth: any;

  const danishMonthsNumbers = {
    1: "Januar",
    2: "Februar",
    3: "Marts",
    4: "April",
    5: "Maj",
    6: "Juni",
    7: "Juli",
    8: "August",
    9: "September",
    10: "Oktober",
    11: "November",
    12: "December",
  };

  const correctSpelledMonths = {
    jan: "Januar",
    feb: "Februar",
    mar: "Marts",
    apr: "April",
    maj: "Maj",
    may: "Maj",
    jun: "Juni",
    jul: "Juli",
    aug: "August",
    sept: "September",
    okt: "Oktober",
    oct: "Oktober",
    nov: "November",
    dec: "December",
  };

  Object.keys(correctSpelledMonths).forEach(function (key) {
    if (month.toLowerCase().includes(key)) {
      translatedMonth = correctSpelledMonths[key];
    }
  });

  if (translatedMonth) {
    return translatedMonth;
  } else {
    return month;
  }
}
