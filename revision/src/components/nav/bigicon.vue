<template>
<div class="three columns" v-on:click="navto">
<icon :name="icon" scale=6></icon>
<p class="big-nav-label">{{ word }}</p>
</div>
</template>

<script>

import mixins from "../../mixins.js";

export default {
mixins: [mixins.nav, mixins.singleNav]
};

</script>