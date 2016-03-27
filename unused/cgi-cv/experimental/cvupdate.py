import json, sys, os
with open('experimental.json') as cites_file:
    citejson = json.load(cites_file)
with open('backup.json', 'w') as outfile:
    json.dump(citejson, outfile)

def startEdits():
    while True:
        print 'The following sections are available:'
        i = 1
        catsdict = {}
        for category in sorted(citejson.keys()):
            print str(i) + '. ' +  category
            catsdict[str(i)] = category
            i += 1
        selection = raw_input('Choose a category to edit, or 0 to abort: ')
        if selection == '0':
            while True:
                finalAnswer = raw_input('Press y to exit without saving, s to save then exit, or c to cancel and choose again: ')
                if finalAnswer == 'y':
                    sys.exit()
                elif finalAnswer == 's':
                    with open('experimental.json', 'w') as outfile:
                        json.dump(citejson, outfile)
                        sys.exit()
                elif finalAnswer == 'c':
                    break
        elif selection in catsdict.keys():
            print "Now editing: %s" % catsdict[selection]
            editCat(catsdict[selection])

def editCat(category):
    while True:
        selection = raw_input('enter a to add an entry, e to change an existing entry, or c to exit: ')
        if selection == 'a':
            addEntry(category)
            print 'done!  Another?'
        elif selection == 'e':
            editEntry(category)
        elif selection == 'c':
            break

def addEntry(category):
    if category == 'Peer Reviewed Articles':
        entry = artEnter()
        citejson['Peer Reviewed Articles'].append(entry)
        print citejson['Peer Reviewed Articles']

def artEnter():
    entry = {}
    title = raw_input('Enter article title: ')
    entry[u'title'] = u'%s' % title
    citation = raw_input('Enter article citation, or \'forthcoming\': ')
    entry[u'cite'] = u'%s' % citation
    year = raw_input('Enter article year: ')
    entry[u'year'] = u'%s' % year
    journal = raw_input('Enter journal name: ')
    entry[u'journal'] = u'%s' % journal
    url = raw_input('Enter article url, or just hit enter if none: ')
    entry[u'url'] = u'%s' % url
    notes = raw_input('Enter any notes, or just hit enter if none: ')
    entry[u'notes'] = u'%s' % notes
    print entry
    return entry

startEdits()

# need to pluck out entry year and figure out where it lies in years of other items in a category, to put it at appropriate place in json.
