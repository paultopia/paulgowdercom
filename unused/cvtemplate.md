<div class="container">

<div class="row">

<div class="twelve columns">

[Paul Gowder](http://paul-gowder.com) 
=====================================

[![](email-icon.svg)](mailto:{{basics.email}})
[![](pdf-icon.svg)]({{basics.cvurl}})

</div>

</div>

<div class="row">

<div class="twelve columns">

### Academic Positions


{% for position in positions %}
<p>{{position.year}} {{position.university}}, {{position.title}}</p>
{% endfor %}

### Education

{% for school in schools %}
<p>{{school.year}} {{school.name}} {{school.degree}}</p>
{% endfor %}

### Publications 

##### Books

{% for book in books %}
<p>{{book.year}} {{book.title}}, {{book.publisher}} {% if book.coauthor %}\
(Co-Author with {{book.coauthor}}) {% endif %}
</p>
{% endfor %}

##### Peer Reviewed Articles

Title
Journal
Citation
Years
{% for prart in prarts %}
{{prart.title}} {% if prart.coauthor %}\
(Co-Author with {{prart.coauthor}}) {% endif %}
{{prart.journal}}
{{prart.cite}}
{{prart.year}}
{% endfor %}

##### Law Review Articles

Title
Journal
Citation
Years
{% for lrart in lrarts %}
{{lrart.title}} {% if lrart.coauthor %}\
(Co-Author with {{lrart.coauthor}}) {% endif %}
{{lrart.journal}}
{{lrart.cite}}
{{lrart.year}}
{% endfor %}

##### Book Chapters

Title
Book
Pages
Years
{% for chapter in chapters %}
{{chapter.title}} {% if chapter.coauthor %}\
(Co-Author with {{chapter.coauthor}}) {% endif %}
{{chapter.editors}}, eds., *{{chapter.book}}* ({{chapter.publisher}})
{{chapter.pages}}
{{chapter.year}}
{% endfor %}

##### Miscellany

Title
Description
Years
{% for misc in miscpubs %}
{{misc.title}}
{{misc.description}}
{{misc.year}}
{% endfor %}

### Grants, Awards and Honors 

Award
Years
{% for award in awards %}
{{award.name}}
{{award.year}}
{% endfor %}

### Presentations 

##### Invited Talks

Venue
Title
Years
{% for invitedpres in invited %}
{{invitedpres.venue}}
{{invitedpres.title}}
{{invitedpres.year}}
{% endfor %}

##### Conference Presentations

Venue
Title
Years
{% for conference in conferences %}
{{conference.venue}}
{{conference.title}}
{{conference.year}}
{% endfor %}

##### Campus Talks

Venue
Title
Years
{% for ctalk in campus %}
{{ctalk.venue}}
{{ctalk.title}}
{{ctalk.year}}
{% endfor %}

### Teaching 

##### Lead Instructor

Course
University
Years
{% for course in courses %}
{{course.title}}
{{course.school}}
{{course.terms}}
{% endfor %}

##### Teaching Assistant

Course
University
Years
{% for taship in taships %}
{{taship.title}}
{{taship.school}}
{{taship.terms}}
{% endfor %}

### Legal Practice 

Employer
Role
Years
{% for job in practice %}
{{job.employer}}
{{job.role}}
{{job.years}}
{% endfor %}

### Service

##### University Service

Role
Context
Years
{% for userv in uservice %}
{{userv.role}}
{{userv.context}}
{{userv.dates}}
{% endfor %}

##### Disciplinary Service

Role
Years
{% for dserv in dservice %}
{{dserv.role}}
{{dserv.dates}}
{% endfor %}

##### Community Service and Outreach

Role
Years
{% for cserv in cservice %}
{{cserv.activity}}
{{cserv.dates}}
{% endfor %}

**Languages**\
 Human:\
{% for hlang in humanlang %} {{hlang}}\
 {% endfor %}\
 Computer:\
{% for clang in computerlang %} {{clang}}\
 {% endfor %}

**Bar Admissions**\
{% for bar in bars %} {{bar}}\
 {% endfor %}

**Other**\
{% for oth in other %} {{oth}}\
 {% endfor %}

**Notes**\
{% for note in notes %} {{note}}\
 {% endfor %}

</div>

</div>

------------------------------------------------------------------------

[**&lt;&lt;---**]({{basics.url}})

Last Revised {{basics.revdate}}

</div>
