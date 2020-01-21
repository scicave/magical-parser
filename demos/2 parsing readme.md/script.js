import Parser from "../../src/Parser";

let input = document.querySelector('md-input');
let output = document.querySelector('md-output');
let parser = new Parser();

input.value =
   `
   # SCICAVE Team
   * This * ** is ** a demo for parsing readme files with .md ext,
   
   ## list
   * first item
   * second item
      * sub item
      * subitem2
         1. subsubitem
         2. subsubitem2
   

   # Author
   *** Mohammed Samir ***
   `;

input.change = function () {
   console.time('parsing readme.md');
   let parsedValue = parser.parse();
   output.firstElementChild.remove();
   output.appendChild(getRlt(parsedValue));
   console.log('the time spent in parsing process');
   console.timeEnd('parsing readme.md');
};

function getElt(pval) {
   
}
