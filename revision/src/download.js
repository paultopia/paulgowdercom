function download(text){
    var b = new Blob([text], {type: "text/plain"});
    return URL.createObjectURL(b);
}

module.exports.url = download;
