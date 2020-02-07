export default class Parser {
   constructor(grammer) {
      this.grammer = grammer;
      this.blockState = grammer.blockState;

      //#region seeting the rootParser
      let setRootPaser = (rule) => {
         for (let child of rule) {
            setRootParser(child);
         }
      };
      setRootPaser(this.grammer);
      //#endregion

      //#region Block Rule No Regex For Search
      this.blocksRules = []; // this will be filled with the Block Rules in the grammer that can't be searched as regex
      this.blockState = false; // on this.prepareRegex();, if any Block Rule can't be searched as regex, this will be true
      //#endregion

      this.prepareRegex();

   }

   prepareRegex() {
      this.regex = new RegExp('^\\s*' + this.grammer.getRegex() + '\\s*$');
   }

   parse(str) {
      if (this.regex && str) {
         let groups;

         //#region getting groups

         if (this.blockState) {
            /**  
             * this when a Block in this.grammer can't be searched as regex,
             *  we will use Block.id for searchin them
             */
            //#region brackets
            for (let block of this.blocksRules) {
               let getMatches = function (_str, matches, shift = 0) {
                  let openingIndex = _str.search(block.openingReg),
                     closingIndex = _str.search(block.closingReg);
                  let contentStart, startIndex, contentEnd, endIndex;
                  let length; /// to know the opening or closing string length 
                  //#region getting the matched string
                  if (openingIndex > -1 && closingIndex > -1 && closingIndex > openingIndex) {

                     //#region evaluating indexes
                     length = 0;
                     _str.replace(block.openingReg, (match) => { length = match.length; });
                     startIndex = openingIndex;
                     contentStart = openingIndex + length;
                     _str = _str.slice(contentStart); // the string after the opening string of the block
                     let num = 1;
                     while (num > 0) {
                        openingIndex = _str.search(block.openingReg);
                        closingIndex = _str.search(block.closingReg);
                        if (closingIndex > -1) {
                           if (openingIndex > closingIndex) {
                              // here you are closing
                              num--;
                           } else {
                              // here you are opening new block of the same opening
                              num++;
                           }
                        } else {
                           throw new Error(`block seams to be not closed, correct it and try again.`);
                        }
                     }

                     length = 0;
                     _str.slice(closingIndex).replace(block.closingReg, (match) => { length = match.length; });
                     contentEnd = closingIndex /* the length of the content */;
                     endIndex = contentEnd + length /* the length of the closing string of the block */;
                     //#endregion

                     //#region here we have our indexes, well done.
                     let myStr = str.slice(startIndex, endIndex);
                     //start is the startingIndex in the origin string, and so for end;
                     matches.push({
                        str: myStr,
                        start: startIndex + shfit, end: endIndex + shift,
                        contentStart: contentStart + shift, contentEnd: contentEnd + shift
                     });
                     //#endregion

                     // if we are not at the end of the string,,, get match from the reset of the passed _str
                     _str = _str.slice(endIndex); // getting the rest of the string
                     if (_str !== '') {
                        /// myClosingIndex  !== str.length - 1
                        getMatches(_str.slice(endIndex), matches,
                           shift + endIndex + ((endIndex - startIndex) /* length of the matched str */ - block.id.length));
                     }

                  }
                  //#endregion
               };
               let matches = [];
               getMatches(str, matches);
               for (let i = 0; i < matches.length; i++) {
                  // there is matched string in the "str"
                  if (block.regex.test(matches[i].str)) {
                     str = str.slice(0, matches[i].start) + block.id + str.slice(matches[i].end);
                     block.match = matches[i].str;
                     block.content = matches[i].str.slice(
                        matches[i].contentStart - matches[i].start, // length of the opening string
                        matches[i].contentEnd - matches[i].end // -length of the closing string
                     ); /// to be used instead of his group value which is the id
                  }
               }
            }
            //#endregion
         } else {
            // this is an awesome state, when all blocks can be represented as regex...
            // I wish all the code to be wrapped around by an awesome algorithms and special states
            str.replace(this.regex, function () {
               groups = arguments;
            });
            groups = [...groups]; groups.pop(); groups.pop();
         }

         //#endregion

         return this.grammer.parse(groups);
      } else {
         throw new Error('Ops, there was a problem in parsing process, perhaps your string is not valid for starting parsing, or your grammer is not precise');
      }
   }

}