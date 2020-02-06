export default class Parser {
   constructor(grammer) {
      this.grammer = grammer;
      this.prepareRegex();
   }

   prepareRegex() {
      this.regex = new RegExp('^\\s*' + this.grammer.getRegex() + '$\\s*');
   }

   parse(str) {
      if (this.regex && str) {
         let groups;
         str.replace(this.regex, function () {
            groups = arguments;
         });
         groups = [...groups]; groups.pop(); groups.pop();
         return this.grammer.parse(groups);
      } else {
         throw new Error('Ops, there was a problem in parsing process, perhaps your string is not valid for starting parsing, or your grammer is not precise');
      }
   }

}