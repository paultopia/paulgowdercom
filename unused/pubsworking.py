#!/usr/bin/python

import json

# import the JSON here -- put getter from autores in here.

with open('pubslist2.json') as cites_file:
  citejson = json.load(cites_file)

def lazyiter():
    number = 0
    while True:
        yield number
        number += 1

mycounter = lazyiter()

popups = []

def makeModal(abstract, title, pubid):
    modalstring = '''
    <div class="modal fade" id="modal{}" tabindex="-1" role="dialog" aria-labelledby="modal{}">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="myModalLabel">Abstract for {}</h4>
          </div>
          <div class="modal-body">
            {}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    '''.format(pubid, pubid, title, abstract)
    return modalstring

def makeHidden(anydict, pubid):
    hiddenstart = '<tr class="collapse" id="collapse{}"><td colspan="4"><nav class="navbar navbar-default pmodnav"><div class="btn-group btn-group-justified">'.format(pubid)
    hiddenend = '</div></nav></td></tr>'
    if anydict["abstract"] is None:
        absbutton = ' '
    else:
        absbutton = '<div class="btn-group" role="group"><button type="button" class="btn btn-default navbar-btn"  data-toggle="modal" data-target="#modal{}">Abstract</button></div>'.format(pubid)
        popups.append(makeModal(anydict['abstract'],anydict['title'], pubid))
    linkstart = '''
    <div class="btn-group dropup">
    <button type="button" class="btn btn-default navbar-btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Links <span class="caret"></span>
    </button>
    <ul class="dropdown-menu">
    '''
    linkend = '</ul></div>'
    if anydict["publink"] is not None:
        publink = '<li><a href="{}" target="_blank">Publisher Link</a></li>'.format(anydict["publink"])
    else:
        publink = ' '
    if anydict["altlink"] is not None:
        altlink = '<li><a href="{}" target="_blank">Alternate/Draft Link</a></li>'.format(anydict["altlink"])
    else:
        altlink = ' '
    if (anydict["publink"] is not None) or (anydict["altlink"] is not None):
        linkbutton = linkstart + publink + altlink + linkend
    else:
        linkbutton = ' '
    return hiddenstart + '\n' + absbutton + '\n' + linkbutton + '\n' + hiddenend

def isEmpty(anydict):
    return (anydict["abstract"] is None) & (anydict["publink"] is None) & (anydict["altlink"] is None)

def makeExpander(pubid):
    return '<a data-toggle="collapse" href="#collapse{}" aria-expanded="false" aria-controls="collapse{}" class="pgtoggle">'.format(pubid, pubid)

def makePubline(expander, *args):
    publinelist = ['<tr>']
    for arg in args:
        publinelist.append('<td>')
        publinelist.append(expander + arg + '</a>')
        publinelist.append('</td>')
    publinelist.append('</tr>')
    return ''.join(publinelist)


def bookLayout(bookdict):
    if isEmpty(bookdict):
        return '<tr><td>{}</td><td>{}</td><td>{}</td></tr>'.format(bookdict['title'], bookdict['publisher'], bookdict['year'])
    else:
        pubid = 'book' + str(next(mycounter))
        expander = makeExpander(pubid)
        publine = makePubline(expander, bookdict['title'], bookdict['publisher'], bookdict['year'])
        hiddenline = makeHidden(bookdict, pubid)
        return publine + hiddenline

def artLayout(articledict):
    if 'coauthor' in articledict:
        title = articledict['title'] + ' (co-author with {})'.format(articledict['coauthor'])
    else:
        title = articledict['title']
    if isEmpty(articledict):
        return '<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>'.format(title, articledict['journal'], articledict['cite'], articledict['year'])
    else:
        pubid = 'article' + str(next(mycounter))
        expander = makeExpander(pubid)
        publine = makePubline(expander, title, articledict['journal'], articledict['cite'], articledict['year'])
        hiddenline = makeHidden(articledict, pubid)
        return publine + hiddenline


def chapLayout(chapdict):
    words = chapdict['editors'] + ', ed. ' + chapdict['book'] + ', ' + chapdict['publisher']
    if isEmpty(chapdict):
        return '<tr><td>{}</td><td>{}</td><td>{}</td><td>{}</td></tr>'.format(chapdict['title'], words, chapdict['pages'], chapdict['year'])
    else:
        pubid = 'chapter' + str(next(mycounter))
        expander = makeExpander(pubid)
        publine = makePubline(expander, chapdict['title'], words, chapdict['pages'], chapdict['year'])
        hiddenline = makeHidden(chapdict, pubid)
        return publine + hiddenline

bookblock = '\n'.join([bookLayout(x) for x in citejson['Books']])
articleblock = '\n'.join([artLayout(x) for x in citejson['Articles']])
chapterblock = '\n'.join([chapLayout(x) for x in citejson['Book Chapters']])
modalsblock = '\n'.join(popups)


pubsblock = '''
<!-- begin publication block -->
<div class="panel panel-warning">
  <div class="panel-heading">
<h2 id="pubs">Major Publications</h2> </div>
<div class="panel-body">
<p class="text-muted">You can click on most publication titles for further information (where available). You can also <a href="pgbib2.bib" target="_blank">download my publications list as a bibtex</a>.</p>
<!-- BOOK -->

<div class="panel panel-info">
  <div class="panel-heading">
<h3>Books</h3> </div>
<div class="panel-body">
  <div class="table-responsive">
 <table class="table table-hover"><thead><tr><th>Title</th><th>Publisher</th><th>Year</th></thead><tbody>

<!-- perrow -->
{0}

</tbody></table></div>
</div></div>

<!-- ARTICLES -->
<div class="panel panel-info">
  <div class="panel-heading">
<h3>Articles</h3> </div>
<div class="panel-body">

    <div class="table-responsive">
  <table class="table table-hover">

    <thead><tr><th>Title</th><th>Journal</th><th>Citation</th><th>Year</th></tr></thead><tbody>

<!-- perrow -->
{1}

</tbody></table></div>
</div></div>

<!-- BOOK CHAPTERS -->

 <div class="panel panel-info">
   <div class="panel-heading">
 <h3>Book Chapters</h3> </div>
 <div class="panel-body">

    <div class="table-responsive">
   <table class="table table-hover"><thead><tr><th>Title</th><th>Book</th><th>Pages</th><th>Year</th></tr></thead><tbody>

<!-- perrow -->
{2}

<!-- bottom, plus last two divs for end of section -->

   </tbody></table></div>
  </div></div>
  </div></div>

  <!-- modals go here now for convenience-->

  {3}

  <!-- end automated text -->
'''.format(bookblock, articleblock, chapterblock, modalsblock)
#print pubsblock
with open('pubslist.html', 'w') as htmlrepr:
    htmlrepr.write(pubsblock)
