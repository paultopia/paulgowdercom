<template>
<div>
    <h3>Service</h3>

    <h5> University Service </h5>
    <table class="u-full-width">
        <col style="width:40%">
        <col style="width:50%">
        <col style="width:7%">
        <thead>
            <tr>
                <th>Role</th>
                <th>Context</th>
                <th>Years</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="sv in servicelist.filter(x=>x['type']=='university')">
                <td>{{ sv.role }}</td>
                <td>{{ sv.entity }}<span v-if="sv.subentity">, {{ sv.subentity }}</span></td>
                <td>{{ sv.years }}</td>
            </tr>
        </tbody></table>

    <generictable :ismajor="false" header="Disciplinary Service" :itemslist="servicelist.filter(x=>x['type']=='disciplinary')"></generictable>
    <generictable :ismajor="false" header="Community Service and Outreach" :itemslist="servicelist.filter(x=>x['type']=='community')"></generictable>

</div>
</template>


<script>

import generictable from "./generictable.vue";

export default {
     props: ["servicelist"],
     components: {generictable}
 }
</script>
