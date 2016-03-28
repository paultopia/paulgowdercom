import os, time
os.system('node wordcv.js')
os.system('launch -p gowdercv.docx')
os.chdir('/users/shared/PDFwriter/pauliglot')
time.sleep(1)
pdfs = [file for file in os.listdir('/users/shared/PDFwriter/pauliglot') if file.endswith(".pdf")]
print pdfs

# once I get this working (see SO: http://stackoverflow.com/questions/36255898/python-unable-to-find-files-in-recently-changed-directory-osx)
# next steps are: 
# 1.  move the pdf and rename with stub code below plus a filename = pdfs[0] to web dir
# 2.  copy the word cv to cv directory with new name reflecting current date
# 3. then make my updateweb script call this plus upload the pdf file

#moveme = 'mv %s /users/pauliglot/github/paulgowdercom/testcv.pdf' % filename
#os.system(moveme)
#os.chdir('/users/pauliglot/github/paulgowdercom/')