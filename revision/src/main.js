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




function loader(){
    var app = new Vue({
        el: '#app',
        data: {publications: pagedata.bigdata.publications,
               articles: pagedata.bigdata.publications.filter(isArticle).sort(chronThenTitle),
               biotext: pagedata.bigdata.bio,
               toggles: {
                   navboxFullsize: true,
                   showPubs: true,
                   showBio: false
               }
              },
        computed: {
            bturl: function () {return io.downloadURL(bibtex.string(this.publications));}
        },
        methods: {
            toggle: function(bool){
                this.toggles[bool] = this.toggles[bool] ? false : true;}, // pass bool as single-quoted string
            focus: function(k){
                for (let i in this.toggles) this.toggles[i] = false;
                this.toggles[k] = true;},
            showModal: function(modal){
                this.$modal.show(modal);}
        }
    });
};


window.onload = io.getData("bigdata", pagedata, loader);
