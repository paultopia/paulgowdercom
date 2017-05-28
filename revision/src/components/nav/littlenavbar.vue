<template>
            <div class="row">
                <littlesingle icon="home" word="home" toggle="navigation"></littlesingle>
                <littlesingle icon="phone" word="bio" toggle="bio"></littlesingle>
                <littledouble bottomicon="certificate" topicon="cogs" word="pubs" toggle="pubs"></littledouble>
                <littlesingle icon="list-ul" word="cv" toggle="cv"></littlesingle>
                <littlesingle icon="pencil" word="other writing" toggle="writing"></littlesingle>

            </div>

</template>

<script>

import littlesingle from "./littlesinglenav.vue";
import littledouble from "./littledoublenav.vue";

export default {
     components: {littlesingle, littledouble}
}


</script>