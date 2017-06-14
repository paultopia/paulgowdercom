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

// clean up pubs

function yearsThenEntity(a, b){
    if(a.years > b.years) return -1;
    if(a.years < b.years) return 1;
    if(a.entity < b.entity) return -1;
    return 1;
}

function yearsThenRole(a, b){
    if(a.years > b.years) return -1;
    if(a.years < b.years) return 1;
    if(a.role < b.role) return -1;
    return 1;
}

function chronThenTitle(a, b){
    if(parseInt(a.year) > parseInt(b.year)) return -1;
    if(parseInt(a.year) < parseInt(b.year)) return 1;
    if(a.title < b.title) return -1;
    return 1;
}

function termsThenSchoolthenTitle(a, b){
    if(a.terms > b.terms) return -1;
    if(a.terms < b.terms) return 1;
    if(a.school > b.school) return -1;
    if(a.school < b.school) return 1;
    if(a.title < b.title) return -1;
    return 1;
}


function citeMaker(art){
    return art.issue ? art.volume + "(" + art.issue + "):" + art.firstpage + "-" + art.lastpage : art.volume + ":" + art.firstpage + "-" + art.lastpage;
}

function citeAdder(art){
    var a = JSON.parse(JSON.stringify(art));
    a.cite = citeMaker(a);
    return a;
}

const leadteaching = courses.lead.sort(termsThenSchoolthenTitle);
const taships = courses.ta.sort(termsThenSchoolthenTitle);

const userv = service.filter(s => s.type === "university").sort(yearsThenEntity);
const dserv = service.filter(s => s.type === "disciplinary").sort(yearsThenRole);
const cserv = service.filter(s => s.type === "community").sort(yearsThenRole);

const books = publications.filter(p => p.type === "book").sort(chronThenTitle);
const peerreview = publications.filter(p => p.type === "peer review").sort(chronThenTitle).map(citeAdder);
const lawreview = publications.filter(p => p.type === "law review").sort(chronThenTitle).map(citeAdder);
const chapters = publications.filter(p => p.type === "chapter").sort(chronThenTitle);
const miscpubs = publications.filter(p => p.type === "misc").sort(chronThenTitle);

const templatedata = {awards, basic, leadteaching, taships, misc, presentations, userv, dserv, cserv, books, peerreview, lawreview, chapters, miscpubs};

const template = fs.readFileSync("./cvtex/template.tex", "utf8");

const input = Mustache.render(template, templatedata);

const output = fs.createWriteStream('./data/gowdercv.pdf');

const opts = {cmd: 'xelatex',
	            inputs: './cvtex',
              fonts: './cvtex'};

latex(input).pipe(output);


