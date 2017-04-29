
// code and resource imports
import Vue from "vue";
import bibtex from "./bibtex.js"
import Icon from 'vue-awesome'
import io from "./io.js"
import VueTyperPlugin from 'vue-typer'

// personal data imports 

import bio from '../data/bio.md';
import pubs from '../data/publications.json';
import olddata from '../data/data.json';

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

import '../css/normalize.css';
import '../css/skeleton.css';
import '../css/hint.min.css';
import '../css/custom.css';

// image imports

import headshotURL from '../images/headshot.jpg';

// my external components (declared in global vue object below)

import articlerow from './components/articlerow.vue';

function isArticle(pub){
    return pub.type === "peer review" || pub.type === "law review";
}

function chronThenTypeThenTitle(a, b){
    if(parseInt(a.year) > parseInt(b.year)) return -1;
    if(parseInt(a.year) < parseInt(b.year)) return 1;
    if(a.type > b.type) return -1;
    if(a.type < b.type) return 1;
    if(a.title < b.title) return -1;
    return 1;
}


// vue component mixins

var navMixin = {
    methods: {
        focusme: function(){this.$emit('focuspage', this.toggle)}
    }
};

var singleNavMixin = {
    props: ["icon", "word", "toggle"]
};

var doubleNavMixin = {
    props: ["bottomicon", "topicon", "word", "toggle"]
};

// nav components

Vue.component("big-nav-item", {
    mixins: [navMixin, singleNavMixin],
    template: `<div class="three columns" v-on:click="focusme">
<icon :name="icon" scale=6></icon>
<p class="big-nav-label">{{ word }}</p></div>`
});


Vue.component("double-big-nav-item", {
    mixins: [navMixin, doubleNavMixin],
    template: `<div class="three columns" v-on:click="focusme"><icon>
<icon :name="bottomicon" scale=6></icon>
<icon :name="topicon" scale=6 class="topiconcolor"></icon></icon>
<p class="big-nav-label">{{ word }}</p></div>`
});


Vue.component("little-nav-item", {
    mixins: [navMixin, singleNavMixin],
    template: `<div class="two columns" v-on:click="focusme">
<icon :name="icon" scale=2></icon>
<p class="little-nav-label">{{ word }}</p></div>`
});

Vue.component("double-little-nav-item", {
    mixins: [navMixin, doubleNavMixin],
    template: `<div class="two columns" v-on:click="focusme"><icon>
<icon :name="bottomicon" scale=2></icon>
<icon :name="topicon" scale=2 class="topiconcolor"></icon></icon>
<p class="little-nav-label">{{ word }}</p></div>`
});

function loader(){
    var app = new Vue({
        el: '#app',
        components: {bio, articlerow},
        data: {publications: pubs,
               headshotURL: headshotURL,
               articles: pubs.filter(isArticle).sort(chronThenTypeThenTitle),
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
