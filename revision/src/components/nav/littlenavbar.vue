<template>
            <div class="row">
                <littleicon icon="home" word="home" toggle="navigation"></littleicon>
                <littleicon icon="phone" word="bio" toggle="bio"></littleicon>
                <littleicon icon="certificate" word="pubs" toggle="pubs"></littleicon>
                <littleicon icon="list-ul" word="cv" toggle="cv"></littleicon>
                <littleicon icon="pencil" word="other writing" toggle="writing"></littleicon>

            </div>

</template>

<script>

import littleicon from "./littleicon.vue";

export default {
     components: {littleicon}
}


</script>
