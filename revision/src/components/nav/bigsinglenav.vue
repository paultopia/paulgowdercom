<template>
<div class="three columns" v-on:click="focusme">
<icon :name="icon" scale=6></icon>
<p class="big-nav-label">{{ word }}</p>
</div>
</template>

<script>

import mixins from "../../mixins.js";

export default {
mixins: [mixins.nav, mixins.singleNav]
};

// I'm going to try to not import the icons here, see if importing them globally works. 

</script>