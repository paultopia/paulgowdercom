import json
import jinja2
import os
with open('data.json') as djs:
	data = json.load(djs)

wkdir = os.path.dirname(os.path.abspath(__file__))

env = jinja2.Environment(loader=jinja2.FileSystemLoader(wkdir), trim_blocks=True)

rendered = env.get_template('cvtemplate.html').render(data)

with open('cv.html', 'w') as outfile:
    outfile.write(rendered)

