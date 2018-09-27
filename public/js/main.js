function cutString (text,lenght){
	var trimmedString = text.substr(0, lenght);
	trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
	return trimmedString;
}