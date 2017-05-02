import json
with open('awards.json') as aj:
    old = json.load(aj)
new = [{"award": x["name"], "year": x["year"]} for x in old]
with open('awards2.json', 'w') as aj2:
    json.dump(new, aj2)
    
