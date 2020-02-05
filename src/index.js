
var Parser = require('./Parser').default;
var CustomParsers = require('./customParsers/index').default;

var MagicalParser = { Parser, CustomParsers };

module.exports = MagicalParser;