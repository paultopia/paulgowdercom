# yes, I KNOW how much of a horrible hack this is.  time is short.
import os
os.system('python pubsworking.py')
os.system('python rendercv.py')
os.system('git add .')
os.system('git commit -m "update cv"')
os.system('git push')
os.system('upload paul-gowder.com/pubslist.html')
os.system('upload paul-gowder.com/cv.html')