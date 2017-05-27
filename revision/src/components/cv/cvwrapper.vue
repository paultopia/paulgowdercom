<template>
<div>
<littlenav></littlenav>
<cv :pubs="pubs" :pres="pres" :courses="courses" :misc="misc" :basics="basics" :svc="svc" :awards="awards"> </cv>
</div>
</template>

<script>

import cv from "./cv.vue"

import pubs from '../../../data/publications.json';
import pres from '../../../data/presentations.json';
import courses from '../../../data/courses.json';
import misc from '../../../data/misc.json';
import basics from '../../../data/basic.json';
import svc from '../../../data/service.json';
import littlenav from '../nav/littlenavbar.vue';
import awards from '../../../data/awards.json';

export default {
components: {cv, littlenav},
data: function(){return {pubs, pres, courses, misc, basics, svc, awards};}
}

</script>