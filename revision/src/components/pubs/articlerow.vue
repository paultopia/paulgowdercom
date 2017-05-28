<template>
    <tr v-if="this.infoline">
        <td>{{ art.title }}</td>
        <td>{{ art.journal }} {{ art.volume }}<span v-if="art.issue">({{ art.issue }})</span>:{{ art.firstpage }}-{{ art.lastpage }}<span v-if="art.coauthor"> (with {{ art.coauthor }})</span></td>
        <td>{{ art.year }}</td>
        <td>
            <span class="hint--bottom" aria-label="abstract and full citation" v-if="art.abstract" v-on:click="abs()"><icon name="file-text"></icon></span>
            <a class="hint--bottom" aria-label="publisher link" v-if="art.publink" :href="art.publink"><icon name="external-link-square"></icon></a>
            <a class="hint--bottom" aria-label="alternative download link" v-if="art.altlink" :href="art.altlink"><icon name="download"></icon></a>
        </td>
    </tr>

    <tr v-else> <td colspan="3">
<p>{{ art.abstract }}</p>
<p>
<citation :art="art"></citation></p>

</td>
        <td style="vertical-align: top;"><span class="hint--bottom" aria-label="close abstract" v-on:click="line()"><icon name="times"></icon></span></td>
    </tr>
</template>

<script>

import citation from "./citation.vue";

 export default {
     props: ["art"],
     components: {citation},
     data: function(){return {infoline: true};},
     methods: {
         abs(){this.infoline = false;},
         line(){this.infoline = true;}
     }}
</script>
