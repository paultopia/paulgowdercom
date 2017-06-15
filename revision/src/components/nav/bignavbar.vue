<template>
<div class="bignavbox">
<transition name="main-view-anim">
                <div class="row" v-if="typerOn">
                    <vue-typer text="Paul Gowder" caret-animation="solid" :type-delay="300" :repeat="0"></vue-typer>
</div>
</transition>
                <div class="row">
                   <bigicon icon="phone" word="bio" toggle="bio"></bigicon>
                   <bigicon icon="certificate" word="pubs" toggle="pubs"></bigicon>
                   <bigicon icon="list-ul" word="cv" toggle="cv"></bigicon>
 
            </div>

<div class="row">
<bigicon icon="pencil" word="other writing" toggle="writing"></bigicon>

<span class="icon icon-spinner"></span>
<img :src="icons.apple" height=100 width=100>
</div>


</div>

</template>

<script>

import VueTyperPlugin from 'vue-typer';


import bigicon from "./bigicon.vue";
export default {
     components: {bigicon, VueTyperPlugin},
     deactivated() {this.$store.commit('typerOff');},
     computed: {typerOn(){return this.$store.state.typerOn;},
     icons(){return this.$store.state.icons;},
     }
}

// this is also an experiment, it might not let me use methods from the global vue instance in here... might have to have them as mixins or something.

</script>
