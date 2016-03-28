This is just an effort to fix the horrible spaghetti code that makes up my personal website.  probably nothing of use to anyone else.  Ignore me.  

(update: now it does one interesting thing.  a ton of hackish shell scripts written in python, plus a little bit of node js, and I've managed to arrange it so that I can edit one line, and run one script (that calls like 4 others), and my M$ word, pdf, and web CVs, as well as my website front page, get seamlessly updated.  if you're curious, go look at updateweb.py, and trace the pile of scripts backward.  the "upload" shell command is another script of mine, but it's not on github, because it has a password in it; see here for the non-passwordey bits: https://gist.github.com/paultopia/8462460b9497f6c6de5d )

(todo: 

1.  fix the html cv to be template based (DONE)
2.  extend template to markdown --> pdf, docx (turns out that doesn't work right, oh hai docx templating)
3.  extend template to main site, get rid of stupid ajax call 
4.  then set up a ring/luminous or flask server plus remote build with fabric etc and github.

)

(also this repo contains tons of code copyrighted by others in the CSS, as well as in the google icons.  it's all open source, but don't be attributing it to me.)
