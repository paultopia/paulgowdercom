const latex = require('node-latex');
const fs = require('fs');
const Mustache = require('mustache');
// const awards = require('./data/awards.json');

const awards = JSON.parse(fs.readFileSync('./data/awards.json', "utf8"));

const customTags = [ '<<', '>>' ];
Mustache.tags = customTags;
Mustache.escape = function (text) {return text;} // overriding HTML escaping. See line 622 of https://github.com/janl/mustache.js/blob/23beb3a8805c9a857e3ea777431481599fab503e/mustache.js 

const templatedata = {name: "P. foo/bar Gowder", awards: awards};

const template = fs.readFileSync("./cvtex/template.tex", "utf8");

const input = Mustache.render(template, templatedata);

console.log(input)

const output = fs.createWriteStream('./data/tex-cv.pdf');

const opts = {cmd: 'xelatex',
	            inputs: './cvtex',
              fonts: './cvtex'};

latex(input).pipe(output);


