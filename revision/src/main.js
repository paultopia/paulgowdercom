
// code and resource imports
import Vue from "vue";
import bibtex from "./bibtex.js";
import Icon from 'vue-awesome';
import io from "./io.js";
import VueTyperPlugin from 'vue-typer';

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
import bignav from './components/nav/bignavbar.vue';

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




function loader(){
    var app = new Vue({
        el: '#app',
        components: {bio, articlerow, bignav},
        data: {publications: pubs,
               headshotURL: headshotURL,
               articles: pubs.filter(isArticle).sort(chronThenTypeThenTitle),
               currentView: 'bignav',
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
            clog: x => console.log(x)
        }
    });
};



window.onload = loader();
