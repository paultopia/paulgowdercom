#!/usr/bin/python

import json, cgi, cgitb, os, re
cgitb.enable()

# import the JSON here

pratable="<h5>Peer Reviewed Articles</h5><br><table class=\"u-full-width\"><thead><tr><th>Title</th><th>Journal</th><th>Citation</th><th>Year</th></tr></thead><tbody>"
lratable="<h5>Law Review Articles</h5><br><table class=\"u-full-width\"><thead><tr><th>Title</th><th>Journal</th><th>Citation</th><th>Year</th></tr></thead><tbody>"
chaptable="<h5>Book Chapters</h5><br><table class=\"u-full-width\"><thead><tr><th>Title</th><th>Book</th><th>Pages</th><th>Year</th></tr></thead><tbody>"
postable = "<h3>Academic Positions</h3><br><table class=\"u-full-width\"><thead><tr><th>University</th><th>Title</th><th>Dates</th></thead><tbody>"
edtable = "<h3>Education</h3><br><table class=\"u-full-width\"><thead><tr><th>University</th><th>Degree</th><th>Year</th></thead><tbody>"
booktable = "<h5>Book</h5><br><table class=\"u-full-width\"><thead><tr><th>Title</th><th>Publisher</th><th>Year</th></thead><tbody>"
misctable = "<h5>Miscellany</h5><br><table class=\"u-full-width\"><thead><tr><th>Title</th><th>Description</th><th>Year</th></thead><tbody>"
awardstable = "<h3 id=\"awards\">Grants, Awards and Honors</h3><br><table class=\"u-full-width\"><thead><tr><th>Award</th><th>Year</th></thead><tbody>"
coursestable = "<h3 id=\"teach\">Teaching</h3><br><table class=\"u-full-width\"><thead><tr><th>Course</th><th>University</th><th>Dates</th></thead><tbody>"
practable = "<h3 id=\"law\">Legal Practice</h3><br><table class=\"u-full-width\"><thead><tr><th>Employer</th><th>Role</th><th>Years</th></thead><tbody>"
uservtable = "<h5>University Service</h5><br><table class=\"u-full-width\"><thead><tr><th>Role</th><th>Context</th><th>Dates</th></thead><tbody>"
dservtable = "<h5>Disciplinary Service</h5><br><table class=\"u-full-width\"><thead><tr><th>Role</th><th>Dates</th></thead><tbody>"
cservtable = "<h5>Community Service and Outreach</h5><br><table class=\"u-full-width\"><thead><tr><th>Activity</th><th>Dates</th></thead><tbody>"


import urllib2
failedImport = False
try:
  dataJSON = 'https://www.dropbox.com/s/dkicq9s2vuvqarg/wholecv.json?raw=1'
  myJSONfile = urllib2.urlopen(dataJSON)
  citejson = json.load(myJSONfile)
except (ValueError, IOError):
  failedImport = True
  try:
    loadedCache = True
    with open('cvcache.json') as cites_file:
      citejson = json.load(cites_file)
  except (ValueError, IOError):
    loadedCache = False
    with open('wholecv.json') as cites_file:
      citejson = json.load(cites_file)


pralist = citejson['Peer Reviewed Articles']
# these should be lists in the citejson dict.  ordered in the way I want it presented.

booklist = citejson['Books']
lralist = citejson['Law Journal Articles']
chaplist = citejson['Book Chapters']
basics = citejson['Basic Information'][0]
cvurl = basics["cvurl"]
poslist = citejson['Positions']
edlist = citejson["Education"]
miscs = citejson["Misc. Pubs."]
awards = citejson["Awards"]
presentations = citejson["Presentations"]
courselist = citejson["Courses"]
praclist = citejson["Legal Practice"]
univserv = citejson["University Service"]
discserv = citejson["Disciplinary Service"]
comserv = citejson["Community Service and Outreach"]
closing = citejson["Closing"]


def artLayout(article):
  # takes article as dict.
  print "<tr>"
  print "<td>"
  if article['url'] == u'':
    print "<strong>%s</strong>" % article['title']
  else:
    print "<strong><a href=\"%s\">%s</a></strong>" % (article['url'], article['title'])
  if article['notes'] != u'':
    print "<br>(%s)" % article['notes']
  print "</td><td>"
  print article['journal']
  print "</td><td>"
  print article['cite']
  print "</td><td>"
  print article['year']
  print "</td></tr>"


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
    print "<tr><td>"
    print "<strong>%s</strong>" % item['title']
    if item['notes'] != u'':
      print "<br>(%s)" % item['notes']
    print "</td>"
    # book
    print "<td>"
    if item['url'] == u'':
      print "%s, eds., <em>%s</em> (%s)" % (item['editors'], item['book'], item['publisher'])
    else:
      print "%s, eds., <a href=\"%s\"><em>%s</em></a> (%s)" % (item['editors'], item['url'], item['book'], item['publisher'])
    print "</td><td>"
    print item['pages']
    print "</td><td>"
    print item['year']
    print "</td></tr>"
  print "</tbody></table>"

def displayMISC(miscs):
  print misctable
  for item in miscs:
    print "<tr><td>"
    if item['url'] == u'':
      print item['title']
    else:
      print "<a href=\"%s\">%s</a>" % (item['url'], item['title'])
    print "</td><td>"
    print item['description']
    print "</td><td>"
    print item['year']
    print "</td></tr>"
  print "</tbody></table>"

def displayPOS(poslist):
  print postable
  for position in poslist:
    print "<tr><td>"
    print "<strong>%s</strong>" % position['university']
    print "</td><td>"
    print position['title']
    print "</td><td>"
    print position['years']
    print "</td></tr>"
  print "</tbody></table>"

def displayED(edlist):
  print edtable
  for school in edlist:
    print "<tr><td>"
    print "<strong>%s</strong>" % school['university']
    print "</td><td>"
    print school["degree"]
    print "</td><td>"
    print school["year"]
    print "</td></tr>"
  print "</tbody></table>"

def displayBOOKS(booklist):
  print booktable
  for book in booklist:
    print "<tr><td><strong>"
    if book['url'] == u'':
      print book['title']
    else:
      print "<a href=\"%s\">%s</a>" % (book['url'], book['title'])
    print "</strong></td><td>"
    print book['publisher']
    print "</td><td>"
    print book['year']
    print "</td></tr>"
  print "</tbody></table>"

def displayAWARDS(awards):
  print awardstable
  for award in awards:
    print "<tr><td>"
    print award["award"]
    print "</td><td>"
    print award["year"]
    print "</td></tr>"
  print "</tbody></table>"

def layoutPRES(prescat):
  print "<ul>"
  for year in sorted(prescat.keys())[::-1]:
    yeardict = prescat[year]
    print "<li>%s" % year
    print "<ul>"
    for article in yeardict:
      articledict = yeardict[article]
      print "<li><strong>%s</strong><ul>" % article
      for presentation in articledict:
        print "<li>%s</li>" % presentation
      print "</ul>"
      print "</li>"
    print "</ul>"
    print "</li>"
  print "</ul>"

def displayTEACHING(courselist):
  print coursestable
  for course in courselist:
    print "<tr><td>"
    print "<strong>%s</strong>" % course["course"]
    if course["notes"] != u'':
      print "<br>%s" % course["notes"]
    print "</td><td>"
    print course["university"]
    print "</td><td>"
    print course["dates"]
    print "</td></tr>"
  print "</tbody></table>"

def displayPRAC(praclist):
  print practable
  for job in praclist:
    print "<tr><td>"
    print job["employer"]
    print "</td><td>"
    print job["role"]
    print "</td><td>"
    print job["years"]
    print "</td></tr>"
  print "</tbody></table>"

def displayPRES(presentations):
  print "<h3 id=\"pres\">Presentations</h3>"
  print "<h5>Invited Talks</h5>"
  layoutPRES(presentations["Invited"])
  print "<h5>Conference Presentations</h5>"
  layoutPRES(presentations["Conference"])
  print "<h5>Campus Talks</h5>"
  layoutPRES(presentations["Campus"])

def layoutServ(servitem):
  print "<tr><td>"
  print servitem["role"]
  print "</td><td>"
  print servitem["dates"]
  print "</td></tr>"

def displayUSERV(univserv):
  print uservtable
  for role in univserv:
    print "<tr><td>"
    print role["role"]
    print "</td><td>"
    print role["context"]
    print "</td><td>"
    print role["dates"]
    print "</td></tr>"
  print "</tbody></table>"

def displayDSERV(discserv):
  print dservtable
  for role in discserv:
    layoutServ(role)
  print "</tbody></table>"

def displayCSERV(comserv):
  print cservtable
  for activity in comserv:
    print "<tr><td>"
    if activity['url'] == u'':
      print activity["activity"]
    else:
      print "<a href=\"%s\">%s</a>" %(activity["url"], activity["activity"])
    print "</td><td>"
    print activity["dates"]
    print "</td></tr>"
  print "</tbody></table>"


print "Content-Type: text/html\n\n"
print "<html><head><title>Automated C.V. (experimental): %s </title>" % basics['name']
print "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">"
# print "<link href=\"//fonts.googleapis.com/css?family=Raleway:400,300,600\" rel=\"stylesheet\" type=\"text/css\">"
print "<link href=\"http://fonts.googleapis.com/css?family=Abel\" rel=\"stylesheet\" type=\"text/css\">"
print "<link rel=\"stylesheet\" href=\"http://paul-gowder.com/cvcss/normalize.css\">"

# print "<link rel=\"stylesheet\" href=\"css/skeleton2.css\">"
print "<link rel=\"stylesheet\" href=\"http://paul-gowder.com/cvcss/skeleton2.css\">"
print "</head><body onload=\' location.href=\"#top\" \'>"

user_agent = os.environ["HTTP_USER_AGENT"]
iphone = r'iPhone'
droid = r'Android'
isIphone = re.search(iphone, user_agent)
isDroid = re.search(droid, user_agent)

if not isIphone:
  if not isDroid:
    print "<a class=\"button tooltip\" href=\"#top\" style=\"position:fixed;\">top<span>back to top</span></a><br><br>"
    print "<a class=\"button tooltip\" href=\"#pubs\" style=\"position:fixed;\">pub<span>publications</span></a><br><br>"
    print "<a class=\"button tooltip\" href=\"#awards\" style=\"position:fixed;\">awd<span>awards</span></a><br><br>"
    print "<a class=\"button tooltip\" href=\"#pres\" style=\"position:fixed;\">prs<span>presentations</span></a><br><br>"
    print "<a class=\"button tooltip\" href=\"#law\" style=\"position:fixed;\">law<span>law practice</span></a><br><br>"
    print "<a class=\"button tooltip\" href=\"#teach\" style=\"position:fixed;\">tch<span>teaching</span></a><br><br>"
    print "<a class=\"button tooltip\" href=\"#service\" style=\"position:fixed;\">svc<span>service</span></a><br><br>"
    print "<a class=\"button tooltip\" href=\"%s\" style=\"position:fixed;\">pdf</a>" % cvurl

print "<div class=\"container\">"

# header information
print "<div class=\"row\">"
print "<div class=\"five columns\" style=\"margin-top: 5%\">"
print "<h1 id=\"top\"><a href=\"%s\">%s</a></h1>"  % (basics['url'], basics['name'])
print "</div>"
print "<div class=\"seven columns\" style=\"margin-top: 6%\">"
print "<table class=\"u-full-width\" style=\"border-bottom: 0px; padding: 0px 2px\">"
print "<tr style=\"background: none;\">"
print "<td style=\"border: none; padding: 2px 5px;\">%s</td>" % basics['addr1']
print "<td style=\"border: none; padding: 2px 5px;\"><a href=\"mailto:%s\">%s</a></td>" % (basics['email'], basics['email'])
print "</tr><tr>"
print "<td style=\"padding: 2px 5px;\">%s</td>" % basics['addr2']
print "<td style=\"padding: 2px 5px;\">%s (%s)</td>" % (basics['phone'], basics['phoneid'])
print "</tr></table></div></div>"

print "<div class=\"row\">"
print "<div class=\"twelve columns\">"

if failedImport:
  import time
  print "<b>Warning: updated CV data file import failed.  Using cached version.  Content may be obsolete.<br><i>Content last updated: %s</i></b><br>" % basics["revdate"]
  errorstring = 'failed to open dropbox file at %s %s \n' % (time.strftime("%d/%m/%Y"), time.strftime("%H:%M:%S"))
  with open("cverrorlog.txt", "a") as errorfile:
    errorfile.write(errorstring)
  if not loadedCache:
    print "cache failed too, loading truly obselete version."
    errorstring2 = 'failed to open cached file at %s %s \n' % (time.strftime("%d/%m/%Y"), time.strftime("%H:%M:%S"))
    with open("cverrorlog.txt", "a") as errorfile:
      errorfile.write(errorstring2)

displayPOS(poslist)

displayED(edlist)

print "<h3 id=\"pubs\">Publications</h3><br>"

# book, just hard-coded because there's only one.

displayBOOKS(booklist)

displayPRA(pralist)
displayLRA(lralist)
displayCHA(chaplist)
displayMISC(miscs)
displayAWARDS(awards)
displayPRES(presentations)
displayTEACHING(courselist)
displayPRAC(praclist)
print "<h3 id=\"service\">Service</h3>"

displayUSERV(univserv)
displayDSERV(discserv)
displayCSERV(comserv)

print "<p><ul><b>Languages</b>"
print "<li>Human<ul>"
for language in closing['Languages']['human']:
  print "<li>%s</li>" % language
print "</ul></li>"
print "<li>Computer<ul>"
for language in closing['Languages']['computer']:
  print "<li>%s</li>" % language
print "</ul></li>"
print "</ul></p>"
print "<p><ul><b>Ph.D. Details</b>"
print "<li>Dissertation: %s</li>" % closing['Ph.D. Details']["dissertation"]
print "<li>Fields<ul>"
print "<li>Major<ul>"
for field in closing['Ph.D. Details']['fields']['major']:
  print "<li>%s</li>" % field
print "</ul></li>"
print "<li>Minor<ul>"
for field in closing['Ph.D. Details']['fields']['minor']:
  print "<li>%s</li>" % field
print "</ul></li>"
print "</ul></li>"
print "</ul></p>"
print "<p><ul><b>Bar Admissions</b>"
for state in closing["Bar Admissions (none currently active/authorized to practice)"]:
  print "<li>%s</li>" % state
print "(None currently active/authorized to practice.)</ul></p>"
print "<p><ul><b>Other</b>"
for item in closing["Other"]:
  print "<li>%s</li>" % item
print "</ul></p>"

print "</div>"
print "</div>"

print "<hr>"
print "This is an experimental automated c.v.  It may be buggy.<br>"
print "For a clean, printable, and non-buggy c.v., please see <a href=\"%s\">the pdf version</a><br>" % cvurl
print "Last revised %s <br>" % basics["revdate"]
print "<a href=\"http://paul-gowder.com\">return home</a>"


print "</div>"
print "</body>"
print "</html>"

if failedImport == False:
  with open('cvcache.json', 'w') as outfile:
    json.dump(citejson, outfile)
