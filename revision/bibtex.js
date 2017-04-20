// module to generate bibtex strings--- will expose as a node module and also plug into browser with browserify 

function servefile(string, extension) {
// produce a text file with given extension containing string -- this should probably be on web-side
// TODO
	return null;
}

// array of publication objects --> string containing bibtex of all of them suitable for delivery as a file
function makebibtex(pubs){
	return pubs.map(function(pubitem){
		switch (pubitem.type) {
			case "law review": return articleBT(pubitem);
			case "peer review": return articleBT(pubitem);
			case "chapter": return chapterBT(pubitem);
			case "book": return bookBT(pubitem);
			default: return "";
		}
	}).join(",\n\n");
}

function articleBT(pubitem){
// if there's no issue number I don't want to have to handle a blank line or null value upstream
	return pubitem.issue ? compositor(pubitem, [nameMaker, authorMaker, titleMaker, journalMaker, volumeMaker, numberMaker, pagesMaker, yearMaker]) : compositor(pubitem, [nameMaker, authorMaker, titleMaker, journalMaker, volumeMaker, pagesMaker, yearMaker]);
}

function chapterBT(pubitem){
	return compositor(pubitem, [nameMaker, authormaker, titleMaker, editorMaker, collectionTitleMaker, pagesMaker, publisherMaker, yearMaker]);
}

function bookBT(pubitem){
	return compositor(pubitem, [nameMaker, authorMaker, titleMaker, publisherMaker, yearMaker]);
}

function compositor(pubitem, funcs){
	return funcs.map(function(func){
		func(pubitem);
	}).join(",\n") + "\n}";
	// apply array of functions to pubitem in order and join results as a string representing single bibtex object.  Functional programming idioms FTW, also.
}

// now all I have to do is actually write the logic to generate the lines of each bibtex entry from pub object.  all of the functions below take the publication object and generate a single line reflecting the appropriate piece of the bibtex entry.  all the stuff above composes them and puts the ultimate string together in stages.

function authorMaker(pubitem){
	return pubitem.coauthor ? "author={" + pubitem.coauthor.split(" ").reverse().join(", ") + " and Gowder, Paul}" : "author={Gowder, Paul}";
}

function collectionTitleMaker(pubitem){
	return "booktitle={" + pubitem.book + "}";
}

function editorMaker(pubitem){
	return "editor={" + pubitem.editor + "}"; // right now my json doesnt have full names, need to add then get logic in to format differently for web/cv and bibtex.
}

function journalMaker(pubitem){
	return "journal={" + pubitem.journal + "}";
}

// i should really refactor these oneliners into some function that just takes name and pubitem and builds string from name = params.  will require matching json params to names, but thats easy to do with an object...

function nameMaker(pubitem){
	var bibtextype = {"law review": "article", "peer review": "article", "chapter": "incollection", "book": "book"}[pubitem.type];
	var nom1 = pubitem.coauthor ? pubitem.coauthor.split(" ")[1].toLowerCase() + "gowder" : "gowder"; 
	var nom2 = pubitem.title.split(" ").map(function(word){return word[0];}).join("").toLowerCase(); //I like to think title initials will be unique in a year...
	return "@" + bibtextype + "{" + nom1 + pubitem.year + nom2;
}

function numberMaker(pubitem){
	return "number={" + pubitem.issue + "}";
}

function pagesMaker(pubitem){
	return "pages={" + pubitem.firstpage + "--" + pubitem.lastpage + "}";
}

function publisherMaker(pubitem){
	return "publisher={" + pubitem.publisher + "}";
}

function titleMaker(pubitem){
	return "title={" + pubitem.title + "}";
}

function volumeMaker(pubitem){
	return "volume={" + pubitem.volume + "}";
}

function yearMaker(pubitem){
	return "year={" + pubitem.year + "}";
}

//also need to write the plumbing to make this exportable to node/browserify, but perhaps only after testing.