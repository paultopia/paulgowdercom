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


// dom manipulation code (including most vue code) follows, all needs to be after dom is in, so I'm wrapping it all in an onload.

window.onload = function(){


    var pubtitles = new Vue({
        el: "#pubtitles",
        data: 
        {publications: pagedata.publications,
         books: pagedata.publications.filter(function(pub){
             return pub.type === "book";
         }
         )
        }
    }
                           );



// this close bracket is the one that ends the onload block.
};
