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
import commentary from '../data/commentary.json';
import headshotURL from '../images/headshot.jpg';


// load up the state object

var currentView = "navigation";
var lastView = null;
var typerOn = true;

var state = {currentView,
             lastView,
             typerOn,
             pubs,
             pres,
             courses,
             misc,
             basics,
             svc,
             commentary,
             headshotURL};

var mutations = {navigate(state, view){state.lastView = state.currentView;
                                       state.currentView = view;},
                 typerOff(){state.typerOn = false;}};

// this one is just for debugging

var getters = {logState (state) {console.log(JSON.stringify(state));}}

export default new Vuex.Store({
    state,
    mutations,
    getters
})
