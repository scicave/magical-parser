import { NoEmitOnErrorsPlugin } from "webpack";

export default class Parser {
   constructor(grammer) {
      this.grammer = grammer;
      this.getRegex();
   }

   getRegex() {
      this.regex = this.grammer.getRegex();
   }

   parse(str) {
      if (this.regex && str) {
         
      } else {
         throw new Error('Ops, there was a problem in parsing process, perhaps your string is not valid for starting parsing, or your grammer is not precise');
      }
   }

}