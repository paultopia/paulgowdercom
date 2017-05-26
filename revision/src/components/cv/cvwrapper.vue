<template>

<cv :pubs="pubs" :pres="pres" :courses="courses" :misc="misc" :basics="basics" :svc="svc"> </cv>

</template>

<script>

import cv from "./cv.vue"

import pubs from '../../../data/publications.json';
import pres from '../../../data/presentations.json';
import courses from '../../../data/courses.json';
import misc from '../../../data/misc.json';
import basics from '../../../data/basic.json';
import svc from '../../../data/service.json';

export default {
components: {cv},
data: function(){return {pubs, pres, courses, misc, basics, svc};}
}

</script>