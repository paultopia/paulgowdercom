<template>

<div class="two columns" v-on:click="focusme">
<icon>
<icon :name="bottomicon" scale=2></icon>
<icon :name="topicon" scale=2 class="topiconcolor"></icon>
</icon>
<p class="little-nav-label">{{ word }}</p>
</div>

</template>

<script>

import mixins from "../../mixins.js";

module.exports = {
mixins: [mixins.nav, mixins.doubleNav]
};

// I'm going to try to not import the icons here, see if importing them globally works. 

</script>