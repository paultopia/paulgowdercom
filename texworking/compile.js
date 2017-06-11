const latex = require('node-latex');
const fs = require('fs')
const Mustache = require('mustache')

const customTags = [ '<<', '>>' ];
Mustache.tags = customTags;

const templatedata = {name: "P. Gowder"};

const template = fs.readFileSync("./working/template.tex", "utf8")

const input = Mustache.render(template, templatedata);

const output = fs.createWriteStream('output.pdf')

const opts = {cmd: 'xelatex',
	            inputs: './working',
              fonts: './working'}

latex(input).pipe(output)


