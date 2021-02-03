/**
 * 
 * @param {object} first First date object
 * @param {object} second Second date object
 * @returns {boolean} true if the first and second DATE are matching
 */
export default function isDateSame(first: any, second: any): boolean {
	if (
		first.getFullYear() === second.getFullYear() &&
		first.getMonth() === second.getMonth() &&
		first.getDate() === second.getDate()
	) {
		return true;
	} else {
		return false;
	}
}