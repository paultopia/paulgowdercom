<template>

<div class="citation">

<p v-if="(art.type == 'peer review' || art.type == 'law review') && citeFormat == 'Chicago'">

<span v-if="art.coauthor">{{authorMaker(art.coauthor)}}</span><span v-else>Gowder, Paul.</span>

Chicago Article
</p>

<p v-else-if="(art.type == 'peer review' || art.type == 'law review') && citeFormat == 'Bluebook'">
Bluebook Article
</p>

<p v-else-if="(art.type == 'peer review' || art.type == 'law review') && citeFormat == 'APA'">
APA Article
</p>

<p v-else-if="(art.type == 'peer review' || art.type == 'law review') && citeFormat == 'MLA'">
MLA Article
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

<p>Change citation format:</p>

<select v-model="citeFormat">
  <option>Chicago</option>
  <option>Bluebook</option>
  <option>APA</option>
  <option>MLA</option>
  </select>


</div>
</template>

<script>

 export default {
     props: ["art"],
     data: function(){return {citeFormat: "Chicago"};},
     methods: {authorMaker: (coau) => coau.split(" ").reverse().join(", ") + ", and Paul Gowder."}
     }

// AUTHORMAKER DOES NOT HANDLE JOURNAL ON LEGISLATION GROUP AUTHORSHIP CASE.

</script>