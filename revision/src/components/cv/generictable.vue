<template>

<div>

<!-- This is only suitable for when the header is just a capitalized version of the items.  headingslist will be lowercase and I'll just uppercase the first word in a method. -->

    <h3 v-if="ismajor"> {{ header }} </h3>

    <h5 v-else> {{ header }} </h5>

    <table class="u-full-width">
        <col style="width:40%">
        <col style="width:50%">
        <col style="width:7%">
        <thead>
            <tr>
                <th v-for="heading in titleCase(headings)">
                    {{ heading }} </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in itemslist">
                <td v-for="heading in headings">
                    {{ item[heading] }}
                </td>


            </tr>
        </tbody></table>

<!-- I can swap existing subcomponents for this maybe? -->
</div>
</template>

<script>

 export default {
     props: ["header", "itemslist", "ismajor"],
     computed: {headings: function () {return Object.keys(this.itemslist[0])}},
     methods: {titleCase: arr => arr.map(s=>s.slice(0,1).toUpperCase() + s.slice(1))}
 }
</script>
