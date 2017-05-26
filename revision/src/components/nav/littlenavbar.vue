<template>
            <div class="row">
                <littlesingle icon="home" word="home" toggle="navigation"></littlesingle>
                <littlesingle icon="phone" word="bio" toggle="bio"></littlesingle>
                <littledouble bottomicon="certificate" topicon="cogs" word="pubs" toggle="pubs"></littledouble>

            </div>

</template>

<script>

import littlesingle from "./littlesinglenav.vue";
import littledouble from "./littledoublenav.vue";

export default {
     components: {littlesingle, littledouble}
}


</script>