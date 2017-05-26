<template>
<div>
<littlenav></littlenav>
<bio></bio>
</div>
</template>

<script>
import bio from '../../data/bio.md'; // dumps directly to markdown component from webpack.
import littlenav from './nav/littlenavbar.vue';

export default {
     components: {bio, littlenav}
}

</script>