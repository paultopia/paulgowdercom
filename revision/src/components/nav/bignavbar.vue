<template>

                <div class="row">
                    <p><vue-typer text="Paul Gowder" caret-animation="solid" :type-delay="300" :repeat="0"></vue-typer>
                    </p>


                   <bigsingle icon="phone" word="bio" toggle="bio"></bigsingle>

                   <bigdouble bottomicon="certificate" topicon="cogs" word="pubs" toggle="pubs"></bigdouble>

            </div>


</template>

<script>

import VueTyperPlugin from 'vue-typer';


import bigsingle from "./bigsinglenav.vue";
import bigdouble from "./bigdoublenav.vue";
export default {
     components: {bigsingle, bigdouble, VueTyperPlugin}
}

// this is also an experiment, it might not let me use methods from the global vue instance in here... might have to have them as mixins or something.

</script>