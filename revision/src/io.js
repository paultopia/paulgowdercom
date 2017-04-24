function getData(name, datastore, loadercallback){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState === request.DONE && request.status === 200) {
            datastore[name] = request.response;
            console.log("got data: " + name);
            loadercallback();
        }
    };
    var url = name + ".json"
    request.responseType = "json"
    request.open('GET', url, true);
    request.send();
}

function makeDownloadUrl(text){
    var b = new Blob([text], {type: "text/plain"});
    return URL.createObjectURL(b);
}

module.exports.downloadURL = makeDownloadUrl;
module.exports.getData = getData;
