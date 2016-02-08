import re 
with open('oldlinks.txt') as oldlinks:
	oldfile = oldlinks.read()

with open('cleanlinks.txt', 'w') as cleanlinks:
	cleanlinks.write('\n'.join([link.strip("'") for link in re.findall("'http.*?'", oldfile)]))
