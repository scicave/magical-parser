import OperatorsParser from './OperatorsParser.js';
import CustomParsers from './customParsers/index.js';
import TOKENS from './tokens/TOKENS.js';
import Tokens from './tokens/index.js';
import Rules from './rules/index.js';

var MagicalParser = { OperatorsParser, CustomParsers, TOKENS, Tokens, Rules };

export default MagicalParser;
