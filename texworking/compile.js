const latex = require('node-latex');
const fs = require('fs')

const input = fs.createReadStream('boxes.tex')
const output = fs.createWriteStream('output.pdf')

latex(input).pipe(output)


