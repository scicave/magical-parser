
import { strTOreg, checker } from './global.js';


export class commonOperator {
   constructor(options) {
      options = options || {};
      options = { zIndex: 0, ...options }; // overriding default options by the passed options (options argument)
      Object.assign(this, options);
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

   get spaced() {
      return this._spaced;
   }
   set spaced(val) {
      this._spaced = typeof val === 'object' ? Object.assign({}, val) : {right: val, left: val};
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

