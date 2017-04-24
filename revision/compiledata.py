import json
with open("publications.json") as p:
    pubs=json.load(p)
with open("bio.md") as b:
    bio=b.read()
data = {"bio": bio, "publications": pubs}

with open('bigdata.json', 'w') as out:
    json.dump(data, out, sort_keys=True, indent=4)
