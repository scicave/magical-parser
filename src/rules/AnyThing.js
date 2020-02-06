import Rule from './Rule.js';
import Node from '../Node.js';

export default class AnyThing extends Rule {
   constructor(properties) {
      super('Anything', 0, [], properties);
   }

   getRegex(groubIndex = 0) {
      groubIndex = groubIndex || {
         num: 0,
         increase: function (step = 1) {
            this.num += step;
            return this;
         }
      };
      this.index = groubIndex.num;
      return `(.*?)`;
   }

   parse(groups, useValue) {

      let value = useValue || groups[this.index + 1];
      let args = [];

      //#region getting args
      if (this.parser) {
         args.push(this.parser.parse(value));
      }
      //#endregion

      return new Node(this.name, args, { match: value });

   }

}