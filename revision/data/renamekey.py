import json
with open("publications.json") as pj:
    pubs = json.load(pj)
for p in pubs:
    p["address"] = p.pop("city")
with open("publications.json", "w") as pj:
    pj.write(json.dumps(pubs, indent=4, sort_keys=True))
