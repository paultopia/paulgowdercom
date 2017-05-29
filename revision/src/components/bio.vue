<template>
<div>
 <p><img :src="headshot"></p>
<bio></bio>
</div>
</template>

<script>
import bio from '../../data/bio.md'; // dumps directly to markdown component from webpack.
import littlenav from './nav/littlenavbar.vue';

export default {
     components: {bio, littlenav},
     computed: {headshot: function () {return this.$store.state.headshotURL;}}
}

</script>