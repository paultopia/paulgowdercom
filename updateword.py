import os, time, glob
# using this awesome template tool: https://github.com/open-xml-templating/docxtemplater
os.system('node wordcv.js')
os.system('launch -p gowdercv.docx')
# using tools available here: http://stackoverflow.com/a/10221617/4386239
os.chdir('/users/shared/PDFwriter/pauliglot')
for x in range(90):
	time.sleep(1)
	if glob.glob('*.pdf'):
		break
file = glob.glob('*.pdf')[0]
# kill word using very nice cli here https://github.com/nriley/appswitch/
os.system('appswitch -qi com.microsoft.Word')
print file

# fixed

# once I get this working (see SO: http://stackoverflow.com/questions/36255898/python-unable-to-find-files-in-recently-changed-directory-osx)
# next steps are: 
# 1.  move the pdf and rename with stub code below plus a filename = pdfs[0] to web dir
# 2.  copy the word cv to cv directory with new name reflecting current date
# 3. then make my updateweb script call this plus upload the pdf file

#moveme = 'mv %s /users/pauliglot/github/paulgowdercom/testcv.pdf' % filename
#os.system(moveme)
#os.chdir('/users/pauliglot/github/paulgowdercom/')