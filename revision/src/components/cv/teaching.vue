<template>
<div>
    <h5> {{ header }} </h5>
    <table class="u-full-width">
        <col style="width:40%">
        <col style="width:50%">
        <col style="width:7%">
        <thead>
            <tr>
                <th>Course</th>
                <th>University</th>
                <th>Years</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="cl in classlist">
            <td>{{ cl.title }}</td>
            <td>{{ cl.school }}</td>
            <td>{{ cl.terms }}</td>
            </tr>
        </tbody></table>
</div>
</template>
 

<script>

 export default {
     props: ["header", "classlist"]
 }
</script>
