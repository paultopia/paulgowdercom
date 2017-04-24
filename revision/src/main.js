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
import 'vue-awesome/icons/file-text';
import 'vue-awesome/icons/external-link-square';
import 'vue-awesome/icons/external-link-square';
import 'vue-awesome/icons/download';
import 'vue-awesome/icons/times';

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
    template: `<div class="three columns">
<icon :name="icon" scale=6></icon>
<p class="big-nav-label">{{ word }}</p></div>`
});

Vue.component("double-big-nav-item", {
    props: ["bottomicon", "topicon", "word"],
    template: `<div class="three columns"><icon>
<icon :name="bottomicon" scale=6></icon>
<icon :name="topicon" scale=6 class="topiconcolor"></icon></icon>
<p class="big-nav-label">{{ word }}</p></div>`
});


Vue.component("articlerow", {
    props: ["art"],
    data: function(){return {infoline: true};},
    methods: {
        abs(){this.infoline = false;},
        line(){this.infoline = true;}
             },
    template: `<tr v-if="this.infoline">
<td>{{ art.title }}</td>
<td>{{ art.journal }} {{ art.volume }}<span v-if="art.issue">({{ art.issue }})</span>:{{ art.firstpage }}-{{ art.lastpage }}<span v-if="art.coauthor"> (with {{ art.coauthor }})</span></td>
<td>{{ art.year }}</td>
<td>
<span class="hint--bottom" aria-label="abstract" v-if="art.abstract" v-on:click="abs()"><icon name="file-text"></icon></span>
<a class="hint--bottom" aria-label="publisher link" v-if="art.publink" :href="art.publink"><icon name="external-link-square"></icon></a>
<a class="hint--bottom" aria-label="alternative download link" v-if="art.altlink" :href="art.altlink"><icon name="download"></icon></a>
</td>
</tr>

<tr v-else> <td colspan="3">{{ art.abstract }}</td>
<td style="vertical-align: top;"><span class="hint--bottom" aria-label="close abstract" v-on:click="line()"><icon name="times"></icon></span></td>
</tr>
`
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
               texts: {},
               showPubs: true
              },
        computed: {
            btstring: function () {return bibtex.string(this.publications);},
            biotext: function () {
                console.log(this.texts.bio);
                return this.texts.bio;},
            bturl: function () {return io.downloadURL(bibtex.string(this.publications));}
        },
        mounted: function () {io.getText("bio", this);
                                  },
        methods: {
            toggle: function(bool){
                this[bool] = this[bool] ? false : true;}, // pass bool as single-quoted string
            showModal: function(modal){
                this.$modal.show(modal);}
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
