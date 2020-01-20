export function repRegSpecialChars(str) {
   return str.replace(/[+*/.$^(){}\[\]]/g, (match) => { return '\\' + match; });
}
export function strTOreg(str) {
   return new RegExp(repRegSpecialChars(str));
}