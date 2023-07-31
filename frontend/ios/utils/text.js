export function shortenString(str, length = 8) {
    if (str.length > length) {
      return `${str.substring(0, length)}...`;
    }
    return str;
  }

export function createInitials(string) {
  let splitString = string.trim().split(" ");
  if (splitString.length === 1) {
    return splitString[0].charAt(0).toUpperCase();
  } else {
    return (splitString[0].charAt(0) + splitString[1].charAt(0)).toUpperCase();
  }
}