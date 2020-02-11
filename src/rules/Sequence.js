import Rule from './Rule.js';
import Node from '../Node.js';
export default class Sequence extends Rule {
   constructor(childrenRules, properties) {
      properties = {
         spaced: true,
         ...properties
      };
      if (childrenRules.length == 0) throw new Error('Sequence musn\t be void.');
      super('Sequence', -1, childrenRules, properties);
   }

   getRegex(groubIndex) {
      groubIndex = groubIndex || {
         num: 0,
         increase: function (step = 1) {
            this.num += step;
            return this;
         }
      };
      this.index = groubIndex.num;

      //#region getting regex
      let regex = '';
      this.childrenRules.forEach(child => {
         regex += child.getRegex(groubIndex.increase());
         if (this.spaced) {
            regex += `\\s*`;
         }
      });
      if (this.spaced) {
         regex = regex.slice(0, -('\\s*'.length)); /// remove the last \s* in the string
      }
      //#endregion

      this.regex = regex;
      return `(${regex})`;
   }

   parse(groups, useValue) {

      let value = useValue || groups[this.index + 1];
      let args = [];

      //#region getting args
      for (let child of this.childrenRules) {
         args.push(child.parse(groups));
      }
      //#endregion

      if (this.blockState) {
         value = value.replace(this.rootParser.matchesTest, (match, id, index) => {
            return this.rootParser.matches[id][index].str;
         });
      }

      return new Node(this.name, args, {
         match: value,
      });

   }


}