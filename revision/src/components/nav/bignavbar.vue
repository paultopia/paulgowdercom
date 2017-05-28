<template>
<div id="navcomponent">
<transition name="main-view-anim">
                <div class="row" v-if="typerOn">
                    <vue-typer text="Paul Gowder" caret-animation="solid" :type-delay="300" :repeat="0"></vue-typer>
</div>
</transition>
                <div class="row">
                   <bigsingle icon="phone" word="bio" toggle="bio"></bigsingle>

                   <bigdouble bottomicon="certificate" topicon="cogs" word="pubs" toggle="pubs"></bigdouble>
                   <bigsingle icon="list-ul" word="cv" toggle="cv"></bigsingle>

            </div>

<div class="row">
<bigsingle icon="pencil" word="other writing" toggle="writing"></bigsingle>
</div>


</div>

</template>

<script>

import VueTyperPlugin from 'vue-typer';


import bigsingle from "./bigsinglenav.vue";
import bigdouble from "./bigdoublenav.vue";
export default {
     components: {bigsingle, bigdouble, VueTyperPlugin},
     deactivated() {this.$store.commit('typerOff');},
     computed: {typerOn(){return this.$store.state.typerOn;}}
}

// this is also an experiment, it might not let me use methods from the global vue instance in here... might have to have them as mixins or something.

</script>