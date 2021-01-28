// @ts-nocheck

/**
 * TURNS DANISH DATE NAMES INTO ENGLISH
 * @param {string} month Danish month will shall be translated to english
 */
export default function translateMonth(month: string | Number): string {
	let monthInEnglish: any;

	const months = {
		jan: "january",
		feb: "february",
		mar: "march",
		apr: "april",
		maj: "may",
		jun: "june",
		jul: "july",
		aug: "august",
		sept: "september",
		okt: "october",
		nov: "november",
		dec: "december",
	};

	const monthInNumbers: Object<any> = {
		1: "january",
		2: "february",
		3: "march",
		4: "april",
		5: "may",
		6: "june",
		7: "july",
		8: "august",
		9: "september",
		10: "october",
		11: "november",
		12: "december",
	};

	if (isNaN(month) == true) {
		Object.keys(months).forEach(function (key) {
			if (month.toLowerCase().includes(key)) {
				monthInEnglish = months[key];
			} else if (month.toLowerCase().includes(months[key])) {
				monthInEnglish = months[key];
			}
		});
	}

	if (!monthInEnglish) {
		month = parseInt(month, 10);
		Object.keys(monthInNumbers).forEach(function (key) {
			if (month == key) {
				monthInEnglish = monthInNumbers[key];
			}
		});
	}

	if (monthInEnglish) {
		return monthInEnglish;
	} else {
		return month;
	}
};
