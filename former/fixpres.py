import json
with open('presold.json') as old:
	oldjson = json.load(old)




def parsepres(prestype):
	parsed = []
	for year, paperdict in prestype.iteritems():
		for title, conflist in paperdict.iteritems():
			for conference in conflist:
				parsed.append({"conference": conference, "title": title, "year": year})
	return parsed


print parsepres(oldjson["Presentations"]["Invited Talks"])

# it works, all I need to do now is parse each type, put them all in a dictionary with types as keys, 
# sort by year, then save as new json.