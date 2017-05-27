<template>
<div>

            <h5>Books</h5>
            <table class="u-full-width">
                <col style="width:35%">
                <col style="width:55%">
                <col style="width:7%">
                <thead><tr><th>Title</th><th>Publisher</th><th>Years</th></tr></thead><tbody>

<tr v-for="book in sortedPubs" v-if="book.type === 'book'">
                    
                    <td>
                        {{ book.title }}

                        <span v-if="book.coauthor">
                        <br>(Co-Author with {{ book.coauthor }})
                        </span>

                    </td><td>
                        {{ book.publisher }}

                    </td><td>

                        {{ book.year }}

                    </td>
                    </tr>
                    
                </tbody></table>


            <h5>Peer Reviewed Articles</h5>
            <table class="u-full-width">
                <col style="width:35%">
                <col style="width:35%">
                <col style="width:20%">
                <col style="width:7%">
                <thead><tr><th>Title</th><th>Journal</th><th>Citation</th><th>Years</th></tr></thead><tbody>

<tr v-for="art in sortedPubs" v-if="art.type === 'peer review'">
                    
                    <td>
                        {{ art.title }}

                        <span v-if="art.coauthor">
                        <br>(Co-Author with {{ art.coauthor }})
                        </span>

                    </td><td>
                        {{ art.journal }}

                    </td><td>
                        {{ makeCitation(art) }}

                    </td><td>

                        {{ art.year }}

                    </td>
                    </tr>
                </tbody></table>


            <h5>Law Review Articles</h5>
            <table class="u-full-width">
                <col style="width:35%">
                <col style="width:35%">
                <col style="width:20%">
                <col style="width:7%">
                <thead><tr><th>Title</th><th>Journal</th><th>Citation</th><th>Years</th></tr></thead><tbody>

<tr v-for="art in sortedPubs" v-if="art.type === 'law review'">
                    
                    <td>
                        {{ art.title }}

                        <span v-if="art.coauthor">
                        <br>(Co-Author with {{ art.coauthor }})
                        </span>

                    </td><td>
                        {{ art.journal }}

                    </td><td>
                        {{ makeCitation(art) }}

                    </td><td>

                        {{ art.year }}

                    </td>
                    </tr>
                </tbody></table>


            <h5>Book Chapters</h5>
            <table class="u-full-width">
                <col style="width:35%">
                <col style="width:35%">
                <col style="width:20%">
                <col style="width:7%">
                <thead><tr><th>Title</th><th>Book</th><th>Pages</th><th>Years</th></tr></thead><tbody>
                
<tr v-for="chapter in sortedPubs" v-if="chapter.type === 'chapter'">                

<td>
                        {{ chapter.title }}

                        <span v-if="chapter.coauthor">
                        <br>(Co-Author with {{ chapter.coauthor }})
                        </span>
    
                </td>
                    <td>
                        {{ chapter.editors }}, eds., <em>{{ chapter.book }}</em> ({{ chapter.publisher }})
                        
                    </td><td>
                        
                        {{chapter.firstpage + "-" + chapter.lastpage}}
                    
                    </td><td>
                        {{ chapter.year }}
                    </td></tr>
                    
                </tbody></table>

            <h5>Miscellany</h5>
            <table class="u-full-width">
                <col style="width:40%">
                <col style="width:50%">
                <col style="width:7%">
                <thead><tr><th>Title</th><th>Description</th><th>Years</th></tr></thead><tbody>
                    
                    <tr v-for="misc in sortedPubs" v-if="misc.type === 'misc'">              
                    
                    <td>
                        {{ misc.title }}
                        
                        <span v-if="misc.coauthor">
                        <br>(Co-Author with {{ misc.coauthor }})
                        </span>
    
                        
                    </td><td>
                        {{ misc.description }}
                    </td><td>
                        {{ misc.year }}
                    </td></tr>
                    
                </tbody></table>

</div>

</template>

<script>

function chronThenTitle(a, b){
    if(parseInt(a.year) != parseInt(b.year)) return parseInt(b.year) - parseInt(a.year);
    if(a.title < b.title) return -1;
    return 1;
}


export default {
     props: ["pubs"],
     computed: {sortedPubs: function(){return this.pubs.sort(chronThenTitle);},
     displayPubs: function(){return JSON.stringify(this.pubs);}
     },
     methods: {makeCitation: function(art){
     var iss = art.issue ? "(" + art.issue + ")" : "";
     return art.volume + art.issue + ":" + art.firstpage + "-" + art.lastpage;}
      }
    }
 

</script>
