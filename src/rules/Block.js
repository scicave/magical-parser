import Rule from './Rule.js';
import Node from '../Node.js';
import { getGroupsNumInReg, getRandomName, regSpecialChars } from '../global.js';

export default class Repeat extends Rule {
   /**
    * 
    * @param {Object} properties 
    * you should set 
    * opening as regex or string, closing as RegExp or string,
    * [optional] (content as Rule or regex or string),
    * [optional] parser: to be used for parsing the content
    */
   constructor(properties) {
      properties.opening = properties.opening instanceof RegExp ? properties.opening.source : regSpecialChars(properties.opening);
      properties.closing = properties.closing instanceof RegExp ? properties.closing.source : regSpecialChars(properties.closing);

      if (properties.opening && properties.closing) {
         if (properties.opening !== properties.closing) {
            /** this Block can't be represented by regex */
            this._blockStateToParents();
            this.blockState = true;
            this.id = getRandomName();
         }
         properties.content = properties.content || 'all';
         properties.groupsNumInside = 0; /// if the content is regex, we should take care of the groups inside
         if (!(properties.content instanceof Rule)) {
            if (properties.content instanceof RegExp) {
               // converting regex into string
               properties.content = properties.content.source;
            } else {
               /// evaluating special values such as "all".
               properties.content = (properties.content === 'all') ? '(?:.*?|\\s)*?' : regSpecialChars(properties.content);
            }
            properties.groupsNumInside += getGroupsNumInReg(properties.content);
         }
         // properties.test = `${properties.opening}${properties.content}${properties.closing}`;
      } else {
         throw new Error('Error on defining your block, you should define the opening and closing properties as the regex or the text');
      }

      super('Block', 0, [], properties);

      this.openingReg = new RegExp(this.opening);
      this.closingReg = new RegExp(this.closing);

   }

   getRegex(groubIndex) {
      if (this.blockState) {
         groubIndex = groubIndex || {
            num: 0,
            increase: function (step = 1) {
               this.num += step;
               return this;
            }
         };
         this.index = groubIndex.num;
         this.regexInside = this.childrenRules[0].getRegex({
            num: 0,
            increase: function (step = 1) {
               this.num += step;
               return this;
            }
         });
         // rootParser is an instance of "Parser" class, it is defined in the constructor of "Parser" class
         this.rootParser.blocksRules.push(this);
         this.regex = this.id; // the represetig string in the total string
         return `(${this.regex})`;
      } else {
         groubIndex = groubIndex || {
            num: 0,
            increase: function (step = 1) {
               this.num += step;
               return this;
            }
         };
         this.index = groubIndex.num;
         let content;
         if (this.content instanceof Rule) {
            content = this.content.getRegex(groubIndex.increase());
         } else {
            groubIndex.increase(this.groupsNumInside + 1);
            content = '(' + this.content + ')';
         }
         let regex = `${this.opening}${content}${this.closing}`;

         this.regex = regex;
         return `(${regex})`;
      }
   }

   _blockStateToParents() {
      do {
         parent.blockState = true;
         parent = parent.parentRule;
      } while (parent.parentRule);
   }

   parse(groups, useValue) {
      if (this.blockState) {
         let value = this.useValue; // is defined at the rootParser in the paring process
         let args = [];

         //#region getting args
         if (this.content instanceof Rule) {
            args = this.content.parse(this.useGroups);
         } else if (this.parser) {
            args = this.parser.parse(value);
         }
         //#endregion

         return new Node(this.name, args, {
            match: value,
            content: groups[this.index + 2] /// the current group in the array is in the index : this.index + 1
         });
      } else {
         let value = useValue || groups[this.index + 1];
         let args = [];

         //#region getting args
         if (this.content instanceof Rule) {
            args = this.content.parse(groups);
         } else if (this.parser) {
            args = this.parser.parse(value);
         }
         //#endregion

         return new Node(this.name, args, {
            match: value,
            content: groups[this.index + 2] /// the current group in the array is in the index : this.index + 1
         });
      }
   }



}