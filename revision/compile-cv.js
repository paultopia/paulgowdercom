const latex = require('node-latex');
const fs = require('fs');
const Mustache = require('mustache');
const awards = require('./data/awards.json');
const basic = require('./data/basic.json');
const courses = require('./data/courses.json');
const misc = require('./data/misc.json');
const presentations = require('./data/presentations.json');
const publications = require('./data/publications.json');
const service = require('./data/service.json');

const customTags = [ '<<', '>>' ];
Mustache.tags = customTags;

//Mustache.escape = text => text;
// I actually should put a custom escaping function in that escapes things like ampersands. https://tex.stackexchange.com/questions/34580/escape-character-in-latex This one should work for everything except \ ^ and ~, which I don't plan to use.

Mustache.escape = text => text.replace(/[%&$#_{}]/g, m => "\\" + m));

const templatedata = {name: "P. foo/bar $ Gowder", awards: awards};

const template = fs.readFileSync("./cvtex/template.tex", "utf8");

const input = Mustache.render(template, templatedata);

console.log(input)

const output = fs.createWriteStream('./data/tex-cv.pdf');

const opts = {cmd: 'xelatex',
	            inputs: './cvtex',
              fonts: './cvtex'};

latex(input).pipe(output);


