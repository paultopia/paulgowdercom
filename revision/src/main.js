
// code and resource imports
import Vue from "vue";
import Vuex from 'vuex';
Vue.use(Vuex);
import Icon from 'vue-awesome';
import VueTyperPlugin from 'vue-typer';

// personal data imports

import olddata from '../data/data.json';  // to remove

// get the store in...
import store from "./state.js";

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
import 'vue-awesome/icons/file-pdf-o';
import 'vue-awesome/icons/envelope-o';

// css imports

import '../css/normalize.css';
import '../css/skeleton.css';
import '../css/hint.min.css';
import '../css/custom.css';


// my external components (declared in global vue object below)

import navigation from './components/nav/bignavbar.vue';
import cvwrapper from './components/cv/cvwrapper.vue';
import bio from "./components/bio.vue";
import pubs from './components/pubs/publications.vue';  // to remove 


function loader(){
    var app = new Vue({
        el: '#app',
        store,
        components: {bio, navigation, cvwrapper, pubs},
        data: {
               toggles: {
                   navboxFullsize: true,
                   pubs: false,
                   bio: false
               }
              }, 
        computed: {
            currentView: function(){return store.state.currentView;}
        },
        methods: {
            clog: x => console.log(x)
        }
    });
};



window.onload = loader();
