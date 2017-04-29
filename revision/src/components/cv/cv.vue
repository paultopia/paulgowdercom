
// THIS IS BARELY STARTED

<template>

<div class="row">


    <div class="twelve columns">
        <h1 id="top"><a href="http://paul-gowder.com">Paul Gowder</a></h1>
        <p><a href="mailto:{{ data.basics.email }}"><img :src="data.email-icon.svg"></a> <a :href="{{ data.basics.cvurl }}"><img src="pdf-icon.svg"></a></p>


    </div></div>

    <div class="row">
        <div class="twelve columns">
            <h3>Academic Positions</h3>
            <table class="u-full-width">
                <col style="width:35%">
                <col style="width:55%">
                <col style="width:7%">
                <thead><tr><th>University</th><th>Title</th><th>Years</th></tr></thead><tbody>

                    {% for position in positions %}
                    <tr><td>
                        {{position.university}}
                    </td><td>
                        {{position.title}}
                    </td><td>
                        {{position.year}}
                    </td></tr>
                    {% endfor %}
                </tbody></table>


            <h3>Education</h3>
            <table class="u-full-width">
                <col style="width:35%">
                <col style="width:55%">
                <col style="width:7%">
                <thead><tr><th>University</th><th>Degree</th><th>Years</th></tr></thead><tbody>

                    {% for school in schools %}
                    <tr><td>
                        {{school.name}}
                    </td><td>
                        {{school.degree}}
                    </td><td>
                        {{school.year}}
                    </td></tr>
                    {% endfor %}
                </tbody></table>



            <h3 id="pubs">Publications</h3>
            <h5>Books</h5>
            <table class="u-full-width">
                <col style="width:35%">
                <col style="width:55%">
                <col style="width:7%">
                <thead><tr><th>Title</th><th>Publisher</th><th>Years</th></tr></thead><tbody>
                    {% for book in books %}
                    <tr><td>
                        {{book.title}}
                        {% if book.coauthor %}
                        <br>(Co-Author with {{book.coauthor}})
                        {% endif %}
                    </td><td>
                        {{book.publisher}}
                    </td><td>
                        {{book.year}}
                    </td></tr>
                    {% endfor %}
                </tbody></table>


            <h5>Peer Reviewed Articles</h5>
            <table class="u-full-width">
                <col style="width:35%">
                <col style="width:35%">
                <col style="width:20%">
                <col style="width:7%">
                <thead><tr><th>Title</th><th>Journal</th><th>Citation</th><th>Years</th></tr></thead><tbody>
                    {% for prart in prarts %}
                    <tr>
                        <td>
                            {{prart.title}}
                            {% if prart.coauthor %}
                            <br>(Co-Author with {{prart.coauthor}})
                            {% endif %}
                        </td><td>
                            {{prart.journal}}
                        </td><td>
                            {{prart.cite}}
                        </td><td>
                            {{prart.year}}
                        </td></tr>
                    {% endfor %}
                </tbody></table>

            <h5>Law Review Articles</h5>
            <table class="u-full-width">
                <col style="width:35%">
                <col style="width:35%">
                <col style="width:20%">
                <col style="width:7%">
                <thead><tr><th>Title</th><th>Journal</th><th>Citation</th><th>Years</th></tr></thead><tbody>
                    {% for lrart in lrarts %}
                    <tr>
                        <td>
                            {{lrart.title}}
                            {% if lrart.coauthor %}
                            <br>(Co-Author with {{lrart.coauthor}})
                            {% endif %}
                        </td><td>
                            {{lrart.journal}}
                        </td><td>
                            {{lrart.cite}}
                        </td><td>
                            {{lrart.year}}
                        </td></tr>
                    {% endfor %}
                </tbody></table>


            <h5>Book Chapters</h5>
            <table class="u-full-width">
                <col style="width:35%">
                <col style="width:35%">
                <col style="width:20%">
                <col style="width:7%">
                <thead><tr><th>Title</th><th>Book</th><th>Pages</th><th>Years</th></tr></thead><tbody>
                    {% for chapter in chapters %}
                    <tr><td>
                        {{chapter.title}}
                        {% if chapter.coauthor %}
                        <br>(Co-Author with {{chapter.coauthor}})
                        {% endif %}
                    </td>
                    <td>
                        {{chapter.editors}}, eds., <em>{{chapter.book}}</em> ({{chapter.publisher}})
                    </td><td>
                        {{chapter.pages}}
                    </td><td>
                        {{chapter.year}}
                    </td></tr>
                    {% endfor %}
                </tbody></table>

            <h5>Miscellany</h5>
            <table class="u-full-width">
                <col style="width:40%">
                <col style="width:50%">
                <col style="width:7%">
                <thead><tr><th>Title</th><th>Description</th><th>Years</th></tr></thead><tbody>
                    {% for misc in miscpubs %}
                    <tr><td>
                        {{misc.title}}
                    </td><td>
                        {{misc.description}}
                    </td><td>
                        {{misc.year}}
                    </td></tr>
                    {% endfor %}
                </tbody></table>

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

// PRESENTATIONS AND TEACHING ARE PROBABLY GOOD ONCE DATA MODEL IS FIT IN

            <presentations header="Invited Talks" presentationlist="pres.invited"></presentations>
            <presentations header="Conference Presentations" :presentationlist="pres.conferences"></presentations>
            <presentations header="Campus Talks" :presentationlist="pres.campus"></presentations>



            <h3 id="teach">Teaching</h3>
            <teaching header="Lead Instructor" :classlist="courses.lead"></teaching>
            <teaching header="Teaching Assistant" :classlist="courses.ta"></teaching>

            <generictable :ismajor="true" header="Legal Practice" :itemslist="misc.practice">



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

 module.exports = {
     props: ["pubs", "pres", "courses"],
     components: {presentations, teaching, generictable}
 }

</script>
