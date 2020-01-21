
import { strTOreg, checker } from './global.js';


export class commonOperator {
   constructor(options) {
      options = options || {};
      options = { zIndex: 0, ...options }; // overriding default options by the passed options (options argument)
      Object.assign(this, options);
      // this.name = options.name;
      // this.zIndex = options.zIndex;
   }
   get name() {
      return this._name;
   }
   set name(val) {

      if (!val || val === '') throw new Error('operator name can not be void or empty');

      this._name = val.toString();

      // preparing regex for parsing process
      this.regex = strTOreg(this._name); // replacing special chars

      // spaced property

      this.spaced = {
         right: checker.spaced(val[0]),
         left: checker.spaced(val[val.toString().length - 1])
      };

   }

   __getRegexExp(forceSpaced) {
      let reg = [
         '\s*.*',
         '',
      ];

      let spaced = forceSpaced ? { right: true, left: true } : this.spaced;
      let r = spaced.right ? '\\s' : '';
      let l = spaced.left ? '\\s' : '';

      let regex = new RegExp(`\^(.*)(${l + operator.regex + r})(.*)\$`);

      return regex;
   }

   toString() {
      return this._name;
   }
}

export class operator extends commonOperator {
   constructor(options) {
      super(options);
   }
}

export class suffixOperator extends commonOperator {
   constructor(options) {
      super(options);
   }
}

export class prefixOperator extends commonOperator {
   constructor(options) {
      super(options);
   }
}

export class separator extends commonOperator {
   constructor(options) {
      super(options);
   }
}

