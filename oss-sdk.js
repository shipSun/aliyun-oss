function OssSdk(){
    this.client;
    this.restful;
    this.data;
    this.upload;
}
OssSdk.prototype.setUpload = function (val){
    this.upload = val;
}
OssSdk.prototype.init = function (url){
    this.restful = new RestFul().init({"async":false});
    this.clientHandler(url);
    return this;
}
OssSdk.prototype.clientHandler = function (url){
    var OssSdk = this;
    this.restful.get(url, function (data) {
        console.log('token:', data);
        var client = new OSS.Wrapper({
            accessKeyId: data.accessKeyId,
            accessKeySecret: data.accessKeySecret,
            stsToken: data.stsToken,
            bucket: data.bucket,
            secure: true,
            region: "oss-cn-beijing",
        });
        OssSdk.client = client;
        OssSdk.data = data;
    })
}
OssSdk.prototype.fileName = function(i){
    return this.data.file.name[i];
}
OssSdk.prototype.uploadHandler = function(fileName, data){
    var OssSdk = this;

    function progress(p){
        return function(done){
            OssSdk.progress(p);
            done();
        }
    }

    this.client.multipartUpload(fileName, data, {progress: progress}).then(function (res) {
        console.log('upload response:',res);
        if (res.res.status == 200 && res.res.statusCode == 200) {
            console.log('success');
            OssSdk.upload.success(fileName);
        }
    }).catch(function (err) {
        console.error('upload error:', err);
        throw err;
    });
}
OssSdk.prototype.download = function(){
    var sourceFileName = this.sourceFileName();
    var saveFileName = this.saveFileName();
    var result = this.client.signatureUrl(sourceFileName, {
        expires: 1900,
        response: {
            'content-disposition': 'attachment; filename="'+saveFileName+'"'
        }
    });
    // console.log(result);
    var urlA = $("<a id='downA' style='display: none' href=" + result + ">" +
        "<button  class='new-btn-login' id='downBtn' type='button'></button></a>");
    urlA.appendTo($("body"));
    $(function () {
        $("#downBtn").trigger("click");
        $("#downA").remove();
    });
}
OssSdk.prototype.sourceFileName = function(){
    return this.data.sourceFileName;
}
OssSdk.prototype.saveFileName = function(){
    return this.data.saveFileName;
}
OssSdk.prototype.progress = function(p){
    console.log("p:",p);
    if(typeof(this.upload)=='object'){
        this.upload.progress(p);
    }
}
OssSdk.prototype.upload = function(data, i){
    if(i==undefined){
        var i = 0;
    }
    if(this.fileName(i)==undefined){
        throw "fileName is undefined key "+i;
    }
    this.uploadHandler(this.fileName(i), data[i]);

    return this;
}