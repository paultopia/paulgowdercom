<template>
<div class="three columns" v-on:click="navto">
<icon>
<icon :name="bottomicon" scale=6></icon>
<icon :name="topicon" scale=6 class="topiconcolor"></icon>
</icon>
<p class="big-nav-label">{{ word }}</p>
</div>
</template>


<script>

import mixins from "../../mixins.js";

export default {
mixins: [mixins.nav, mixins.doubleNav]
};

// I'm going to try to not import the icons here, see if importing them globally works. 

</script>