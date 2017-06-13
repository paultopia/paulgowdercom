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

// Custom escaping code for LaTeX special chatacters.

var matches = new Map([["\\", "textbackslash"],
                       ["~","textasciitilde"],
	                     ["^","textasciicircum"]]);

function latexEscaper(text){
		return text.replace(/[\\~\^%&$#_{}]/g,
				                match => "\\" + (matches.get(match) || match));}

Mustache.escape = latexEscaper;

const templatedata = {name: "P. foo/bar ^ $ Gowder", awards: awards};

const template = fs.readFileSync("./cvtex/template.tex", "utf8");

const input = Mustache.render(template, templatedata);

const output = fs.createWriteStream('./data/tex-cv.pdf');

const opts = {cmd: 'xelatex',
	            inputs: './cvtex',
              fonts: './cvtex'};

latex(input).pipe(output);


