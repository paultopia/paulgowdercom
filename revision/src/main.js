
// code and resource imports
import Vue from "vue";
import bibtex from "./bibtex.js"
import Icon from 'vue-awesome'
import io from "./io.js"
import VueTyperPlugin from 'vue-typer'

// personal data imports 

import bio from '../data/bio.md';
import pubs from '../data/publications.json';

// activating external components (need consistent syntax for this, one is in the main vue object too, the markdown one...)
Vue.use(VueTyperPlugin);
Vue.component('icon', Icon);

// icon imports

import 'vue-awesome/icons/phone';
import 'vue-awesome/icons/certificate';
import 'vue-awesome/icons/cogs';
import 'vue-awesome/icons/file-text';
import 'vue-awesome/icons/external-link-square';
import 'vue-awesome/icons/external-link-square';
import 'vue-awesome/icons/download';
import 'vue-awesome/icons/times';

// css imports

import '../css/normalize.css'
import '../css/skeleton.css'
import '../css/hint.min.css'
import '../css/custom.css'

// image imports

import headshotURL from '../images/headshot.jpg';

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
    props: ["icon", "word", "toggle"],
    template: `<div class="three columns" v-on:click="focusme">
<icon :name="icon" scale=6></icon>
<p class="big-nav-label">{{ word }}</p></div>`,
    methods: {
        focusme: function(){this.$emit('focuspage', this.toggle)}
    }
});


Vue.component("double-big-nav-item", {
    props: ["bottomicon", "topicon", "word", "toggle"],
    template: `<div class="three columns" v-on:click="focusme"><icon>
<icon :name="bottomicon" scale=6></icon>
<icon :name="topicon" scale=6 class="topiconcolor"></icon></icon>
<p class="big-nav-label">{{ word }}</p></div>`
    ,
    methods: {
        focusme: function(){this.$emit('focuspage', this.toggle)}
    }
});


Vue.component("little-nav-item", {
    props: ["icon", "word", "toggle"],
    template: `<div class="two columns" v-on:click="focusme">
<icon :name="icon" scale=2></icon>
<p class="little-nav-label">{{ word }}</p></div>`,
    methods: {
        focusme: function(){this.$emit('focuspage', this.toggle)}
    }
});

Vue.component("double-little-nav-item", {
    props: ["bottomicon", "topicon", "word", "toggle"],
    template: `<div class="two columns" v-on:click="focusme"><icon>
<icon :name="bottomicon" scale=2></icon>
<icon :name="topicon" scale=2 class="topiconcolor"></icon></icon>
<p class="little-nav-label">{{ word }}</p></div>`,
    methods: {
        focusme: function(){this.$emit('focuspage', this.toggle)}
    }
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
        components: {bio},
        data: {publications: pubs,
               headshotURL: headshotURL,
               articles: pubs.filter(isArticle).sort(chronThenTitle),
               toggles: {
                   navboxFullsize: true,
                   pubs: false,
                   bio: false
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
            onTypedExperiment: function(typedstring){console.log(typedstring)} // this is an experiment, see https://github.com/cngu/vue-typer for how to receive events in global vue and line 323-4 of https://github.com/cngu/vue-typer/blob/master/src/vue-typer/components/VueTyper.vue for an example of how to emit the word "typed" which gets picked up in <vue-typer text="Paul Gowder" @typed='onTypedExperiment'>
        }
    });
};



window.onload = loader();
