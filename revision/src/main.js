import Vue from "vue";
import bibtex from "./bibtex.js"
import VueMarkdown from 'vue-markdown'
import Icon from 'vue-awesome'
import io from "./io.js"

Vue.component('VueMarkdown', VueMarkdown);
Vue.component('icon', Icon);

import 'vue-awesome/icons/phone';
import 'vue-awesome/icons/certificate';
import 'vue-awesome/icons/cogs';

var pagedata = {};
var pageNotPainted = true

io.getData("publications", pagedata, loaders);

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



// vue components follow



Vue.component("big-nav-item", {
    props: ["icon", "word"],
    template: '<div class="three columns">\
<icon :name="icon" scale=6></icon>\
<p class="big-nav-label">{{ word }}</p></div>'
});

Vue.component("double-big-nav-item", {
    props: ["bottomicon", "topicon", "word"],
    template: '<div class="three columns"><icon>\
<icon :name="bottomicon" scale=6></icon>\
<icon :name="topicon" scale=6 class="topiconcolor"></icon></icon>\
<p class="big-nav-label">{{ word }}</p></div>'
});


// dom manipulation code (including core vue render) follows, all needs to be after dom is in, so I'm calling it onload.  It also needs to depend on the existence of the data, so I'm just calling it twice: once on page load and once every time the data fetch executes.  inloaders() has the actual code.  loaders() checks to see if inloaders() has successfully run before, and if not, calls the inload stuff.

var pubtitles;

function inloaders(){

    console.log("trying to load virtual dom, may not work if data isn't here or page isn't loaded yet, but don't worry about it, I'll try again.");

    var app = new Vue({
        el: '#app',
        data: {publications: pagedata.publications,
               articles: pagedata.publications.filter(isArticle).sort(chronThenTitle),
               navboxFullsize: true,
               showPubs: true
              },
        computed: {btstring: function () {return bibtex.string(this.publications);},
                   bturl: function () {return io.downloadURL(bibtex.string(this.publications));}
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
