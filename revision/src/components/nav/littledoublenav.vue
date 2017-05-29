<template>

<div class="two columns" v-on:click="navto" :class="isActive">
<icon>
<icon :name="bottomicon" scale=2></icon>
<icon :name="topicon" scale=2 :class="isTopActive"></icon>
</icon>
<p class="little-nav-label">{{ word }}</p>
</div>

</template>

<script>

import mixins from "../../mixins.js";

export default {
mixins: [mixins.nav, mixins.doubleNav]
};

</script>