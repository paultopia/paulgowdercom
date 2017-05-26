// fire up vuex

import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// get my external data in

import pubs from '../data/publications.json';
import pres from '../data/presentations.json';
import courses from '../data/courses.json';
import misc from '../data/misc.json';
import basics from '../data/basic.json';
import svc from '../data/service.json';


// load up the state object

var currentView = "bignav"

var state = {currentView,
             pubs,
             pres,
             courses,
             misc,
             basics,
             svc};

var mutations = {navigate (state, view) {state.currentView = view;}};

// this one is just for debugging

var getters = {logState (state) {console.log(JSON.stringify(state));}}

export default new Vuex.Store({
    state,
    mutations,
    getters
})
