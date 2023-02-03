export function separateByUppercase(string) {
  return string.split(/(?=[A-Z])/).join(' ');
}

export function separateByUnderscore(string) {
  return string.replaceAll('_', ' ');
}

export function joinArrayWithComma(arr) {
  return arr.join(', ');
}
