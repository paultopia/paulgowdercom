<template>
            <div class="row">
                <littlesingle icon="home" word="home" toggle="navboxFullsize" v-on:focuspage="focus"></littlesingle>
                <littlesingle icon="phone" word="bio" toggle="bio" v-on:focuspage="focus"></littlesingle>
                <littledouble bottomicon="certificate" topicon="cogs" word="pubs" toggle="pubs" v-on:focuspage="focus"></littledouble>

            </div>

</template>

<script>

import littlesingle from "./littlesinglenav.vue";
import littledouble from "./littledoublenav.vue";
module.exports = {
     components: {littlesingle, littledouble}
}

// this is also an experiment, it might not let me use methods from the global vue instance in here... might have to have them as mixins or something.

</script>