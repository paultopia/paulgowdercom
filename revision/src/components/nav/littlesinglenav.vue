<template>
<div class="two columns" v-on:click="navto" :class="isActive">
<icon :name="icon" scale=2></icon>
<p class="little-nav-label">{{ word }}</p>
</div>
</template>

<script>

import mixins from "../../mixins.js";

export default {
mixins: [mixins.nav, mixins.singleNav]
};

</script>