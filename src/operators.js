
export var __checker = {
   symbols: '!@#$%^&*-+=\\/*.~×÷:;<>?؛',
   isSymbol: (c) => (this.symbols.indexof(c) > -1),
   isNum: (c) => !isNaN(c),
   isAlpha: (c) => !isNum(c) && !isSymbol(c),
   spaced: (c) => !isSymbol(c)
};


export class commonOperator {
   constructor(name, zIndex = 0) {
      this.name = name;
      this.zIndex = zIndex;
   }
   get name() {
      return this._name;
   }
   set name(val) {

      this._name = val.toString();

      // preparing regex for parsing process
      this.regex = this._name.replace(/[+*/.$^]/g, (match) => { return '\\' + match; }); // replacing special chars

      // spaced property

      this.spaced = {
         right: {__checker.spaced(val[0])},
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
   constructor() {
      super(name, zIndex);
   }
}

export class suffixOperator extends commonOperator {
   constructor() {
      super(name, zIndex);
   }
}

export class prefixOperator extends commonOperator {
   constructor() {
      super(name, zIndex);
   }
}

export class separator extends commonOperator {
   constructor() {
      super(name, zIndex);
   }
}

