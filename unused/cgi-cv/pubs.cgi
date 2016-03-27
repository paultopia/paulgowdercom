#!/usr/bin/python

import json, cgi, cgitb
cgitb.enable()

# import the JSON here

cvurl = "http://paul-gowder.com/wp-content/uploads/2015/07/gowdercv7-21-15.pdf"
pratable="<h5>Peer Reviewed Articles</h5><br><table class=\"u-full-width\"><thead><tr><th>Title</th><th>Journal</th><th>Citation</th><th>Year</th></tr></thead><tbody>"
lratable="<h5>Law Review Articles</h5><br><table class=\"u-full-width\"><thead><tr><th>Title</th><th>Journal</th><th>Citation</th><th>Year</th></tr></thead><tbody>"
chaptable="<h5>Book Chapters</h5><br><table class=\"u-full-width\"><thead><tr><th>Title</th><th>Book</th><th>Pages</th><th>Year</th></tr></thead><tbody>"

with open('cvdata.json') as cites_file:
  citejson = json.load(cites_file)
# should I be using loads instead of load here?

pralist = citejson['Peer Reviewed Articles']
# these should be lists in the citejson dict.  ordered in the way I want it presented.

lralist = citejson['Law Journal Articles']

chaplist = citejson['Book Chapters']

def artLayout(article):
  # takes article as dict.
  print "<tr>"
  print "<td>"
  # title
  # needs to include linebreak then notes, also needs to include link
  if article['url'] == u'':
    print article['title']
  else:
    print "<a href=\"%s\">%s</a>" % (article['url'], article['title'])
  if article['notes'] != u'':
    print "<br>(%s)" % article['notes']
  print "</td>"
  print "<td>"
  # Journal
  print article['journal']
  print "</td>"
  print "<td>"
  # cite
  print article['cite']
  print "</td>"
  print "<td>"
  # year
  print article['year']
  print "</td>"
  print "</tr>"


def displayPRA(pralist):
  print pratable
  # pralist is a list of dicts where each dict is an article.
  for item in pralist:
    artLayout(item)
  print "</tbody></table>"

def displayLRA(lralist):
  print lratable
  # code to lay out the peer reviewed articles list goes here
  for item in lralist:
    artLayout(item)
  print "</tbody></table>"

def displayCHA(chaplist):
  print chaptable
  for item in chaplist:
    print "<tr>"
    print "<td>"
    print item['title']
    if item['notes'] != u'':
      print "<br>(%s)" % item['notes']
    print "</td>"
    # book
    print "<td>"
    if item['url'] == u'':
      print "%s, eds., <em>%s</em> (%s)" % (item['editors'], item['book'], item['publisher'])
    else:
      print "%s, eds., <a href=\"%s\"><em>%s</em></a> (%s)" % (item['editors'], item['url'], item['book'], item['publisher'])
    print "</td>"
    print "<td>"
    print item['pages']
    print "</td>"
    print "<td>"
    print item['year']
    print "</td>"
    print "</tr>"
  print "</tbody></table>"


print "Content-Type: text/html\n\n"
print "<html><head><title>Selected Publications: Paul Gowder</title>"
print "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">"
# print "<link href=\"//fonts.googleapis.com/css?family=Raleway:400,300,600\" rel=\"stylesheet\" type=\"text/css\">"
print "<link href=\"http://fonts.googleapis.com/css?family=Abel\" rel=\"stylesheet\" type=\"text/css\">"
print "<link rel=\"stylesheet\" href=\"http://paul-gowder.com/cvcss/normalize.css\">"
print "<link rel=\"stylesheet\" href=\"http://paul-gowder.com/cvcss/skeleton.css\">"
print "</head>"
print "<body>"

print "<div class=\"container\">"
print "<div class=\"row\">"
print "<div class=\"twelve columns\">"
print "<h5>Book</h5><em><p>The Rule of Law in the Real World</em>, in production, forthcoming early 2016 (Cambridge University Press)</p>"

displayPRA(pralist)
displayLRA(lralist)
displayCHA(chaplist)


print "</div>"
print "</div>"

print "<hr>"
print "This is an experimental automated publications list.  It may be buggy.  It is also incomplete.<br>"
print "For a clean, complete, and non-glitchy list, please see <a href=\"%s\">my c.v.</a><br>" % cvurl
print "<a href=\"http://paul-gowder.com\">return home</a>"


print "</div>"
print "</body>"
print "</html>"
