
import { strTOreg } from './global.js';

export var __checker = {
   symbols: '!@#$%^&*-+=\\/*.~×÷:;<>?؛',
   isSymbol: (c) => (__checker.symbols.indexOf(c) > -1),
   isNum: (c) => !__checker.isNaN(c),
   isAlpha: (c) => !__checker.isNum(c) && !__checker.isSymbol(c),
   spaced: (c) => !__checker.isSymbol(c)
};


export class commonOperator {
   constructor(options) {
      options = options || {};
      options = { zIndex: 0, ...options };
      this.name = options.name;
      this.zIndex = options.zIndex;
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
         right: __checker.spaced(val[0]),
         left: __checker.spaced(val[val.toString().length - 1])
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

