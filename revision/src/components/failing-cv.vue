<template>
<div>
<pdf src="cvURL"></pdf>
</div>
</template>

<script>

function makeBinary(dataURI){
var BASE64_MARKER = ';base64,';
var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
var base64 = dataURI.substring(base64Index);
var raw = window.atob(base64);
var rawLength = raw.length;
var array = new Uint8Array(new ArrayBuffer(rawLength));
for(var i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}


import pdf from 'vue-pdf'

export default {
     components: {pdf},
     computed: {
        cvURL: function(){return makeBinary(this.$store.state.cvURL);}
}}

</script>
