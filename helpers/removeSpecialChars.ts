export default function removeSpecialChars(
	text: string,
	characters: Array<string>
): string {
	characters.forEach((char) => {
		text = text.replace(new RegExp(char, "g"), "");
	});
	return text;
}
