var pagedata = {};
var pageNotPainted = true
function getData(name){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === request.DONE && request.status === 200) {
            pagedata[name] = request.response;
            console.log("got data: " + name);
            loaders();
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



// dom manipulation code (including most vue code) follows, all needs to be after dom is in, so I'm calling it onload.  It also needs to depend on the existence of the data, so I'm just calling it twice: once on page load and once every time the data fetch executes.  inloaders() has the actual code.  loaders() checks to see if inloaders() has successfully run before, and if not, calls the inload stuff.

var pubtitles;

function inloaders(){

    console.log("trying to load virtual dom, may not work if data isn't here or page isn't loaded yet, but don't worry about it, I'll try again.");

    var app = new Vue({
        el: '#app',
        data: {publications: pagedata.publications,
               articles: pagedata.publications.filter(isArticle).sort(chronThenTitle),
               navboxFullsize: true
              }
    });






    //not sure if these vue objects have to be globals or not, might try declaring them outside if problems arise with updating.

// this close bracket is the one that ends the loaders functionality.
};







function loaders(){
    if(pageNotPainted){
        try {
            inloaders();
            pageNotPainted = false;
            console.log("successfully painted page");

        }
        catch(error) {
            console.log("did not paint page.  trying again later. Here's the error:");
            console.error(error);
        }
    }
}

window.onload = loaders();
