import json
from operator import itemgetter
with open('presold.json') as old:
	oldjson = json.load(old)

def parsepres(prestype):
	parsed = []
	for year, paperdict in prestype.iteritems():
		for title, conflist in paperdict.iteritems():
			for conference in conflist:
				parsed.append({"conference": conference, "title": title, "year": year})
	return parsed

bigdict = {"Invited Talks": parsepres(oldjson["Presentations"]["Invited Talks"]), "Conference Presentations": parsepres(oldjson["Presentations"]["Conference Talks"]), "Campus Talks": parsepres(oldjson["Presentations"]["Campus Talks"])}

def sorttalks(preslist):
	return sorted(sorted(preslist, key=itemgetter('title', 'conference')), key=itemgetter('year'), reverse=True)

newdict = {k: sorttalks(v) for k, v in bigdict.items()}

with open('presnew.json', 'w') as outfile:
    json.dump(newdict, outfile)