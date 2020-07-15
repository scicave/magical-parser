
import { regSpecialChars, checker } from '../global.js';


export class commonOperator {
   /**
    * 
    * @param {Object} options id as regex or string, zIndex for priority 
    */
   constructor(options) {
      options = options || {};
      options = Object.assign({ zIndex: 0 }, options); // overriding default options by the passed options (options argument)
      Object.assign(this, options);
   }

   get name() {
      return this._name || this._id;
   }
   set name(name) {
      this._name = name;
   }

   get id() {
      return this._id;
   }
   set id(val) {

      if (!val || val === '') throw new Error('operator id can not be void or empty');

      this._id = val;

      // preparing regex for parsing process
      if (val instanceof RegExp) {
         this.regexStr = val.toString().slice(1, -1); // replacing special chars         
      } else {
         this.regexStr = regSpecialChars(val.toString()); // replacing special chars         
      }
      this.regex = new RegExp(this.regexStr);

      // spaced property

      this.spaced = {
         right: checker.spaced(val[val.toString().length - 1]),
         left: checker.spaced(val[0])
      };

   }

   get spaced() {
      return this._spaced;
   }
   set spaced(val) {
      this._spaced = typeof val === 'object' ? Object.assign({}, val) : { right: val, left: val };
   }

   toString() {
      return this.regexStr;
   }
}

export class Operator extends commonOperator {
   constructor(options) {
      super(options);
   }
}

export class SuffixOperator extends commonOperator {
   constructor(options) {
      super(options);
   }
}

export class PrefixOperator extends commonOperator {
   constructor(options) {
      super(options);
   }
}

export class Separator extends commonOperator {
   constructor(options) {
      super(options);
   }
}

