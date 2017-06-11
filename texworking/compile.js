const latex = require('node-latex');
const fs = require('fs')

const input = fs.createReadStream('./blue/resume.tex')
const output = fs.createWriteStream('output.pdf')
const opts = {cmd: 'xelatex', 
	inputs: './blue',
        fonts: './blue'}
latex(input).pipe(output)


