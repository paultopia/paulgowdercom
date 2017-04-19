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
	return null;
}

function collectionTitleMaker(pubitem){
	return null;
}

function editorMaker(pubitem){
	return null;
}

function journalMaker(pubitem){
	return null;
}

function nameMaker(pubitem){
	return null;
}

function numberMaker(pubitem){
	return null;
}

function pagesMaker(pubitem){
	return null;
}

function publisherMaker(pubitem){
	return null;
}

function titleMaker(pubitem){
	return null;
}

function volumeMaker(pubitem){
	return null;
}

function yearMaker(pubitem){
	return null;
}

//also need to write the plumbing to make this exportable to node/browserify, but perhaps only after testing.