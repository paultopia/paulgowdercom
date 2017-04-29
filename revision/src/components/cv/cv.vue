
// THIS IS BARELY STARTED

<template>

<!-- CONVERTED: 
Presentations
Teaching
Legal Practice

Need to redo data to have the field names right, conform as much as possible to headers to allow generic table use.  Component here is assuming that's already been done, so will blow up as it stands.

-->

<div class="row">


    <div class="twelve columns">
        <h1 id="top"><a href="http://paul-gowder.com">Paul Gowder</a></h1>
        <p><a href="mailto:{{ data.basics.email }}"><img :src="data.email-icon.svg"></a> <a :href="{{ data.basics.cvurl }}"><img src="pdf-icon.svg"></a></p>


    </div></div>

    <div class="row">
        <div class="twelve columns">

            <generictable :ismajor="true" header="Academic Positions" :itemslist="basic.positions"></generictable>

<!-- this might be worth hard-coding, since it obv changes rarely and requires special formatting for things like promotion, courtesy appointments, etc. -->


            <generictable :ismajor="true" header="Education" :itemslist="basic.education"></generictable>

<!-- pubs are too annoyingly messy to separate out into individual components for now.  Maybe later. -->

<publications :pubs="pubs"></publications>


            <h3 id="pubs">Publications</h3>


            <h3 id="awards">Grants, Awards and Honors</h3>
            <table class="u-full-width">
                <col style="width:90%">
                <col style="width:7%">
                <thead><tr><th>Award</th><th>Years</th></tr></thead><tbody>
                    {% for award in awards %}
                    <tr><td>
                        {{award.name}}
                    </td><td>
                        {{award.year}}
                    </td></tr>
                    {% endfor %}
                </tbody></table>

            <h3 id="pres">Presentations</h3>


            <presentations header="Invited Talks" presentationlist="pres.invited"></presentations>
            <presentations header="Conference Presentations" :presentationlist="pres.conferences"></presentations>
            <presentations header="Campus Talks" :presentationlist="pres.campus"></presentations>



            <h3 id="teach">Teaching</h3>
            <teaching header="Lead Instructor" :classlist="courses.lead"></teaching>
            <teaching header="Teaching Assistant" :classlist="courses.ta"></teaching>

            <generictable :ismajor="true" header="Legal Practice" :itemslist="misc.practice"></generictable>



            <h3 id="service">Service</h3>
            <h5>University Service</h5>
            <table class="u-full-width">
                <col style="width:40%">
                <col style="width:50%">
                <col style="width:7%">
                <thead><tr><th>Role</th><th>Context</th><th>Years</th></thead><tbody>
                    {% for userv in uservice %}
                    <tr><td>
                        {{userv.role}}
                    </td><td>
                        {{userv.context}}
                    </td><td>
                        {{userv.dates}}
                    </td></tr>
                    {% endfor %}
                </tbody></table>

            <h5>Disciplinary Service</h5>
            <table class="u-full-width">
                <col style="width:90%">
                <col style="width:7%">
                <thead><tr><th>Role</th><th>Years</th></thead><tbody>
                    {% for dserv in dservice %}
                    <tr><td>
                        {{dserv.role}}
                    </td><td>
                        {{dserv.dates}}
                    </td></tr>
                    {% endfor %}
                </tbody></table>

            <h5>Community Service and Outreach</h5>
            <table class="u-full-width">
                <col style="width:90%">
                <col style="width:7%">
                <thead><tr><th>Role</th><th>Years</th></tr></thead><tbody>
                    {% for cserv in cservice %}
                    <tr><td>
                        {{cserv.activity}}
                    </td><td>
                        {{cserv.dates}}
                    </td></tr>
                    {% endfor %}
                </tbody></table>


            <p><b>Languages</b> <br>
                Human:
                <br>{% for hlang in humanlang %} {{hlang}}<br> {% endfor %}<br>

                Computer:
                <br>{% for clang in computerlang %} {{clang}}<br> {% endfor %}</p>

                <p><b>Bar Admissions</b>
                    <br>{% for bar in bars %} {{bar}}<br> {% endfor %}</p>

                    <p><b>Other</b>
                        <br>{% for oth in other %} {{oth}}<br> {% endfor %}</p>

                        <p><b>Notes</b>
                            <br>{% for note in notes %} {{note}}<br> {% endfor %}</p>

        </div>
    </div>
    <hr>

    <p style="float: left;"><a href="{{basics.url}}"><b>&lt;&lt;---</b></a></p> <p style="float: right;">Last Revised {{basics.revdate}} </p>


</template>

<script>

 import presentations from "./presentations.vue/";
 import teaching from "./teaching.vue";
 import generictable from "./generictable.vue";
 import publications from "./publications.vue";

 module.exports = {
     props: ["pubs", "pres", "courses", "misc", "basics"],
     components: {presentations, teaching, generictable, publications}
 }

</script>
