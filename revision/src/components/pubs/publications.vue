<template>
<div>
<div style="margin-top:5%;">

       <h3>Books</h3>
            <ol>
                <li v-for="book in publications" v-if="book.type === 'book'">
                    {{ book.title }}
                </li></ol>

            <h3>Articles</h3>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Citation</th>
                        <th>Year</th>
                        <th>options</th>
                    </tr>
                </thead>
                    <tbody>

                        <tr is="articlerow" v-for="art in articles" v-bind:art="art" v-bind:key="art.title"></tr>


                    </tbody></table>

                        </tr>

                    
                    <p>
                        <a :href="bturl" download="gowder.bib">download bibtex</a>
                    </p>


</div>
</div>
</template>

<script>

import articlerow from './articlerow.vue';
import bibtex from "../../bibtex.js";
import io from "../../io.js";
import littlenav from '../nav/littlenavbar.vue';

function isArticle(pub){
    return pub.type === "peer review" || pub.type === "law review";
}

function chronThenTypeThenTitle(a, b){
    if(parseInt(a.year) > parseInt(b.year)) return -1;
    if(parseInt(a.year) < parseInt(b.year)) return 1;
    if(a.type > b.type) return -1;
    if(a.type < b.type) return 1;
    if(a.title < b.title) return -1;
    return 1;
}


export default {
       components: {articlerow, littlenav},
       computed: {
                 publications: function(){return this.$store.state.pubs;},
                 articles: function(){return this.$store.state.pubs.filter(isArticle).sort(chronThenTypeThenTitle)},
                 bturl: function () {return io.downloadURL(bibtex.string(this.publications));},
                 }
}

</script>