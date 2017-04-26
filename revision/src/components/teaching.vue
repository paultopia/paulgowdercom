<template>

    <h5> {{ heading }} </h5>
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
            <tr v-for="class in classlist">
            <td>{{ class.title }}</td>
            <td>{{ class.school }}</td>
            <td>{{ class.terms }}</td>
            </tr>
        </tbody></table>
</template>


<script>

 module.exports = {
     props: ["header", "classlist"]
 }
</script>
