
// for exmaple brackets and quotations
//{ openingChar: '{', closingChar: '}', num: 0, opened: false }
export default class block{

   constructor(options = {}) {

      // this.openingChar = options.openingChar;
      // this.closingChar = options.closingChar;
      // this.zIndex = options.zIndex;
      // this.handleContent = options.handleContent;
      // this.contentTest = options.contentTest;
      // this.name = options.name;
      // this.mustClose = options.mustClose;
      options = {
         mustClose: true,
         mustOpen: true,
         ...options
      };
      Object.assign(this, options);

      this.opened = false;
      this.num = 0;
   }
   get name() {
      return this._name || (this.openingChar + this.closingChar);
   }
   set name(val) {
      this._name = val;
   }

   get contentTest() {
      return this._contentTest || 'all';
   }
   set contentTest(val) {
      this._contentTest = val;
   }
}