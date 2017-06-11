const latex = require('node-latex');
 const fs = require('fs');
const Mustache = require('mustache');
const awards = require('./data/awards.json');

const customTags = [ '<<', '>>' ];
Mustache.tags = customTags;
Mustache.escape = text => text;

const templatedata = {name: "P. foo/bar Gowder", awards: awards};

const template = fs.readFileSync("./cvtex/template.tex", "utf8");

const input = Mustache.render(template, templatedata);

console.log(input)

const output = fs.createWriteStream('./data/tex-cv.pdf');

const opts = {cmd: 'xelatex',
	            inputs: './cvtex',
              fonts: './cvtex'};

latex(input).pipe(output);


