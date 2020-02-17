import Block from './rules/Block.js';

export default class Grammer {
   constructor(rule) {
      this.rule = rule;
   }

   get rule() {
      return this._rule;
   }

   set rule(value) {
      this._rule = value;
      this.prepareBlocks();
      this.prepareRegexes();
   }

   // addRule(rule) {
   //    if (!this.rules) this.rules = []; // to avoid errors on push into an undefined variable.
   //    this.rules.push(rule);
   //    this.blocks.push(rule.getBlocksInside());
   //    this.regex.push(rule.getRegex());
   // }

   prepareBlocks() {
      this.blocks = this.rule.getBlocksInside();
   }
   prepareRegexes() {
      this.regex = rule.getRegex();
   }
}