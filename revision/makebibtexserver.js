// server-side bibtex file generation, mainly for convenience in pushing new bibtex out before whole rewrite is done (existing bibtex file is a mess) + testing w/o browser nonsense

var bibtex = require("./bibtex");
var fs = require("fs");
var pubs = JSON.parse(fs.readFileSync("publications.json", "utf8"));
var btString = bibtex.string(pubs);
fs.writeFile("gowder.bib", btString, function(err){console.log(err ? err : "success!");});
