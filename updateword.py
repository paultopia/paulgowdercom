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
filename = glob.glob('*.pdf')[0]
# kill word using very nice cli here https://github.com/nriley/appswitch/
os.system('appswitch -qi com.microsoft.Word')

moveme = 'mv "%s" /users/pauliglot/github/paulgowdercom/gowdercv.pdf' % filename
os.system(moveme)

# there we go, everything is now where it belongs, word and pdf ready to upload.
