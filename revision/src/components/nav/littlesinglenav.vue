<template>
<div class="two columns" v-on:click="focusme">
<icon :name="icon" scale=2></icon>
<p class="little-nav-label">{{ word }}</p>
</div>
</template>

<script>

import mixins from "../../mixins.js";

module.exports = {
mixins: [mixins.nav, mixins.singleNav]
};

// I'm going to try to not import the icons here, see if importing them globally works. 

</script>