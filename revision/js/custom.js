var pagedata = {};
function getData(name){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === request.DONE && request.status === 200) {
            pagedata[name] = request.response;
            console.log("got data: " + name);
        }
    };
    var url = name + ".json"
    request.responseType = "json"
    request.open('GET', url, true);
    request.send();
}

getData("publications");

function isArticle(pub){
    return pub.type === "peer review" || pub.type === "law review";
}


function chronThenTitle(a, b){
    if(parseInt(a.year) > parseInt(b.year)) return -1;
    if(parseInt(a.year) < parseInt(b.year)) return 1;
    if(a.type > b.type) return -1;
    if(a.type < b.type) return 1;
    if(a.title < b.title) return -1;
    return 1;
}



// dom manipulation code (including most vue code) follows, all needs to be after dom is in, so I'm wrapping it all in an onload.

window.onload = function(){


    var pubtitles = new Vue({
        el: "#pubtitles",
        data:
        {publications: pagedata.publications,
         articles: pagedata.publications.filter(isArticle).sort(chronThenTitle)}
    });



// this close bracket is the one that ends the onload block.
};
