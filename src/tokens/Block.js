
// for exmaple brackets and quotations
//{ opening: '{', closing: '}', num: 0, opened: false }
import { regSpecialChars } from '../global.js';

export default class Block {

   constructor(options = {}) {
      options = Object.assign({ parser: 'inherit' }, options); // put parser = 'inherit' as default, otherwise the specified value
      Object.assign(this, options);
      if (!this.opening || !this.closing) throw new Error('you must set the opening and the closing of the block');
      // these properties are deprecated and algorithms was enhanced :._.:
      this.opened = false;
      this.num = 0;
   }

   get id() {
      return this._id;
   }

   set id(val) {
      if (val instanceof RegExp) {
         this._id = val;
         this.regex = val;
         this.regexStr = val.source;
      } else if (val instanceof Object) {
         this._id = val;
         this.opening = this.id.opening;
         this.closing = this.id.closing;
         
         if (val.opening && val.closing) {

            val.content = val.content || 'all';
            if (val.content instanceof RegExp) {
               val.content = val.content.source;
            } else if (val.content === 'all') {
               val.content = '(?:.*?|\\s*)*?';
            } else {
               val.content = regSpecialChars(val.content);
            }
            this.regexStr = `${regSpecialChars(val.opening)}(${val.content})${regSpecialChars(val.closing)}`;
            this.regex = new RegExp(this.regexStr);

         }
      } else {
         this._id = val;
         this.regex = new RegExp(regSpecialChars(val));
         this.regexStr = this.regex.source;
      }
      // settingthe regex to be global
      if (!this.regex.global) this.regex = new RegExp(this.regex.source, (this.regex.flags || '') + 'g');
   }

   get name() {
      if (!this._name) return this.opening + this.closing;
      else return this._name;
   }
   set name(name) {
      this._name = name;
   }

   get content() {
      return this._contentTest || 'all';
   }
   set content(val) {
      this._contentTest = val;
   }

}