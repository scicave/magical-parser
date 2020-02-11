import Rule from './Rule.js';
import Node from '../Node.js';

export default class Optional extends Rule {
   constructor(child, properties) {
      super('Optional', 1, [], properties);
   }

   getRegex(groubIndex = 0, groubResult = true) {
      groubIndex = groubIndex || {
         num: 0,
         increase: function (step = 1) {
            this.num += step;
            return this;
         }
      };
      this.index = groubIndex.num;
      let regex = this.childrenRules[0].getRegex(groubIndex.increase());

      this.regex = regex;
      return `((?:${regex})?)`;
   }

   parse(groups, useValue) {

      let value = useValue || groups[this.index + 1];
      let args = [];

      if (this.blockState) {
         value = value.replace(this.rootParser.matchesTest, (match, id, index) => {
            return this.rootParser.matches[id][index].str;
         });
      }

      //#region getting args
      if (value) {
         args.push(this.childrenRules[0].parse(value));
      }
      //#endregion

      return new Node(this.name, args, {
         match: value,
         content: groups[this.index + 2]
      });

   }

}