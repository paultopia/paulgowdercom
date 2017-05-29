<template>

<div class="citation">

<form style="float:right;">
<label class="citeform">
<span class="label-body">Chicago</span> <input type="radio" id="Chicago" value="Chicago" v-model="citeFormat"> 
<span class="label-body">APA</span> <input type="radio" id="APA" value="APA" v-model="citeFormat"><br>
<span class="label-body">Bluebook</span> <input type="radio" id="Bluebook" value="Bluebook" v-model="citeFormat">
 <span class="label-body">MLA</span> <input type="radio" id="MLA" value="MLA" v-model="citeFormat"> 
</label>
</form>


<p v-if="(art.type == 'peer review' || art.type == 'law review') && citeFormat == 'Chicago'">

<span v-if="art.coauthor">{{chimlaAuthorMaker(art.coauthor)}}</span> 
<span v-else>Gowder, Paul.</span> 
"{{art.title}}." 
<i>{{art.journal}}</i> 
{{art.volume}}<span v-if="art.issue">.{{art.issue}}</span> 
({{art.year}}): {{art.firstpage}}-{{art.lastpage}}.

</p>

<p v-else-if="(art.type == 'peer review' || art.type == 'law review') && citeFormat == 'Bluebook'">

<span v-if="art.coauthor">{{bbAuthorMaker(art.coauthor)}}</span> 
<span v-else>Paul Gowder,</span> 
"{{art.title}}," 
{{art.volume}} 
<span style="font-variant:small-caps;">{{ bbJournalMaker(art.journal)}}</span> 
{{art.firstpage}} ({{art.year}}).

</p>

<p v-else-if="(art.type == 'peer review' || art.type == 'law review') && citeFormat == 'APA'">

<span v-if="art.coauthor">{{apaAuthorMaker(art.coauthor)}}</span>
<span v-else>Gowder, P.</span> ({{art.year}}). 
{{art.title}}. 
<i>{{art.journal}}</i>, 
{{art.volume}}<span v-if="art.issue">({{art.issue}})</span>,
{{art.firstpage}}-{{art.lastpage}}.


</p>

<p v-else-if="(art.type == 'peer review' || art.type == 'law review') && citeFormat == 'MLA'">


<span v-if="art.coauthor">{{chimlaAuthorMaker(art.coauthor)}}</span>
<span v-else>Gowder, Paul.</span>
"{{art.title}}."
<i>{{art.journal}}</i>
{{art.volume}}<span v-if="art.issue">.{{art.issue}}</span>
({{art.year}}): {{art.firstpage}}-{{art.lastpage}}. Print.

</p>

<p v-else-if="art.type == 'book' && citeFormat == 'Chicago'">
Chicago Book
</p>

<p v-else-if="art.type == 'book' && citeFormat == 'Bluebook'">
Bluebook Book
</p>

<p v-else-if="art.type == 'book' && citeFormat == 'APA'">
APA Book
</p>

<p v-else-if="art.type == 'book' && citeFormat == 'MLA'">
MLA Book
</p>

<p v-else-if="art.type == 'chapter' && citeFormat == 'Chicago'">
Chicago Chapter
</p>

<p v-else-if="art.type == 'chapter' && citeFormat == 'Bluebook'">
Bluebook Chapter
</p>

<p v-else-if="art.type == 'chapter' && citeFormat == 'APA'">
APA Chapter
</p>

<p v-else-if="art.type == 'chapter' && citeFormat == 'MLA'">
MLA Chapter
</p>

<p v-else>
Sorry, I don't have a clear citation rule for this item.
</p>


</div>
</template>

<script>


 export default {
     props: ["art"],
     computed: {
               citeFormat: {
                           get(){return this.$store.state.citeFormat;},
                           set(value){this.$store.commit('changeCitation', value);}
               }
     },
     methods: {chimlaAuthorMaker: (coau) => coau.split(" ").reverse().join(", ") + ", and Paul Gowder.",
              apaAuthorMaker: (coau) => coau.split(" ")[1] + ", " + coau.split(" ")[0].charAt(0) + "., & Gowder, P.",
              bbAuthorMaker: (coau) => coau + " & Paul Gowder,",
              bbJournalMaker: function(journal){
              var bb = this.$store.state.bbabbrv;
              return journal.split(/([!-#%-\x2A,-\/:;\x3F@\d\s])/)
              .map(function(word){
                return bb[word] || word;})
              .join("");
              }}
     }

// AUTHORMAKER DOES NOT HANDLE JOURNAL ON LEGISLATION GROUP AUTHORSHIP CASE.

// MLA ARTICLE DOES NOT HANDLE NON-PRINT

</script>