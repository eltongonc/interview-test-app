/**
 * Formats a date into dd/mm/jjjj
 * @param {string} string Date string
 */
export function formatDate(str: string) {
	const date = new Date(str);
	var monthNames = [
		'01',
		'02',
		'03',
		'04',
		'05',
		'06',
		'07',
		'08',
		'09',
		'10',
		'11',
		'12',
	];

	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();

	return day + '/' + monthNames[monthIndex] + '/' + year;
}

/**
 * This function uppercases the first letter of a string.
 * @param {string} str Any type of string with letters
 */
export function upperCaseFirstLetter(str: string) {
	const splitted = str.split('');
	splitted[0] = splitted[0].toUpperCase();

	return splitted.join('');
}
