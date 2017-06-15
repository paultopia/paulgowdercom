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
import cvURL from '../data/gowdercv.pdf';
import bbabbrv from '../data/bbtables.json';
import awards from '../data/awards.json';

// I'm going to try to load some icons this way, directly into state, to pull out when needed.

import apple from '../icons/apple.svg';
const icons = {apple};

// load up the state object

var currentView = "navigation";
var citeFormat = "Chicago"
var lastView = null;
var typerOn = true;

var state = {currentView,
             citeFormat,
             lastView,
             typerOn,
             pubs,
             pres,
             courses,
             misc,
             basics,
             svc,
             commentary,
             headshotURL,
             cvURL,
             bbabbrv,
             awards,
             icons};

var mutations = {navigate(state, view){state.lastView = state.currentView; 
                                       state.currentView = view;},
                 changeCitation(state, newFormat){state.citeFormat = newFormat;},
                 typerOff(){state.typerOn = false;}};

// this one is just for debugging

var getters = {logState (state) {console.log(JSON.stringify(state));}}

export default new Vuex.Store({
    state,
    mutations,
    getters
})
