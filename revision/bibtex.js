// module to generate bibtex strings--- will expose as a node module and also plug into browser with webpack 

// main function--- array of publication objects --> string containing bibtex of all of them suitable for delivery as a file
function makebibtex(pubs){
	return pubs.map(function(pubitem){
		switch (pubitem.type) {
			case "law review": return articleBT(pubitem);
			case "peer review": return articleBT(pubitem);
			case "chapter": return chapterBT(pubitem);
			case "book": return bookBT(pubitem);
			default: return null;
		}
	}).filter(function(elem){return elem;}).join(",\n\n");
}

function articleBT(pubitem){
// if there's no issue number I don't want to have to handle a blank line or null value upstream
	return pubitem.issue ?
		compositor(pubitem, [nameMaker, authorMaker, basicB("title"), 
			basicB("journal"), basicB("volume"), basicB("number"), 
			pagesMaker, basicB("year")]) :
		compositor(pubitem, [nameMaker, authorMaker, basicB("title"), 
			basicB("journal"), basicB("volume"), pagesMaker, basicB("year")]);
}

function chapterBT(pubitem){
	return compositor(pubitem, [nameMaker, authorMaker, basicB("title"), 
		editorMaker, collectionTitleMaker, pagesMaker, basicB("publisher"), 
		basicB("year")]);
}

function bookBT(pubitem){
	return compositor(pubitem, [nameMaker, authorMaker, basicB("title"), basicB("publisher"), basicB("year")]);
}

function compositor(pubitem, funcs){
	return funcs.map(function(func){
		return func(pubitem);
	}).join(",\n") + "\n}";
}

function basicB(entry){
	return function(pubitem){return entry + "={" + pubitem[entry] + "}";};
} 

function authorMaker(pubitem){
	return pubitem.coauthor ? "author={" + pubitem.coauthor.split(" ")
		.reverse().join(", ") + " and Gowder, Paul}" : "author={Gowder, Paul}";
}

function collectionTitleMaker(pubitem){
    return "booktitle={" + pubitem.book + "}";
}

function editorMaker(pubitem){
	return "editor={" + pubitem.editor + "}"; 
	// json doesnt have full names, need to add then get logic in to format differently for web/cv and bibtex.
}

function nameMaker(pubitem){
	var bibtextype = {"law review": "article", "peer review": "article", 
		"chapter": "incollection", "book": "book"}[pubitem.type];
	var nom1 = pubitem.coauthor ? pubitem.coauthor.split(" ")[1]
		.toLowerCase() + "gowder" : "gowder"; 
	var nom2 = pubitem.title.split(" ").map(function(word){return word[0];})
		.join("").toLowerCase();
	return "@" + bibtextype + "{" + nom1 + pubitem.year + nom2;
}

function pagesMaker(pubitem){
	return "pages={" + pubitem.firstpage + "--" + pubitem.lastpage + "}";
}

module.exports.string = makebibtex;