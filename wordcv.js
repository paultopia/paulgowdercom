
fs=require('fs')
dx=require('docxtemplater');
_=require('underscore')
data=require(__dirname+"/data.json")
data=_.extend(data, data["basics"])
content = fs.readFileSync(__dirname+"/cvtemplate.docx","binary")
doc=new dx(content);
doc.setData(data);
doc.render();
var buf = doc.getZip().generate({type:"nodebuffer"});
fs.writeFileSync(__dirname+"/gowdercv.docx",buf);