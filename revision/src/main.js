
// code and resource imports
import Vue from "vue";
import Vuex from 'vuex';
Vue.use(Vuex);
import Icon from 'vue-awesome/components/Icon.vue';
import VueTyperPlugin from 'vue-typer';


// get the store in...
import store from "./state.js";

// activating external components (need consistent syntax for this, one is in the main vue object too, the markdown one...)
Vue.use(VueTyperPlugin);
Vue.component('icon', Icon);

// icon imports

// import {phone, certificate, cogs, file_text, external_link_square, download, times, file_pdf_o, envelope_o, list_ul, pencil} from 'vue-awesome/icons';
import 'vue-awesome/icons/phone';
import 'vue-awesome/icons/certificate';
import 'vue-awesome/icons/cogs';
import 'vue-awesome/icons/file-text';
import 'vue-awesome/icons/external-link-square';
import 'vue-awesome/icons/download';
import 'vue-awesome/icons/times';
import 'vue-awesome/icons/file-pdf-o';
import 'vue-awesome/icons/envelope-o';
import 'vue-awesome/icons/list-ul';
import 'vue-awesome/icons/pencil';

// css imports

import '../css/normalize.css';
import '../css/skeleton.css';
import '../css/hint.min.css';
import '../css/custom.css';
import '../css/sprite.css';


// my external components (declared in global vue object below)

import navigation from './components/nav/bignavbar.vue';
import littlenav from './components/nav/littlenavbar.vue'
import cv from './components/cv/cv.vue';
// import cv from "./components/cv.vue"; // experimental pdf embed doesn't work.  moving to failing-cv.vue.
import bio from "./components/bio.vue";
import pubs from './components/pubs/publications.vue';
import writing from './components/writing.vue';


function loader(){
    var app = new Vue({
        el: '#app',
        store,
        data: {notloaded: false}, // the point of this is to have placeholder text that goes away on load.
        components: {bio, navigation, cv, pubs, writing, littlenav},
        computed: {
            currentView: function(){return store.state.currentView;}
        },
        methods: {
            clog: x => console.log(x), // for debugging
            checkViewForTransition: function(){return (store.state.currentView == "navigation" || store.state.lastView == "navigation") ? "main-view-anim" : "main-view-nonav";}
        }
    });
};



window.onload = loader();
