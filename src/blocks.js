
// for exmaple brackets and quotations
//{ openingChar: '{', closingChar: '}', num: 0, opened: false }
import { regSpecialChars } from './global.js';

export default class block {

   constructor(options = {}) {
      options = {
         ...options
      };
      Object.assign(this, options);

      // these properties are deprecated and algorithms was enhanced :._.:
      // this.opened = false; 
      // this.num = 0;
   }
   get id() {
      return this._id;
   }
   set id(val) {
      if (val instanceof RegExp) {
         this._id = val;
         this.regex = val;
         this.regexStr = val.toString().slice(1, -1);
      } else if (val instanceof Object) {
         this._id = val;
         if (val.openingChar && val.closingChar) {
            val.contentTest = val.contentTest || 'all';
            if (val.contentTest instanceof RegExp) {
               val.contentTest = val.contentTest.toString().slice(1, -1);
            } else if (val.contentTest === 'all') {
               val.contentTest = '.*?';
            } else {
               val.contentTest = regSpecialChars(val.contentTest);
            }
            this.regexStr = `${regSpecialChars(val.openingChar)}(${val.contentTest})${regSpecialChars(val.closingChar)}`;
            this.regex = new RegExp(this.regexStr);
         }
      } else {
         this._id = val;
         this.regex = new RegExp(regSpecialChars(val));
         this.regexStr = val.toString();
      }
   }

   get contentTest() {
      return this._contentTest || 'all';
   }
   set contentTest(val) {
      this._contentTest = val;
   }
}