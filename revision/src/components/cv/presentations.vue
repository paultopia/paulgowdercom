<template>
<div>

    <h5> {{ header }} </h5>
    <table class="u-full-width">
        <col style="width:40%">
        <col style="width:50%">
        <col style="width:7%">
        <thead><tr><th>Venue</th><th>Title</th><th>Years</th></tr></thead>
        <tbody>
            <tr v-for="presentation in presentationlist">
                <td>
                    {{ presentation.venue }}
                </td>

                <td>
                    {{ presentation.title }}
                </td>

                <td>
                    {{ presentation.year }}
                </td>

            </tr>
        </tbody></table>

</div>
</template>

<script>

export default {
     props: ["header", "presentationlist"]
     }
</script>
