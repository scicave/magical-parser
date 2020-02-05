# magical-parser
Parser for programming languages, used to analyze their structures, axiomatically you can use it to parse math expressions.
Morevoer you can create your own syntax which the text will be parsed according to.


# Support us
We are still working in this library (repo), please help us to continue coding. we appreciate every donation, big or small, it is the blood in this team vessels (^_^)
[PATREON](https://www.patreon.com/ms2052001/).

# Contribute
This is an open-source library, don't hessitate to enrich the open-source community, help other developers, we should keep the needle moving, make sure your contribution is well integrated and tested carefully, ❤️️.

# Math expressions
You can use our lovely library to parse mathematical expressions with an extesive options to set.
### Code:
``` javascript

const parser = new MagicalParser.CustomParsers.Math();

let input = 'y = (2x)! ^ sin(5rad)';

let output = parser.parse(input);

console.log(output); // expected ouput, tree node starting from the root node as "=" operator contains 2 nodes both has it nodes in args property.

/*
 you can use the output to create some complicated stuff suhc 
   1. converte to latex
   2. calculated this complicated input,
   3. no limit for application, abilities stop at the end of our imaginations. 
*/
```

